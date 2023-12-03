import { ApiProperty } from '@nestjs/swagger';

export class CarModelDto {
  @ApiProperty({
    example: 'AUDI A1',
    type: String,
  })
  name: string;

  @ApiProperty({
    example: 'AUDI',
    type: String,
  })
  carBrand: string;
}
