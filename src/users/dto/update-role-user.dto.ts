import { ApiProperty } from '@nestjs/swagger';
import { RoleName } from '@prisma/client';

export class UpdateRoleUserDto {
  @ApiProperty({
    example: RoleName.CAROWNER,
    type: String,
  })
  role: string;
}
