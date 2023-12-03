import { Module } from '@nestjs/common';

import { CarImagesController } from './car-images.controller';
import { CarImagesService } from './car-images.service';

@Module({
  controllers: [CarImagesController],
  providers: [CarImagesService],
})
export class CarImagesModule {}
