import { GymsRepository } from '@/infra/repositories/gyms-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryGymsRepository } from '@/infra/repositories/in-memory/in-memory-gyms-repository'
import { SearchNearbyGymsUseCase } from './search-nearby-gyms'

let gymsRepository: GymsRepository
let sut: SearchNearbyGymsUseCase

describe('Search Nearby Gyms Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchNearbyGymsUseCase(gymsRepository)
  })

  it('shoud be able search nearby gyms', async () => {
    await gymsRepository.create({
      title: 'gym_title',
      latitude: -8.1231872,
      longitude: -35.2780288,
      description: 'gym_description',
      phone: 'gym_phone',
    })

    await gymsRepository.create({
      title: 'gym_title2',
      latitude: -8.1231872,
      longitude: -35.2780288,
      description: 'gym_description2',
      phone: 'gym_phone2',
    })

    const { gyms } = await sut.execute({
      userLatitude: -8.1231872,
      userLongitude: -35.2780288,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ id: expect.any(String) }),
      expect.objectContaining({ id: expect.any(String) }),
    ])
  })

  it('shoud be able to return a empty list with user location is bigger minimun distance', async () => {
    await gymsRepository.create({
      title: `longer_gym`,
      latitude: -8.118639,
      longitude: -35.0933146,
      description: 'gym_description',
      phone: 'gym_phone',
    })

    await gymsRepository.create({
      title: `longer_gym`,
      latitude: -8.118639,
      longitude: -35.0933146,
      description: 'gym_description',
      phone: 'gym_phone',
    })

    const { gyms } = await sut.execute({
      userLatitude: -8.1231872,
      userLongitude: -35.2780288,
    })

    expect(gyms).toHaveLength(0)
    expect(gyms).toEqual([])
  })

  /* it('shoud be able to return a gym filter with query and page 2', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `gym_title_${i}`,
        latitude: -8.1231872,
        longitude: -35.2780288,
        description: 'gym_description',
        phone: 'gym_phone',
      })
    }

    const { gyms } = await sut.execute({
      query: 'gym_title',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({
        title: expect.stringContaining('gym_title_21'),
      }),
      expect.objectContaining({
        title: expect.stringContaining('gym_title_22'),
      }),
    ])
  })  */
})
