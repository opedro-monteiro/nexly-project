"use client";
import { DataTable } from "@/components/common/data-table";
import { DataTableSkeleton } from "@/components/common/data-table/data-table-skeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { useGetDispatched } from "../../hooks/use-get-dispatched";
import { columns } from "./columns";

export function DataTableCampaigns() {
  const { dispatchedData, isLoading } = useGetDispatched();
  if (isLoading) return <DataTableSkeleton />;

  return (
    <section className="space-y-4">
      <section className="flex justify-between items-center gap-4">
        <Input type="search" placeholder="Pesquisar" />
        <Button variant={"secondary"}>
          <Send />
          Filtros
        </Button>
      </section>
      <DataTable columns={columns} data={dispatchedData ?? []} />
    </section>
  );
}
