import { GymsRepository } from '@/infra/repositories/gyms-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateGymUseCase } from './create-gym'
import { InMemoryGymsRepository } from '@/infra/repositories/in-memory/in-memory-gyms-repository'

let gymsRepository: GymsRepository
let sut: CreateGymUseCase

describe('Create Gym Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymUseCase(gymsRepository)
  })

  it('shoud be able to create a gym', async () => {
    const { gym } = await sut.execute({
      title: 'gym_title',
      latitude: -8.1231872,
      longitude: -35.2780288,
      description: 'gym_description',
      phone: 'gym_phone',
    })

    expect(gym).toHaveProperty('id')
    expect(gym.latitude.toNumber()).toEqual(-8.1231872)
    expect(gym.longitude.toNumber()).toEqual(-35.2780288)
  })
})
