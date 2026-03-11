"use client";
import { getQueryClient } from "@/lib/react-query";
import { QueryClientProvider } from "@tanstack/react-query";

export function QueryProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
