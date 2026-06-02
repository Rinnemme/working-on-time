import type { User, PublicUser } from "../types/user";

export function sanitizeUser(user: User): PublicUser {
  return {
    id: user.id,
    username: user.username,
    nickname: user.nickname,
  };
}
