import express from "express";
import { auth, validate } from "../../middleware";
import { signinSchema, signupSchema } from "../../models/user/user.schema";
import { loginController, meController, signupController } from "../../controllers/user.controller";

const userRouter = express.Router();

userRouter
    .post('/signup', validate(signupSchema), signupController)
    .post('/signin', validate(signinSchema), loginController)
    .get('/me', auth, meController)

export default userRouter;