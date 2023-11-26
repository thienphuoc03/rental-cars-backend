import { Module } from '@nestjs/common';

import { CarFeaturesController } from './car-features.controller';
import { CarFeaturesService } from './car-features.service';

@Module({
  controllers: [CarFeaturesController],
  providers: [CarFeaturesService],
})
export class CarFeaturesModule {}
