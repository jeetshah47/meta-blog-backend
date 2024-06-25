import { Injectable, UnauthorizedException } from '@nestjs/common';
import { getAuthCallBack, getAuthUrl } from './utils/google';
import { GoogleAuthRequest } from './interfaces/GoogleAuth';
import appConfig from 'src/config/app.config';
import axios from 'axios';
import { GithubOAuthResponse } from './interfaces/GithubAuth';
import { writeData } from 'src/framework/firebase/db.firebase';
import { UsersService } from 'src/core/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/core/users/interface/UserResponse';

@Injectable()
export class CoreAuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    email: string,
    password: string,
  ): Promise<{ access_token: string; user: User }> {
    const user = await this.userService.findOneUser(email);

    if (!user || user.password.toString() !== password.toString()) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.email, name: user.name };

    return {
      access_token: await this.jwtService.signAsync(payload),
      user: user,
    };
  }
}

@Injectable()
export class GoogleAuthService {
  constructor(private readonly userService: UsersService) {}
  getGoogleAuthUrl(): GoogleAuthRequest {
    const fetchUrl = getAuthUrl();
    return { url: fetchUrl.url };
  }
  async getGoogleRedirect(code: string): Promise<{ url: string }> {
    try {
      const data = await getAuthCallBack(code);
      if (data?.id) {
        const userId = await this.userService.checkUser(data.email);

        const user = {
          name: data.name,
          email: data.email,
          profileImg: data.picture,
          isGithubAuth: false,
          isGoogleAuth: true,
        };
        let redirecUrl = '';
        if (userId === true) {
          redirecUrl = `http://localhost:5173/id=return`;
        } else {
          writeData('users', user, userId);
          redirecUrl = `http://localhost:5173/id=${userId}`;
        }
        return { url: redirecUrl };
      }
    } catch (error) {
      console.log(error);
      return { url: 'http://localhost:5173/auth/login' };
    }
  }
}

@Injectable()
export class GithubAuthService {
  constructor(private readonly userService: UsersService) {}
  getGithubAuthUrl() {
    const url = `https://github.com/login/oauth/authorize?scope=user:email&client_id=${appConfig().githubClient}`;
    return { url: url };
  }

  async getGithubRedirect(code: string) {
    try {
      // Logic For Access Token
      const userData = await axios.post(
        'https://github.com/login/oauth/access_token',
        {
          client_id: appConfig().githubClient,
          client_secret: appConfig().githubSecret,
          code: code,
        },
      );
      const access_token = userData.data.split('&')[0].split('=')[1];
      console.log(access_token);

      //Logic For User Data

      const userResult = await axios.get<GithubOAuthResponse>(
        'https://api.github.com/user',
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        },
      );

      const userId = await this.userService.checkUser(userResult.data.email);
      console.log('userId', userId);

      const user = {
        name: userResult.data.name,
        email: userResult.data.email,
        profileImg: userResult.data.avatar_url,
        isGithubAuth: true,
        isGoogleAuth: false,
      };
      let redirecUrl = '';
      if (userId === true) {
        redirecUrl = `http://localhost:5173/?id=return`;
      } else {
        writeData('users', user, userId);
        redirecUrl = `http://localhost:5173/?id=${userResult.data.id}`;
      }
      console.log(redirecUrl);

      return { url: redirecUrl };
    } catch (error) {
      console.log(error);
      return { error: 'Fault ' };
    }
  }
}
