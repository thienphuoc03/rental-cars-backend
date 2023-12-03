import { ApiProperty } from '@nestjs/swagger';

export class CarBrandDto {
  @ApiProperty({
    example: 1,
    description: 'The id of the car brand',
    type: Number,
  })
  id: number;

  @ApiProperty({
    example: 'Toyota',
    description: 'The name of the car brand',
    type: String,
  })
  name: string;

  @ApiProperty({
    example: '2021-02-04T15:00:00.000Z',
    description: 'The date the car brand was created',
    type: Date,
  })
  createdAt: Date;

  @ApiProperty({
    example: '2021-02-04T15:00:00.000Z',
    description: 'The date the car brand was updated',
    type: Date,
  })
  updatedAt: Date;
}
