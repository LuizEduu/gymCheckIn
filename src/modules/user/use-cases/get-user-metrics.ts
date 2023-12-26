import { GetUserMetricsRequestDTO } from '../dto/get-user-metrics-request-DTO'
import { CheckInsRepository } from '@/infra/repositories/check-ins-repository'

interface GetUserMetricsUseCaseResponse {
  checkInsCount: number
}

export class GetUserMetricsUseCase {
  constructor(private readonly checkInsRepository: CheckInsRepository) {}

  async execute({
    userId,
  }: GetUserMetricsRequestDTO): Promise<GetUserMetricsUseCaseResponse> {
    const checkInsCount = await this.checkInsRepository.countByUserId(userId)

    return {
      checkInsCount,
    }
  }
}
