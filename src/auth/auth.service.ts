import { Injectable } from '@nestjs/common';
import { getAuthCallBack, getAuthUrl } from './utils/google';
import { GoogleAuthRequest } from './interfaces/GoogleAuth';

@Injectable()
export class AuthService {
  getGoogleAuthUrl(): GoogleAuthRequest {
    const fetchUrl = getAuthUrl();
    return { url: fetchUrl.url };
  }
  async getGoogleRedirect(code: string): Promise<{ url: string }> {
    const data = await getAuthCallBack(code);
    if (data?.id) {
      return { url: `http://localhost:5173/?id=${data.id}` };
    } else {
      return { url: 'http://localhost:5173' };
    }
  }
}
