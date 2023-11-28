import { ApiProperty } from '@nestjs/swagger';

export class ReviewDto {
  @ApiProperty({
    example: 1,
    type: Number,
  })
  id: number;

  @ApiProperty({
    example: 'Great car!',
    type: String,
  })
  content: string;

  @ApiProperty({
    example: 5,
    type: Number,
  })
  rating: number;

  @ApiProperty({
    example: '1',
    type: Number,
  })
  carId: number;

  @ApiProperty({
    example: '1',
    type: Number,
  })
  customerId: number;

  @ApiProperty({
    example: '2023-11-12T03:00:00.000Z',
    type: String,
  })
  createdAt: string;

  @ApiProperty({
    example: '2023-11-12T03:00:00.000Z',
    type: String,
  })
  updatedAt: string;
}
