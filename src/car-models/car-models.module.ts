import { Module } from '@nestjs/common';

import { CarModelsController } from './car-models.controller';
import { CarModelsService } from './car-models.service';

@Module({
  controllers: [CarModelsController],
  providers: [CarModelsService],
})
export class CarModelsModule {}
