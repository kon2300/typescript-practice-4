import { ApiProperty } from '@nestjs/swagger';

export class TagCreateRequestDto {
  @ApiProperty()
  name: string;
}
