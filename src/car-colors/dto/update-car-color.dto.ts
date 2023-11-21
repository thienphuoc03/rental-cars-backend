import { PartialType } from '@nestjs/swagger';
import { CreateCarColorDto } from './create-car-color.dto';

export class UpdateCarColorDto extends PartialType(CreateCarColorDto) {}
