import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export interface ForAuthManagement {
    hashPassword: (password: string) => Promise<string>
    verifyPassword: (entry: string, password: string) => Promise<boolean>
    generateToken: (tokenInfo: any) => Promise<string>
    decodeToken: (token: string) => Promise<any>
}

export class AuthService {
    static async hashPassword(password: string) {
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)
        return hash
    }
    static async verifyPassword(entry: string, password: string) {
        return bcrypt.compare(entry, password)
    }
    static async generateToken(tokenInfo: any) {
        return jwt.sign(tokenInfo, process.env.JWT_SECRET ?? "secret")
    }
    static async decodeToken(token: string) {
        return jwt.verify(token, process.env.JWT_SECRET ?? "secret")
    }
}