import { Injectable } from '@nestjs/common';

@Injectable()
export class DashboardService {
    constructor(){}

    async getDashboardData(){
        return {
            message: 'Hello from dashboard service'
        }
    }
}
