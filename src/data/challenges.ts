import type { Challenge } from "@/lib/types";

export interface ExecutiveSummaryData {
  commonApproach: string;
  differentApproach: string;
  accentWord?: string;
}

export const executiveSummary: ExecutiveSummaryData = {
  commonApproach:
    "Most developers stitch together existing project tools — bolting Asana for tasks, Google Drive for files, and email for approvals — leaving your team to maintain three context windows per project while clients still get lost in folder hierarchies.",
  differentApproach:
    "I'd build a single data model that treats tenant isolation, role-gated views, and structured approval state as first-class architecture decisions from day one — not features added after the fact.",
  accentWord: "first-class architecture decisions",
};

export const challenges: Challenge[] = [
  {
    id: "challenge-1",
    title: "Multi-Tenant Data Isolation",
    description:
      "With 40–50 active clients, each running separate projects and teams, the data model must enforce strict tenant boundaries. Internal designers who cross client accounts need seamless access — without ever risking data bleed between organizations.",
    visualizationType: "architecture",
    outcome:
      "Could reduce per-client onboarding from days of manual setup to a single invite link — with automatic data isolation guaranteed at the database level.",
  },
  {
    id: "challenge-2",
    title: "Structured Approval Workflow",
    description:
      "Fashion deliverables cycle through internal design review, then client review, with revision requests possible at any stage. The system must preserve draft versions, thread comments to specific versions, and maintain a full approval audit trail across every revision round.",
    visualizationType: "flow",
    outcome:
      "Could cut revision turnaround from 3–5 day email chains to same-day threaded feedback — with full version history and an approval audit trail that PMs can share with clients instantly.",
  },
  {
    id: "challenge-3",
    title: "Time & Action Calendar Across Seasons",
    description:
      "Fashion projects span 12–16 months with overlapping phases — concept, development, sampling, production. A structured T&A view must show phase dependencies, flag overdue milestones, and give PMs visibility across all active projects at a glance.",
    visualizationType: "timeline",
    outcome:
      "Could replace disconnected Asana timelines with a unified T&A view — making it possible to spot schedule conflicts across 10+ concurrent projects before they become production delays.",
  },
  {
    id: "challenge-4",
    title: "Role-Based Access Control",
    description:
      "Four distinct roles — Admin, PM, Designer, Client — need different views of the same data. Clients see only their own projects and approved deliverables. Designers see assigned work. PMs see their portfolio. Admins see everything.",
    visualizationType: "before-after",
    outcome:
      "Could eliminate the access-control workarounds currently handled via separate Google Drive folders — consolidating permissions into a single, auditable system with zero manual folder management.",
  },
];
