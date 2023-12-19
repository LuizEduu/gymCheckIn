import { beforeEach, describe, expect, it } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/infra/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from '@/modules/user/errors/user-already-exists-error'
import { UsersRepository } from '@/infra/repositories/users-repository'

let usersRepository: UsersRepository
let sut: RegisterUseCase

describe('register use case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(usersRepository)
  })

  it('shoud hash user password upon registration', async () => {
    const { user } = await sut.execute({
      name: 'john doe',
      email: 'johndoe.@test.com',
      password: '123456789',
    })

    const isPasswordCorrectlyHashed = await compare(
      '123456789',
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('shoud not be able to register with same email twice', async () => {
    const email = 'johndoe@test.com'

    await sut.execute({
      name: 'John Doe',
      email,
      password: '1123456789',
    })

    await expect(() =>
      sut.execute({
        name: 'John Doe',
        email,
        password: '1123456789',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })

  it('shoud be able to register', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@test.com',
      password: '1123456789',
    })

    expect(user).toHaveProperty('id')
    expect(user.id).toEqual(expect.any(String))
  })
})
