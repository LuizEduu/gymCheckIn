import { beforeEach, describe, expect, it } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/infra/repositories/in-memory/in-memory-users-repository'
import { UsersRepository } from '@/infra/repositories/users-repository'
import { GetUserProfileUseCase } from './get-user-profile'
import { ResourceNotFoundError } from '../../../errors/resource-not-found'

let usersRepository: UsersRepository
let sut: GetUserProfileUseCase

describe('Get User Profile Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new GetUserProfileUseCase(usersRepository)
  })

  it('shoud be able to return a user profile', async () => {
    const createdUser = await usersRepository.create({
      email: 'johndoe@example.com',
      name: 'John Doe',
      password_hash: await hash('any_password', 6),
    })

    const { user } = await sut.execute({
      userId: createdUser.id,
    })

    expect(user).toHaveProperty('id')
    expect(user.id).toEqual(createdUser.id)
    expect(user.email).toEqual('johndoe@example.com')
  })

  it('shoud not be able to return a user profile with not exists', async () => {
    await expect(
      sut.execute({
        userId: 'not-exists-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
