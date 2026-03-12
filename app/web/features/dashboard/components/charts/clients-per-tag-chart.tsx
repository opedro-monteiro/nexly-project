"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
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
import type { TagSummary } from "@/types/api";

interface ClientsPerTagChartProps {
  data: TagSummary[];
}

const chartConfig = {
  count: {
    label: "Clientes",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function ClientsPerTagChart({ data }: ClientsPerTagChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Clientes por Tag</CardTitle>
        <CardDescription>Distribuição de clientes em cada tag</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[220px] w-full">
          <BarChart
            accessibilityLayer
            data={data}
            layout="vertical"
            margin={{ left: 8, right: 32 }}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="tag"
              type="category"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              width={80}
              tick={{ fontSize: 12 }}
            />
            <XAxis type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey="count"
              fill="var(--color-count)"
              radius={[0, 6, 6, 0]}
            >
              <LabelList
                dataKey="count"
                position="right"
                className="fill-foreground"
                fontSize={12}
                fontWeight={600}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
