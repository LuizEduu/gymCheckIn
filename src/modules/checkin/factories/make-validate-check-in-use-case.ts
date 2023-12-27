import { PrismaCheckInsRepository } from '@/infra/repositories/prisma/prisma-check-ins-repository'
import { ValidateCheckInUseCase } from '../use-cases/validate-check-in'

export function makeValidateCheckInUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository()

  return new ValidateCheckInUseCase(checkInsRepository)
}
