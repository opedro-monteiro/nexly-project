export interface Client {
  id: string
  name: string
  email: string
  phone: string | null
  tags: string[]
  createdAt: Date
  updatedAt: Date
}
