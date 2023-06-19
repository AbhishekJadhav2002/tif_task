import { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../services/hashing.services';
import UserModel from '../models/user/user.model';

async function auth(req: Request, _: Response, next: NextFunction) {
    try {
        const { token } = req.session
        if (!token) {
            throw new Error('Unauthorized')
        }
        const decoded = await verifyToken(token)
        if (!decoded) throw new Error('Unauthorized')
        const user = await UserModel.findByPk(decoded.id, {
            attributes: {
                exclude: ["password"],
            }
        })
        if (!user) throw new Error('Unauthorized')
        req.user = { ...user, id: user.id }
        next()
    } catch (error) { next(error) }
}

export default auth;