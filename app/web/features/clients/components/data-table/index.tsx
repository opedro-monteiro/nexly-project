"use client";

import { UserPlus } from "lucide-react";
import { DataTable } from "@/components/common/data-table";
import { DataTableSkeleton } from "@/components/common/data-table/data-table-skeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useClientsTable } from "../../hooks/use-clients-table";
import { columns } from "./columns";

export function DataTableClients() {
  const { clients, isLoading, search, setSearch, handleNewClient } =
    useClientsTable();

  if (isLoading) return <DataTableSkeleton />;

  return (
    <section className="space-y-4">
      <section className="flex justify-between items-center gap-4">
        <Input
          type="search"
          placeholder="Pesquisar por nome ou e-mail"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
        <Button onClick={handleNewClient}>
          <UserPlus />
          Novo Cliente
        </Button>
      </section>
      <DataTable columns={columns} data={clients} />
    </section>
  );
}
