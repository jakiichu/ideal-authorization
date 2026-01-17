import { users, User } from './auth.store'
import { hashPassword, comparePassword } from '../../utils/hash'
import { randomUUID } from 'crypto'

export async function registerUser(
    email: string,
    password: string
): Promise<User> {
    if (users.has(email)) {
        throw new Error('User already exists')
    }

    const user: User = {
        id: randomUUID(),
        email,
        passwordHash: await hashPassword(password)
    }

    users.set(email, user)
    return user
}

export async function loginUser(
    email: string,
    password: string
): Promise<User> {
    const user = users.get(email)
    if (!user) throw new Error('Invalid credentials')

    const valid = await comparePassword(password, user.passwordHash)
    if (!valid) throw new Error('Invalid credentials')

    return user
}
