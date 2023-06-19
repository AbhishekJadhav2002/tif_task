import { NextFunction, Request, Response } from "express";
import UserModel from "../models/user/user.model";
import { createHash, createToken } from "../services/hashing.services";
import { SignInInput, SignUpInput } from "../models/user/user.schema";

export const signupController = async (
    req: Request<{}, {}, SignUpInput>,
    res: Response,
    next: NextFunction
) => {
    try {
        const { name, email, password } = req.body;

        const passwordHash = createHash(password, undefined).join('#');

        const user = await UserModel.create({
            name, email, password: passwordHash
        });

        user.password = undefined;

        const access_token = await createToken({ id: user.id })

        res.status(201).json({
            status: true,
            content: {
                data: user,
                meta: {
                    access_token
                }
            },
        });
    } catch (error: any) {
        if (error.name === "SequelizeUniqueConstraintError") {
            error.message = "Email already exists";
            error.statusCode = 409;
        }
        next(error)
    }
};

export const loginController = async (
    req: Request<{}, {}, SignInInput>,
    res: Response,
    next: NextFunction
) => {
    try {
        const { email, password } = req.body;

        const user = await UserModel.findOne({
            where: { email },
        });

        if (!user) {
            const error: any = new Error("Email or password is incorrect");
            error.statusCode = 401;
            throw error;
        }

        const [salt, ...passwordHashParts] = user.password.split('#');
        const passwordHash = passwordHashParts.join('#');

        const isPasswordMatch = createHash(password, salt)[1].slice(0, -33) === passwordHash;

        if (!isPasswordMatch) {
            const error: any = new Error("Email or password is incorrect");
            error.statusCode = 401;
            throw error;
        }

        user.password = undefined;

        const access_token = await createToken({ id: user.id })
        req.session.token = access_token

        res.status(200).json({
            status: true,
            content: {
                data: user,
                meta: {
                    access_token
                }
            },
        });
    } catch (error: any) {
        next(error)
    }
};

export const meController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const user = await UserModel.findByPk(req.user.id, {
            attributes: {
                exclude: ["password"],
            },
        });

        if (!user) {
            const error: any = new Error("User not found");
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({
            status: true,
            content: {
                data: user,
            },
        });
    } catch (error: any) {
        next(error)
    }
};