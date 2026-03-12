"use client";
import {
  ClockIcon,
  Home,
  MegaphoneIcon,
  UsersIcon,
  type LucideIcon,
} from "lucide-react";
import { ROUTES } from "./routes";

export const SIDE_MENU_ITEMS: {
  label: string;
  href: string;
  icon: LucideIcon;
}[] = [
  { label: "Home", href: ROUTES.DASHBOARD.ROOT, icon: Home },
  { label: "Clientes", href: ROUTES.DASHBOARD.CLIENTS.ROOT, icon: UsersIcon },
  {
    label: "Campanhas",
    href: ROUTES.DASHBOARD.CAMPAIGNS.ROOT,
    icon: MegaphoneIcon,
  },
  {
    label: "Histórico de Envios",
    href: ROUTES.DASHBOARD.SENDS.ROOT,
    icon: ClockIcon,
  },
];
