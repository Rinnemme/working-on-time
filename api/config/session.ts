import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import { pool } from "../db/pool";

const PgSession = connectPgSimple(session);

const isProduction =
  process.env.VERCEL_ENV === "production" ||
  process.env.APP_ENV === "production";

export const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET || "dev-secret",
  resave: false,
  saveUninitialized: false,
  proxy: true,
  cookie: {
    sameSite: isProduction ? "none" : "lax",
    secure: isProduction,
    httpOnly: true,
  },
  store: new PgSession({
    pool,
    tableName: "user_sessions",
    createTableIfMissing: true,
  }),
});
