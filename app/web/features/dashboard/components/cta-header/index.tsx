import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { Send } from "lucide-react";
import Link from "next/link";

export function CtaHeader() {
  return (
    <section className="w-full flex justify-between">
      <h1>
        Bem Vindo, <strong>Pedro Monteiro</strong>
      </h1>
      <Link prefetch={true} href={ROUTES.DASHBOARD.CAMPAIGNS.ROOT}>
        <Button>
          <Send />
          Criar Nova Campanha
        </Button>
      </Link>
    </section>
  );
}
