"use client";

import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { activityLog, roleLabels } from "@/data/mock-data";
import type { ActivityEntry, UserRole, ActivityAction } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Upload,
  MessageSquare,
  CheckCircle,
  AlertCircle,
  FolderPlus,
  UserCheck,
  RefreshCw,
  AtSign,
} from "lucide-react";

// ── Action config ─────────────────────────────────────────────────────────────

const actionConfig: Record<
  ActivityAction,
  {
    label: string;
    verb: string;
    icon: React.ComponentType<{ className?: string }>;
    colorClass: string;
    bgClass: string;
  }
> = {
  uploaded: {
    label: "Upload",
    verb: "uploaded",
    icon: Upload,
    colorClass: "text-[color:var(--primary)]",
    bgClass: "bg-[color:var(--primary)]/10",
  },
  commented: {
    label: "Comment",
    verb: "commented on",
    icon: MessageSquare,
    colorClass: "text-[color:var(--chart-2)]",
    bgClass: "bg-[color:var(--chart-2)]/10",
  },
  approved: {
    label: "Approval",
    verb: "approved",
    icon: CheckCircle,
    colorClass: "text-[color:var(--success)]",
    bgClass: "bg-[color:var(--success)]/10",
  },
  "requested-changes": {
    label: "Revision",
    verb: "requested changes to",
    icon: AlertCircle,
    colorClass: "text-destructive",
    bgClass: "bg-destructive/10",
  },
  "created-project": {
    label: "New Project",
    verb: "created project",
    icon: FolderPlus,
    colorClass: "text-[color:var(--chart-3)]",
    bgClass: "bg-[color:var(--chart-3)]/10",
  },
  assigned: {
    label: "Assignment",
    verb: "assigned",
    icon: UserCheck,
    colorClass: "text-[color:var(--warning)]",
    bgClass: "bg-[color:var(--warning)]/10",
  },
  "status-changed": {
    label: "Status",
    verb: "updated status of",
    icon: RefreshCw,
    colorClass: "text-[color:var(--chart-4)]",
    bgClass: "bg-[color:var(--chart-4)]/10",
  },
  mentioned: {
    label: "Mention",
    verb: "mentioned you in",
    icon: AtSign,
    colorClass: "text-muted-foreground",
    bgClass: "bg-muted",
  },
};

// ── Role badge ────────────────────────────────────────────────────────────────

function RoleBadge({ role }: { role: UserRole }) {
  const colorMap: Record<UserRole, string> = {
    admin: "text-[color:var(--primary)] bg-[color:var(--primary)]/10",
    pm: "text-[color:var(--chart-3)] bg-[color:var(--chart-3)]/10",
    designer: "text-[color:var(--chart-2)] bg-[color:var(--chart-2)]/10",
    client: "text-[color:var(--warning)] bg-[color:var(--warning)]/10",
  };
  return (
    <Badge
      variant="outline"
      className={cn(
        "text-[9px] font-bold uppercase tracking-widest border-0 rounded-none px-1.5",
        colorMap[role]
      )}
    >
      {roleLabels[role] ?? role}
    </Badge>
  );
}

// ── Relative time ─────────────────────────────────────────────────────────────

function relativeTime(isoString: string) {
  const now = new Date("2026-02-27T12:00:00Z");
  const then = new Date(isoString);
  const diffMs = now.getTime() - then.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays}d ago`;
  return then.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

// ── Group entries by date ─────────────────────────────────────────────────────

function groupByDate(entries: ActivityEntry[]) {
  const groups: { label: string; entries: ActivityEntry[] }[] = [];
  const seenDates = new Map<string, number>();

  for (const entry of entries) {
    const d = new Date(entry.createdAt);
    const today = new Date("2026-02-27");
    const yesterday = new Date("2026-02-26");
    let label: string;
    if (
      d.getFullYear() === today.getFullYear() &&
      d.getMonth() === today.getMonth() &&
      d.getDate() === today.getDate()
    ) {
      label = "Today";
    } else if (
      d.getFullYear() === yesterday.getFullYear() &&
      d.getMonth() === yesterday.getMonth() &&
      d.getDate() === yesterday.getDate()
    ) {
      label = "Yesterday";
    } else {
      label = d.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
      });
    }

    if (seenDates.has(label)) {
      groups[seenDates.get(label)!].entries.push(entry);
    } else {
      seenDates.set(label, groups.length);
      groups.push({ label, entries: [entry] });
    }
  }
  return groups;
}

// ── Activity entry component ──────────────────────────────────────────────────

function ActivityItem({ entry }: { entry: ActivityEntry }) {
  const config = actionConfig[entry.action];
  const Icon = config.icon;
  const initials = entry.userName
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="flex gap-4 group">
      {/* Avatar column */}
      <div className="flex flex-col items-center">
        <div className="w-9 h-9 flex items-center justify-center text-[10px] font-black bg-[color:var(--primary)]/10 text-[color:var(--primary)] shrink-0 mt-0.5">
          {initials}
        </div>
        <div className="w-px flex-1 bg-border mt-2 mb-0 min-h-[1.5rem] group-last:hidden" />
      </div>

      {/* Content column */}
      <div className="flex-1 pb-5 group-last:pb-0 min-w-0">
        <div className="flex items-start justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2 flex-wrap min-w-0">
            {/* Action icon pill */}
            <span
              className={cn(
                "inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest px-2 py-0.5",
                config.bgClass,
                config.colorClass
              )}
            >
              <Icon className="w-3 h-3" />
              {config.label}
            </span>
            <RoleBadge role={entry.userRole} />
          </div>
          <span className="text-xs font-mono text-muted-foreground shrink-0 tabular-nums">
            {relativeTime(entry.createdAt)}
          </span>
        </div>

        {/* Action sentence */}
        <p className="text-sm mt-1.5 leading-relaxed">
          <span className="font-bold">{entry.userName}</span>
          {" "}
          <span className="text-muted-foreground">{config.verb}</span>
          {" "}
          <span className="font-semibold text-foreground">{entry.target}</span>
          {entry.projectName && (
            <span className="text-muted-foreground">
              {" "}— {" "}
              <span className="font-mono text-xs text-[color:var(--primary)]">
                {entry.projectName}
              </span>
            </span>
          )}
        </p>
      </div>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function ActivityPage() {
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [actionFilter, setActionFilter] = useState<string>("all");

  const displayed = useMemo(() => {
    return activityLog.filter((e) => {
      const matchRole = roleFilter === "all" || e.userRole === roleFilter;
      const matchAction = actionFilter === "all" || e.action === actionFilter;
      return matchRole && matchAction;
    });
  }, [roleFilter, actionFilter]);

  const grouped = useMemo(() => groupByDate(displayed), [displayed]);

  return (
    <div className="space-y-8">
      {/* ── Page header ─────────────────────────────────────────── */}
      <div className="border-b-4 border-foreground pb-4">
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">
              Studio Feed
            </p>
            <h1 className="text-4xl font-black tracking-tight leading-none">
              Activity
            </h1>
          </div>
          <p className="text-sm text-muted-foreground font-mono">
            {displayed.length} events
          </p>
        </div>
      </div>

      {/* ── Filter bar ──────────────────────────────────────────── */}
      <div className="flex items-center gap-3 flex-wrap">
        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger className="w-44 rounded-none border-2 border-border text-sm">
            <SelectValue placeholder="All Roles" />
          </SelectTrigger>
          <SelectContent className="rounded-none">
            <SelectItem value="all">All Roles</SelectItem>
            {Object.entries(roleLabels).map(([k, v]) => (
              <SelectItem key={k} value={k}>{v}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={actionFilter} onValueChange={setActionFilter}>
          <SelectTrigger className="w-44 rounded-none border-2 border-border text-sm">
            <SelectValue placeholder="All Actions" />
          </SelectTrigger>
          <SelectContent className="rounded-none">
            <SelectItem value="all">All Actions</SelectItem>
            {(Object.entries(actionConfig) as [ActivityAction, typeof actionConfig[ActivityAction]][]).map(
              ([k, v]) => (
                <SelectItem key={k} value={k}>
                  {v.label}
                </SelectItem>
              )
            )}
          </SelectContent>
        </Select>
      </div>

      {/* ── Timeline feed ───────────────────────────────────────── */}
      {displayed.length === 0 ? (
        <div className="border-2 border-dashed border-border py-16 text-center">
          <p className="text-sm text-muted-foreground">
            No studio activity matches this filter.
          </p>
        </div>
      ) : (
        <div className="space-y-10">
          {grouped.map((group) => (
            <div key={group.label}>
              {/* Date group header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="border-t-4 border-foreground flex-1" />
                <span className="text-xs font-black uppercase tracking-widest text-foreground shrink-0 px-1">
                  {group.label}
                </span>
                <div className="border-t-4 border-foreground flex-1" />
              </div>

              {/* Entries */}
              <div className="pl-0">
                {group.entries.map((entry) => (
                  <ActivityItem key={entry.id} entry={entry} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
