import { GymsRepository } from '@/infra/repositories/gyms-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryGymsRepository } from '@/infra/repositories/in-memory/in-memory-gyms-repository'
import { SearchGymsUseCase } from './search-gyms'

let gymsRepository: GymsRepository
let sut: SearchGymsUseCase

describe('Search Gyms Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymsUseCase(gymsRepository)
  })

  it('shoud be able to return a gym filter with query', async () => {
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
      query: 'gym_title',
      page: 1,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ id: expect.any(String) }),
      expect.objectContaining({ id: expect.any(String) }),
    ])
  })

  it('shoud be able to return a gym filter with query and page 1', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `gym_title_${i}`,
        latitude: -8.1231872,
        longitude: -35.2780288,
        description: 'gym_description',
        phone: 'gym_phone',
      })
    }

    await gymsRepository.create({
      title: `second_gym`,
      latitude: -8.1231872,
      longitude: -35.2780288,
      description: 'gym_description',
      phone: 'gym_phone',
    })

    const { gyms } = await sut.execute({
      query: 'second',
      page: 1,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
      expect.objectContaining({ title: expect.stringContaining('second') }),
    ])
  })

  it('shoud be able to return a gym filter with query and page 2', async () => {
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
  })
})
