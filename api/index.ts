import dotenv from "dotenv";
dotenv.config();

import express, { Application, Request, Response, NextFunction } from "express";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import passport from "passport";
import cors from "cors";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcryptjs";
import { Pool } from "pg";

import taskRoutes from "./routes/tasks";
import projectRoutes from "./routes/projects";

interface User {
  id: string;
  username: string;
  nickname: string;
  password: string;
}

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

const app: Application = express();

const pool = new Pool({
  connectionString: process.env.CONNECTION_STRING,
  ssl: {
    rejectUnauthorized: false,
  },
});

const PgSession = connectPgSimple(session);

const sanitizeUser = (user: User) => ({
  id: user.id,
  username: user.username,
  nickname: user.nickname,
});

app.enable("trust proxy");

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3001",
    credentials: true,
  }),
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const isProduction =
  process.env.VERCEL_ENV === "production" ||
  process.env.APP_ENV === "production";

app.use(
  session({
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
  }),
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/tasks", taskRoutes);
app.use("/my-projects", projectRoutes);

app.get("/", (req: Request, res: Response) => {
  if (req.isAuthenticated()) {
    res.status(200).json(sanitizeUser(req.user));
  } else res.status(401).send({ message: "Log in first!" });
});

app.get("/authentication-failed", (req: Request, res: Response) => {
  res.status(401).send({ message: "Username or password is incorrect." });
});

app.post("/log-in", (req, res, next) => {
  passport.authenticate(
    "local",
    (err: any, user: User | false, info: { message?: string }) => {
      if (err) {
        return next(err);
      }

      if (!user) {
        return res.status(401).json({
          message: info?.message || "Authentication failed",
        });
      }

      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }

        return res.status(200).json(sanitizeUser(user));
      });
    },
  )(req, res, next);
});

app.post("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.status(200).send({ message: "Successfully logged out" });
  });
});

app.post("/sign-up", async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    await pool.query(
      "INSERT INTO users (username, nickname, password) VALUES ($1, $2, $3)",
      [req.body.username, req.body.nickname, hashedPassword],
    );

    res.status(201).json({ message: "Success!" });
  } catch (err) {
    next(err);
  }
});

passport.use(
  new LocalStrategy(async (username: string, password: string, done: any) => {
    try {
      const { rows } = await pool.query(
        "SELECT * FROM users WHERE username = $1",
        [username],
      );
      const user = rows[0];

      if (!user) {
        return done(null, false, {
          message: "A user with this username does not exist",
        });
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return done(null, false, { message: "Incorrect password" });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }),
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [
      id,
    ]);
    const user = rows[0];

    done(null, user);
  } catch (err) {
    done(err);
  }
});

app.listen(process.env.PORT, () => {
  console.log("connected");
});
