import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { makeRegisterUseCase } from '@/modules/user/use-cases/factories/make-register-use-case'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, email, password } = registerBodySchema.parse(request.body)

  const registerUseCase = makeRegisterUseCase()

  await registerUseCase.execute({
    name,
    email,
    password,
  })

  return reply.status(201).send()
}
