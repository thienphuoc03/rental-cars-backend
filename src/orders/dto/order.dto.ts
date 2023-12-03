import { ApiProperty } from '@nestjs/swagger';
import { Decimal } from '@prisma/client/runtime/library';

export class OrderDto {
  @ApiProperty({
    example: 1,
    type: Number,
  })
  id: number;

  @ApiProperty({
    example: '2023-01-01',
    type: Date,
  })
  startDate: Date;

  @ApiProperty({
    example: '2023-01-05',
    type: Date,
  })
  endDate: Date;

  @ApiProperty({
    example: 10000000,
    type: Number,
  })
  totalAmount: number;

  @ApiProperty({
    example: 1,
    type: Number,
  })
  customerId: number;

  @ApiProperty({
    example: [
      {
        id: 1,
        orderId: 1,
        carId: 1,
        carName: 'Toyota Camry',
        price: 10000000,
        quantity: 1,
        totalAmount: 10000000,
      },
      {
        id: 1,
        orderId: 1,
        carId: 1,
        carName: 'Toyota Camry',
        price: 10000000,
        quantity: 1,
        totalAmount: 10000000,
      },
    ],
    type: Array,
  })
  OrderDetail: Array<any>;

  @ApiProperty({
    example: 'PENDING',
    type: String,
  })
  status: string;

  @ApiProperty({
    example: '2023-08-01T02:29:15.000Z',
    type: Date,
  })
  createdAt: Date;

  @ApiProperty({
    example: '2023-08-01T02:29:15.000Z',
    type: Date,
  })
  updatedAt: Date;
}
