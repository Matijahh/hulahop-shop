import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { ProductSubVariantsModule } from '../product-sub-variants/product-sub-variants.module';
import { CartsModule } from '../carts/carts.module';
import { MailerModule } from 'src/providers/mailer/mailer.module';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [OrdersService],
  imports: [CartsModule, ProductSubVariantsModule, MailerModule],
})
export class OrdersModule {}
