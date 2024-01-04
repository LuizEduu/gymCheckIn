import { GymsRepository } from '@/infra/repositories/gyms-repository'
import { Gym } from '@prisma/client'
import { SearchNearbyGymsRequestDTO } from '../dto/search-nearby-gyms-request-DTO'

interface SearchNearbyGymsResponse {
  gyms: Gym[]
}

export class SearchNearbyGymsUseCase {
  constructor(private readonly gymsRepository: GymsRepository) {}

  async execute({
    userLatitude,
    userLongitude,
  }: SearchNearbyGymsRequestDTO): Promise<SearchNearbyGymsResponse> {
    const gyms = await this.gymsRepository.searchManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
    })

    return {
      gyms,
    }
  }
}
