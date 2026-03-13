import { z } from 'zod'
import { SendStatus } from '../../enums'

export const sendSchema = z.object({
  id: z.string(),
  clientId: z.string(),
  campaignId: z.string(),
  status: z.nativeEnum(SendStatus),
  sentAt: z.coerce.date().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})
export type Send = z.infer<typeof sendSchema>

export const createSendSchema = z.object({
  clientId: z.string().min(1, 'clientId é obrigatório'),
  campaignId: z.string().min(1, 'campaignId é obrigatório'),
})
export type CreateSendInput = z.infer<typeof createSendSchema>

export const updateSendSchema = z.object({
  status: z.nativeEnum(SendStatus).optional(),
  sentAt: z.coerce.date().optional(),
})
export type UpdateSendInput = z.infer<typeof updateSendSchema>

export const sendHistoryItemSchema = z.object({
  id: z.string(),
  clientName: z.string(),
  name: z.string(),
  channel: z.string(),
  targetTags: z.array(z.string()),
  status: z.string(),
  sentAt: z.string().nullable(),
})
export type SendHistoryItem = z.infer<typeof sendHistoryItemSchema>
