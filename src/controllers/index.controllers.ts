import { Request, Response } from "express";

export const healthCheckController = (req: Request, res: Response) => {
    res.status(200).json({
        status: "success",
        content: {
            data: {
                message: "Hello World",
            },
        },
    });
}

export const notFoundController = (req: Request, res: Response) => {
    res.status(404).json({
        status: "error",
        content: {
            message: "Not Found",
        },
    });
}

export const errorController = (err: any, req: Request, res: Response) => {
    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
        status: "error",
        message: err?.message,
    });
}