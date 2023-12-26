import { CheckInsRepository } from '@/infra/repositories/check-ins-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { FetchUserCheckInsHistoryUseCase } from './fetch-user-check-ins-history'
import { InMemoryCheckInsRepository } from '@/infra/repositories/in-memory/in-memory-check-ins-repository'

let checkInsRepository: CheckInsRepository
let sut: FetchUserCheckInsHistoryUseCase

describe('Fetch User CheckIns History Use Case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new FetchUserCheckInsHistoryUseCase(checkInsRepository)
  })

  it('shoud be able to fetch paginated check-ins history with page 1', async () => {
    await checkInsRepository.create({
      user_id: 'user-id',
      gym_id: 'gym-id1',
    })

    await checkInsRepository.create({
      user_id: 'user-id',
      gym_id: 'gym-id2',
    })

    const { checkIns } = await sut.execute({
      userId: 'user-id',
      page: 1,
    })

    expect(checkIns).toBeInstanceOf(Array)
    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 'gym-id1' }),
      expect.objectContaining({ gym_id: 'gym-id2' }),
    ])
  })

  it('shoud be able to fetch paginated check-ins history with page 2', async () => {
    for (let i = 1; i <= 22; i++) {
      await checkInsRepository.create({
        user_id: 'user-id',
        gym_id: `gym-id${i}`,
      })
    }

    const { checkIns } = await sut.execute({
      userId: 'user-id',
      page: 2,
    })

    expect(checkIns).toBeInstanceOf(Array)
    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 'gym-id21' }),
      expect.objectContaining({ gym_id: 'gym-id22' }),
    ])
  })

  it('shoud be able to fetch check-ins history with is empty', async () => {
    const { checkIns } = await sut.execute({
      userId: 'user-id',
      page: 1,
    })

    expect(checkIns).toBeInstanceOf(Array)
    expect(checkIns).toEqual([])
    expect(checkIns.length).toEqual(0)
  })
})
