"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";
import type { TooltipProps } from "recharts";
import type { ValueType, NameType } from "recharts/types/component/DefaultTooltipContent";
import type { MonthlyData } from "@/lib/types";

const CustomTooltip = ({ active, payload, label }: TooltipProps<ValueType, NameType> & { active?: boolean; payload?: Array<{ name?: string | number; value?: ValueType; color?: string; dataKey?: string | number }>; label?: string }) => {
  if (!active || !payload?.length) return null;
  return (
    <div
      className="border border-border/60 bg-background text-sm shadow-sm"
      style={{ padding: "0.75rem 1rem", minWidth: 160 }}
    >
      <p className="font-black tracking-tight mb-2 uppercase text-xs">{label}</p>
      {payload.map((entry, i) => (
        <p key={i} className="text-muted-foreground flex items-center gap-2 mb-1">
          <span
            className="inline-block w-2.5 h-2.5 shrink-0"
            style={{ backgroundColor: entry.color }}
          />
          {entry.name}:{" "}
          <span className="font-mono font-bold text-foreground ml-auto">{entry.value}</span>
        </p>
      ))}
    </div>
  );
};

export function PipelineChart({ data }: { data: MonthlyData[] }) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data} margin={{ top: 4, right: 12, bottom: 0, left: -12 }} barGap={3}>
        <CartesianGrid strokeDasharray="0" stroke="var(--border)" strokeOpacity={0.6} vertical={false} />
        <XAxis
          dataKey="month"
          tick={{ fontSize: 11, fill: "var(--muted-foreground)", fontWeight: 700 }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: "var(--muted)", opacity: 0.4 }} />
        <Legend
          wrapperStyle={{ fontSize: 11, paddingTop: 12, color: "var(--muted-foreground)" }}
        />
        <Bar dataKey="deliverables" name="Deliverables" fill="var(--chart-1)" radius={[2, 2, 0, 0]} />
        <Bar dataKey="approvals" name="Approved" fill="var(--chart-2)" radius={[2, 2, 0, 0]} />
        <Bar dataKey="revisions" name="Revisions" fill="var(--chart-3)" radius={[2, 2, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
