import { GymsRepository } from '@/infra/repositories/gyms-repository'
import { Gym } from '@prisma/client'
import { SearchGymsRequestDTO } from '../dto/search-gyms-request-DTO'

interface SearchGymsUseCaseResponse {
  gyms: Gym[]
}

export class SearchGymsUseCase {
  constructor(private readonly gymsRepository: GymsRepository) {}

  async execute({
    query,
    page,
  }: SearchGymsRequestDTO): Promise<SearchGymsUseCaseResponse> {
    const gyms = await this.gymsRepository.searchMany(query, page)

    return {
      gyms,
    }
  }
}
