import { z } from 'zod'

export const clientSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.email(),
  phone: z.string().nullable(),
  tags: z.array(z.string()),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})
export type Client = z.infer<typeof clientSchema>

export const createClientSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  email: z.email('E-mail inválido'),
  phone: z.string().optional(),
  tags: z.array(z.string()).default([]),
})
export type CreateClientInput = z.infer<typeof createClientSchema>

export const updateClientSchema = createClientSchema.partial()
export type UpdateClientInput = z.infer<typeof updateClientSchema>

export const tagSummarySchema = z.object({
  tag: z.string(),
  count: z.number(),
})
export type TagSummary = z.infer<typeof tagSummarySchema>
