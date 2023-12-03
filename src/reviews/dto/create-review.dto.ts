import { ApiProperty } from '@nestjs/swagger';

export class CreateReviewDto {
  @ApiProperty({
    example: 'Great car!',
    type: String,
  })
  content: string;

  @ApiProperty({
    example: '5',
    type: Number,
  })
  rating: number;

  @ApiProperty({
    example: '1',
    type: Number,
  })
  carId: number;
}
