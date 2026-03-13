export enum Channel {
  EMAIL = "EMAIL",
  WHATSAPP = "WHATSAPP",
}

export const ChannelLabels: Record<Channel, string> = {
  [Channel.EMAIL]: "E-mail",
  [Channel.WHATSAPP]: "WhatsApp",
};

export enum SendStatus {
  PENDING = "PENDING",
  SENT = "SENT",
  FAILED = "FAILED",
}

export const SendStatusLabels: Record<SendStatus, string> = {
  [SendStatus.PENDING]: "Pendente",
  [SendStatus.SENT]: "Enviado",
  [SendStatus.FAILED]: "Falhou",
};

export const STATUS_STYLES: Record<SendStatus, string> = {
  [SendStatus.SENT]: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  [SendStatus.FAILED]: "bg-red-500/10 text-red-600 border-red-500/20",
  [SendStatus.PENDING]: "bg-zinc-500/10 text-zinc-500 border-zinc-500/20",
};
