import { Injectable, NotFoundException } from '@nestjs/common';
import { ArticleTag } from 'src/database/entities/article-tag.entity';
import { Article } from 'src/database/entities/article.entity';
import { Tag } from 'src/database/entities/tag.entity';
import { ArticleTagRepository } from 'src/ripositories/article-tag.repository';
import { ArticleRepository } from 'src/ripositories/article.repository';
import { TagRepository } from 'src/ripositories/tag.repository';
import { DeleteResult } from 'typeorm';
import { ArticleCreateRequestDto } from './dto/article-create.request.dto';
import { ArticleTagCreateRequestDto } from './dto/article-tag-create.request.dto';
import { ArticleTagResponseDto } from './dto/article-tag.response.dto';
import { ArticleUpdateRequestDto } from './dto/article-update.request.dto';
import { ArticleResponseDto } from './dto/article.response.dto';
import { ArticlesResponseDto } from './dto/articles.response.dto';
import { IArticleService } from './interface/article.service.interface';

@Injectable()
export class ArticleService implements IArticleService {
  constructor(
    private readonly _articleRepository: ArticleRepository,
    private readonly _articleTagRepository: ArticleTagRepository,
    private readonly _tagRepository: TagRepository,
  ) {}

  //article作成処理
  async createArticle(
    param: ArticleCreateRequestDto,
  ): Promise<ArticleResponseDto> {
    const newArticle = new Article();
    const newArticleParam = this._articleRepository.create({
      ...newArticle,
      ...param,
    });
    const article = await this._articleRepository.save(newArticleParam);
    return { article };
  }

  //tagの登録処理
  async joinTag(
    param: ArticleTagCreateRequestDto,
  ): Promise<ArticleTagResponseDto> {
    const newArticleTag = new ArticleTag();
    const newArticleTagParam = this._articleTagRepository.create({
      ...newArticleTag,
      ...param,
    });
    const articleTag = await this._articleTagRepository.save(
      newArticleTagParam,
    );

    return { articleTag };
  }

  //Article全件取得
  async getArticles(): Promise<ArticlesResponseDto> {
    const articles: { article: Article; tags: Tag[] }[] = [];
    const articlesData = await this._articleRepository.find();

    await Promise.all(
      articlesData.map(async (article) => {
        const tags: Tag[] = [];
        const articleTags = await this._articleTagRepository.find({
          where: { articleId: article.id },
        });

        if (articleTags) {
          await Promise.all(
            articleTags.map(async (articleTag) => {
              const tag = await this._tagRepository.findOne(articleTag.tagId);
              if (tag) tags.push(tag);
            }),
          );
        }

        articles.push({ article, tags });
      }),
    );

    return { articles };
  }

  //article取得
  async findArticle(articleId: number): Promise<ArticleResponseDto> {
    const article = await this._articleRepository.findOne(articleId);
    if (!article) throw new NotFoundException();

    const articleTags = await this._articleTagRepository.find({
      where: { articleId: articleId },
    });

    const tags: Tag[] = [];

    await Promise.all(
      articleTags.map(async (articleTag) => {
        const tag = await this._tagRepository.findOne(articleTag.tagId);
        if (tag) tags.push(tag);
      }),
    );

    return { article, tags };
  }

  //article更新処理
  async updateArticle(
    articleId: number,
    param: ArticleUpdateRequestDto,
  ): Promise<ArticleResponseDto> {
    const origin = await this._articleRepository.findOne(articleId);
    if (!origin) throw new NotFoundException();
    const article = await this._articleRepository.save({
      ...origin,
      ...param,
    });
    return { article };
  }

  //articleに紐づくタグ削除処理
  async releaseTag(articleId: number, tagId: number): Promise<DeleteResult> {
    const result = await this._articleTagRepository.delete({
      articleId: articleId,
      tagId: tagId,
    });

    return result;
  }

  async deleteArticle(articleId: number): Promise<DeleteResult> {
    await this._articleTagRepository.delete({
      articleId: articleId,
    });

    const result = await this._articleRepository.delete(articleId);

    return result;
  }
}
