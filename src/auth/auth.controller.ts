import { Controller, Get, Query, Redirect } from '@nestjs/common';
import { GoogleAuthService, GithubAuthService } from './auth.service';
import { GoogleAuthRequest } from './interfaces/GoogleAuth';

@Controller('api/auth/google')
export class GoogleRedirectController {
  constructor(private readonly appService: GoogleAuthService) {}
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

@Controller('api/auth/github')
export class GithubAuthController {
  constructor(private readonly appService: GithubAuthService) {}
  @Get('')
  getAuthUrl() {
    return this.appService.getGithubAuthUrl();
  }
  @Get('callback')
  @Redirect()
  async getGithubCallback(@Query('code') code: string) {
    const url = await this.appService.getGithubRedirect(code);
    return { url: url.url };
  }
}

@Controller('api/auth/login')
export class AuthController {
  constructor(private readonly appService: GoogleAuthService) {}
  @Get('')
  getResponse(): { status: number } {
    return { status: 200 };
  }
}
