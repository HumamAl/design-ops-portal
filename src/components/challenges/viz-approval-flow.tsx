"use client";

import { useState } from "react";
import type { ElementType } from "react";
import {
  FileEdit,
  Eye,
  UserCheck,
  CheckCircle2,
  RotateCcw,
  ArrowRight,
  ArrowDown,
  MessageSquare,
} from "lucide-react";

type ViewMode = "current" | "proposed";

interface WorkflowStep {
  label: string;
  description: string;
  icon: ElementType;
  highlight?: boolean;
  status?: "good" | "problem" | "neutral";
}

const currentWorkflow: WorkflowStep[] = [
  {
    label: "Designer finishes draft",
    description: "Saved to personal Drive folder",
    icon: FileEdit,
    status: "neutral",
  },
  {
    label: "Email to PM for review",
    description: "File attached, version unclear",
    icon: MessageSquare,
    status: "problem",
  },
  {
    label: "PM emails client",
    description: "With attachment + context from memory",
    icon: MessageSquare,
    status: "problem",
  },
  {
    label: "Client replies via email",
    description: "Feedback scattered across thread",
    icon: RotateCcw,
    status: "problem",
  },
  {
    label: "Repeat 3–5 rounds",
    description: "No audit trail, versions lost",
    icon: RotateCcw,
    status: "problem",
  },
];

const proposedWorkflow: WorkflowStep[] = [
  {
    label: "Draft uploaded",
    description: "Version auto-numbered, linked to deliverable",
    icon: FileEdit,
    status: "good",
  },
  {
    label: "Internal review",
    description: "PM + lead designer comment on version",
    icon: Eye,
    status: "good",
  },
  {
    label: "Client review",
    description: "Client sees only their portal — threaded comments",
    icon: UserCheck,
    status: "good",
    highlight: true,
  },
  {
    label: "Revision loop",
    description: "New version created, previous preserved",
    icon: RotateCcw,
    status: "good",
  },
  {
    label: "Approved + locked",
    description: "Audit trail stamped with timestamp + approver",
    icon: CheckCircle2,
    status: "good",
  },
];

const statusColors: Record<string, { bg: string; border: string; text: string; icon: string }> = {
  good: {
    bg: "color-mix(in oklch, var(--success) 8%, transparent)",
    border: "color-mix(in oklch, var(--success) 20%, transparent)",
    text: "inherit",
    icon: "var(--success)",
  },
  problem: {
    bg: "color-mix(in oklch, var(--destructive) 8%, transparent)",
    border: "color-mix(in oklch, var(--destructive) 20%, transparent)",
    text: "inherit",
    icon: "oklch(0.577 0.245 27.325)",
  },
  neutral: {
    bg: "color-mix(in oklch, var(--border), transparent 60%)",
    border: "color-mix(in oklch, var(--border), transparent 20%)",
    text: "inherit",
    icon: "var(--muted-foreground)",
  },
};

export function VizApprovalFlow() {
  const [view, setView] = useState<ViewMode>("current");
  const steps = view === "current" ? currentWorkflow : proposedWorkflow;

  return (
    <div className="space-y-4">
      {/* Toggle */}
      <div className="flex gap-0 border border-border/60 w-fit">
        <button
          onClick={() => setView("current")}
          className="px-4 py-1.5 text-xs font-medium transition-colors"
          style={{
            transitionDuration: "var(--dur-normal)",
            backgroundColor:
              view === "current"
                ? "color-mix(in oklch, var(--destructive) 10%, transparent)"
                : "transparent",
            color:
              view === "current"
                ? "oklch(0.577 0.245 27.325)"
                : "var(--muted-foreground)",
            borderRight: "1px solid var(--border)",
          }}
        >
          Current workflow
        </button>
        <button
          onClick={() => setView("proposed")}
          className="px-4 py-1.5 text-xs font-medium transition-colors"
          style={{
            transitionDuration: "var(--dur-normal)",
            backgroundColor:
              view === "proposed"
                ? "color-mix(in oklch, var(--success) 10%, transparent)"
                : "transparent",
            color:
              view === "proposed" ? "var(--success)" : "var(--muted-foreground)",
          }}
        >
          Proposed workflow
        </button>
      </div>

      {/* Steps — vertical on mobile, horizontal on md+ */}
      <div className="flex flex-col md:flex-row items-stretch md:items-start gap-2 flex-wrap">
        {steps.map((step, i) => {
          const s = statusColors[step.status ?? "neutral"];
          const Icon = step.icon;
          return (
            <div key={i} className="flex flex-col md:flex-row items-center gap-2">
              <div
                className="flex flex-col items-start gap-1 px-3 py-2.5 min-w-[130px] flex-1 md:flex-none"
                style={{
                  backgroundColor: s.bg,
                  borderColor: s.border,
                  borderWidth: "1px",
                  borderStyle: "solid",
                  ...(step.highlight
                    ? {
                        borderColor: "color-mix(in oklch, var(--primary) 40%, transparent)",
                        backgroundColor:
                          "color-mix(in oklch, var(--primary) 8%, transparent)",
                      }
                    : {}),
                }}
              >
                <Icon
                  className="h-3.5 w-3.5"
                  style={{ color: step.highlight ? "var(--primary)" : s.icon }}
                />
                <p className="text-xs font-semibold leading-snug">{step.label}</p>
                <p className="text-[10px] text-muted-foreground leading-snug">
                  {step.description}
                </p>
              </div>
              {i < steps.length - 1 && (
                <>
                  <ArrowRight className="h-3.5 w-3.5 text-muted-foreground shrink-0 hidden md:block" />
                  <ArrowDown className="h-3.5 w-3.5 text-muted-foreground shrink-0 md:hidden" />
                </>
              )}
            </div>
          );
        })}
      </div>

      {view === "current" && (
        <p className="text-xs text-muted-foreground italic">
          Average turnaround: 3–5 days per revision round. No version history.
        </p>
      )}
      {view === "proposed" && (
        <p className="text-xs text-muted-foreground italic">
          Target: same-day feedback loop. Every version preserved, every approval timestamped.
        </p>
      )}
    </div>
  );
}
