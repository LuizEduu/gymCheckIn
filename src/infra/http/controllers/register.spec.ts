import request from 'supertest'
import { app } from '@/app'

import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Register (e2e)', () => {
  it('shoud be able to register', async () => {
    beforeAll(async () => {
      await app.ready()
    })

    afterAll(async () => {
      await app.close()
    })

    const response = await request(app.server).post('/users').send({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '1234567',
    })

    expect(response.statusCode).toEqual(201)
    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        name: 'John Doe',
        email: 'johndoe@example.com',
        password_hash: expect.any(String),
        created_at: expect.any(Date),
      }),
    )
  })
})
