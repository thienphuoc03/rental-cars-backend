import { ApiProperty } from '@nestjs/swagger';

export class FeaturesDto {
  @ApiProperty({
    description: 'The id of the feature',
    example: 1,
    type: Number,
  })
  id: number;

  @ApiProperty({
    description: 'The name of the feature',
    example: 'Air conditioning',
    type: String,
  })
  name: string;

  @ApiProperty({
    description: 'The description of the feature',
    example: '2021-07-01T00:00:00.000Z',
    type: Date,
  })
  createdAt: Date;

  @ApiProperty({
    description: 'The description of the feature',
    example: '2021-07-01T00:00:00.000Z',
    type: Date,
  })
  updatedAt: Date;
}
