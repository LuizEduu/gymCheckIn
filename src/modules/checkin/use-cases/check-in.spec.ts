import { CheckInsRepository } from '@/infra/repositories/check-ins-repository'
import { describe, it, beforeEach, expect, vi, afterEach } from 'vitest'
import { CheckInUseCase } from './check-in'
import { InMemoryCheckInsRepository } from '@/infra/repositories/in-memory/in-memory-check-ins-repository'
import { UsersRepository } from '@/infra/repositories/users-repository'
import { InMemoryUsersRepository } from '@/infra/repositories/in-memory/in-memory-users-repository'
import { InMemoryGymsRepository } from '@/infra/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'

let checkInsRepository: CheckInsRepository
let gymsRepository: InMemoryGymsRepository
let usersRepository: UsersRepository
let sut: CheckInUseCase

describe('CheckIn Use Case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInUseCase(checkInsRepository, gymsRepository)
    usersRepository = new InMemoryUsersRepository()

    gymsRepository.gyms.push({
      description: 'gym_description',
      id: 'gym_id',
      latitude: new Decimal(-8.1231872),
      longitude: new Decimal(-35.2780288),
      phone: 'gym_phonenumber',
      title: 'gym_title',
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to create a new check in', async () => {
    const user = await usersRepository.create({
      email: 'johndoe@example.com',
      name: 'John Doe',
      password_hash: 'any_hash',
    })

    const { checkIn } = await sut.execute({
      gymId: 'gym_id',
      userId: user.id,
      userLatitude: -8.1231872,
      userLongitude: -35.2780288,
    })

    expect(checkIn).toHaveProperty('id')
    expect(checkIn.id).toEqual(expect.any(String))
    expect(checkIn.user_id).toEqual(user.id)
  })

  it('shoud not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId: 'gym_id',
      userId: 'user_id',
      userLatitude: -8.1231872,
      userLongitude: -35.2780288,
    })

    await expect(
      sut.execute({
        gymId: 'gym_id',
        userId: 'user_id',
        userLatitude: -8.1231872,
        userLongitude: -35.2780288,
      }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('shoud be able to check in twice but in different days', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId: 'gym_id',
      userId: 'user_id',
      userLatitude: -8.1231872,
      userLongitude: -35.2780288,
    })

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))

    const { checkIn } = await sut.execute({
      gymId: 'gym_id',
      userId: 'user_id',
      userLatitude: -8.1231872,
      userLongitude: -35.2780288,
    })

    expect(checkIn).toHaveProperty('id')
    expect(checkIn.gym_id).toEqual('gym_id')
    expect(checkIn.user_id).toEqual('user_id')
  })

  it('should not be able to check in on a distant gym', async () => {
    gymsRepository.gyms.push({
      description: 'gym_description-2',
      id: 'gym_id02',
      latitude: new Decimal(-8.1136705),
      longitude: new Decimal(-35.2555412),
      phone: 'gym_phonenumber2',
      title: 'gym_title2',
    })

    await expect(
      sut.execute({
        gymId: 'gym_id02',
        userId: 'user_id',
        userLatitude: -8.1231872,
        userLongitude: -35.2780288,
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
