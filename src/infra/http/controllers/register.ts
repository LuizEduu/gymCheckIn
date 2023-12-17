import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { RegisterUseCase } from '@/use-cases/register'
import { PrismaUsersRepository } from '@/repositories/prisma-users-repository'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, email, password } = registerBodySchema.parse(request.body)

  const registerUseCase = new RegisterUseCase(new PrismaUsersRepository())

  await registerUseCase.execute({
    name,
    email,
    password,
  })

  return reply.status(201).send()
}
