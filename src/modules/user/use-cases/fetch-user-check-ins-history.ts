import { CheckInsRepository } from '@/infra/repositories/check-ins-repository'
import { GymsRepository } from '@/infra/repositories/gyms-repository'
import { ResourceNotFoundError } from '@/errors/resource-not-found'
import { CheckIn } from '@prisma/client'
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates'

interface FetchUserCheckInsHistoryUseCaseResponse {
  checkIn: CheckIn
}

export class FetchUserCheckInsHistoryUseCase {
  constructor(private readonly checkInsRepository: CheckInsRepository) {}

  async execute({
    gymId,
    userId,
    userLatitude,
    userLongitude,
  }: CheckInRequestDTO): Promise<FetchUserCheckInsHistoryUseCaseResponse> {
    const gym = await this.gymsRepository.findById(gymId)

    if (!gym) {
      throw new ResourceNotFoundError()
    }

    const distanceInKilometers = getDistanceBetweenCoordinates(
      {
        latitude: userLatitude,
        longitude: userLongitude,
      },
      {
        latitude: gym.latitude.toNumber(),
        longitude: gym.longitude.toNumber(),
      },
    )

    const MAX_DISTANCE_IN_KILOMETERS = 0.1

    if (distanceInKilometers > MAX_DISTANCE_IN_KILOMETERS) {
      throw new Error()
    }

    const checkInOnSameDay = await this.checkInsRepository.findByUserIdOnDate(
      userId,
      new Date(),
    )

    if (checkInOnSameDay) {
      throw new Error()
    }

    const checkIn = await this.checkInsRepository.create({
      user_id: userId,
      gym_id: gymId,
    })

    return {
      checkIn,
    }
  }
}
