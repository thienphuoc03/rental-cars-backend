import { Module } from '@nestjs/common';
import { CarColorsController } from './car-colors.controller';
import { CarColorsService } from './car-colors.service';

@Module({
  controllers: [CarColorsController],
  providers: [CarColorsService],
})
export class CarColorsModule {}
