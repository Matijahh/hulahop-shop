import { Module } from '@nestjs/common';
import { ProductSubVariantsService } from './product-sub-variants.service';

@Module({
  providers: [ProductSubVariantsService],
  exports: [ProductSubVariantsService],
})
export class ProductSubVariantsModule {}
