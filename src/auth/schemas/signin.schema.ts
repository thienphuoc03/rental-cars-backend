import { ApiProperty } from '@nestjs/swagger';

export class SignInSchema {
  @ApiProperty({
    example: 'testuser',
    type: String,
  })
  username: string;

  @ApiProperty({
    example: 'CUSTOMER',
    type: String,
  })
  role: string;

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
