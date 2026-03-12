import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { QUERY_KEYS } from "@/constants/query-keys";
import { makeCampaignService } from "@/services/campaign.service";

const campaignService = makeCampaignService();

export function useDispatchCampaign() {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending } = useMutation({
    mutationKey: QUERY_KEYS.CAMPAIGNS.DISPATCHED(),
    mutationFn: (id: string) => campaignService.dispatch(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.CAMPAIGNS.LIST() });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.CAMPAIGNS.DISPATCHED() });
      toast.success("Campanha disparada com sucesso!");
    },
    onError: () => {
      toast.error("Erro ao disparar campanha. Tente novamente.");
    },
  });
  return { dispatchCampaign: mutateAsync, isPending };
}
