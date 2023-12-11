import { Module } from '@nestjs/common';
import { OrdersModule } from 'src/orders/orders.module';

import { StripeController } from './stripe.controller';
import { StripeService } from './stripe.service';

@Module({
  imports: [OrdersModule],
  controllers: [StripeController],
  providers: [StripeService],
})
export class StripeModule {}
