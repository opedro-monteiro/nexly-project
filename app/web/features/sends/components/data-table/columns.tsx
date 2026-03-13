"use client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { SendHistoryItem, Channel, SendStatus } from "@/types/api";
import { FaWhatsapp } from "react-icons/fa";

function StatusBadge({ status }: { status: SendStatus }) {
  if (status === "SENT") {
    return <Badge className="bg-green-600 text-white border-0">Enviado</Badge>;
  }
  if (status === "FAILED") {
    return <Badge className="bg-red-600 text-white border-0">Falhou</Badge>;
  }
  return (
    <Badge className="bg-yellow-500 text-white border-0">Pendente</Badge>
  );
}

function ChannelBadge({ channel }: { channel: Channel }) {
  if (channel === "EMAIL") {
    return (
      <Badge variant="outline" className="text-blue-600 border-blue-600 gap-1">
        <Mail className="h-3 w-3" />
        E-mail
      </Badge>
    );
  }
  return (
    <Badge variant="outline" className="text-green-600 border-green-600 gap-1">
      <FaWhatsapp className="h-3 w-3" />
      WhatsApp
    </Badge>
  );
}

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
      cell: ({ row }) => <StatusBadge status={row.getValue("status")} />,
    },
    {
      accessorKey: "channel",
      header: "Canal",
      cell: ({ row }) => <ChannelBadge channel={row.getValue("channel")} />,
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
