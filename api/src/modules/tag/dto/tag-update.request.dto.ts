import { ApiProperty } from '@nestjs/swagger';

export class TagUpdateRequestDto {
  @ApiProperty()
  name: string;
}
