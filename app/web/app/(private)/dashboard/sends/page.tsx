import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/query-keys";
import { getQueryClient } from "@/lib/react-query";
import { makeSendService } from "@/services/send.service";
import { DataTableSendsHistory } from "@/features/sends/components/data-table";

const sendService = makeSendService();

export default async function SendsHistoryPage() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: QUERY_KEYS.SENDS.HISTORY(),
    queryFn: sendService.listHistory,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="container mx-auto p-10 space-y-4">
        <DataTableSendsHistory />
      </main>
    </HydrationBoundary>
  );
}
