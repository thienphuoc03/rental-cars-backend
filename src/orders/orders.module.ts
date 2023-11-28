import { Module } from '@nestjs/common';
import { OrderDetailModule } from 'src/order-detail/order-detail.module';

import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

@Module({
  imports: [OrderDetailModule],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
