import { Gym, Prisma } from '@prisma/client'
import { SearchManyNearbyParamsDTO } from './dto/search-many-nearby-params-DTO'

export interface GymsRepository {
  findById(id: string): Promise<Gym | null>
  create(data: Prisma.GymCreateInput): Promise<Gym>
  searchMany(query: string, page: number): Promise<Gym[]>
  searchManyNearby({
    latitude,
    longitude,
  }: SearchManyNearbyParamsDTO): Promise<Gym[]>
}
