import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'tags' })
export class Tag {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column()
  name: string;

  @CreateDateColumn()
  readonly created_at: Date;

  @UpdateDateColumn()
  readonly updated_at: Date;
}
