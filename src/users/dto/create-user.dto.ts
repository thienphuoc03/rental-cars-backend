import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'Thien Phuoc',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'thienphuoc',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    example: '123456',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    example: 'thienphuoc@gmail.com',
    type: String,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: '0987654321',
    type: String,
  })
  @IsString()
  phone: string;

  @ApiProperty({
    example: 'MALE',
    type: String,
  })
  @IsString()
  gender: string;

  @ApiProperty({
    example: '1999-08-20',
    type: Date,
  })
  @IsString()
  dateOfBirth: Date;

  @ApiProperty({
    example: 'Da Nang City',
    type: String,
  })
  @IsString()
  address: string;

  @ApiProperty({
    example: 'https://example.com/avatar.png',
    type: String,
  })
  avatarUrl: string;

  @ApiProperty({
    example: 'CUSTOMER',
    type: String,
  })
  role: string;
}
