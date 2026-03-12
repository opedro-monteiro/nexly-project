"use client";
import { DataTable } from "@/components/common/data-table";
import { columns } from "./columns";
import { useGetDispatched } from "../../hooks/use-get-dispatched";
import { DataTableSkeleton } from "@/components/common/data-table/data-table-skeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";

export function DataTableCampaigns() {
  const { dispatchedData, isLoading } = useGetDispatched();
  if (isLoading) return <DataTableSkeleton />;

  return (
    <section className="space-y-4">
      <section className="flex justify-between items-center gap-4">
        <Input type="search" placeholder="Pesquisar" />
        <Link prefetch={true} href={ROUTES.DASHBOARD.CAMPAIGNS.ROOT}>
          <Button>
            <Send />
            Enviar Campanha
          </Button>
        </Link>
      </section>
      <DataTable columns={columns} data={dispatchedData ?? []} />
    </section>
  );
}
