import { ConfigModule } from '@nestjs/config';
import {
  AuthController,
  GithubAuthController,
  GoogleRedirectController,
} from './auth.controller';
import { GithubAuthService, GoogleAuthService } from './auth.service';
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { UsersService } from 'src/core/users/users.service';

@Module({
  imports: [ConfigModule, HttpModule],
  controllers: [GoogleRedirectController, GithubAuthController, AuthController],
  providers: [GoogleAuthService, GithubAuthService, UsersService],
})
export class AuthModule {}
