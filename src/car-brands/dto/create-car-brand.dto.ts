import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCarBrandDto {
  @ApiProperty({
    example: 'Toyota',
    description: 'The name of the car brand',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
