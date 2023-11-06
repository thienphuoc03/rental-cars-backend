import { ApiProperty } from '@nestjs/swagger';

export class MetaSchema {
  @ApiProperty({
    example: 10,
    type: Number,
  })
  totalPages: number;

  @ApiProperty({
    example: 1,
    type: Number,
  })
  _page: number;

  @ApiProperty({
    example: 10,
    type: Number,
  })
  _limit: number;

  @ApiProperty({
    example: 90,
    type: Number,
  })
  totalUsers: number;
}
