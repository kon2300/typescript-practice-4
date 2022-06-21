import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiExtraModels,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ApiErrorResponse } from 'src/common/decoraters';
import {
  CommonResponse,
  CreatedResponse,
  NotFoundResponse,
  OkResponse,
  UnAuthorizedResponse,
} from 'src/common/types/response';
import { DeleteResult } from 'typeorm';
import { ArticleService } from './article.service';
import { ArticleCreateRequestDto } from './dto/article-create.request.dto';
import { ArticleTagCreateRequestDto } from './dto/article-tag-create.request.dto';
import { ArticleTagResponseDto } from './dto/article-tag.response.dto';
import { ArticleUpdateRequestDto } from './dto/article-update.request.dto';
import { ArticleResponseDto } from './dto/article.response.dto';
import { ArticlesResponseDto } from './dto/articles.response.dto';

@ApiTags('articles')
@Controller('articles')
@ApiExtraModels(ApiUnauthorizedResponse, NotFoundException)
@ApiErrorResponse(UnAuthorizedResponse)
@ApiErrorResponse(NotFoundResponse)
export class ArticleController {
  constructor(private readonly _articleService: ArticleService) {}

  @Post()
  async createArticle(
    @Body() param: ArticleCreateRequestDto,
  ): Promise<CommonResponse> {
    const responseData: ArticleResponseDto = await this._articleService.createArticle(
      param,
    );

    return new CreatedResponse(responseData);
  }

  @Get()
  async getArticles(): Promise<CommonResponse> {
    const responseData: ArticlesResponseDto = await this._articleService.getArticles();

    return new OkResponse(responseData);
  }

  @Get(':articleId')
  async findArticle(
    @Param('articleId') articleId: number,
  ): Promise<CommonResponse> {
    const responseData: ArticleResponseDto = await this._articleService.findArticle(
      articleId,
    );

    return new OkResponse(responseData);
  }

  @Put(':articleId')
  async updateArticle(
    @Param('articleId') articleId: number,
    @Body() param: ArticleUpdateRequestDto,
  ): Promise<CommonResponse> {
    const responseData: ArticleResponseDto = await this._articleService.updateArticle(
      articleId,
      param,
    );

    return new OkResponse(responseData);
  }

  @Delete(':articleId')
  async deleteArticle(
    @Param('articleId') articleId: number,
  ): Promise<CommonResponse> {
    const responseData: DeleteResult = await this._articleService.deleteArticle(
      articleId,
    );

    return new OkResponse(responseData);
  }

  @Post('tags')
  async joinTag(
    @Body() param: ArticleTagCreateRequestDto,
  ): Promise<CommonResponse> {
    const responseData: ArticleTagResponseDto = await this._articleService.joinTag(
      param,
    );

    return new OkResponse(responseData);
  }

  @Delete(':articleId/tags/:tagId')
  async releaseTag(
    @Param('articleId') articleId: number,
    @Param('tagId') tagId: number,
  ): Promise<CommonResponse> {
    const responseData: DeleteResult = await this._articleService.releaseTag(
      articleId,
      tagId,
    );

    return new OkResponse(responseData);
  }
}
