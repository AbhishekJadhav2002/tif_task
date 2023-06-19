import express from "express";
import { auth, validate } from "../../middleware";
import { createCommunitySchema } from "../../models/community/community.schema";
import { createCommunityController, getAllCommunityController } from "../../controllers/community.controllers";
import { filterQuery } from "../../models/role/role.schema";

const communityRouter = express.Router();

communityRouter
    .route("/")
    .get(validate(filterQuery), getAllCommunityController)
    .post(validate(createCommunitySchema), auth, createCommunityController)

export default communityRouter;