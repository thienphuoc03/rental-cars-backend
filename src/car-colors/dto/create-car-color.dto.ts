import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCarColorDto {
  @ApiProperty({
    example: 'Red',
    description: 'The name of the car color',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
