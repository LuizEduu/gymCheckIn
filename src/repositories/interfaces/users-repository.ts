import { Prisma, User } from '@prisma/client'

type findByEmailResponse = {
  id: string
  email: string
}

export interface UsersRepository {
  create(data: Prisma.UserCreateInput): Promise<User>
  findByEmail(email: string): Promise<findByEmailResponse | null>
}
