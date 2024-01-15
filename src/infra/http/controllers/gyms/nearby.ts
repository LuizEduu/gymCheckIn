import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { makeSearchNearbyGymsUseCase } from '@/modules/gym/use-cases/factories/make-search-nearby-gyms-use-case'

export async function nearby(request: FastifyRequest, reply: FastifyReply) {
  const searchGymsNearbyQuerySchema = z.object({
    latitude: z.coerce.number(),
    longitude: z.coerce.number(),
  })

  const { latitude, longitude } = searchGymsNearbyQuerySchema.parse(
    request.query,
  )

  const searchNearbyGymsUseCase = makeSearchNearbyGymsUseCase()

  const { gyms } = await searchNearbyGymsUseCase.execute({
    userLatitude: latitude,
    userLongitude: longitude,
  })

  return reply.status(200).send({
    gyms,
  })
}
