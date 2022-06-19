import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'articles' })
export class Article {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column({ name: 'user_id' })
  @ManyToOne(() => User, {
    cascade: true,
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  title: string;

  @Column('text')
  content: number;

  @CreateDateColumn()
  readonly created_at: Date;

  @UpdateDateColumn()
  readonly updated_at: Date;
}
