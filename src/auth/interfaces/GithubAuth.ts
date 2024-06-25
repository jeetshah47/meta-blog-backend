export interface GithubOAuthResponse {
  login: string;
  id: number;
  avatar_url: string;
  url: string;
  type: string;
  name: string;
  email: string;
  bio: string;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}
