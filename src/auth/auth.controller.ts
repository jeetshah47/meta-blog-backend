import { Controller, Get, Query, Redirect } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleAuthRequest } from './interfaces/GoogleAuth';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly appService: AuthService) {}
  @Get('google')
  getHello(): GoogleAuthRequest {
    return this.appService.getGoogleAuthUrl();
  }
  @Get('google/callback')
  @Redirect()
  async getLog(@Query('code') code: string) {
    const url = await this.appService.getGoogleRedirect(code);
    return { url: url.url };
  }
}

@Controller()
export class GoogleRedirectController {
  constructor(private readonly appService: AuthService) {}
}
