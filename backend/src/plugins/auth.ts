import fp from 'fastify-plugin'
import {FastifyInstance, FastifyReply, FastifyRequest} from "fastify";

export default fp(async (app: FastifyInstance) => {
    app.decorate(
        'auth',
        async (request: FastifyRequest, reply: FastifyReply) => {
            try {
                await request.jwtVerify()
            } catch {
                reply.code(401).send({ message: 'Unauthorized' })
            }
        }
    )
})

