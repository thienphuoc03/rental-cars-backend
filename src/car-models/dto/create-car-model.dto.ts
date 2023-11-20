import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCarModelDto {
  @ApiProperty({
    example: 'AUDI A1',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 1,
    type: Number,
  })
  @IsNotEmpty()
  @IsNumber()
  brandId: number;
}
