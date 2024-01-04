import { GymsRepository } from '@/infra/repositories/gyms-repository'
import { Gym } from '@prisma/client'
import { CreateGymRequestDTO } from '../dto/create-gym-request-DTO'

interface CreateGymUseCaseResponse {
  gym: Gym
}

export class CreateGymUseCase {
  constructor(private readonly gymsRepository: GymsRepository) {}

  async execute({
    title,
    description,
    phone,
    latitude,
    longitude,
  }: CreateGymRequestDTO): Promise<CreateGymUseCaseResponse> {
    const gym = await this.gymsRepository.create({
      title,
      description,
      phone,
      latitude,
      longitude,
    })

    return {
      gym,
    }
  }
}
