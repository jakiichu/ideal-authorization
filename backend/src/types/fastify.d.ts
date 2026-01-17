import 'fastify'

declare module 'fastify' {
    interface FastifyInstance {
        auth: (
            request: import('fastify').FastifyRequest,
            reply: import('fastify').FastifyReply
        ) => Promise<void>
        signRefreshToken: (payload: { id: string, email: string }) => string
    }
}
