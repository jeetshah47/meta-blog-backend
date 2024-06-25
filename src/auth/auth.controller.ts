import { Body, Controller, Get, Post, Query, Redirect } from '@nestjs/common';
import {
  GoogleAuthService,
  GithubAuthService,
  CoreAuthService,
} from './auth.service';
import { GoogleAuthRequest } from './interfaces/GoogleAuth';
import { User } from 'src/core/users/interface/UserResponse';
import { AuthUserDto } from './dto/auth.dto';

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

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: CoreAuthService) {}
  @Post('login')
  async getJwtToken(
    @Body() userData: AuthUserDto,
  ): Promise<{ access_token: string; user: User }> {
    const data = await this.authService.signIn(
      userData.email,
      userData.password,
    );
    return { ...data };
  }
}
