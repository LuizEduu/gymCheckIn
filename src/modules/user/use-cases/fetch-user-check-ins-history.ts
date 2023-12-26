import { CheckInsRepository } from '@/infra/repositories/check-ins-repository'
import { CheckIn } from '@prisma/client'
import { FetchUserRequestDTO } from '../dto/fetch-user-request-DTO'

interface FetchUserCheckInsHistoryUseCaseResponse {
  checkIns: CheckIn[]
}

export class FetchUserCheckInsHistoryUseCase {
  constructor(private readonly checkInsRepository: CheckInsRepository) {}

  async execute({
    userId,
    page,
  }: FetchUserRequestDTO): Promise<FetchUserCheckInsHistoryUseCaseResponse> {
    const checkIns = await this.checkInsRepository.findManyByUserId(
      userId,
      page,
    )

    return {
      checkIns,
    }
  }
}
