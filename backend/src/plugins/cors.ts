import fp from 'fastify-plugin'
import cors from '@fastify/cors'

const ALLOWED_ORIGINS = new Set([
    'http://localhost:5173',
    'http://127.0.0.1:5173'
])

export default fp(async (app) => {
    app.register(cors, {
        origin: (origin, cb) => {
            // для curl / postman (у них нет origin)
            if (!origin) {
                cb(null, true)
                return
            }

            if (ALLOWED_ORIGINS.has(origin)) {
                cb(null, true)
            } else {
                cb(new Error('Not allowed by CORS'), false)
            }
        },
        credentials: true
    })
})
