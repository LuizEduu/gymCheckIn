import fastify from 'fastify'

import { userRoutes } from './infra/http/routes/user.routes'
import { globalErrorHandler } from './infra/http/errors/global-error-handler'

export const app = fastify({
  logger: true,
})

app.register(userRoutes)

app.setErrorHandler(globalErrorHandler)
