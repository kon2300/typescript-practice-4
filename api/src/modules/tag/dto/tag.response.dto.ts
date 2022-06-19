import { ApiProperty } from '@nestjs/swagger';
import { Tag } from 'src/database/entities/tag.entity';

export class TagResponseDto {
  @ApiProperty()
  tag: Tag;
}
