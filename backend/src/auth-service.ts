export interface ForAuthManagement {
    hashPassword: (password: string) => Promise<string>
    verifyPassword: (entry: string, password: string) => Promise<boolean>
    createToken: (tokenInfo: any) => Promise<string>
}

export class AuthService {
    static async hashPassword(password: string) {
        return password + 'hash'
    }
    static async verifyPassword(entry: string, password: string) {
        const passwordHashed = entry + 'hash'
        return password === passwordHashed
    }
    static async createToken(tokenInfo: any) {
        return 'token'
    }
}