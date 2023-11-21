import { Module } from '@nestjs/common';
import { CarColorsService } from './car-colors.service';
import { CarColorsController } from './car-colors.controller';

@Module({
  controllers: [CarColorsController],
  providers: [CarColorsService],
})
export class CarColorsModule {}
