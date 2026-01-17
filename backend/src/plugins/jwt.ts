import fp from 'fastify-plugin'
import jwt from '@fastify/jwt'
import env from '../config/env'

export default fp(async (app) => {
    app.register(jwt, {
        secret: env.JWT_ACCESS_SECRET
    })

    app.decorate('signRefreshToken', (payload: { id: string, email: string }) => {
        return app.jwt.sign(payload, {
            expiresIn: '7d',
        } )
    })
})
