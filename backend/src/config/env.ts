import 'dotenv/config'

const env = {
    PORT: Number(process.env.PORT),
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET!,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET!
}

export default env
