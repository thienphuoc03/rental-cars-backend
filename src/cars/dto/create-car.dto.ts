import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCarDto {
  @ApiProperty({
    example: 'Audi A4',
    description: 'The name of the car',
    required: true,
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: '1111',
    required: true,
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  licensePlates: string;

  @ApiProperty({
    example: 4,
    required: true,
    type: Number,
  })
  @IsNumber()
  @IsNotEmpty()
  seats: number;

  @ApiProperty({
    example: '2020',
    required: true,
    type: Number,
  })
  @IsNumber()
  @IsNotEmpty()
  yearOfManufacture: number;

  @ApiProperty({
    example: 'AUTOMATIC_TRANSMISSION',
    required: true,
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  transmission: string;

  @ApiProperty({
    example: 'GASOLINE',
    required: true,
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  fuel: string;

  @ApiProperty({
    example: '...',
    required: true,
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    example: 500000,
    required: true,
    type: Number,
  })
  @IsNumber()
  @IsNotEmpty()
  pricePerDay: number;

  @ApiProperty({
    example: 'AVAILABLE',
    required: true,
    type: String,
  })
  @IsNumber()
  @IsNotEmpty()
  modelId: number;

  @ApiProperty({
    example: [],
    required: true,
    type: Array,
  })
  @IsString()
  @IsNotEmpty()
  features: Array<any>;

  @ApiProperty({
    example: [],
    required: true,
    type: Number,
  })
  @IsNumber()
  @IsNotEmpty()
  carColorId: number;

  @ApiProperty({
    example: [],
    required: true,
    type: Array,
  })
  images: Array<any>;
}
