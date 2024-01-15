import fastify from 'fastify'

import { userRoutes } from './infra/http/routes/users-routes'
import { gymsRoutes } from './infra/http/routes/gyms-routes'
import { globalErrorHandler } from './infra/http/errors/global-error-handler'
import fastifyJwt from '@fastify/jwt'
import fastifyCookie from '@fastify/cookie'
import { env } from './env'
import { checkInsRoutes } from './infra/http/routes/check-ins-routes'

export const app = fastify({
  logger: true,
})

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  sign: {
    expiresIn: '10m',
  },
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
})

app.register(fastifyCookie)

app.register(userRoutes)
app.register(gymsRoutes)
app.register(checkInsRoutes)

app.setErrorHandler(globalErrorHandler)
