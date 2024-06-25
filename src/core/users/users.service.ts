import { Injectable } from '@nestjs/common';
import { UserResponse } from './interface/UserResponse';
import {
  readData,
  updateData,
  writeData,
} from 'src/framework/firebase/db.firebase';
import { CreateUserDto } from './dto/users.dto';
import { sha256 } from 'src/auth/utils/encryptor';

@Injectable()
export class UsersService {
  async geAllUsers(): Promise<UserResponse> {
    const data = await readData('users');
    console.log(await sha256('jeetshahlast@gmail.com'));
    return {
      users: { ...data },
    };
  }

  async checkUser(email: string) {
    const userId = await sha256(email);
    const user = await readData('users', userId);
    if (user) {
      console.log(user);
      return true;
    } else return userId;
  }

  async addUsers(user: CreateUserDto) {
    const userId = await this.checkUser(user.email);
    if (userId === true) {
      console.log(userId);
      return {
        message: 'User already exist with given email',
      };
    } else {
      writeData(
        'users',
        { ...user, isGithubAuth: false, isGoogleAuth: false },
        userId,
      );
      return {
        data: {
          message: 'Successfully Added Data',
        },
      };
    }
  }

  updateUser(user: Partial<CreateUserDto>, userId: string) {
    updateData('users', user, userId);
  }
}
