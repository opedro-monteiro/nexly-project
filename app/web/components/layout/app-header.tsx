import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { formatDate } from "@/utils/format-date";
import Image from "next/image";

export function AppHeader() {
  return (
    <header className="sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4 justify-between">
      <section className="flex items-center">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mr-2 data-vertical:h-4 data-vertical:self-auto"
        />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage>{formatDate(new Date())}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <Separator
          orientation="vertical"
          className="mr-2 data-vertical:h-4 data-vertical:self-auto"
        />
      </section>
      <Image
        src="/images/nexly-logo.webp"
        alt="logo-nexly"
        width={100}
        height={40}
      />
    </header>
  );
}
