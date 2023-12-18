import { env } from '@/env'
import { UserAlreadyExistsError } from '@/errors/user-already-exists-error'
import { FastifyError, FastifyRequest, FastifyReply } from 'fastify'
import { ZodError } from 'zod'

export async function globalErrorHandler(
  error: FastifyError,
  _: FastifyRequest,
  reply: FastifyReply,
) {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'validation error.', issues: error.format() })
  }

  if (error instanceof UserAlreadyExistsError) {
    return reply.status(409).send({ message: error.message })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  }

  return reply.status(500).send({ message: 'internal server error.' })
}
