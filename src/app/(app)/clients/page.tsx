"use client";

import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { clients } from "@/data/mock-data";
import type { ClientOrganization } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, Users, TrendingUp, Clock, Plus } from "lucide-react";

// ── Status badge ──────────────────────────────────────────────────────────────

function ClientStatusBadge({ status }: { status: ClientOrganization["status"] }) {
  const config: Record<ClientOrganization["status"], { label: string; colorClass: string }> = {
    active: {
      label: "Active",
      colorClass: "text-[color:var(--success)] bg-[color:var(--success)]/10",
    },
    onboarding: {
      label: "Onboarding",
      colorClass: "text-[color:var(--warning)] bg-[color:var(--warning)]/10",
    },
    inactive: {
      label: "Inactive",
      colorClass: "text-muted-foreground bg-muted",
    },
  };
  const c = config[status];
  return (
    <Badge
      variant="outline"
      className={cn("text-[10px] font-bold uppercase tracking-widest border-0 rounded-none", c.colorClass)}
    >
      {c.label}
    </Badge>
  );
}

// ── Format helpers ────────────────────────────────────────────────────────────

function formatBudget(n: number) {
  if (n >= 1000000) return `$${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `$${(n / 1000).toFixed(0)}k`;
  return `$${n}`;
}

function formatDate(s: string) {
  return new Date(s).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

// ── Client card ───────────────────────────────────────────────────────────────

function ClientCard({ client, index }: { client: ClientOrganization; index: number }) {
  return (
    <div
      className="bg-card border-l-4 border-l-[color:var(--primary)] border border-border group cursor-pointer transition-all duration-200 hover:border-l-[color:var(--primary)] hover:shadow-sm"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 bg-[color:var(--primary)]/10 flex items-center justify-center shrink-0 border border-[color:var(--primary)]/20">
              <span className="text-xs font-black text-[color:var(--primary)] tracking-tight">
                {getInitials(client.name)}
              </span>
            </div>
            <div className="min-w-0">
              <h3 className="font-black text-sm tracking-tight leading-tight truncate">
                {client.name}
              </h3>
              <p className="text-xs text-muted-foreground truncate mt-0.5">
                {client.contactName}
              </p>
            </div>
          </div>
          <ClientStatusBadge status={client.status} />
        </div>

        {/* Divider */}
        <div className="border-t border-border mb-4" />

        {/* Metrics grid */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-0.5">
              Active Collections
            </p>
            <p className="text-2xl font-black leading-none text-foreground">
              {client.activeProjects}
            </p>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-0.5">
              Total Budget
            </p>
            <p className="text-2xl font-black leading-none text-[color:var(--primary)]">
              {formatBudget(client.totalBudget)}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 pt-3 border-t border-border flex items-center justify-between">
          <div className="flex items-center gap-1 text-[10px] text-muted-foreground font-mono uppercase tracking-wide">
            <Clock className="w-3 h-3" />
            Since {formatDate(client.joinedDate)}
          </div>
          <a
            href={`mailto:${client.contactEmail}`}
            className="text-[10px] font-bold uppercase tracking-widest text-[color:var(--primary)] hover:underline"
            onClick={(e) => e.stopPropagation()}
          >
            Contact ↗
          </a>
        </div>
      </div>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function ClientsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const displayed = useMemo(() => {
    return clients.filter((c) => {
      const matchStatus = statusFilter === "all" || c.status === statusFilter;
      const q = search.toLowerCase();
      const matchSearch =
        q === "" ||
        c.name.toLowerCase().includes(q) ||
        c.contactName.toLowerCase().includes(q) ||
        c.contactEmail.toLowerCase().includes(q);
      return matchStatus && matchSearch;
    });
  }, [search, statusFilter]);

  // Summary stats
  const total = clients.length;
  const active = clients.filter((c) => c.status === "active").length;
  const onboarding = clients.filter((c) => c.status === "onboarding").length;
  const avgBudget = Math.round(
    clients.reduce((sum, c) => sum + c.totalBudget, 0) / clients.length
  );

  return (
    <div className="space-y-8">
      {/* ── Page header ─────────────────────────────────────────── */}
      <div className="border-b-4 border-foreground pb-4">
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">
              Brand Roster
            </p>
            <h1 className="text-4xl font-black tracking-tight leading-none">
              Clients
            </h1>
          </div>
          <Button size="sm" className="rounded-none bg-foreground text-background font-bold uppercase tracking-wide text-xs gap-1.5 hover:bg-foreground/85">
            <Plus className="w-3.5 h-3.5" />
            Onboard Client
          </Button>
        </div>
      </div>

      {/* ── Summary stats row ───────────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-0 border-2 border-foreground divide-x-2 divide-foreground">
        {[
          { label: "Total Brands", value: total, icon: Users },
          { label: "Active", value: active, icon: TrendingUp },
          { label: "Onboarding", value: onboarding, icon: Clock },
          { label: "Avg. Budget", value: formatBudget(avgBudget), icon: null },
        ].map((stat, i) => (
          <div key={i} className="p-4 bg-card">
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">
              {stat.label}
            </p>
            <p className="text-3xl font-black leading-none tracking-tight">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* ── Filter bar ──────────────────────────────────────────── */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[220px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search brands, contacts..."
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
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="onboarding">Onboarding</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
        <span className="text-sm text-muted-foreground font-mono shrink-0">
          {displayed.length} {displayed.length === 1 ? "brand" : "brands"}
        </span>
      </div>

      {/* ── Client grid ─────────────────────────────────────────── */}
      {displayed.length === 0 ? (
        <div className="border-2 border-dashed border-border py-16 text-center">
          <p className="text-sm text-muted-foreground">
            No brands match this filter.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayed.map((client, i) => (
            <ClientCard key={client.id} client={client} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
