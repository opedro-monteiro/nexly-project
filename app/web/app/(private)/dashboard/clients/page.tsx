import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/query-keys";
import { getQueryClient } from "@/lib/react-query";
import { makeClientService } from "@/services/client.service";
import { DataTableClients } from "@/features/clients/components/data-table";

const clientService = makeClientService();

export default async function ListClientsPage() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: QUERY_KEYS.CLIENTS.LIST(),
    queryFn: clientService.list,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="container mx-auto p-10 space-y-4">
        <DataTableClients />
      </main>
    </HydrationBoundary>
  );
}
