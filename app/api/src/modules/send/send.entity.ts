import type { SendStatus } from '../../enums'

export interface Send {
  id: string
  clientId: string
  campaignId: string
  status: SendStatus
  sentAt: Date | null
  createdAt: Date
  updatedAt: Date
}
