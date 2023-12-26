import { UsersRepository } from '@/infra/repositories/users-repository'
import { InvalidCredentialsError } from '../../../errors/invalid-credentials-error'
import { compare } from 'bcryptjs'
import { User } from '@prisma/client'
import { AuthenticateRequestDTO } from '../dto/authenticate-request-DTO'

interface AuthenticateUseCaseResponse {
  user: User
}

export class AuthenticateUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateRequestDTO): Promise<AuthenticateUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatches = await compare(password, user.password_hash)

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    return {
      user,
    }
  }
}
