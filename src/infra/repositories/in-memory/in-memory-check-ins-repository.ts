import { CheckIn, Prisma } from '@prisma/client'
import { CheckInsRepository } from '../check-ins-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryCheckInsRepository implements CheckInsRepository {
  public checkIns: CheckIn[] = []

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn: CheckIn = {
      id: randomUUID(),
      created_at: new Date(),
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
      user_id: data.user_id,
      gym_id: data.gym_id,
    }

    this.checkIns.push(checkIn)

    return checkIn
  }
}