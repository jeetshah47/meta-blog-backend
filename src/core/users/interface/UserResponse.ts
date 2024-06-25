export interface UserResponse {
  users: {
    [index: string]: User;
  };
}

export interface User {
  name: string;
  email: string;
  id?: number;
  profileImg?: string;
  isGithubAuth?: boolean;
  isGoogleAuth?: boolean;
  password?: string;
}

export interface UserRequest {
  name: string;
  email: string;
  profileImg?: string;
  id?: string;
  password: string;
}
