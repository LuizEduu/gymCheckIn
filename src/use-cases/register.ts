import { prisma } from '@/lib/prisma'
import { PrismaUsersRepository } from '@/repositories/prisma-users-repository'
import { hash } from 'bcryptjs'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

export async function registerUseCase({
  name,
  email,
  password,
}: RegisterUseCaseRequest) {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (user) {
    throw new Error('user already exists.')
  }

  const passwordHash = await hash(password, 6)

  const userRepository = new PrismaUsersRepository()

  await userRepository.create({
    name,
    email,
    password_hash: passwordHash,
  })
}
