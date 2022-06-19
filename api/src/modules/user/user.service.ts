import { Injectable, NotFoundException } from '@nestjs/common';
import { nanoid } from 'nanoid';
import { User } from 'src/database/entities/user.entity';
import { UserRepository } from 'src/ripositories/user.repository';
import { UserCreateRequestDto } from './dto/user-create.request.dto';
import { UserUpdateRequestDto } from './dto/user-update.request.dto';
import { UserResponseDto } from './dto/user.response.dto';
import { UsersResponseDto } from './dto/users.response.dto';
import { IUserService } from './interface/user.service.interface';

@Injectable()
export class UserService implements IUserService {
  constructor(private readonly _userRepository: UserRepository) {}

  //user作成処理
  async createUser(param: UserCreateRequestDto): Promise<UserResponseDto> {
    const newUser = new User();
    newUser.id = nanoid();
    const newUserParam = this._userRepository.create({
      ...newUser,
      ...param,
    });
    const user = await this._userRepository.save(newUserParam);
    return { user };
  }

  //user全件取得処理
  async getUsers(): Promise<UsersResponseDto> {
    const users = await this._userRepository.find();
    if (!users) throw new NotFoundException();
    return { users };
  }

  //user取得処理
  async findUser(userId: string): Promise<UserResponseDto> {
    const user = await this._userRepository.findOne(userId);
    if (!user) throw new NotFoundException();
    return { user };
  }

  //user更新処理
  async updateUser(
    userId: string,
    param: UserUpdateRequestDto,
  ): Promise<UserResponseDto> {
    const origin = await this._userRepository.findOne(userId);
    if (!origin) throw new NotFoundException();
    const user = await this._userRepository.save({
      ...origin,
      ...param,
    });
    return { user };
  }
}
