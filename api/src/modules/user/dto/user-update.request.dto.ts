import { ApiProperty } from '@nestjs/swagger';

export class UserUpdateRequestDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  age: number;
}
