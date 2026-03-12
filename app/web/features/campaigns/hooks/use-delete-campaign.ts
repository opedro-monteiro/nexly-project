import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { QUERY_KEYS } from "@/constants/query-keys";
import { makeCampaignService } from "@/services/campaign.service";

const campaignService = makeCampaignService();

export function useDeleteCampaign() {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending } = useMutation({
    mutationKey: QUERY_KEYS.CAMPAIGNS.DELETE(""),
    mutationFn: (id: string) => campaignService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.CAMPAIGNS.LIST() });
      toast.success("Campanha excluída com sucesso!");
    },
    onError: () => {
      toast.error("Erro ao excluir campanha. Tente novamente.");
    },
  });
  return { deleteCampaign: mutateAsync, isPending };
}
