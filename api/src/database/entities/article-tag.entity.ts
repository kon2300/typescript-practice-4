import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Article } from './article.entity';
import { Tag } from './tag.entity';

@Entity({ name: 'articles_tags' })
export class ArticleTag {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @PrimaryColumn({ name: 'article_id' })
  articleId: number;

  @PrimaryColumn({ name: 'tag_id' })
  tagId: number;

  @ManyToOne(() => Article, (article) => article.id, {
    cascade: true,
  })
  @JoinColumn({ name: 'article_id' })
  article: Article[];

  @ManyToOne(() => Tag, (tag) => tag.id, {
    cascade: true,
  })
  @JoinColumn({ name: 'tag_id' })
  tag: Tag[];

  @CreateDateColumn({ name: 'created_at' })
  readonly createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  readonly updatedAt: Date;
}
