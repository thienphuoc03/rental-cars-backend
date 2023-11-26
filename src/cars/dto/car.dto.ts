import { ApiProperty } from '@nestjs/swagger';

export class CarDto {
  @ApiProperty({
    example: 1,
    type: Number,
  })
  id: number;

  @ApiProperty({
    example: 'Audi A4',
    type: String,
  })
  name: string;

  @ApiProperty({
    example: 'audi-a4',
    type: String,
  })
  slug: string;

  @ApiProperty({
    example: '1111',
    type: String,
  })
  licensePlates: string;

  @ApiProperty({
    example: 4,
    type: Number,
  })
  seats: number;

  @ApiProperty({
    example: 2020,
    type: Number,
  })
  yearOfManufacture: number;

  @ApiProperty({
    example: 'AUTOMATIC_TRANSMISSION',
    type: String,
  })
  transmission: string;

  @ApiProperty({
    example: 'GASOLINE',
    type: String,
  })
  fuel: string;

  @ApiProperty({
    example: 'Xe cũ, hư, nát, đi tốn xăng, bán phế liệu không ai mua.',
    type: String,
  })
  description: string;

  @ApiProperty({
    example: 100000,
    type: Number,
  })
  pricePerDay: number;

  @ApiProperty({
    example: 'AVAILABLE',
    type: String,
  })
  status: string;

  @ApiProperty({
    example: 'Audi A4',
    type: String,
  })
  model: string;

  @ApiProperty({
    example: 'Audi',
    type: String,
  })
  brand: string;

  @ApiProperty({
    example: '2023-01-01T00:00:00.000Z',
    type: Date,
  })
  createdAt: Date;

  @ApiProperty({
    example: '2023-01-01T00:00:00.000Z',
    type: Date,
  })
  updatedAt: Date;

  @ApiProperty({
    example: [],
    type: Array,
  })
  carFeature: string[];

  @ApiProperty({
    example: [],
    type: Array,
  })
  orderDetail: string[];

  @ApiProperty({
    example: {},
    type: Object,
  })
  review: object;

  @ApiProperty({
    example: 'black',
    type: String,
  })
  carColor: string;

  @ApiProperty({
    example: [],
    type: Array,
  })
  carImage: string[];

  @ApiProperty({
    example: 20,
    type: Number,
  })
  trips: number;

  @ApiProperty({
    example: 5,
    type: Number,
  })
  rating: number;
}
