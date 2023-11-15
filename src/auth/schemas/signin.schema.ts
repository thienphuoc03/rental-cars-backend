import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from 'src/users/dto';

export class SignInSchema {
  @ApiProperty({
    type: UserDto,
  })
  user: UserDto;

  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInVzZXJuYW1lIjoidGVzdHVzZXIiLCJpYXQiOjE2OTg5Mzc1NzIsImV4cCI6MTY5ODk4MDc3Mn0.UuFb3O6C9Ek5f1ySB0d5bS2_XNu3AnF2bGtAOt5TaHQ',
    type: String,
  })
  accessToken: string;

  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInVzZXJuYW1lIjoidGVzdHVzZXIiLCJpYXQiOjE2OTg5Mzc1NzIsImV4cCI6MTY5ODk4MDc3Mn0.UuFb3O6C9Ek5f1ySB0d5bS2_XNu3AnF2bGtAOt5TaHQ',
    type: String,
  })
  refreshToken: string;
}
