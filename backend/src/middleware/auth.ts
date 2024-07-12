import { AuthService } from "@src/auth-service"
import { NextFunction, Request, Response } from "express"

export const AuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization) return res.status(401).send()
    const token = req.headers.authorization.split(' ')[1]
    const user = await AuthService.decodeToken(token)
    if (!user) {
        return res.status(401).send()
    }
    req.app.locals = { user }
    next()
}