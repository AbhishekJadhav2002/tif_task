import express from "express";
import roleRouter from "./role.routes";
import userRouter from "./user.routes";
import communityRouter from "./community.routes";
import { errorController, healthCheckController, notFoundController } from "../../controllers/index.controllers";

const router = express.Router();

router
  .get("/", healthCheckController)
  .use("/role", roleRouter)
  .use("/auth", userRouter)
  .use('/community', communityRouter)
  .use("*", notFoundController)
  .use(errorController);

export default router;