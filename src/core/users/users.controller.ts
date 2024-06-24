import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/users.dto';

@Controller('/api/users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('/all')
  getAllUsers() {
    this.userService.geAllUsers();
  }
  @Post('/create')
  addMultipleUsers(@Body() createUser: CreateUserDto) {
    this.userService.addUsers(createUser);
  }
  @Put('/update/:userId')
  updateUser(
    @Param('userId') userId: string,
    @Body() updateUser: Partial<CreateUserDto>,
  ) {
    this.userService.updateUser(updateUser, userId);
  }
}
