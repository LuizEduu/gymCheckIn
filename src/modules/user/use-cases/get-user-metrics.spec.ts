import { beforeEach, describe, expect, it } from 'vitest'
import { CheckInsRepository } from '@/infra/repositories/check-ins-repository'
import { GetUserMetricsUseCase } from './get-user-metrics'
import { InMemoryCheckInsRepository } from '@/infra/repositories/in-memory/in-memory-check-ins-repository'

let checkInsRepository: CheckInsRepository
let sut: GetUserMetricsUseCase

describe('Get User Metrics Use Case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new GetUserMetricsUseCase(checkInsRepository)
  })

  it('shoud be able to return check-ins count from metrics', async () => {
    await checkInsRepository.create({
      user_id: 'user-id',
      gym_id: 'gym-id1',
    })

    const { checkInsCount } = await sut.execute({
      userId: 'user-id',
    })

    expect(checkInsCount).toEqual(1)
  })

  it('shoud be able to return a check ins count zero if user not check ins', async () => {
    const { checkInsCount } = await sut.execute({
      userId: 'user-id',
    })

    expect(checkInsCount).toEqual(0)
  })
})
