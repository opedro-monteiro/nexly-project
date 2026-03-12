import { ReactNode } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface KpiCardProps {
  title: string;
  value: number | string;
  icon: ReactNode;
  description?: string;
  className?: string;
  sparkline?: ReactNode;
}

export function KpiCard({
  title,
  value,
  icon,
  description,
  className,
  sparkline,
}: Readonly<KpiCardProps>) {
  return (
    <Card size="sm" className={cn("gap-1", className)}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {title}
          </CardTitle>
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted text-muted-foreground">
            {icon}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {sparkline ? (
          <div className="flex items-end justify-between gap-2">
            <div>
              <p className="text-4xl font-bold tracking-tight">{value}</p>
              {description && (
                <CardDescription className="mt-1">{description}</CardDescription>
              )}
            </div>
            <div className="w-24 shrink-0">{sparkline}</div>
          </div>
        ) : (
          <>
            <p className="text-4xl font-bold tracking-tight">{value}</p>
            {description && (
              <CardDescription className="mt-1">{description}</CardDescription>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
