import { getQueryClient } from "@/lib/react-query";
import { clientService } from "@/services/client.service";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export default async function DashboardPage() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["posts"],
    queryFn: clientService.list,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <pre></pre>
    </HydrationBoundary>
  );
}
