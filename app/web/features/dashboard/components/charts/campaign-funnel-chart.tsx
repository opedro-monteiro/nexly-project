"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Cell,
  LabelList,
} from "recharts";
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
  type ChartConfig,
} from "@/components/ui/chart";

const barData = [
  { stage: "sent", label: "Enviados", value: 12000 },
  { stage: "opened", label: "Abertos", value: 7800 },
  { stage: "clicked", label: "Clicados", value: 2100 },
  { stage: "converted", label: "Convertidos", value: 980 },
];

const chartConfig = {
  sent: { label: "Enviados", color: "#a855f7" },
  opened: { label: "Abertos", color: "#3b82f6" },
  clicked: { label: "Clicados", color: "#f97316" },
  converted: { label: "Convertidos", color: "#22c55e" },
} satisfies ChartConfig;

export function CampaignFunnelChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Funil de Campanha</CardTitle>
        <CardDescription>
          Jornada dos contatos — dados ilustrativos
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[240px] w-full">
          <BarChart data={barData} margin={{ top: 16, right: 16, left: 0, bottom: 0 }}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 12 }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 11 }}
              tickFormatter={(v: number) =>
                v >= 1000 ? `${(v / 1000).toFixed(0)}k` : String(v)
              }
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  formatter={(value) => [
                    Number(value).toLocaleString("pt-BR"),
                    "",
                  ]}
                  hideLabel
                />
              }
            />
            <Bar dataKey="value" radius={[6, 6, 0, 0]} maxBarSize={120}>
              {barData.map((entry) => (
                <Cell
                  key={entry.stage}
                  fill={chartConfig[entry.stage as keyof typeof chartConfig].color}
                />
              ))}
              <LabelList
                dataKey="value"
                position="top"
                fontSize={11}
                formatter={(v: number) =>
                  v >= 1000 ? `${(v / 1000).toFixed(1)}k` : String(v)
                }
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
