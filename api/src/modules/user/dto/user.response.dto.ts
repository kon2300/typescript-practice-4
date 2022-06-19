import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/database/entities/user.entity';

export class UserResponseDto {
  @ApiProperty()
  user: User;
}
