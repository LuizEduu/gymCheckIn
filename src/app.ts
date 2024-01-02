import fastify from 'fastify'

import { userRoutes } from './infra/http/routes/user.routes'
import { globalErrorHandler } from './infra/http/errors/global-error-handler'
import fastifyJwt from '@fastify/jwt'
import { env } from './env'

export const app = fastify({
  logger: true,
})

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})

app.register(userRoutes)

app.setErrorHandler(globalErrorHandler)
