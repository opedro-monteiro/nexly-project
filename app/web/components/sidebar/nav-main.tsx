"use client";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  UsersIcon,
  MegaphoneIcon,
  SendIcon,
  ClockIcon,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const items: { label: string; href: string; icon: LucideIcon }[] = [
  { label: "Clientes", href: "/clientes", icon: UsersIcon },
  { label: "Campanhas", href: "/campanhas", icon: MegaphoneIcon },
  { label: "Enviar Campanha", href: "/envios", icon: SendIcon },
  { label: "Histórico de Envios", href: "/historico", icon: ClockIcon },
];

export function NavMain() {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.href}>
            <SidebarMenuButton asChild isActive={pathname === item.href}>
              <Link href={item.href}>
                <item.icon />
                <span>{item.label}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
