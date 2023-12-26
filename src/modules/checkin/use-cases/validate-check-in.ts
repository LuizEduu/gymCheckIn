import { CheckInsRepository } from '@/infra/repositories/check-ins-repository'
import { ValidateCheckInRequestDTO } from '../dto/validate-check-in-request-DTO'
import { CheckIn } from '@prisma/client'
import { ResourceNotFoundError } from '@/errors/resource-not-found'

interface ValidateCheckInUseCaseResponse {
  checkIn: CheckIn
}

export class ValidateCheckInUseCase {
  constructor(private readonly checkInsRepository: CheckInsRepository) {}

  async execute({
    checkInId,
  }: ValidateCheckInRequestDTO): Promise<ValidateCheckInUseCaseResponse> {
    const checkIn = await this.checkInsRepository.findById(checkInId)

    if (!checkIn) {
      throw new ResourceNotFoundError()
    }

    checkIn.validated_at = new Date()

    await this.checkInsRepository.save(checkIn)

    return {
      checkIn,
    }
  }
}
