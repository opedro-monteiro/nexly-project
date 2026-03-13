"use client";

import { Pie, PieChart, Cell, Label } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@/components/ui/chart";

interface SendsByStatus {
  sent: number;
  failed: number;
  pending: number;
}

interface SendsByStatusChartProps {
  data: SendsByStatus;
}

const STATUS_LABELS: Record<string, string> = {
  sent: "Enviados",
  failed: "Falhos",
  pending: "Pendentes",
};

export const sendsByStatusChartConfig = {
  sent: {
    label: "Enviados",
    color: "var(--primary)",
  },
  failed: {
    label: "Falhos",
    color: "#ef4444",
  },
  pending: {
    label: "Pendentes",
    color: "#eab308",
  },
} satisfies ChartConfig;

function PieCenterLabel({
  viewBox,
  total,
}: Readonly<{
  viewBox?: Record<string, unknown>;
  total: number;
}>) {
  const cx = viewBox?.cx as number | undefined;
  const cy = viewBox?.cy as number | undefined;
  if (cx === undefined || cy === undefined) return undefined;
  return (
    <text x={cx} y={cy} textAnchor="middle" dominantBaseline="middle">
      <tspan x={cx} y={cy} className="fill-foreground text-3xl font-bold">
        {total}
      </tspan>
      <tspan x={cx} y={cy + 22} className="fill-muted-foreground text-xs">
        Total
      </tspan>
    </text>
  );
}

export function SendsByStatusPieChart({
  data,
}: Readonly<SendsByStatusChartProps>) {
  const chartData = Object.entries(data).map(([status, value]) => ({
    status,
    value,
    label: STATUS_LABELS[status] ?? status,
    fill: `var(--color-${status})`,
  }));

  const total = chartData.reduce((acc, d) => acc + d.value, 0);

  return (
    <ChartContainer
      config={sendsByStatusChartConfig}
      className="mx-auto aspect-square max-h-[220px] w-full"
    >
      <PieChart>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent nameKey="status" hideLabel />}
        />
        <Pie
          data={chartData}
          dataKey="value"
          nameKey="status"
          innerRadius={60}
          outerRadius={90}
          paddingAngle={3}
          strokeWidth={2}
        >
          {chartData.map((entry) => (
            <Cell key={entry.status} fill={entry.fill} />
          ))}
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          <Label content={<PieCenterLabel total={total} /> as any} />
        </Pie>
        <ChartLegend content={<ChartLegendContent nameKey="status" />} />
      </PieChart>
    </ChartContainer>
  );
}

export function SendsByStatusChart({
  data,
}: Readonly<SendsByStatusChartProps>) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Envios por Status</CardTitle>
        <CardDescription>Proporção de status dos envios</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-2">
        <SendsByStatusPieChart data={data} />
      </CardContent>
    </Card>
  );
}
