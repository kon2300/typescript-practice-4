import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { ArticleTag } from 'src/database/entities/article-tag.entity';

export class ArticleTagResponseDto {
  @IsNotEmpty()
  @ApiProperty()
  articleTag: ArticleTag;
}
