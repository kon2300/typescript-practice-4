import { Injectable } from '@nestjs/common';
import { Article } from 'src/database/entities/article.entity';
import { EntityRepository, Repository } from 'typeorm';

@Injectable()
@EntityRepository(Article)
export class ArticleRepository extends Repository<Article> {}
