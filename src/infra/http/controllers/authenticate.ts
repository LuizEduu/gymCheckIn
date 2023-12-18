import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { RegisterUseCase } from '@/modules/user/use-cases/register'
import { PrismaUsersRepository } from '@/infra/repositories/prisma/prisma-users-repository'
import { AuthenticateUseCase } from '@/modules/user/use-cases/authenticate'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = authenticateBodySchema.parse(request.body)

  const authenticateUseCase = new AuthenticateUseCase(
    new PrismaUsersRepository(),
  )

  await authenticateUseCase.execute({
    email,
    password,
  })

  return reply.status(200).send()
}
