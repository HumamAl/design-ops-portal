"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";
import { APP_CONFIG } from "@/lib/config";
import {
  dashboardStats,
  monthlyDeliverableData,
  projectBudgetData,
  deliverables,
  activityLog,
  deliverableStatusLabels,
  deliverableTypeLabels,
  roleLabels,
} from "@/data/mock-data";
import type { DashboardStat, Deliverable, ActivityEntry } from "@/lib/types";

// ── SSR-safe chart imports ─────────────────────────────────
const PipelineChart = dynamic(
  () => import("@/components/dashboard/pipeline-chart").then((m) => m.PipelineChart),
  { ssr: false, loading: () => <div className="h-[280px] bg-muted/20 animate-pulse" /> }
);

const BudgetChart = dynamic(
  () => import("@/components/dashboard/budget-chart").then((m) => m.BudgetChart),
  { ssr: false, loading: () => <div className="h-[240px] bg-muted/20 animate-pulse" /> }
);

// ── Animated counter hook ──────────────────────────────────
function useCountUp(target: number, duration: number = 1200) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const startTime = performance.now();
          const step = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(step);
            else setCount(target);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return { count, ref };
}

// ── Relative time helper ───────────────────────────────────
function relativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

// ── Days waiting helper ────────────────────────────────────
function daysWaiting(iso: string): number {
  return Math.floor((Date.now() - new Date(iso).getTime()) / 86400000);
}

// ── Status badge colours ───────────────────────────────────
function statusStyle(status: string): string {
  switch (status) {
    case "approved":
      return "bg-success/10 text-success border border-success/20";
    case "client-review":
      return "bg-warning/10 text-warning border border-warning/20";
    case "internal-review":
      return "bg-primary/10 text-primary border border-primary/20";
    case "revision-requested":
      return "bg-destructive/10 text-destructive border border-destructive/20";
    default:
      return "bg-muted text-muted-foreground border border-border/40";
  }
}

// ── Role badge colours ─────────────────────────────────────
function roleStyle(role: string): string {
  switch (role) {
    case "client":
      return "bg-warning/10 text-warning border border-warning/20";
    case "designer":
      return "bg-primary/10 text-primary border border-primary/20";
    case "pm":
      return "bg-success/10 text-success border border-success/20";
    default:
      return "bg-muted text-muted-foreground border border-border/40";
  }
}

// ── Action label map ───────────────────────────────────────
const actionLabels: Record<string, string> = {
  uploaded: "uploaded",
  commented: "commented on",
  approved: "approved",
  "requested-changes": "requested changes on",
  "created-project": "created project",
  assigned: "assigned",
  "status-changed": "updated status on",
  mentioned: "mentioned in",
};

// ── Stat Card Component ────────────────────────────────────
function StatCard({ stat, index }: { stat: DashboardStat; index: number }) {
  const { count, ref } = useCountUp(stat.value);
  const isPositive = stat.change >= 0;

  return (
    <div
      ref={ref}
      className="aesthetic-card p-6 border-t-4 border-t-primary opacity-0 animate-fade-up-in"
      style={{
        animationDelay: `${index * 50}ms`,
        animationDuration: "350ms",
        animationFillMode: "both",
      }}
    >
      <p className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-3">
        {stat.label}
      </p>
      <p className="text-5xl font-black tracking-tight tabular-nums text-foreground leading-none">
        {count}
      </p>
      <p
        className="text-xs mt-3 font-medium"
        style={{ color: isPositive ? "var(--success)" : "var(--destructive)" }}
      >
        {isPositive ? "+" : ""}
        {stat.change} {stat.changeLabel}
      </p>
    </div>
  );
}

// ── Main Dashboard Page ────────────────────────────────────
export default function DashboardPage() {
  // Period filter drives the pipeline chart slice
  const [period, setPeriod] = useState<"3mo" | "6mo">("6mo");

  const chartData = useMemo(() => {
    if (period === "3mo") return monthlyDeliverableData.slice(-3);
    return monthlyDeliverableData;
  }, [period]);

  // Pending approvals table — deliverables awaiting client or internal review
  const pendingDeliverables = useMemo<Deliverable[]>(
    () =>
      deliverables
        .filter((d) => d.status === "client-review" || d.status === "internal-review")
        .sort(
          (a, b) =>
            new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
        ),
    []
  );

  // Recent activity feed — top 8
  const recentActivity = useMemo<ActivityEntry[]>(
    () => activityLog.slice(0, 8),
    []
  );

  const projectName = APP_CONFIG.clientName ?? APP_CONFIG.projectName;

  return (
    <div className="space-y-10">

      {/* ── Page Header ──────────────────────────────────── */}
      <div className="border-b border-border pb-6">
        <p className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-1">
          Operations
        </p>
        <h1 className="text-4xl font-black tracking-tight leading-none">
          Studio Command
        </h1>
        <p className="text-base text-muted-foreground mt-2" style={{ lineHeight: "var(--body-leading)" }}>
          Season pipelines, pending approvals, and live studio activity
        </p>
      </div>

      {/* ── Stat Cards ───────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardStats.map((stat, index) => (
          <StatCard key={stat.label} stat={stat} index={index} />
        ))}
      </div>

      {/* ── Deliverable Pipeline Chart ───────────────────── */}
      <div>
        {/* Section heading + filter */}
        <div className="flex items-end justify-between mb-6">
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-1">
              Pipeline
            </p>
            <h2 className="text-2xl font-black tracking-tight">
              Deliverable Throughput
            </h2>
          </div>
          <div className="flex gap-2 pb-1">
            {(["3mo", "6mo"] as const).map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={cn(
                  "px-3 py-1 text-xs font-black uppercase tracking-wide border transition-colors",
                  period === p
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border/60 text-muted-foreground hover:border-primary/40 hover:text-foreground"
                )}
                style={{ transitionDuration: "var(--dur-fast)" }}
              >
                {p === "3mo" ? "Last 3 months" : "Last 6 months"}
              </button>
            ))}
          </div>
        </div>
        <div
          className="aesthetic-card border-t-4 border-t-primary p-6"
        >
          <PipelineChart data={chartData} />
        </div>
      </div>

      {/* ── Budget Allocation + Pending Approvals ─────────
          Two-column layout at lg+ */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

        {/* Budget Allocation (2/5 width) */}
        <div className="lg:col-span-2">
          <div className="mb-6">
            <p className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-1">
              Budget
            </p>
            <h2 className="text-2xl font-black tracking-tight">
              Allocation vs Spent
            </h2>
          </div>
          <div className="aesthetic-card border-t-4 border-t-primary p-6">
            <BudgetChart data={projectBudgetData} />
          </div>
        </div>

        {/* Pending Approvals Table (3/5 width) */}
        <div className="lg:col-span-3">
          <div className="mb-6">
            <p className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-1">
              Approvals
            </p>
            <h2 className="text-2xl font-black tracking-tight">
              Awaiting Client Review
            </h2>
          </div>
          <div className="aesthetic-card border-t-4 border-t-primary overflow-hidden">
            {/* Table header */}
            <div
              className="grid text-xs font-black uppercase tracking-wider text-muted-foreground border-b border-border px-6 py-3"
              style={{ gridTemplateColumns: "1fr 1fr auto auto auto" }}
            >
              <span>Deliverable</span>
              <span>Project</span>
              <span className="text-center">Type</span>
              <span className="text-center">Status</span>
              <span className="text-right">Waiting</span>
            </div>
            {/* Table rows */}
            <div>
              {pendingDeliverables.map((d, i) => {
                const waiting = daysWaiting(d.updatedAt);
                return (
                  <div
                    key={d.id}
                    className={cn(
                      "grid items-center px-6 py-3 text-sm aesthetic-hover",
                      i !== pendingDeliverables.length - 1 && "border-b border-border/40"
                    )}
                    style={{ gridTemplateColumns: "1fr 1fr auto auto auto" }}
                  >
                    {/* Name + version */}
                    <div className="min-w-0">
                      <p className="font-semibold truncate leading-tight">{d.name}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">v{d.version} · {d.assignedToName}</p>
                    </div>
                    {/* Project */}
                    <p className="text-muted-foreground text-xs truncate pr-4">{d.projectName}</p>
                    {/* Type badge */}
                    <span className="text-xs font-medium px-2 py-0.5 border border-border/60 bg-muted/40 whitespace-nowrap">
                      {deliverableTypeLabels[d.type] ?? d.type}
                    </span>
                    {/* Status badge */}
                    <span
                      className={cn(
                        "text-xs font-semibold px-2 py-0.5 whitespace-nowrap ml-2",
                        statusStyle(d.status)
                      )}
                    >
                      {deliverableStatusLabels[d.status] ?? d.status}
                    </span>
                    {/* Days waiting */}
                    <p
                      className="text-xs font-mono font-bold text-right ml-4"
                      style={{ color: waiting > 7 ? "var(--destructive)" : waiting > 3 ? "var(--warning)" : "var(--muted-foreground)" }}
                    >
                      {waiting}d
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ── Recent Activity Feed ──────────────────────────── */}
      <div>
        <div className="mb-6">
          <p className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-1">
            Studio
          </p>
          <h2 className="text-2xl font-black tracking-tight">
            Live Activity
          </h2>
        </div>
        <div className="aesthetic-card border-t-4 border-t-primary overflow-hidden">
          {recentActivity.map((entry, i) => (
            <div
              key={entry.id}
              className={cn(
                "flex items-start gap-4 px-6 py-4 aesthetic-hover",
                i !== recentActivity.length - 1 && "border-b border-border/40"
              )}
            >
              {/* Avatar circle */}
              <div
                className="flex items-center justify-center text-xs font-black shrink-0 mt-0.5"
                style={{
                  width: 36,
                  height: 36,
                  background: "var(--primary)",
                  color: "var(--primary-foreground)",
                  borderRadius: 0,
                }}
              >
                {entry.userName.split(" ").map((n) => n[0]).join("").slice(0, 2)}
              </div>
              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className="text-sm leading-snug">
                  <span className="font-bold">{entry.userName}</span>
                  {" "}
                  <span className="text-muted-foreground">
                    {actionLabels[entry.action] ?? entry.action}
                  </span>
                  {" "}
                  <span className="font-medium">{entry.target}</span>
                  {entry.projectName && (
                    <span className="text-muted-foreground"> · {entry.projectName}</span>
                  )}
                </p>
              </div>
              {/* Right: role + time */}
              <div className="flex flex-col items-end gap-1 shrink-0">
                <span
                  className={cn(
                    "text-xs font-semibold px-2 py-0.5 whitespace-nowrap",
                    roleStyle(entry.userRole)
                  )}
                >
                  {roleLabels[entry.userRole] ?? entry.userRole}
                </span>
                <span className="text-xs text-muted-foreground font-mono">
                  {relativeTime(entry.createdAt)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Proposal Banner ───────────────────────────────── */}
      <div className="mt-4 border-t-4 border-t-primary aesthetic-card p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <p className="text-sm font-black tracking-tight">
            This is a live demo built for {projectName}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Humam · Full-Stack Developer · Available now
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="/challenges"
            className="text-xs font-black uppercase tracking-wide text-muted-foreground hover:text-foreground"
            style={{ transition: "color var(--dur-fast)" }}
          >
            My Approach →
          </a>
          <a
            href="/proposal"
            className="inline-flex items-center text-xs font-black uppercase tracking-wide bg-primary text-primary-foreground px-4 py-2 hover:bg-primary/90"
            style={{ transition: "background-color var(--dur-fast)" }}
          >
            Work With Me
          </a>
        </div>
      </div>

    </div>
  );
}
