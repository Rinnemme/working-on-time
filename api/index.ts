import { Application, Request, Response } from "express";
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");
const LocalStrategy = require("passport-local");
const bcrypt = require("bcryptjs");
const taskRoutes = require("./routes/tasks");
const projectRoutes = require("./routes/projects");
const { pool } = require("./db/pool");
require("dotenv").config();

const app: Application = express();

app.use(
  session({
    secret: "TimeTestedSecret",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors({ origin: ["http://localhost:3001"], credentials: true }));
app.use(
  cors({
    origin: ["https://working-on-time-api.vercel.app"],
    credentials: true,
  })
);

app.use("/tasks", taskRoutes);
app.use("/my-projects", projectRoutes);

app.get("/", (req: Request, res: Response) => {
  if (req.user) {
    res.status(200).json(req.user);
  } else res.status(400).send({ message: "Log in first!" });
});

app.get("/authentication-failed", (req: Request, res: Response) => {
  res.status(401).send({ message: "Username or password is incorrect." });
});

app.post(
  "/log-in",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/authentication-failed",
    failureMessage: true,
  })
);

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
            [req.body.username, req.body.nickname, hashedPassword]
          );
          res.status(200).send({ message: "Success!" });
        } catch (err) {
          res.status(400).send(err);
        }
      }
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
        [username]
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
  })
);

passport.serializeUser((user: any, done: any) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: any, done: any) => {
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
