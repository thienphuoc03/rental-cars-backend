import { Module } from '@nestjs/common';
import { CloudinaryProvider } from 'src/cloudinary/providers/cloudinary.provider';

import { CloudinaryService } from './cloudinary.service';

@Module({
  providers: [CloudinaryService, CloudinaryProvider],
  exports: [CloudinaryService, CloudinaryProvider],
})
export class CloudinaryModule {}
