import { Module } from '@nestjs/common';
import { CarModelsService } from './car-models.service';
import { CarModelsController } from './car-models.controller';

@Module({
  controllers: [CarModelsController],
  providers: [CarModelsService],
})
export class CarModelsModule {}
