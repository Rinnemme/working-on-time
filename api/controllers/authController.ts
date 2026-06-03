import type { RequestHandler } from "express";
import passport from "passport";
import bcrypt from "bcryptjs";

import { pool } from "../db/pool";
import { sanitizeUser } from "../utils/sanitizeUser";
import type { User } from "../types/user";

export const getCurrentUser: RequestHandler = (req, res) => {
  if (!req.isAuthenticated() || !req.user) {
    res.status(401).json({
      message: "Log in first!",
    });
    return;
  }

  const user = req.user as User;

  res.status(200).json(sanitizeUser(user));
};

export const logIn: RequestHandler = (req, res, next) => {
  passport.authenticate(
    "local",
    (err: any, user: User | false, info: { message?: string }) => {
      if (err) {
        next(err);
        return;
      }

      if (!user) {
        res.status(401).json({
          message: info?.message || "Authentication failed",
        });
        return;
      }

      req.logIn(user, (err) => {
        if (err) {
          next(err);
          return;
        }

        res.status(200).json(sanitizeUser(user));
      });
    },
  )(req, res, next);
};

export const logOut: RequestHandler = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      next(err);
      return;
    }

    res.status(200).json({
      message: "Successfully logged out",
    });
  });
};

export const signUp: RequestHandler = async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    await pool.query(
      "INSERT INTO users (username, nickname, password) VALUES ($1, $2, $3)",
      [req.body.username, req.body.nickname, hashedPassword],
    );

    res.status(201).json({
      message: "Success!",
    });
  } catch (err) {
    next(err);
  }
};
