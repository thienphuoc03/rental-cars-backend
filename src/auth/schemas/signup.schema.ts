import { ApiProperty } from '@nestjs/swagger';

export class SignUpSchema {
  @ApiProperty({
    example: 'testuser',
    type: String,
  })
  username: string;

  @ApiProperty({
    example: null,
    type: String,
  })
  name: string;

  @ApiProperty({
    example: null,
    type: String,
  })
  phone: string;

  @ApiProperty({
    example: null,
    type: String,
  })
  avatarUrl: string;

  @ApiProperty({
    example: 'testuser@gmail.com',
    type: String,
  })
  email: string;

  @ApiProperty({
    example: 'CUSTOMER',
    type: String,
  })
  role: string;

  @ApiProperty({
    example: '2023-08-30T15:57:47.000Z',
    type: String,
  })
  createdAt: string;
}
