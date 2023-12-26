export interface CreateGymRequestDTO {
  title: string
  description: string | null
  phone: string | null
  latitude: number
  longitude: number
}
