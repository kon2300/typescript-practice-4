import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ArticleTagCreateRequestDto {
  @IsNotEmpty()
  @ApiProperty()
  articleId: number;

  @IsNotEmpty()
  @ApiProperty()
  tagId: number;
}
