import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCarImageDto {
  @ApiProperty({
    example: 'https://www.example.com/image.png',
    type: String,
  })
  @IsString()
  url: string;

  @ApiProperty({
    example: 1,
    type: Number,
  })
  carId: number;
}
