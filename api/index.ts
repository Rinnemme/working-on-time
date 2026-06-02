import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import passport from "./config/passport";
import { sessionMiddleware } from "./config/session";

import authRoutes from "./routes/auth";
import taskRoutes from "./routes/tasks";
import projectRoutes from "./routes/projects";

const app = express();

app.enable("trust proxy");

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3001",
    credentials: true,
  }),
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(sessionMiddleware);

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);
app.use("/my-projects", projectRoutes);

app.listen(process.env.PORT, () => {
  console.log(`connected on ${process.env.PORT}`);
});
