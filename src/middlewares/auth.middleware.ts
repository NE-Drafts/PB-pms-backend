import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import prisma from "../prisma/prisma-client";
import ServerResponse from "../helpers/serverResponse";

export const checkLoggedIn: any = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(" ")[1]
        if (!token) return ServerResponse.unauthenticated(res, "You are not logged in")
        const response = jwt.verify(token, process.env.JWT_SECRET_KEY as string, {})
        if (!response) return ServerResponse.unauthenticated(res, "You are not logged in")
        next()
    }
    catch (error) {
        return ServerResponse.error(res, "Internal server error 500.")
    }
}

export const checkAdmin: any = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(" ")[1]
        if (!token) return ServerResponse.unauthorized(res, "You are not an admin")
        const response = await jwt.verify(token, process.env.JWT_SECRET_KEY as string, {})
        if (!response) return ServerResponse.unauthorized(res, "You are not an admin")
        const user = await prisma.user.findUnique({ where: { id: (response as any).id } })
        if (!user) return ServerResponse.unauthorized(res, "You are not logged in")
        if (user.role != "ADMIN") return ServerResponse.unauthorized(res, "You're not allowed to access this resource")
        next()
    }
    catch (error) {
        console.log(error);
        return ServerResponse.error(res, "Internal server error 500.")
    }
}