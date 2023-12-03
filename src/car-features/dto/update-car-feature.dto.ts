import { PartialType } from '@nestjs/swagger';

import { CreateCarFeatureDto } from './create-car-feature.dto';

export class UpdateCarFeatureDto extends PartialType(CreateCarFeatureDto) {}
