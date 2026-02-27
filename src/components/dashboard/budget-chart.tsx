"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from "recharts";
import type { TooltipProps } from "recharts";
import type { ValueType, NameType } from "recharts/types/component/DefaultTooltipContent";
import type { ProjectBudgetData } from "@/lib/types";

function formatCurrency(value: number) {
  if (value >= 1000) return `$${(value / 1000).toFixed(0)}k`;
  return `$${value}`;
}

const CustomTooltip = ({ active, payload, label }: TooltipProps<ValueType, NameType> & { active?: boolean; payload?: Array<{ dataKey?: string | number; value?: ValueType }>; label?: string }) => {
  if (!active || !payload?.length) return null;
  const budget = payload.find((p) => p.dataKey === "budget")?.value as number;
  const spent = payload.find((p) => p.dataKey === "spent")?.value as number;
  const pct = budget > 0 ? Math.round((spent / budget) * 100) : 0;
  return (
    <div
      className="border border-border/60 bg-background text-sm shadow-sm"
      style={{ padding: "0.75rem 1rem", minWidth: 180 }}
    >
      <p className="font-black tracking-tight mb-2 text-xs uppercase">{label}</p>
      <p className="text-muted-foreground flex justify-between gap-4 mb-1">
        Budget <span className="font-mono font-bold text-foreground">{formatCurrency(budget)}</span>
      </p>
      <p className="text-muted-foreground flex justify-between gap-4 mb-1">
        Spent <span className="font-mono font-bold text-foreground">{formatCurrency(spent)}</span>
      </p>
      <p className="text-muted-foreground flex justify-between gap-4 border-t border-border pt-1 mt-1">
        Utilisation <span className="font-mono font-bold" style={{ color: pct > 80 ? "var(--warning)" : "var(--success)" }}>{pct}%</span>
      </p>
    </div>
  );
};

export function BudgetChart({ data }: { data: ProjectBudgetData[] }) {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart
        data={data}
        layout="vertical"
        margin={{ top: 0, right: 20, bottom: 0, left: 8 }}
        barCategoryGap="30%"
        barGap={3}
      >
        <XAxis
          type="number"
          tickFormatter={formatCurrency}
          tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          type="category"
          dataKey="name"
          width={120}
          tick={{ fontSize: 10, fill: "var(--muted-foreground)", fontWeight: 600 }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: "var(--muted)", opacity: 0.4 }} />
        <Bar dataKey="budget" name="Budget" fill="var(--muted)" radius={[0, 2, 2, 0]}>
          {data.map((_, index) => (
            <Cell key={`budget-${index}`} fill="var(--muted)" />
          ))}
        </Bar>
        <Bar dataKey="spent" name="Spent" fill="var(--chart-1)" radius={[0, 2, 2, 0]}>
          {data.map((entry, index) => {
            const pct = entry.budget > 0 ? entry.spent / entry.budget : 0;
            return (
              <Cell
                key={`spent-${index}`}
                fill={pct > 0.8 ? "var(--warning)" : "var(--chart-1)"}
              />
            );
          })}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
