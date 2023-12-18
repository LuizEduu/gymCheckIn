import { describe, expect, it } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/infra/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from '@/modules/user/errors/user-already-exists-error'

describe('register use case', () => {
  it('shoud hash user password upon registration', async () => {
    const registerUseCase = new RegisterUseCase(new InMemoryUsersRepository())

    const { user } = await registerUseCase.execute({
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
    const registerUseCase = new RegisterUseCase(new InMemoryUsersRepository())

    const email = 'johndoe@test.com'

    await registerUseCase.execute({
      name: 'John Doe',
      email,
      password: '1123456789',
    })

    await expect(() =>
      registerUseCase.execute({
        name: 'John Doe',
        email,
        password: '1123456789',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })

  it('shoud be able to register', async () => {
    const registerUseCase = new RegisterUseCase(new InMemoryUsersRepository())

    const { user } = await registerUseCase.execute({
      name: 'John Doe',
      email: 'johndoe@test.com',
      password: '1123456789',
    })

    expect(user).toHaveProperty('id')
    expect(user.id).toEqual(expect.any(String))
  })
})
