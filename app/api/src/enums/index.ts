export enum Channel {
  EMAIL = 'EMAIL',
  WHATSAPP = 'WHATSAPP',
}

export const ChannelLabels: Record<Channel, string> = {
  [Channel.EMAIL]: 'E-mail',
  [Channel.WHATSAPP]: 'WhatsApp',
}

export enum SendStatus {
  PENDING = 'PENDING',
  SENT = 'SENT',
  FAILED = 'FAILED',
}

export const SendStatusLabels: Record<SendStatus, string> = {
  [SendStatus.PENDING]: 'Pendente',
  [SendStatus.SENT]: 'Enviado',
  [SendStatus.FAILED]: 'Falhou',
}
