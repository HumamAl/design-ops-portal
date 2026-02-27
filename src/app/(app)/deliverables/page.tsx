"use client";

import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import {
  deliverables,
  deliverableStatusLabels,
  deliverableTypeLabels,
} from "@/data/mock-data";
import type { Deliverable, DeliverableStatus, DeliverableType } from "@/lib/types";
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
  MessageSquare,
  Download,
} from "lucide-react";

// ── Status badge ──────────────────────────────────────────────────────────────

function DeliverableStatusBadge({ status }: { status: DeliverableStatus }) {
  const config: Record<DeliverableStatus, { colorClass: string }> = {
    draft: {
      colorClass: "text-muted-foreground bg-muted",
    },
    "internal-review": {
      colorClass: "text-[color:var(--warning)] bg-[color:var(--warning)]/10",
    },
    "client-review": {
      colorClass: "text-[color:var(--primary)] bg-[color:var(--primary)]/10",
    },
    "revision-requested": {
      colorClass: "text-destructive bg-destructive/10",
    },
    approved: {
      colorClass: "text-[color:var(--success)] bg-[color:var(--success)]/10",
    },
    final: {
      colorClass: "text-[color:var(--success)] bg-[color:var(--success)]/15 font-black",
    },
  };
  const c = config[status] ?? { colorClass: "text-muted-foreground bg-muted" };
  return (
    <Badge
      variant="outline"
      className={cn(
        "text-[10px] font-bold uppercase tracking-widest border-0 rounded-none whitespace-nowrap",
        c.colorClass
      )}
    >
      {deliverableStatusLabels[status] ?? status}
    </Badge>
  );
}

// ── Type badge ────────────────────────────────────────────────────────────────

function DeliverableTypeBadge({ type }: { type: DeliverableType }) {
  const colorMap: Record<DeliverableType, string> = {
    "mood-board": "text-[color:var(--chart-1)] bg-[color:var(--chart-1)]/10",
    "tech-pack": "text-[color:var(--chart-2)] bg-[color:var(--chart-2)]/10",
    colorway: "text-[color:var(--chart-3)] bg-[color:var(--chart-3)]/10",
    "sample-photo": "text-[color:var(--chart-4)] bg-[color:var(--chart-4)]/10",
    "spec-sheet": "text-[color:var(--chart-5)] bg-[color:var(--chart-5)]/10",
    lookbook: "text-[color:var(--accent)] bg-[color:var(--accent)]/10",
    "line-sheet": "text-muted-foreground bg-muted",
  };
  return (
    <Badge
      variant="outline"
      className={cn(
        "text-[10px] font-bold uppercase tracking-widest border-0 rounded-none whitespace-nowrap",
        colorMap[type]
      )}
    >
      {deliverableTypeLabels[type] ?? type}
    </Badge>
  );
}

// ── Pipeline status counts ────────────────────────────────────────────────────

const PIPELINE_STAGES: DeliverableStatus[] = [
  "draft",
  "internal-review",
  "client-review",
  "approved",
  "final",
];

const STAGE_COLORS: Record<string, string> = {
  draft: "bg-muted",
  "internal-review": "bg-[color:var(--warning)]",
  "client-review": "bg-[color:var(--primary)]",
  "revision-requested": "bg-destructive",
  approved: "bg-[color:var(--success)]",
  final: "bg-[color:var(--success)]",
};

function PipelineBar() {
  const counts = PIPELINE_STAGES.map((stage) => ({
    status: stage,
    count: deliverables.filter((d) => d.status === stage).length,
  }));
  const revisionCount = deliverables.filter(
    (d) => d.status === "revision-requested"
  ).length;

  return (
    <div className="border-2 border-foreground bg-card">
      <div className="border-b-4 border-foreground px-5 py-3">
        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
          Approval Pipeline
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 divide-x divide-border">
        {counts.map(({ status, count }) => (
          <div key={status} className="p-4">
            <div className={cn("w-full h-1 mb-3", STAGE_COLORS[status])} />
            <p className="text-2xl font-black leading-none mb-1">{count}</p>
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground leading-tight">
              {deliverableStatusLabels[status]}
            </p>
          </div>
        ))}
        {/* Revision requested as separate alert column */}
        <div className="p-4">
          <div className={cn("w-full h-1 mb-3", STAGE_COLORS["revision-requested"])} />
          <p className="text-2xl font-black leading-none mb-1 text-destructive">
            {revisionCount}
          </p>
          <p className="text-[10px] font-bold uppercase tracking-widest text-destructive/70 leading-tight">
            Revision Req.
          </p>
        </div>
      </div>
    </div>
  );
}

// ── Format helpers ────────────────────────────────────────────────────────────

function formatDate(s: string) {
  return new Date(s).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "2-digit",
  });
}

type SortKey = "name" | "projectName" | "type" | "status" | "version" | "assignedToName" | "commentCount" | "updatedAt";

// ── Main page ─────────────────────────────────────────────────────────────────

export default function DeliverablesPage() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortKey, setSortKey] = useState<SortKey>("updatedAt");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  }

  const displayed = useMemo(() => {
    return deliverables
      .filter((d) => {
        const matchType = typeFilter === "all" || d.type === typeFilter;
        const matchStatus = statusFilter === "all" || d.status === statusFilter;
        const q = search.toLowerCase();
        const matchSearch =
          q === "" ||
          d.name.toLowerCase().includes(q) ||
          d.projectName.toLowerCase().includes(q) ||
          d.assignedToName.toLowerCase().includes(q);
        return matchType && matchStatus && matchSearch;
      })
      .sort((a, b) => {
        let av: string | number = a[sortKey as keyof Deliverable] as string | number;
        let bv: string | number = b[sortKey as keyof Deliverable] as string | number;
        if (typeof av === "string") av = av.toLowerCase();
        if (typeof bv === "string") bv = bv.toLowerCase();
        if (av < bv) return sortDir === "asc" ? -1 : 1;
        if (av > bv) return sortDir === "asc" ? 1 : -1;
        return 0;
      });
  }, [search, typeFilter, statusFilter, sortKey, sortDir]);

  const SortIcon = ({ col }: { col: SortKey }) =>
    sortKey === col ? (
      sortDir === "asc" ? (
        <ChevronUp className="w-3 h-3 inline ml-1" />
      ) : (
        <ChevronDown className="w-3 h-3 inline ml-1" />
      )
    ) : null;

  const columns: { key: SortKey; label: string }[] = [
    { key: "name", label: "Asset Name" },
    { key: "projectName", label: "Collection" },
    { key: "type", label: "Type" },
    { key: "status", label: "Status" },
    { key: "version", label: "Ver." },
    { key: "assignedToName", label: "Designer" },
    { key: "commentCount", label: "Notes" },
    { key: "updatedAt", label: "Last Updated" },
  ];

  return (
    <div className="space-y-8">
      {/* ── Page header ─────────────────────────────────────────── */}
      <div className="border-b-4 border-foreground pb-4">
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">
              Design Assets
            </p>
            <h1 className="text-4xl font-black tracking-tight leading-none">
              Deliverables
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="rounded-none border-2 border-foreground font-bold uppercase tracking-wide text-xs gap-1.5">
              <Download className="w-3.5 h-3.5" />
              Export
            </Button>
            <Button size="sm" className="rounded-none bg-foreground text-background font-bold uppercase tracking-wide text-xs hover:bg-foreground/85">
              + Upload Asset
            </Button>
          </div>
        </div>
      </div>

      {/* ── Pipeline bar ──────────────────────────────────────────── */}
      <PipelineBar />

      {/* ── Filter bar ──────────────────────────────────────────── */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search assets, collections, designers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 rounded-none border-2 border-border focus-visible:border-foreground text-sm"
          />
        </div>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-40 rounded-none border-2 border-border text-sm">
            <SelectValue placeholder="All Types" />
          </SelectTrigger>
          <SelectContent className="rounded-none">
            <SelectItem value="all">All Types</SelectItem>
            {Object.entries(deliverableTypeLabels).map(([k, v]) => (
              <SelectItem key={k} value={k}>{v}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-44 rounded-none border-2 border-border text-sm">
            <SelectValue placeholder="All Statuses" />
          </SelectTrigger>
          <SelectContent className="rounded-none">
            <SelectItem value="all">All Statuses</SelectItem>
            {Object.entries(deliverableStatusLabels).map(([k, v]) => (
              <SelectItem key={k} value={k}>{v}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <span className="text-sm text-muted-foreground font-mono shrink-0">
          {displayed.length} / {deliverables.length} assets
        </span>
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
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayed.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-32 text-center text-sm text-muted-foreground"
                  >
                    No design assets match this filter.
                  </TableCell>
                </TableRow>
              ) : (
                displayed.map((del) => (
                  <TableRow
                    key={del.id}
                    className="border-b border-border hover:bg-[color:var(--surface-hover)] transition-colors duration-200"
                  >
                    <TableCell className="font-semibold text-sm py-3 max-w-[220px]">
                      <span className="line-clamp-1">{del.name}</span>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground py-3 whitespace-nowrap max-w-[160px]">
                      <span className="line-clamp-1">{del.projectName}</span>
                    </TableCell>
                    <TableCell className="py-3">
                      <DeliverableTypeBadge type={del.type} />
                    </TableCell>
                    <TableCell className="py-3">
                      <DeliverableStatusBadge status={del.status} />
                    </TableCell>
                    <TableCell className="py-3 text-center">
                      <span className="font-mono text-xs font-bold text-muted-foreground">
                        v{del.version}
                      </span>
                    </TableCell>
                    <TableCell className="text-sm py-3 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 bg-[color:var(--primary)]/10 flex items-center justify-center text-[8px] font-black text-[color:var(--primary)] shrink-0">
                          {del.assignedToName
                            .split(" ")
                            .map((n) => n[0])
                            .slice(0, 2)
                            .join("")}
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {del.assignedToName.split(" ")[0]}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="py-3 text-center">
                      {del.commentCount > 0 ? (
                        <div className="flex items-center gap-1 justify-center text-xs text-muted-foreground">
                          <MessageSquare className="w-3 h-3" />
                          <span className="font-mono">{del.commentCount}</span>
                        </div>
                      ) : (
                        <span className="text-xs text-muted-foreground">—</span>
                      )}
                    </TableCell>
                    <TableCell className="text-xs font-mono text-muted-foreground py-3 whitespace-nowrap">
                      {formatDate(del.updatedAt)}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
