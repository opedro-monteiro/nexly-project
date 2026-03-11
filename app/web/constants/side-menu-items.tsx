"use client";
import {
  ClockIcon,
  MegaphoneIcon,
  SendIcon,
  UsersIcon,
  type LucideIcon,
} from "lucide-react";

export const SIDE_MENU_ITEMS: {
  label: string;
  href: string;
  icon: LucideIcon;
}[] = [
  { label: "Clientes", href: "/clientes", icon: UsersIcon },
  { label: "Campanhas", href: "/campanhas", icon: MegaphoneIcon },
  { label: "Enviar Campanha", href: "/envios", icon: SendIcon },
  { label: "Histórico de Envios", href: "/historico", icon: ClockIcon },
];
