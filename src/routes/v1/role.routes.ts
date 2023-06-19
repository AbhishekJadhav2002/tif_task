import express from "express";
import { createRoleSchema, filterQuery } from "../../models/role/role.schema";
import { validate } from "../../middleware";
import { createRoleController, getRolesController } from "../../controllers/role.controllers";

const roleRouter = express.Router();

roleRouter
    .route("/")
    .get(validate(filterQuery), getRolesController)
    .post(validate(createRoleSchema), createRoleController)

export default roleRouter;