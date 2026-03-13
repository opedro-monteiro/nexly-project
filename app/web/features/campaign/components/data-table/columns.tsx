"use client";
import { FaWhatsapp } from "react-icons/fa";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Mail, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Channel, SendStatus, SendStatusLabels } from "@/constants/enums";
import type { DispatchedResult } from "@/types/api";

const STATUS_STYLES: Record<SendStatus, string> = {
  [SendStatus.SENT]: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  [SendStatus.FAILED]: "bg-red-500/10 text-red-600 border-red-500/20",
  [SendStatus.PENDING]: "bg-zinc-500/10 text-zinc-500 border-zinc-500/20",
};

export const columns: ColumnDef<DispatchedResult>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        size="sm"
        className="-ml-3 h-8"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Nome
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
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
    accessorKey: "targetTags",
    header: "Tags",
    cell: ({ row }) => {
      const tags = row.getValue<string[]>("targetTags");
      return (
        <div className="flex flex-wrap gap-1">
          {tags.map((tag) => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>
      );
    },
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
    accessorKey: "sentAt",
    header: ({ column }) => (
      <Button
        variant="ghost"
        size="sm"
        className="-ml-3 h-8"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Data de Envio
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const date = row.getValue<string>("sentAt");
      return (
        <span>
          {new Date(date).toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      );
    },
  },
];
