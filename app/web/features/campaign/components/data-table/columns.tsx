"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Channel,
  ChannelLabels,
  SendStatus,
  SendStatusLabels,
} from "@/constants/enums";
import type { DispatchedResult } from "@/types/api";

const STATUS_STYLES: Record<SendStatus, string> = {
  [SendStatus.SENT]: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  [SendStatus.FAILED]: "bg-red-500/10 text-red-600 border-red-500/20",
  [SendStatus.PENDING]: "bg-zinc-500/10 text-zinc-500 border-zinc-500/20",
};

export const columns: ColumnDef<DispatchedResult>[] = [
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
      const channel = row.getValue<Channel>("channel");
      return <span>{ChannelLabels[channel]}</span>;
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
          })}
        </span>
      );
    },
  },
];
