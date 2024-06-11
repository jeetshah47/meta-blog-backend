export interface UserResponse {
  users: { [index: string]: { name: string } };
}

export interface UserRequest {
  name: string;
  email: string;
  profileImg?: string;
  id?: string;
}
