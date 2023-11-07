import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignUpDto {
  @ApiProperty({
    example: 'testuser',
    description: 'Username is unique',
    type: String,
    default: 'thienphuoc',
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    example: 'testuser@gmail.com',
    description: 'Email is unique',
    type: String,
    default: 'thienphuoc@gmail.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: '123456',
    description: 'Password must be greater than 6 characters',
    type: String,
    default: '123456',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
