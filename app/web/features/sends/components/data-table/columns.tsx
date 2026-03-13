"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  SendStatusLabels,
  STATUS_STYLES,
  type Channel,
} from "@/constants/enums";
import type { SendHistoryItem, SendStatus } from "@/types/api";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Mail } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

export function getSendHistoryColumns(): ColumnDef<SendHistoryItem>[] {
  return [
    {
      accessorKey: "clientName",
      header: ({ column }) => (
        <Button
          variant="ghost"
          size="sm"
          className="-ml-3 h-8"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Cliente <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <Button
          variant="ghost"
          size="sm"
          className="-ml-3 h-8"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Campanha <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue<SendStatus>("status");
        return (
          <Badge variant="outline" className={STATUS_STYLES[status]}>
            {SendStatusLabels[status]}
          </Badge>
        );
      },
    },
    {
      accessorKey: "channel",
      header: "Canal",
      cell: ({ row }) => {
        const channel: Channel = row.getValue("channel");
        if (channel === "EMAIL") {
          return (
            <Badge
              variant="outline"
              className="text-blue-600 border-blue-600 gap-1"
            >
              <Mail className="h-3 w-3" />
              E-mail
            </Badge>
          );
        }
        return (
          <Badge
            variant="outline"
            className="text-green-600 border-green-600 gap-1"
          >
            <FaWhatsapp className="h-3 w-3" />
            WhatsApp
          </Badge>
        );
      },
    },
    {
      accessorKey: "sentAt",
      header: ({ column }) => (
        <Button
          variant="ghost"
          size="sm"
          className="-ml-3 h-8"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Data Enviada <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const sentAt: string | null = row.getValue("sentAt");
        if (!sentAt) return <span className="text-muted-foreground">—</span>;
        return new Date(sentAt).toLocaleDateString("pt-BR");
      },
    },
  ];
}
