import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateFeatureDto {
  @ApiProperty({
    description: 'The name of the feature',
    example: 'Air conditioning',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
