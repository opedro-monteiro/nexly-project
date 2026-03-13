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

const chartConfig = {
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

export function SendsByStatusChart({
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
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Envios por Status</CardTitle>
        <CardDescription>Proporção de status dos envios</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-2">
        <ChartContainer
          config={chartConfig}
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
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {total}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy ?? 0) + 22}
                          className="fill-muted-foreground text-xs"
                        >
                          Total
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
            <ChartLegend content={<ChartLegendContent nameKey="status" />} />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
