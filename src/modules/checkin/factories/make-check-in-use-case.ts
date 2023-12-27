import { PrismaCheckInsRepository } from '@/infra/repositories/prisma/prisma-check-ins-repository'
import { CheckInUseCase } from '../use-cases/check-in'
import { PrismaGymsRepository } from '@/infra/repositories/prisma/prisma-gyms-repository'

export function makeCheckInUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const gymsRepository = new PrismaGymsRepository()

  return new CheckInUseCase(checkInsRepository, gymsRepository)
}
