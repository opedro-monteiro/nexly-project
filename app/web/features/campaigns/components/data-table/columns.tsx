"use client";
import { ColumnDef } from "@tanstack/react-table";
import {
  ArrowUpDown,
  MoreHorizontal,
  Pencil,
  Eye,
  Trash2,
  Send,
  Mail,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Campaign, Channel } from "@/types/api";
import { FaWhatsapp } from "react-icons/fa";

export function getCampaignColumns(handlers: {
  onEdit: (campaign: Campaign) => void;
  onView: (campaign: Campaign) => void;
  onDelete: (campaign: Campaign) => void;
  onDispatch: (campaign: Campaign) => void;
}): ColumnDef<Campaign>[] {
  return [
    {
      accessorKey: "name",
      header: ({ column }) => (
        <Button
          variant="ghost"
          size="sm"
          className="-ml-3 h-8"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nome <ArrowUpDown className="ml-2 h-4 w-4" />
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
      header: "Tags Alvo",
      cell: ({ row }) => {
        const tags: string[] = row.getValue("targetTags");

        if (!tags || tags.length === 0)
          return <span className="text-muted-foreground">—</span>;

        const visible = tags.slice(0, 3);
        const remaining = tags.length - 3;
        return (
          <div className="flex flex-wrap gap-1">
            {visible.map((tag) => (
              <Badge key={tag} variant="default">
                {tag}
              </Badge>
            ))}
            {remaining > 0 && (
              <Badge variant="secondary">+{remaining} mais</Badge>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => (
        <Button
          variant="ghost"
          size="sm"
          className="-ml-3 h-8"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Criado em <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const date = new Date(row.getValue("createdAt"));
        return date.toLocaleDateString("pt-BR");
      },
    },
    {
      id: "actions",
      header: "Ações",
      cell: ({ row }) => {
        const campaign = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <span className="sr-only">Abrir menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handlers.onView(campaign)}>
                <Eye className="mr-2 h-4 w-4" />
                Visualizar
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handlers.onEdit(campaign)}>
                <Pencil className="mr-2 h-4 w-4" />
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handlers.onDispatch(campaign)}>
                <Send className="mr-2 h-4 w-4" />
                Disparar
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => handlers.onDelete(campaign)}
                className="text-destructive"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Excluir
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
}
