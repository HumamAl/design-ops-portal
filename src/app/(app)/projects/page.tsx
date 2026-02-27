"use client";

import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import {
  projects,
  timelinePhases,
  projectStatusLabels,
} from "@/data/mock-data";
import type { Project, ProjectStatus, TimelinePhase } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Search,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  Download,
} from "lucide-react";

// ── Status badge ─────────────────────────────────────────────────────────────

function ProjectStatusBadge({ status }: { status: ProjectStatus }) {
  const config: Record<ProjectStatus, { label: string; colorClass: string }> = {
    active: {
      label: "Active",
      colorClass: "text-[color:var(--primary)] bg-[color:var(--primary)]/10",
    },
    completed: {
      label: "Completed",
      colorClass: "text-[color:var(--success)] bg-[color:var(--success)]/10",
    },
    "in-review": {
      label: "In Review",
      colorClass: "text-[color:var(--warning)] bg-[color:var(--warning)]/10",
    },
    "on-hold": {
      label: "On Hold",
      colorClass: "text-muted-foreground bg-muted",
    },
    archived: {
      label: "Archived",
      colorClass: "text-muted-foreground bg-muted",
    },
  };
  const c = config[status] ?? { label: status, colorClass: "text-muted-foreground bg-muted" };
  return (
    <Badge
      variant="outline"
      className={cn("text-xs font-medium border-0 rounded-none tracking-wide uppercase", c.colorClass)}
    >
      {c.label}
    </Badge>
  );
}

// ── Progress bar ─────────────────────────────────────────────────────────────

function ProgressBar({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-2 min-w-[100px]">
      <div className="flex-1 h-1 bg-muted overflow-hidden">
        <div
          className="h-full bg-[color:var(--primary)] transition-all duration-200"
          style={{ width: `${value}%` }}
        />
      </div>
      <span className="text-xs font-mono tabular-nums text-muted-foreground w-8 text-right shrink-0">
        {value}%
      </span>
    </div>
  );
}

// ── Timeline phase badge ──────────────────────────────────────────────────────

function PhaseBadge({ status }: { status: TimelinePhase["status"] }) {
  const config: Record<TimelinePhase["status"], { label: string; colorClass: string }> = {
    completed: {
      label: "Done",
      colorClass: "bg-[color:var(--success)] text-white",
    },
    "in-progress": {
      label: "Active",
      colorClass: "bg-[color:var(--primary)] text-white",
    },
    upcoming: {
      label: "Upcoming",
      colorClass: "bg-muted text-muted-foreground",
    },
    overdue: {
      label: "Overdue",
      colorClass: "bg-destructive/90 text-white",
    },
  };
  const c = config[status];
  return (
    <span
      className={cn(
        "inline-flex items-center text-[10px] font-bold uppercase tracking-widest px-2 py-0.5",
        c.colorClass
      )}
    >
      {c.label}
    </span>
  );
}

// ── Expanded timeline view ────────────────────────────────────────────────────

function ProjectTimeline({ projectId }: { projectId: string }) {
  const phases = timelinePhases.filter((p) => p.projectId === projectId);
  if (phases.length === 0) {
    return (
      <p className="text-sm text-muted-foreground italic py-2">
        No T&A phases on record for this project.
      </p>
    );
  }
  return (
    <div className="space-y-3">
      <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground border-b border-border pb-2">
        T&amp;A Calendar — Phase Tracker
      </p>
      <div className="flex gap-0 overflow-x-auto">
        {phases.map((phase, i) => (
          <div
            key={phase.id}
            className="flex-1 min-w-[140px] relative"
          >
            {/* Connector line */}
            {i < phases.length - 1 && (
              <div className="absolute top-4 right-0 w-px h-4 bg-border z-10" />
            )}
            <div
              className={cn(
                "p-3 border-t-4 mr-0.5 last:mr-0",
                phase.status === "completed" && "border-t-[color:var(--success)]",
                phase.status === "in-progress" && "border-t-[color:var(--primary)]",
                phase.status === "upcoming" && "border-t-muted",
                phase.status === "overdue" && "border-t-destructive"
              )}
            >
              <PhaseBadge status={phase.status} />
              <p className="text-xs font-semibold mt-2 leading-tight">{phase.name}</p>
              <p className="text-[10px] text-muted-foreground mt-1 font-mono">
                {new Date(phase.startDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                {" — "}
                {new Date(phase.endDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "2-digit" })}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Format helpers ────────────────────────────────────────────────────────────

function formatBudget(n: number) {
  if (n >= 1000) return `$${(n / 1000).toFixed(0)}k`;
  return `$${n}`;
}

function formatDate(s: string) {
  return new Date(s).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "2-digit",
  });
}

type SortKey = "name" | "clientName" | "season" | "status" | "progress" | "budget" | "dueDate" | "pendingApprovals";

// ── Main page ─────────────────────────────────────────────────────────────────

export default function ProjectsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortKey, setSortKey] = useState<SortKey>("dueDate");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  }

  const displayed = useMemo(() => {
    return projects
      .filter((p) => {
        const matchStatus = statusFilter === "all" || p.status === statusFilter;
        const q = search.toLowerCase();
        const matchSearch =
          q === "" ||
          p.name.toLowerCase().includes(q) ||
          p.clientName.toLowerCase().includes(q) ||
          p.season.toLowerCase().includes(q);
        return matchStatus && matchSearch;
      })
      .sort((a, b) => {
        let av: string | number = a[sortKey as keyof Project] as string | number;
        let bv: string | number = b[sortKey as keyof Project] as string | number;
        if (typeof av === "string") av = av.toLowerCase();
        if (typeof bv === "string") bv = bv.toLowerCase();
        if (av < bv) return sortDir === "asc" ? -1 : 1;
        if (av > bv) return sortDir === "asc" ? 1 : -1;
        return 0;
      });
  }, [search, statusFilter, sortKey, sortDir]);

  const SortIcon = ({ col }: { col: SortKey }) =>
    sortKey === col ? (
      sortDir === "asc" ? (
        <ChevronUp className="w-3 h-3 inline ml-1" />
      ) : (
        <ChevronDown className="w-3 h-3 inline ml-1" />
      )
    ) : null;

  const columns: { key: SortKey; label: string }[] = [
    { key: "name", label: "Project" },
    { key: "clientName", label: "Client" },
    { key: "season", label: "Season" },
    { key: "status", label: "Status" },
    { key: "progress", label: "Progress" },
    { key: "budget", label: "Budget" },
    { key: "dueDate", label: "Due Date" },
    { key: "pendingApprovals", label: "Pending" },
  ];

  return (
    <div className="space-y-8">
      {/* ── Page header ─────────────────────────────────────────── */}
      <div>
        <div className="border-b-4 border-foreground pb-4 mb-6">
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">
                Collection Pipeline
              </p>
              <h1 className="text-4xl font-black tracking-tight leading-none">
                Projects
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="rounded-none border-2 border-foreground font-bold uppercase tracking-wide text-xs gap-1.5">
                <Download className="w-3.5 h-3.5" />
                Export
              </Button>
              <Button size="sm" className="rounded-none bg-foreground text-background font-bold uppercase tracking-wide text-xs hover:bg-foreground/85">
                + New Project
              </Button>
            </div>
          </div>
        </div>

        {/* ── Filter bar ──────────────────────────────────────────── */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative flex-1 min-w-[220px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search projects, clients, seasons..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 rounded-none border-2 border-border focus-visible:border-foreground text-sm"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40 rounded-none border-2 border-border text-sm">
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent className="rounded-none">
              <SelectItem value="all">All Statuses</SelectItem>
              {Object.entries(projectStatusLabels).map(([k, v]) => (
                <SelectItem key={k} value={k}>{v}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <span className="text-sm text-muted-foreground font-mono shrink-0">
            {displayed.length} / {projects.length} collections
          </span>
        </div>
      </div>

      {/* ── Table ───────────────────────────────────────────────── */}
      <div className="border-2 border-foreground overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-b-2 border-foreground hover:bg-transparent">
                {columns.map((col) => (
                  <TableHead
                    key={col.key}
                    onClick={() => handleSort(col.key)}
                    className="bg-foreground text-background text-[10px] font-bold uppercase tracking-widest cursor-pointer select-none whitespace-nowrap py-3 hover:bg-foreground/85 transition-colors duration-200"
                  >
                    {col.label}
                    <SortIcon col={col.key} />
                  </TableHead>
                ))}
                <TableHead className="bg-foreground text-background text-[10px] font-bold uppercase tracking-widest py-3 w-8" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayed.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={columns.length + 1}
                    className="h-32 text-center text-sm text-muted-foreground"
                  >
                    No collections match this filter.
                  </TableCell>
                </TableRow>
              ) : (
                displayed.map((project) => (
                  <>
                    <TableRow
                      key={project.id}
                      className={cn(
                        "cursor-pointer border-b border-border transition-colors duration-200",
                        expandedId === project.id
                          ? "bg-[color:var(--surface-active)]"
                          : "hover:bg-[color:var(--surface-hover)]"
                      )}
                      onClick={() =>
                        setExpandedId(expandedId === project.id ? null : project.id)
                      }
                    >
                      <TableCell className="font-semibold text-sm py-3 max-w-[200px]">
                        <span className="line-clamp-1">{project.name}</span>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground py-3 whitespace-nowrap">
                        {project.clientName}
                      </TableCell>
                      <TableCell className="py-3">
                        <span className="font-mono text-xs font-bold text-[color:var(--primary)] bg-[color:var(--primary)]/8 px-2 py-0.5">
                          {project.season}
                        </span>
                      </TableCell>
                      <TableCell className="py-3">
                        <ProjectStatusBadge status={project.status} />
                      </TableCell>
                      <TableCell className="py-3 min-w-[130px]">
                        <ProgressBar value={project.progress} />
                      </TableCell>
                      <TableCell className="py-3 font-mono text-sm tabular-nums text-right whitespace-nowrap">
                        <div>
                          <span className="text-foreground font-semibold">
                            {formatBudget(project.budget)}
                          </span>
                          <span className="text-muted-foreground text-xs ml-1">
                            / {formatBudget(project.spent)} spent
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="py-3 font-mono text-xs text-muted-foreground whitespace-nowrap">
                        {formatDate(project.dueDate)}
                      </TableCell>
                      <TableCell className="py-3 text-center">
                        {project.pendingApprovals > 0 ? (
                          <span className="inline-flex items-center justify-center w-5 h-5 text-[10px] font-bold bg-[color:var(--warning)] text-background rounded-none">
                            {project.pendingApprovals}
                          </span>
                        ) : (
                          <span className="text-xs text-muted-foreground">—</span>
                        )}
                      </TableCell>
                      <TableCell className="py-3 text-right">
                        <ChevronRight
                          className={cn(
                            "w-4 h-4 text-muted-foreground transition-transform duration-200",
                            expandedId === project.id && "rotate-90"
                          )}
                        />
                      </TableCell>
                    </TableRow>

                    {/* Expanded timeline row */}
                    {expandedId === project.id && (
                      <TableRow
                        key={`${project.id}-timeline`}
                        className="border-b-2 border-foreground"
                      >
                        <TableCell
                          colSpan={columns.length + 1}
                          className="bg-muted/30 px-6 py-5"
                        >
                          <ProjectTimeline projectId={project.id} />
                        </TableCell>
                      </TableRow>
                    )}
                  </>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <p className="text-xs text-muted-foreground font-mono">
        Click any row to expand the T&amp;A phase timeline.
      </p>
    </div>
  );
}
