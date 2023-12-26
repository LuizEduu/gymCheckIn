import { UsersRepository } from '@/infra/repositories/users-repository'
import { User } from '@prisma/client'
import { ResourceNotFoundError } from '../../../errors/resource-not-found'
import { GetUserProfileRequestDTO } from '../dto/get-user-profile-request-DTO'

interface GetUserProfileUseCaseResponse {
  user: User
}

export class GetUserProfileUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute({
    userId,
  }: GetUserProfileRequestDTO): Promise<GetUserProfileUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    return {
      user,
    }
  }
}
