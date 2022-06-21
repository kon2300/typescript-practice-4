import { TagCreateRequestDto } from '../dto/tag-create.request.dto';
import { TagUpdateRequestDto } from '../dto/tag-update.request.dto';
import { TagResponseDto } from '../dto/tag.response.dto';
import { TagsResponseDto } from '../dto/tags.response.dto';

export interface ITagService {
  createTag(param: TagCreateRequestDto): Promise<TagResponseDto>;
  getTags(): Promise<TagsResponseDto>;
  findTag(tagId: number): Promise<TagResponseDto>;
  updateTag(tagId: number, param: TagUpdateRequestDto): Promise<TagResponseDto>;
}
