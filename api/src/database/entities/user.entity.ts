import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  age: number;

  @CreateDateColumn()
  readonly created_at: Date;

  @UpdateDateColumn()
  readonly updated_at: Date;
}
