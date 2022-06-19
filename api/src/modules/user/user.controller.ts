import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiExtraModels,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ApiErrorResponse } from 'src/common/decoraters';
import {
  CommonResponse,
  CreatedResponse,
  NotFoundResponse,
  OkResponse,
  UnAuthorizedResponse,
} from 'src/common/types/response';
import { UserCreateRequestDto } from './dto/user-create.request.dto';
import { UserUpdateRequestDto } from './dto/user-update.request.dto';
import { UserResponseDto } from './dto/user.response.dto';
import { UsersResponseDto } from './dto/users.response.dto';
import { UserService } from './user.service';

@ApiTags('users')
@Controller('users')
@ApiExtraModels(ApiUnauthorizedResponse, NotFoundException)
@ApiErrorResponse(UnAuthorizedResponse)
@ApiErrorResponse(NotFoundResponse)
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @Post()
  async createUser(
    @Body() param: UserCreateRequestDto,
  ): Promise<CommonResponse> {
    const responseData: UserResponseDto = await this._userService.createUser(
      param,
    );

    return new CreatedResponse(responseData);
  }

  @Get()
  async getUsers(): Promise<CommonResponse> {
    const responseData: UsersResponseDto = await this._userService.getUsers();

    return new OkResponse(responseData);
  }

  @Get(':userId')
  async getUser(@Param('userId') userId: string): Promise<CommonResponse> {
    const responseData: UserResponseDto = await this._userService.findUser(
      userId,
    );

    return new OkResponse(responseData);
  }

  @Put(':userId')
  async updateUser(
    @Param('userId') userId: string,
    @Body() param: UserUpdateRequestDto,
  ): Promise<CommonResponse> {
    const responseData: UserResponseDto = await this._userService.updateUser(
      userId,
      param,
    );

    return new OkResponse(responseData);
  }
}
