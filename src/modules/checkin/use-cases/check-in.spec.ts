import { CheckInsRepository } from '@/infra/repositories/check-ins-repository'
import { describe, it, beforeEach, expect } from 'vitest'
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
})
