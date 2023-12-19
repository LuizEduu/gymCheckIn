import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { makeAuthenticateUseCase } from '@/modules/user/use-cases/factories/make-authenticate-use-case'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = authenticateBodySchema.parse(request.body)

  const authenticateUseCase = makeAuthenticateUseCase()

  await authenticateUseCase.execute({
    email,
    password,
  })

  return reply.status(200).send()
}
