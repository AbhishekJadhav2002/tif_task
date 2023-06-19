import express, { Express } from "express";
import cors from "cors";
import { validate } from "./validate.middlewares";
import sessionStore from "../services/session.services";
import apiRateLimiter from "./rateLimiter.middlewares";
import auth from "./auth.middlewares";

export default function defaultMiddlewares(server: Express) {
  server.use([
    apiRateLimiter,
    express.json({ limit: "10kb" }),
    cors({
      origin: [process.env.CLIENT_URL as string || "http://localhost:3000"],
      credentials: true,
    }),
    sessionStore(),
  ]);

  return server
}

export { validate, auth };