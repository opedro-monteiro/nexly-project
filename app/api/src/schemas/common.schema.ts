import { z } from "zod";

export const idParamSchema = z.object({
  id: z.string({
    error: "ID deve ser um número",
  }),
});
