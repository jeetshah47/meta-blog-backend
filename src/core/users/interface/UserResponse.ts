export interface UserResponse {
  users: {
    [index: string]: {
      name: string;
      email: string;
      id?: number;
      profileImg?: string;
      isGithubAuth?: boolean;
      isGoogleAuth?: boolean;
    };
  };
}

export interface UserRequest {
  name: string;
  email: string;
  profileImg?: string;
  id?: string;
}
