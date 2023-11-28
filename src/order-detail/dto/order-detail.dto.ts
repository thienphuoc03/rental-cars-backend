import { ApiProperty } from '@nestjs/swagger';

export class OrderDetailDto {
  @ApiProperty({
    example: 1,
    description: 'The id of the order detail',
    type: Number,
  })
  id: number;

  @ApiProperty({
    example: 1,
    description: 'The id of the order detail',
    type: Number,
  })
  orderId: number;

  @ApiProperty({
    example: 1,
    description: 'The id of the order detail',
    type: Number,
  })
  carId: number;

  @ApiProperty({
    example: '2023-11-11',
    type: Date,
  })
  startDate: Date;

  @ApiProperty({
    example: '2023-11-11',
    type: Date,
  })
  endDate: Date;

  @ApiProperty({
    example: 645000,
    type: Number,
  })
  pricePerDay: number;

  @ApiProperty({
    example: 4230000,
    type: Number,
  })
  totalAmount: number;

  @ApiProperty({
    example: 'cho_xac_nhan',
    type: String,
  })
  status: string;

  @ApiProperty({
    example: '2023-11-11T07:16:20.000Z',
    type: Date,
  })
  createdAt: Date;

  @ApiProperty({
    example: '2023-11-11T07:16:20.000Z',
    type: Date,
  })
  updatedAt: Date;
}
