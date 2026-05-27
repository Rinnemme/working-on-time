require("dotenv").config();
import { Application, Request, Response } from "express";
const express = require("express");
const session = require("express-session");
const MemoryStore = require("memorystore")(session);
const passport = require("passport");
const cors = require("cors");
const LocalStrategy = require("passport-local");
const bcrypt = require("bcryptjs");
const taskRoutes = require("./routes/tasks");
const projectRoutes = require("./routes/projects");
const bodyParser = require("body-parser");
const { pool } = require("./db/pool");

const app: Application = express();

app.enable("trust proxy");

app.use(
  cors({
    origin: "http://localhost:3001",
    credentials: true,
  }),
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    secret: "TimeTestedSecret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      sameSite: "lax",
      secure: false,
      httpOnly: true,
    },
    store: new MemoryStore({
      checkPeriod: 86400000,
    }),
  }),
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/tasks", taskRoutes);
app.use("/my-projects", projectRoutes);

app.get("/", (req: Request, res: Response) => {
  if (req.isAuthenticated()) {
    res.status(200).json(req.user);
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

        return res.status(200).json({
          id: user.id,
          username: user.username,
          nickname: user.nickname,
        });
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
    bcrypt.hash(
      req.body.password,
      10,
      async (err: Error, hashedPassword: String) => {
        try {
          await pool.query(
            "INSERT INTO users (username, nickname, password) VALUES ($1, $2, $3)",
            [req.body.username, req.body.nickname, hashedPassword],
          );
          res.status(200).send({ message: "Success!" });
        } catch (err) {
          res.status(400).send(err);
        }
      },
    );
  } catch (err) {
    return next(err);
  }
});

passport.use(
  new LocalStrategy(async (username: String, password: String, done: any) => {
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

interface User {
  id: string;
  username: string;
  nickname: string;
  password: string;
}

passport.serializeUser((user: User, done: any) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: string, done: any) => {
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
