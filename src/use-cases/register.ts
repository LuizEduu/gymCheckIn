import { UsersRepository } from '@/repositories/interfaces/users-repository'
import { hash } from 'bcryptjs'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

export class RegisterUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute({ name, email, password }: RegisterUseCaseRequest) {
    const user = await this.usersRepository.findByEmail(email)

    if (user) {
      throw new Error('user already exists.')
    }

    const passwordHash = await hash(password, 6)

    await this.usersRepository.create({
      name,
      email,
      password_hash: passwordHash,
    })
  }
}
