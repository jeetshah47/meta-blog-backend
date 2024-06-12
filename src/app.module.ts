import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './core/users/users.module';
import { GateWayModule } from './gateway/gateway.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.local'],
    }),
    AuthModule,
    UserModule,
    GateWayModule,
  ],
})
export class AppModule {}
