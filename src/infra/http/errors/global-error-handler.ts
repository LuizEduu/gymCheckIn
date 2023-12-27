import { env } from '@/env'
import { InvalidCredentialsError } from '@/errors/invalid-credentials-error'
import { LateCheckInValidationError } from '@/errors/late-check-in-validation-error'
import { MaxDistanceError } from '@/errors/max-distance-error'
import { MaxNumbersOfCheckInError } from '@/errors/max-number-of-check-ins-error'
import { ResourceNotFoundError } from '@/errors/resource-not-found'
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

  if (error instanceof InvalidCredentialsError) {
    return reply.status(401).send({ message: error.message })
  }

  if (error instanceof LateCheckInValidationError) {
    return reply.status(422).send({ message: error.message })
  }

  if (error instanceof MaxDistanceError) {
    return reply.status(422).send({ message: error.message })
  }

  if (error instanceof MaxNumbersOfCheckInError) {
    return reply.status(422).send({ message: error.message })
  }

  if (error instanceof ResourceNotFoundError) {
    return reply.status(404).send({ message: error.message })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  }

  return reply.status(500).send({ message: 'internal server error.' })
}
