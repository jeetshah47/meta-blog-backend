import { ConfigModule } from '@nestjs/config';
import { AuthController, GoogleRedirectController } from './auth.controller';
import { AuthService } from './auth.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [ConfigModule],
  controllers: [GoogleRedirectController, AuthController],
  providers: [AuthService],
})
export class AuthModule {}
