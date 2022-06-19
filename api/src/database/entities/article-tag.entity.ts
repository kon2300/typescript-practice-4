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

  @PrimaryColumn()
  article_id: number;

  @PrimaryColumn()
  tag_id: number;

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

  @CreateDateColumn()
  readonly created_at: Date;

  @UpdateDateColumn()
  readonly updated_at: Date;
}
