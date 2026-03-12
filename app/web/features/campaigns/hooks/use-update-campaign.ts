import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { QUERY_KEYS } from "@/constants/query-keys";
import { makeCampaignService } from "@/services/campaign.service";
import type { UpdateCampaignSchema } from "@/schemas/campaign.schema";

const campaignService = makeCampaignService();

export function useUpdateCampaign() {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending } = useMutation({
    mutationKey: QUERY_KEYS.CAMPAIGNS.UPDATE(""),
    mutationFn: ({ id, data }: { id: string; data: UpdateCampaignSchema }) =>
      campaignService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.CAMPAIGNS.LIST() });
      toast.success("Campanha atualizada com sucesso!");
    },
    onError: () => {
      toast.error("Erro ao atualizar campanha. Tente novamente.");
    },
  });
  return { updateCampaign: mutateAsync, isPending };
}
