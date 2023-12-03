import { PartialType } from '@nestjs/swagger';

import { CreateCarBrandDto } from './create-car-brand.dto';

export class UpdateCarBrandDto extends PartialType(CreateCarBrandDto) {}
