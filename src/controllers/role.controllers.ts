import { NextFunction, Request, Response } from "express";
import RoleModel from "../models/role/role.model";
import {
    CreateRoleInput, FilterQueryInput,
} from "../models/role/role.schema";

export const createRoleController = async (
    req: Request<{}, {}, CreateRoleInput>,
    res: Response,
    next: NextFunction
) => {
    try {
        const { name } = req.body;

        const role = await RoleModel.create({
            name
        });

        res.status(201).json({
            status: "success",
            content: {
                role
            },
        });
    } catch (error: any) { next(error) }
};

export const getRolesController = async (
    req: Request<{}, {}, FilterQueryInput>,
    res: Response,
    next: NextFunction
) => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const skip = (page - 1) * limit;

        const roles = await RoleModel.findAll({ limit, offset: skip });

        res.status(200).json({
            status: "success",
            content: {
                meta: {
                    page,
                    limit,
                    total: roles.length
                },
                data: roles
            },
        });
    } catch (error: any) { next(error) }
};