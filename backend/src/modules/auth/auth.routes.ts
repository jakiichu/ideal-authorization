import {FastifyInstance} from 'fastify'
import {loginUser, registerUser} from './auth.service'

export async function authRoutes(app: FastifyInstance) {
    // REGISTER
    app.post('/register', async (request, reply) => {
        const {email, password} = request.body as {
            email: string
            password: string
        }

        try {
            const user = await registerUser(email, password)

            return {
                id: user.id,
                email: user.email
            }
        } catch (e) {
            reply.code(400).send({message: (e as Error).message})
        }
    })

    // LOGIN
    app.post('/login', async (request, reply) => {
        const {email, password} = request.body as {
            email: string
            password: string
        }

        try {
            const user = await loginUser(email, password)

            const accessToken = app.jwt.sign(
                {id: user.id, email: user.email},
                {expiresIn: '15m'}
            )

            const refreshToken = app.signRefreshToken({id: user.id, email: user.email})

            reply.setCookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: false, // true в production
                sameSite: 'lax',
                path: '/',
                maxAge: 7 * 24 * 60 * 60
            })

            return {accessToken, id: user.id, email: user.email}
        } catch {
            reply.code(401).send({message: 'Invalid credentials'})
        }
    })

    app.post('/refresh', async (request, reply) => {
        const refreshToken = request.cookies.refreshToken

        if (!refreshToken) {
            return reply.code(401).send({message: 'No refresh token'})
        }

        try {
            const payload = app.jwt.verify<{ id: string }>(
                refreshToken
            )

            const accessToken = app.jwt.sign(
                {
                    id: payload.id,
                    email: request.user?.email // может быть undefined, это ок
                },
                {expiresIn: '1d'}
            )

            reply.setCookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: false, // true в production
                sameSite: 'lax',
                path: '/',
                maxAge: 7 * 24 * 60 * 60
            })

            return {accessToken}
        } catch {
            reply.code(401).send({message: 'Invalid refresh token'})
        }
    })


    // ME (protected)
    app.get(
        '/me',
        {preHandler: [app.auth]},
        async (request) => {
            return {id: request.user.id, email: request.user.email}
        }
    )

    app.post('/logout', async (_, reply) => {
        reply.clearCookie('refreshToken', {
            path: '/auth/refresh'
        })

        return {message: 'Logged out'}
    })

}
