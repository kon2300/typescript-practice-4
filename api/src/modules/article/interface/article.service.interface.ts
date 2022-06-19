import { ArticleCreateRequestDto } from '../dto/article-create.request.dto';
import { ArticleTagCreateRequestDto } from '../dto/article-tag-create.request.dto';
import { ArticleTagResponseDto } from '../dto/article-tag.response.dto';
import { ArticleUpdateRequestDto } from '../dto/article-update.request.dto';
import { ArticleResponseDto } from '../dto/article.response.dto';
import { ArticlesResponseDto } from '../dto/articles.response.dto';

export interface IArticleService {
  createArticle(param: ArticleCreateRequestDto): Promise<ArticleResponseDto>;
  getArticles(): Promise<ArticlesResponseDto>;
  findArticle(articleId: number): Promise<ArticleResponseDto>;
  updateArticle(
    articleId: number,
    param: ArticleUpdateRequestDto,
  ): Promise<ArticleResponseDto>;
  joinTag(param: ArticleTagCreateRequestDto): Promise<ArticleTagResponseDto>;
}
