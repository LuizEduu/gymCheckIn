import { CheckInsRepository } from '@/infra/repositories/check-ins-repository'
import { describe, it, beforeEach, expect, vi, afterEach } from 'vitest'
import { CheckInUseCase } from './check-in'
import { InMemoryCheckInsRepository } from '@/infra/repositories/in-memory/in-memory-check-ins-repository'
import { UsersRepository } from '@/infra/repositories/users-repository'
import { InMemoryUsersRepository } from '@/infra/repositories/in-memory/in-memory-users-repository'

let checkInsRepository: CheckInsRepository
let usersRepository: UsersRepository
let sut: CheckInUseCase

describe('CheckIn Use Case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new CheckInUseCase(checkInsRepository)
    usersRepository = new InMemoryUsersRepository()

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
      gymId: 'any_id',
      userId: user.id,
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
    })

    await expect(
      sut.execute({
        gymId: 'gym_id',
        userId: 'user_id',
      }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('shoud not be able to check in twice but in different days', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId: 'gym_id',
      userId: 'user_id',
    })

    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    const { checkIn } = await sut.execute({
      gymId: 'gym_id',
      userId: 'user_id',
    })

    expect(checkIn).toHaveProperty('id')
    expect(checkIn.id).toEqual(expect.any(String))
  })
})
