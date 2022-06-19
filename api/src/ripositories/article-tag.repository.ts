import { Injectable } from '@nestjs/common';
import { ArticleTag } from 'src/database/entities/article-tag.entity';
import { EntityRepository, Repository } from 'typeorm';

@Injectable()
@EntityRepository(ArticleTag)
export class ArticleTagRepository extends Repository<ArticleTag> {}
