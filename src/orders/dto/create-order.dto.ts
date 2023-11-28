import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({
    example: '2023-01-01',
    type: Date,
  })
  @IsString()
  @IsNotEmpty()
  startDate: Date;

  @ApiProperty({
    example: '2023-01-05',
    type: Date,
  })
  @IsString()
  @IsNotEmpty()
  endDate: Date;

  @ApiProperty({
    example: 10000000,
    type: Number,
  })
  @IsNotEmpty()
  totalAmount: number;

  @ApiProperty({
    example: 1,
    type: Number,
  })
  @IsNotEmpty()
  @IsNumber()
  customerId: number;
}
