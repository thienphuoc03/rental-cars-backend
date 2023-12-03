import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateOrderDetailDto {
  @ApiProperty({
    example: 1,
    description: 'The order id',
    required: true,
    type: Number,
  })
  @IsNumber()
  @IsNotEmpty()
  orderId: number;

  @ApiProperty({
    example: 1,
    description: 'The car id',
    required: true,
    type: Number,
  })
  @IsNumber()
  @IsNotEmpty()
  carId: number;

  @ApiProperty({
    example: 658000,
    type: Number,
  })
  @IsNumber()
  @IsNotEmpty()
  pricePerDay: number;

  @ApiProperty({
    example: '2023-11-11',
    type: Date,
  })
  @IsNotEmpty()
  startDate: Date;

  @ApiProperty({
    example: '2023-11-12',
    type: Date,
  })
  @IsNotEmpty()
  endDate: Date;

  @ApiProperty({
    example: 4000000,
    type: Number,
  })
  @IsNumber()
  @IsNotEmpty()
  totalAmount: number;
}
