import { OAuth2Client } from 'google-auth-library';

const CLIENT_ID =
  '890754458041-8r52f28o6i58fa6ghg9j0gknnvu51ccn.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URL = 'http://localhost:3000/api/auth/google/callback';

export const oauth2Client = new OAuth2Client({
  clientId: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  redirectUri: REDIRECT_URL,
});

const scopes = [
  'https://www.googleapis.com/auth/userinfo.profile',
  'https://www.googleapis.com/auth/userinfo.email',
];

export const authUrl = oauth2Client.generateAuthUrl({
  scope: scopes,
});

interface GoogleReponse {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  locale: string;
}

export const getAuthCallBack = async (code: string) => {
  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    const userInfo = await oauth2Client.request<GoogleReponse>({
      url: 'https://www.googleapis.com/oauth2/v1/userinfo',
    });
    console.log(userInfo?.data);

    return userInfo.data;
  } catch (error) {
    console.log('Eror');
  }
};

export const getAuthUrl = () => {
  return { url: authUrl };
};
