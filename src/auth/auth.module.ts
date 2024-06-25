import { ConfigModule } from '@nestjs/config';
import {
  AuthController,
  GithubAuthController,
  GoogleRedirectController,
} from './auth.controller';
import {
  CoreAuthService,
  GithubAuthService,
  GoogleAuthService,
} from './auth.service';
import { Module } from '@nestjs/common';
import { UsersService } from 'src/core/users/users.service';
import { JwtModule } from '@nestjs/jwt';
import appConfig from 'src/config/app.config';
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig],
      isGlobal: true,
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      global: true,
      useFactory: async () => ({
        signOptions: { expiresIn: '1h' },
        secret: appConfig().jwtSecret,
      }),
    }),
  ],
  controllers: [GoogleRedirectController, GithubAuthController, AuthController],
  providers: [
    GoogleAuthService,
    GithubAuthService,
    UsersService,
    CoreAuthService,
  ],
})
export class AuthModule {}
