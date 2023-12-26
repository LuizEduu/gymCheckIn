import { UsersRepository } from '@/infra/repositories/users-repository'
import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from '../../../errors/user-already-exists-error'
import { User } from '@prisma/client'
import { RegisterUseCaseRequestDTO } from '../dto/registerRequestDTO'

interface RegisterUseCaseResponse {
  user: User
}

export class RegisterUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute({
    email,
    name,
    password,
  }: RegisterUseCaseRequestDTO): Promise<RegisterUseCaseResponse> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email)

    if (userAlreadyExists) {
      throw new UserAlreadyExistsError()
    }

    const passwordHash = await hash(password, 6)

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash: passwordHash,
    })

    return {
      user,
    }
  }
}
