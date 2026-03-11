import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export function formatDate(date: Date): string {
  return format(date, "EEEE, dd 'de' MMMM 'de' yyyy", { locale: ptBR });
}
