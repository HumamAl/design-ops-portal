// proposal.ts — Tab 3: Work With Me
// All content data for the Proposal page.
// Visual treatment: Bold Editorial (0rem radius, dramatic whitespace, type-as-hero, thick dividers)
// Domain: Fashion design agency operations SaaS (multi-tenant, approval workflows, client portal)

import { APP_CONFIG } from "@/lib/config";

export const proposalData = {
  hero: {
    name: "Humam",
    badge: "Built this demo for your project",
    rolePrefix: "Full-Stack Developer · Multi-Tenant SaaS",
    valueProp:
      "Full-stack developer who builds multi-tenant SaaS platforms — from data isolation to approval workflows, shipped fast. The portal in Tab 1 is built specifically for your agency.",
    stats: [
      { value: "24+", label: "Projects Shipped" },
      { value: "15+", label: "Industries" },
      { value: "< 48hr", label: "Demo Turnaround" },
    ],
  },

  portfolioProjects: [
    {
      id: "dealer-hub",
      name: "DealerHub — Automotive SaaS",
      description:
        "Multi-tenant automotive dealership platform with vehicle inventory management, AI-powered lead scoring, appraisals, and reconditioning pipeline tracking.",
      outcome:
        "Full dealership ops platform — inventory, leads, appraisals, and reconditioning all in one place",
      tech: ["Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui", "Recharts"],
      url: "https://dealer-platform-neon.vercel.app",
      relevance:
        "Multi-tenant architecture with role-based access — same pattern your portal needs",
    },
    {
      id: "fleet-saas",
      name: "Fleet Maintenance SaaS",
      description:
        "Fleet and maintenance management platform with asset tracking, work orders, preventive maintenance scheduling, inspections, parts inventory, and analytics dashboard.",
      outcome:
        "6-module SaaS covering the full maintenance lifecycle — from asset registry to work orders to parts inventory",
      tech: ["Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui", "Recharts"],
      url: null,
      relevance: "Multi-module operations SaaS with complex data relationships — similar scope",
    },
    {
      id: "sienna-vendor",
      name: "Sienna Charles — Vendor Admin",
      description:
        "Luxury vendor management platform with vendor directory, map-based discovery, AI-powered search, and booking management with spend analytics.",
      outcome:
        "Vendor discovery and booking platform with map view, category filters, and spend tracking per booking",
      tech: ["Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui", "Recharts"],
      url: "https://sienna-vendor-admin.vercel.app",
      relevance: "Client-facing portal with admin backend — luxury/creative industry adjacent",
    },
    {
      id: "lead-crm",
      name: "Lead Intake CRM",
      description:
        "Custom lead intake and automation system with public intake form, CRM dashboard, lead scoring, pipeline management, and automation rules engine.",
      outcome:
        "End-to-end lead flow — public intake form to scored pipeline with configurable automation rules",
      tech: ["Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui"],
      url: null,
      relevance: "Workflow automation with role-based views and approval pipelines",
    },
  ],

  approach: [
    {
      step: "01",
      title: "Map the Data Model",
      description:
        "Start with tenant isolation, roles, and the deliverable lifecycle. Get the hard architecture decisions right before writing UI — a bad schema is expensive to fix mid-build.",
      timeline: "Week 1",
    },
    {
      step: "02",
      title: "Build Core Workflows",
      description:
        "Draft review, approval flow, comment threads — the interactions that replace Asana and Google Drive. Ship a working prototype in 2–3 weeks with real navigable screens.",
      timeline: "Weeks 2–3",
    },
    {
      step: "03",
      title: "Layer the Client Portal",
      description:
        "Role-based views so clients see only their projects and approved deliverables. Clean, polished interface they'll actually use — no training manual required.",
      timeline: "Week 4",
    },
    {
      step: "04",
      title: "Iterate with Real Feedback",
      description:
        "Weekly demos, async updates. Refine based on your team's actual workflow, not assumptions. Short cycles mean no 2-week wait for a small change.",
      timeline: "Ongoing",
    },
  ],

  skills: [
    {
      category: "Frontend",
      items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "shadcn/ui", "Recharts"],
    },
    {
      category: "Backend & Data",
      items: ["Database Architecture", "REST APIs", "API Integration", "AWS"],
    },
    {
      category: "Platform",
      items: ["Multi-tenant SaaS", "Role-based Access Control", "Real-time Updates"],
    },
    {
      category: "AI-Assisted Dev",
      items: ["Claude API", "AI-powered workflows", "Prompt Engineering"],
    },
  ],

  cta: {
    headline: "Ready to replace Asana + Drive + Slack with one portal your clients will actually use.",
    body: `The demo in Tab 1 shows the deliverable workflow, approval queue, and client portal already working. The real build starts from this foundation — not a blank canvas.`,
    action: "Reply on Upwork to start",
    availability: "Currently available for new projects",
    projectRef: APP_CONFIG.projectName,
  },
} as const;

// Type exports for downstream use
export type ProposalHero = typeof proposalData.hero;
export type ProposalProject = typeof proposalData.portfolioProjects[number];
export type ProposalStep = typeof proposalData.approach[number];
export type SkillCategory = typeof proposalData.skills[number];
