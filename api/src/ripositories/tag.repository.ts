import { Injectable } from '@nestjs/common';
import { Tag } from 'src/database/entities/tag.entity';
import { EntityRepository, Repository } from 'typeorm';

@Injectable()
@EntityRepository(Tag)
export class TagRepository extends Repository<Tag> {}
