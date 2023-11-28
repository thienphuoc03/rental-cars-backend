import { ApiProperty } from '@nestjs/swagger';

export class CarImageDto {
  @ApiProperty({
    example: 1,
    type: Number,
  })
  id: number;

  @ApiProperty({
    example: 'https://www.example.com/image.png',
    type: String,
  })
  url: string;

  @ApiProperty({
    example: 1,
    type: Number,
  })
  carId: number;

  @ApiProperty({
    example: '2021-09-09T00:00:00.000Z',
    type: String,
  })
  createdAt: string;

  @ApiProperty({
    example: '2021-09-09T00:00:00.000Z',
    type: String,
  })
  updatedAt: string;
}
