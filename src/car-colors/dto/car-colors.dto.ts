import { ApiProperty } from '@nestjs/swagger';

export class CarColorsDto {
  @ApiProperty({
    example: 1,
    description: 'The id of the car color',
    type: Number,
  })
  id: number;

  @ApiProperty({
    example: 'Red',
    description: 'The name of the car color',
    type: String,
  })
  name: string;

  @ApiProperty({
    example: '2021-07-01T00:00:00.000Z',
    type: Date,
    description: 'The date when the car color was created',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2021-07-01T00:00:00.000Z',
    type: Date,
    description: 'The date when the car color was updated',
  })
  updatedAt: Date;
}
