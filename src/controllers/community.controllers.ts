import { NextFunction, Request, Response } from "express";
import { CreateCommunityInput } from "../models/community/community.schema";
import { FilterQueryInput } from "../models/role/role.schema";
import CommunityModel from "../models/community/community.model";
import RoleModel from "../models/role/role.model";
import MemberModel from "../models/member/member.model";
import UserModel from "../models/user/user.model";

export const createCommunityController = async (
    req: Request<{}, {}, CreateCommunityInput>,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id } = req.user;
        const slug = req.body.name.toLowerCase().split(' ').join('_');
        const community = await CommunityModel.create({
            ...req.body,
            slug,
            owner: id
        });

        const role = await RoleModel.findOne({ name: 'Community Admin', id });

        const member = await MemberModel.create({
            community: community.id,
            user: id,
            role: role.id
        });

        res.status(201).json({
            status: true,
            content: {
                data: community,
            },
        });
    } catch (error: any) {
        next(error)
    }
};

export const getAllCommunityController = async (
    req: Request<{}, {}, FilterQueryInput>,
    res: Response,
    next: NextFunction
) => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const skip = (page - 1) * limit;

        const communities = await CommunityModel.findAll({
            include: [
                {
                    model: UserModel,
                    as: 'owner',
                    attributes: ['id', 'name'],
                    required: true,
                }
            ],
            limit,
            offset: skip
        });

        res.status(200).json({
            status: true,
            content: {
                data: communities,
                meta: {
                    page,
                    limit,
                    total: communities.length
                }
            },
        });

    } catch (error: any) {
        next(error)
    }
};
