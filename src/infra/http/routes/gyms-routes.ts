import { FastifyInstance } from 'fastify'
import { verifyJWT } from '../middlewares/verify-jwt'
import { create } from '../controllers/gyms/create'
import { search } from '../controllers/gyms/search'
import { nearby } from '../controllers/gyms/nearby'

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.post('/gyms', create)

  app.get('/gyms/search', search)
  app.get('/gyms/nearby', nearby)
}
