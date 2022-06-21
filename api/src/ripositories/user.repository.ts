import { Injectable } from '@nestjs/common';
import { User } from 'src/database/entities/user.entity';
import { EntityRepository, Repository } from 'typeorm';

@Injectable()
@EntityRepository(User)
export class UserRepository extends Repository<User> {}
