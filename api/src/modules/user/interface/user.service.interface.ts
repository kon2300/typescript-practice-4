import { UserCreateRequestDto } from '../dto/user-create.request.dto';
import { UserUpdateRequestDto } from '../dto/user-update.request.dto';
import { UserResponseDto } from '../dto/user.response.dto';
import { UsersResponseDto } from '../dto/users.response.dto';

export interface IUserService {
  createUser(param: UserCreateRequestDto): Promise<UserResponseDto>;
  getUsers(): Promise<UsersResponseDto>;
  findUser(userId: string): Promise<UserResponseDto>;
  updateUser(
    userId: string,
    param: UserUpdateRequestDto,
  ): Promise<UserResponseDto>;
}
