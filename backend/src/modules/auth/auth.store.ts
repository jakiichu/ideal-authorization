export interface User {
    id: string
    email: string
    passwordHash: string
}

export const users = new Map<string, User>()
