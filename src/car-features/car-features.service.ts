import { Injectable } from '@nestjs/common';

import { CreateCarFeatureDto } from './dto/create-car-feature.dto';
import { UpdateCarFeatureDto } from './dto/update-car-feature.dto';

@Injectable()
export class CarFeaturesService {
  create(createCarFeatureDto: CreateCarFeatureDto) {
    return 'This action adds a new carFeature';
  }

  findAll() {
    return `This action returns all carFeatures`;
  }

  findOne(id: number) {
    return `This action returns a #${id} carFeature`;
  }

  update(id: number, updateCarFeatureDto: UpdateCarFeatureDto) {
    return `This action updates a #${id} carFeature`;
  }

  remove(id: number) {
    return `This action removes a #${id} carFeature`;
  }
}
