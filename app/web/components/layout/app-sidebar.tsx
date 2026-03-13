"use client";
import * as React from "react";

import { NavMain } from "@/components/sidebar/nav-main";
import { NavUser } from "@/components/sidebar/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useGetDashboardKpis } from "@/features/dashboard/hooks/use-get-dashboard-kpis";
import { SendsByStatusPieChart } from "@/features/dashboard/components/charts/sends-by-status-chart";
import { Skeleton } from "../ui/skeleton";
import { Suspense } from "react";

const data = {
  user: {
    name: "Pedro Monteiro",
    email: "pedro.oliviera@monteirodev.com",
    avatar: "https://avatars.githubusercontent.com/u/111465970?s=96&v=4",
  },
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { dashboardKpis } = useGetDashboardKpis();

  return (
    <Sidebar {...props}>
      <SidebarHeader className="h-16 border-b border-sidebar-border">
        <NavUser user={data.user} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain />
      </SidebarContent>
      <SidebarFooter>
        <Suspense
          fallback={<Skeleton className="h-[320px] w-full rounded-xl" />}
        >
          {dashboardKpis && (
            <section className="mb-10">
              <SendsByStatusPieChart data={dashboardKpis?.sendsByStatus} />
            </section>
          )}
        </Suspense>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
