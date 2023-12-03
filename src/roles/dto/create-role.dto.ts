import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({
    example: 'SUPERADMIN',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
