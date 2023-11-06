import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumber, IsString } from 'class-validator';

export class UserDto {
  @ApiProperty({
    example: '12',
    type: Number,
  })
  @IsNumber()
  id: number;

  @ApiProperty({
    example: 'John Doe',
    type: String,
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'testuser@gmail.com',
    type: String,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '123456789',
    type: String,
  })
  @IsString()
  phone: string;

  @ApiProperty({
    example: 'NAM',
    type: String,
  })
  @IsString()
  gender: string;

  @ApiProperty({
    example: 'Ha Noi',
    type: String,
  })
  @IsString()
  address: string;

  @ApiProperty({
    example: 'https://example.com/avatar.png',
    type: String,
  })
  @IsString()
  avatarUrl: string;

  @ApiProperty({
    example: 'ACTIVE',
    type: String,
  })
  @IsString()
  status: string;

  @ApiProperty({
    example: 'CUSTOMER',
    type: String,
  })
  @IsString()
  role: string;

  @ApiProperty({
    example: '2023-08-20T02:11:20.000Z',
    type: Date,
  })
  @IsString()
  createdAt: Date;

  @ApiProperty({
    example: '2023-08-20T02:11:20.000Z',
    type: Date,
  })
  @IsString()
  updatedAt: Date;
}
