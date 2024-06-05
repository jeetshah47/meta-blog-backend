import { ConfigModule } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [ConfigModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
