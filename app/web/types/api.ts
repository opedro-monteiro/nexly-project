export type Channel = 'EMAIL' | 'WHATSAPP'
export type SendStatus = 'PENDING' | 'SENT' | 'FAILED'

export interface Campaign {
  id: string
  name: string
  message: string
  channel: Channel
  targetTags: string[]
  createdAt: string
  updatedAt: string
}

export interface Client {
  id: string
  name: string
  email: string
  phone: string | null
  tags: string[]
  createdAt: string
  updatedAt: string
}

export interface Send {
  id: string
  clientId: string
  campaignId: string
  status: SendStatus
  sentAt: string | null
  createdAt: string
  updatedAt: string
}

export interface TagSummary {
  tag: string
  count: number
}

export interface DispatchResult {
  campaignId: string
  totalClients: number
  sends: Array<{ clientId: string; status: string }>
}
