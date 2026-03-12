"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
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
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

const chartData = [
  { dia: "Dia 0",  abertura: 0,   cliques: 0,   conversao: 0   },
  { dia: "Dia 5",  abertura: 620, cliques: 410,  conversao: 85  },
  { dia: "Dia 15", abertura: 980, cliques: 670,  conversao: 210 },
  { dia: "Dia 20", abertura: 830, cliques: 520,  conversao: 175 },
  { dia: "Dia 27", abertura: 740, cliques: 460,  conversao: 148 },
  { dia: "Dia 30", abertura: 560, cliques: 340,  conversao: 112 },
];

const chartConfig = {
  abertura: {
    label: "Abertura de link",
    color: "var(--chart-1)",
  },
  cliques: {
    label: "Cliques recebidos",
    color: "var(--chart-2)",
  },
  conversao: {
    label: "Conversão",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig;

export function CampaignMetricsChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Métricas de Campanha</CardTitle>
        <CardDescription>
          Abertura, cliques e conversão nos últimos 30 dias
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[220px] w-full">
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{ left: 8, right: 8, top: 8, bottom: 8 }}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="dia"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tick={{ fontSize: 12 }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tick={{ fontSize: 12 }}
              width={36}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Line
              dataKey="abertura"
              type="monotone"
              stroke="var(--color-abertura)"
              strokeWidth={2}
              dot={{ r: 4, fill: "var(--color-abertura)" }}
              activeDot={{ r: 6 }}
            />
            <Line
              dataKey="cliques"
              type="monotone"
              stroke="var(--color-cliques)"
              strokeWidth={2}
              dot={{ r: 4, fill: "var(--color-cliques)" }}
              activeDot={{ r: 6 }}
            />
            <Line
              dataKey="conversao"
              type="monotone"
              stroke="var(--color-conversao)"
              strokeWidth={2}
              dot={{ r: 4, fill: "var(--color-conversao)" }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
