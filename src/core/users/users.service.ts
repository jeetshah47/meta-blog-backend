import { Injectable } from '@nestjs/common';
import { UserResponse } from './interface/UserResponse';
import {
  readData,
  updateData,
  writeData,
} from 'src/framework/firebase/db.firebase';
import { CreateUserDto } from './dto/users.dto';

@Injectable()
export class UsersService {
  geAllUsers(): UserResponse {
    readData('users');
    return {
      users: {
        sd: {
          name: 'Jeert',
        },
      },
    };
  }
  addUsers(user: CreateUserDto) {
    writeData('users', user, user.name);
  }
  updateUser(user: Partial<CreateUserDto>, userId: string) {
    updateData('users', user, userId);
  }
}
