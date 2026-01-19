import Fastify from 'fastify'
import cookie from '@fastify/cookie'
import authPlugin from './plugins/auth'
import jwtPlugin from './plugins/jwt'
import {authRoutes} from "./modules/auth/auth.routes";
import corsPlugin from './plugins/cors'


function buildApp() {
    const app = Fastify({logger: true})

    app.register(cookie)

    app.register(jwtPlugin)
    app.register(authPlugin)
    app.register(corsPlugin)


    app.register(authRoutes, {prefix: '/auth'})


    return app
}

export {buildApp}
