import { buildApp } from './app'
import env from './config/env'

const app = buildApp()

app.listen({ port: env.PORT, host: '0.0.0.0' }, () => {
    console.log(`🚀 Backend on ${env.PORT}`)
})
