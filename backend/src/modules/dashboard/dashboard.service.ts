import { Injectable } from '@nestjs/common';
import { CurrentUserDto } from '../auth/dto/current-user.dto';
import { AbstractService } from 'src/commons';
import { ordersRepository } from '../orders/repository/orders.repository';
import { startOfMonth, endOfMonth, isAfter, isBefore, set, eachDayOfInterval, format } from 'date-fns';

@Injectable()
export class DashboardService extends AbstractService {
    
    constructor() {
        super(ordersRepository);
    }

    async getPerformanceData(currentUser: CurrentUserDto) {
        const whereClause = this.buildWhereClause(currentUser);
        const result = await this.find({
            where: whereClause,
            relations: [
                'order_products',
                'order_products.associate_product',
                'order_products.associate_product.product',
                'user'
            ],
        });
        return this.calculateEarnings(result);
    }

    async getMonthlyOrderNumberStats(currentUser: CurrentUserDto) {
        const whereClause = this.buildWhereClause(currentUser);
        const result = await this.find({
            where: whereClause,
            relations: [
                'order_products',
                'order_products.associate_product',
                'order_products.associate_product.product',
                'user'
            ],
        });

        // Get the current date and the start of the past month
        const today = new Date();
        
        // Normalize the start and end of last month to midnight UTC
        const startOfLastMonth = set(startOfMonth(today), { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 });
        const endOfLastMonth = set(endOfMonth(today), { hours: 23, minutes: 59, seconds: 59, milliseconds: 999 });

        // Create an array of all dates in the previous month
        const allDates = eachDayOfInterval({ start: startOfLastMonth, end: endOfLastMonth });
        
        // Initialize dailyOrders with 0 for each day in the range
        const dailyOrders = allDates.reduce((acc, date) => {
            acc[format(date, 'yyyy-MM-dd')] = 0; // Use format to get 'YYYY-MM-DD' as string
            return acc;
        }, {});

        // Process the orders and update the daily order count
        result.forEach(order => {
            const orderDate = new Date(Number(order.created_at)); // Convert to Date from timestamp
            const orderDateString = format(orderDate, 'yyyy-MM-dd'); // Format as 'YYYY-MM-DD'

            // Only include orders from the last month range
            if (isAfter(orderDate, startOfLastMonth) && isBefore(orderDate, endOfLastMonth)) {
                if (dailyOrders[orderDateString] !== undefined) {
                    dailyOrders[orderDateString] += 1; // Increment the order count for the date
                }
            }
        });

        // Prepare data for the chart
        const chartData = this.formatDataForChart(dailyOrders);

        return chartData; // Return the formatted chart data
    }

    // New function to get daily bruto sum of orders
    async getMonthlyEarningsStats(currentUser: CurrentUserDto) {
        const whereClause = this.buildWhereClause(currentUser);
        const result = await this.find({
            where: whereClause,
            relations: [
                'order_products',
                'order_products.associate_product',
                'order_products.associate_product.product',
                'user'
            ],
        });

        // Get the current date and the start of the past month
        const today = new Date();
        
        // Normalize the start and end of last month to midnight UTC
        const startOfLastMonth = set(startOfMonth(today), { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 });
        const endOfLastMonth = set(endOfMonth(today), { hours: 23, minutes: 59, seconds: 59, milliseconds: 999 });

        // Create an array of all dates in the previous month
        const allDates = eachDayOfInterval({ start: startOfLastMonth, end: endOfLastMonth });
        
        // Initialize dailyBrutoSum with 0 for each day in the range
        const dailyBrutoSum = allDates.reduce((acc, date) => {
            acc[format(date, 'yyyy-MM-dd')] = 0; // Use format to get 'YYYY-MM-DD' as string
            return acc;
        }, {});

        // Process the orders and update the daily bruto sum
        result.forEach(order => {
            const orderDate = new Date(Number(order.created_at)); // Convert to Date from timestamp
            const orderDateString = format(orderDate, 'yyyy-MM-dd'); // Format as 'YYYY-MM-DD'

            // Only include orders from the last month range
            if (isAfter(orderDate, startOfLastMonth) && isBefore(orderDate, endOfLastMonth)) {
                if (dailyBrutoSum[orderDateString] !== undefined) {
                    // Sum the bruto value for the order's associated products
                    const brutoEarnings = order.order_products.reduce((sum, orderProduct) => {
                        return sum + parseFloat(orderProduct.associate_product.price || "0");
                    }, 0);

                    dailyBrutoSum[orderDateString] += brutoEarnings; // Add bruto to the corresponding date
                }
            }
        });

        // Prepare data for the chart
        const chartData = this.formatEarningsDataForChart(dailyBrutoSum);

        return chartData; // Return the formatted chart data
    }

    // Helper function to format the bruto data into the format expected by the chart
    private formatEarningsDataForChart(dailyBrutoSum: Record<string, number>) {
        // Extract the dates and bruto sums from the dailyBrutoSum object
        const dates = Object.keys(dailyBrutoSum);
        const brutoSums = Object.values(dailyBrutoSum);

        // Return the formatted data
        return {
            xAxis: [{ data: dates }],
            series: [{ data: brutoSums }]
        };
    }

    private formatDataForChart(dailyOrders: Record<string, number>) {
        // Extract the dates and order counts from the dailyOrders object
        const dates = Object.keys(dailyOrders);
        const orders = Object.values(dailyOrders);

        // Return the formatted data
        return {
            xAxis: [{ data: dates }],
            series: [{ data: orders }]
        };
    }

    private buildWhereClause(currentUser: CurrentUserDto) {
        const userId = currentUser.id;
        const userRole = currentUser.type;
        const whereClause: any = { status: 'DELIVERED' };

        if (userRole === 'ASSOCIATE') {
            whereClause.user_id = userId;
        }
        return whereClause;
    }

    private calculateEarnings(orders: any[]) {
        const enrichedResult = orders.reduce(
            (acc, order) => {
                const brutoEarnings = order.order_products.reduce((sum, orderProduct) => {
                    return sum + parseFloat(orderProduct.associate_product.price || "0");
                }, 0);
        
                const netoEarnings = order.order_products.reduce((sum, orderProduct) => {
                    return sum + parseFloat(orderProduct.associate_product.product.price || "0");
                }, 0);
        
                acc.brutoEarnings += brutoEarnings;
                acc.netoEarnings += netoEarnings;
                acc.totalOrders += 1; // Increment the count of total orders
                
                return acc;
            },
            { brutoEarnings: 0, netoEarnings: 0, totalOrders: 0 } // Initialize totalOrders in accumulator
        );
        
        return {
            brutoEarnings: enrichedResult.brutoEarnings.toFixed(2),
            netoEarnings: enrichedResult.netoEarnings.toFixed(2),
            totalOrders: enrichedResult.totalOrders // Include totalOrders in the result
        };
    }
}
