export interface User {
  id: string;
  username: string;
  nickname: string;
  password: string;
}

export type PublicUser = Omit<User, "password">;
