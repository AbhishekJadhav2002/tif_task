import { NextFunction, Request, Response } from 'express';
import rateLimit, { Options } from 'express-rate-limit';

const apiRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    message: 'Too many request created from this IP, please try again after 15 minutes',
    handler: (_: Request, __: Response, next: NextFunction, options: Options) => next(options.message),
    keyGenerator(req: Request) {
        return req.headers['x-forwarded-for'] as string || req.ip;
    }
})

export default apiRateLimiter;