import { Controller, Get, Query, Redirect } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleAuthRequest } from './interfaces/GoogleAuth';

@Controller('api/auth/google')
export class GoogleRedirectController {
  constructor(private readonly appService: AuthService) {}
  @Get('')
  getHello(): GoogleAuthRequest {
    return this.appService.getGoogleAuthUrl();
  }
  @Get('callback')
  @Redirect()
  async getLog(@Query('code') code: string) {
    const url = await this.appService.getGoogleRedirect(code);
    return { url: url.url };
  }
}

@Controller('api/auth/login')
export class AuthController {
  constructor(private readonly appService: AuthService) {}
  @Get('')
  getResponse(): { status: number } {
    return { status: 200 };
  }
}
