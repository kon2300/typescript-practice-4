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
import { TagCreateRequestDto } from './dto/tag-create.request.dto';
import { TagUpdateRequestDto } from './dto/tag-update.request.dto';
import { TagResponseDto } from './dto/tag.response.dto';
import { TagsResponseDto } from './dto/tags.response.dto';
import { TagService } from './tag.service';

@ApiTags('tags')
@Controller('tags')
@ApiExtraModels(ApiUnauthorizedResponse, NotFoundException)
@ApiErrorResponse(UnAuthorizedResponse)
@ApiErrorResponse(NotFoundResponse)
export class TagController {
  constructor(private readonly _tagService: TagService) {}

  @Post()
  async createTag(@Body() param: TagCreateRequestDto): Promise<CommonResponse> {
    const responseData: TagResponseDto = await this._tagService.createTag(
      param,
    );

    return new CreatedResponse(responseData);
  }

  @Get()
  async getTags(): Promise<CommonResponse> {
    const responseData: TagsResponseDto = await this._tagService.getTags();

    return new OkResponse(responseData);
  }

  @Get(':tagId')
  async getTag(@Param('tagId') tagId: number): Promise<CommonResponse> {
    const responseData: TagResponseDto = await this._tagService.findTag(tagId);

    return new OkResponse(responseData);
  }

  @Put(':tagId')
  async updateTag(
    @Param('tagId') tagId: number,
    @Body() param: TagUpdateRequestDto,
  ): Promise<CommonResponse> {
    const responseData: TagResponseDto = await this._tagService.updateTag(
      tagId,
      param,
    );

    return new OkResponse(responseData);
  }

  @Delete(':tagId')
  async deleteTag(@Param('tagId') tagId: number): Promise<CommonResponse> {
    const responseData: DeleteResult = await this._tagService.deleteTag(tagId);

    return new OkResponse(responseData);
  }
}
