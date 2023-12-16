import fastify from 'fastify'

import { userRoutes } from './infra/http/routes/user.routes'

export const app = fastify()

app.register(userRoutes)
