import { PrismaGymsRepository } from '@/infra/repositories/prisma/prisma-gyms-repository'
import { SearchNearbyGymsUseCase } from '../search-nearby-gyms'

export function makeSearchNearbyGymsUseCase() {
  const gymsRepository = new PrismaGymsRepository()

  return new SearchNearbyGymsUseCase(gymsRepository)
}
