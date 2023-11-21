import { ApiProperty } from '@nestjs/swagger';

export class RolesDto {
  @ApiProperty({
    example: 1,
    type: Number,
  })
  id: number;

  @ApiProperty({
    example: 'ADMIN',
    type: String,
  })
  name: string;

  @ApiProperty({
    example: '2021-09-20T05:08:28.000Z',
    type: Date,
  })
  createdAt: Date;

  @ApiProperty({
    example: '2021-09-20T05:08:28.000Z',
    type: Date,
  })
  updatedAt: Date;
}
