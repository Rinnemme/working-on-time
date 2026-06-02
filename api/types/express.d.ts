import type { User } from "./user";

declare global {
  namespace Express {
    interface User {
      id: string;
      username: string;
      nickname: string;
      password: string;
    }
  }
}
