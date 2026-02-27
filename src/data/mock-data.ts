import type {
  TeamMember,
  ClientOrganization,
  Project,
  Deliverable,
  Comment,
  ActivityEntry,
  TimelinePhase,
  DashboardStat,
  MonthlyData,
  ProjectBudgetData,
} from "@/lib/types";

// ═══════════════════════════════════════════════════════════════
// TEAM MEMBERS (5-7 per project, multiple roles)
// ═══════════════════════════════════════════════════════════════

export const teamMembers: TeamMember[] = [
  { id: "tm-1", name: "Elena Voss", email: "elena@designops.co", role: "admin", avatar: "EV", organizationId: "org-internal" },
  { id: "tm-2", name: "Marcus Chen", email: "marcus@designops.co", role: "pm", avatar: "MC", organizationId: "org-internal" },
  { id: "tm-3", name: "Aya Nakamura", email: "aya@designops.co", role: "designer", avatar: "AN", organizationId: "org-internal" },
  { id: "tm-4", name: "Jules Moreau", email: "jules@designops.co", role: "designer", avatar: "JM", organizationId: "org-internal" },
  { id: "tm-5", name: "Sofia Reyes", email: "sofia@designops.co", role: "pm", avatar: "SR", organizationId: "org-internal" },
  { id: "tm-6", name: "Theo Park", email: "theo@designops.co", role: "designer", avatar: "TP", organizationId: "org-internal" },
  { id: "tm-7", name: "Lena Braun", email: "lena@designops.co", role: "designer", avatar: "LB", organizationId: "org-internal" },
  // Client contacts
  { id: "tm-8", name: "Rachel Kim", email: "rachel@modahaus.com", role: "client", avatar: "RK", organizationId: "org-1" },
  { id: "tm-9", name: "David Archer", email: "david@noxapparel.com", role: "client", avatar: "DA", organizationId: "org-2" },
  { id: "tm-10", name: "Camille Dupont", email: "camille@atelierbleu.fr", role: "client", avatar: "CD", organizationId: "org-3" },
  { id: "tm-11", name: "Priya Sharma", email: "priya@silkroute.in", role: "client", avatar: "PS", organizationId: "org-4" },
  { id: "tm-12", name: "Lucas Ferreira", email: "lucas@verdestudio.br", role: "client", avatar: "LF", organizationId: "org-5" },
];

// ═══════════════════════════════════════════════════════════════
// CLIENT ORGANIZATIONS (fashion brands, 40-50 scale shown via 15)
// ═══════════════════════════════════════════════════════════════

export const clients: ClientOrganization[] = [
  { id: "org-1", name: "Moda Haus", contactName: "Rachel Kim", contactEmail: "rachel@modahaus.com", activeProjects: 3, totalBudget: 285000, joinedDate: "2024-03-15", status: "active" },
  { id: "org-2", name: "NOX Apparel", contactName: "David Archer", contactEmail: "david@noxapparel.com", activeProjects: 2, totalBudget: 190000, joinedDate: "2024-06-01", status: "active" },
  { id: "org-3", name: "Atelier Bleu", contactName: "Camille Dupont", contactEmail: "camille@atelierbleu.fr", activeProjects: 1, totalBudget: 145000, joinedDate: "2024-09-20", status: "active" },
  { id: "org-4", name: "Silk Route Collective", contactName: "Priya Sharma", contactEmail: "priya@silkroute.in", activeProjects: 2, totalBudget: 210000, joinedDate: "2024-01-10", status: "active" },
  { id: "org-5", name: "Verde Studio", contactName: "Lucas Ferreira", contactEmail: "lucas@verdestudio.br", activeProjects: 1, totalBudget: 120000, joinedDate: "2025-01-05", status: "onboarding" },
  { id: "org-6", name: "Kairos Menswear", contactName: "Alex Petrov", contactEmail: "alex@kairos.co", activeProjects: 2, totalBudget: 175000, joinedDate: "2024-04-18", status: "active" },
  { id: "org-7", name: "Lume Athletics", contactName: "Hannah Torres", contactEmail: "hannah@lumeathletics.com", activeProjects: 1, totalBudget: 98000, joinedDate: "2024-11-12", status: "active" },
  { id: "org-8", name: "Reverie Bridal", contactName: "Isabelle Dumont", contactEmail: "isabelle@reverie.com", activeProjects: 1, totalBudget: 165000, joinedDate: "2024-07-22", status: "active" },
  { id: "org-9", name: "Oska Outerwear", contactName: "Erik Lindqvist", contactEmail: "erik@oska.se", activeProjects: 0, totalBudget: 88000, joinedDate: "2024-02-01", status: "inactive" },
  { id: "org-10", name: "Bloom Kidswear", contactName: "Mei Lin", contactEmail: "mei@bloomkids.com", activeProjects: 1, totalBudget: 72000, joinedDate: "2025-02-01", status: "onboarding" },
  { id: "org-11", name: "Selene Swimwear", contactName: "Nadia Costa", contactEmail: "nadia@selene.co", activeProjects: 1, totalBudget: 135000, joinedDate: "2024-08-15", status: "active" },
  { id: "org-12", name: "Drift Streetwear", contactName: "Jamal Harris", contactEmail: "jamal@driftstreet.com", activeProjects: 2, totalBudget: 155000, joinedDate: "2024-05-30", status: "active" },
  { id: "org-13", name: "Aurelia Couture", contactName: "Valentina Rossi", contactEmail: "valentina@aurelia.it", activeProjects: 1, totalBudget: 310000, joinedDate: "2024-01-20", status: "active" },
  { id: "org-14", name: "Tandem Denim", contactName: "Cory Blake", contactEmail: "cory@tandemdenim.com", activeProjects: 1, totalBudget: 92000, joinedDate: "2024-10-08", status: "active" },
  { id: "org-15", name: "Nuvola Accessories", contactName: "Layla Hassan", contactEmail: "layla@nuvola.ae", activeProjects: 1, totalBudget: 78000, joinedDate: "2025-01-18", status: "active" },
];

// ═══════════════════════════════════════════════════════════════
// PROJECTS (12-16 month fashion cycles, seasonal collections)
// ═══════════════════════════════════════════════════════════════

export const projects: Project[] = [
  { id: "proj-1", name: "SS26 Ready-to-Wear", clientId: "org-1", clientName: "Moda Haus", season: "SS26", status: "active", startDate: "2025-09-01", dueDate: "2026-06-15", progress: 35, budget: 95000, spent: 32000, teamMembers: ["tm-2", "tm-3", "tm-4"], deliverableCount: 18, pendingApprovals: 3 },
  { id: "proj-2", name: "FW26 Capsule Collection", clientId: "org-1", clientName: "Moda Haus", season: "FW26", status: "active", startDate: "2025-11-01", dueDate: "2026-09-30", progress: 12, budget: 110000, spent: 11500, teamMembers: ["tm-2", "tm-6"], deliverableCount: 6, pendingApprovals: 1 },
  { id: "proj-3", name: "Resort 25 Accessories", clientId: "org-1", clientName: "Moda Haus", season: "Resort 25", status: "in-review", startDate: "2025-01-15", dueDate: "2025-08-01", progress: 88, budget: 80000, spent: 71000, teamMembers: ["tm-5", "tm-7"], deliverableCount: 22, pendingApprovals: 5 },
  { id: "proj-4", name: "FW25 Urban Line", clientId: "org-2", clientName: "NOX Apparel", season: "FW25", status: "completed", startDate: "2024-10-01", dueDate: "2025-07-15", progress: 100, budget: 90000, spent: 87500, teamMembers: ["tm-2", "tm-3"], deliverableCount: 24, pendingApprovals: 0 },
  { id: "proj-5", name: "SS26 Streetwear Drop", clientId: "org-2", clientName: "NOX Apparel", season: "SS26", status: "active", startDate: "2025-10-15", dueDate: "2026-05-01", progress: 22, budget: 75000, spent: 14200, teamMembers: ["tm-5", "tm-4", "tm-6"], deliverableCount: 10, pendingApprovals: 2 },
  { id: "proj-6", name: "FW26 Haute Couture", clientId: "org-3", clientName: "Atelier Bleu", season: "FW26", status: "active", startDate: "2025-12-01", dueDate: "2026-10-15", progress: 8, budget: 145000, spent: 9800, teamMembers: ["tm-2", "tm-3", "tm-7"], deliverableCount: 4, pendingApprovals: 0 },
  { id: "proj-7", name: "SS26 Silk Collection", clientId: "org-4", clientName: "Silk Route Collective", season: "SS26", status: "active", startDate: "2025-08-01", dueDate: "2026-04-30", progress: 45, budget: 105000, spent: 46000, teamMembers: ["tm-5", "tm-4"], deliverableCount: 16, pendingApprovals: 4 },
  { id: "proj-8", name: "Pre-Fall 25 Knits", clientId: "org-4", clientName: "Silk Route Collective", season: "Pre-Fall 25", status: "in-review", startDate: "2025-03-01", dueDate: "2025-10-01", progress: 78, budget: 68000, spent: 52000, teamMembers: ["tm-2", "tm-6"], deliverableCount: 14, pendingApprovals: 3 },
  { id: "proj-9", name: "SS26 Eco Capsule", clientId: "org-5", clientName: "Verde Studio", season: "SS26", status: "active", startDate: "2026-01-10", dueDate: "2026-07-01", progress: 5, budget: 120000, spent: 4200, teamMembers: ["tm-5", "tm-3"], deliverableCount: 2, pendingApprovals: 0 },
  { id: "proj-10", name: "FW25 Tailored Edit", clientId: "org-6", clientName: "Kairos Menswear", season: "FW25", status: "completed", startDate: "2024-11-01", dueDate: "2025-08-30", progress: 100, budget: 82000, spent: 79500, teamMembers: ["tm-2", "tm-7"], deliverableCount: 20, pendingApprovals: 0 },
  { id: "proj-11", name: "SS26 Performance Line", clientId: "org-7", clientName: "Lume Athletics", season: "SS26", status: "active", startDate: "2025-09-15", dueDate: "2026-05-15", progress: 30, budget: 98000, spent: 28000, teamMembers: ["tm-5", "tm-4", "tm-6"], deliverableCount: 12, pendingApprovals: 2 },
  { id: "proj-12", name: "SS26 Bridal Capsule", clientId: "org-8", clientName: "Reverie Bridal", season: "SS26", status: "on-hold", startDate: "2025-10-01", dueDate: "2026-06-30", progress: 18, budget: 165000, spent: 22000, teamMembers: ["tm-2", "tm-3"], deliverableCount: 8, pendingApprovals: 0 },
  { id: "proj-13", name: "FW26 Swim Edit", clientId: "org-11", clientName: "Selene Swimwear", season: "FW26", status: "active", startDate: "2025-12-15", dueDate: "2026-08-01", progress: 6, budget: 135000, spent: 7500, teamMembers: ["tm-5", "tm-7"], deliverableCount: 3, pendingApprovals: 0 },
  { id: "proj-14", name: "SS26 Heritage Drop", clientId: "org-12", clientName: "Drift Streetwear", season: "SS26", status: "active", startDate: "2025-10-01", dueDate: "2026-04-15", progress: 40, budget: 70000, spent: 26800, teamMembers: ["tm-2", "tm-6"], deliverableCount: 14, pendingApprovals: 1 },
  { id: "proj-15", name: "SS26 Evening Wear", clientId: "org-13", clientName: "Aurelia Couture", season: "SS26", status: "active", startDate: "2025-07-01", dueDate: "2026-03-30", progress: 62, budget: 310000, spent: 188000, teamMembers: ["tm-2", "tm-3", "tm-4", "tm-7"], deliverableCount: 28, pendingApprovals: 6 },
  { id: "proj-16", name: "FW25 Denim Basics", clientId: "org-14", clientName: "Tandem Denim", season: "FW25", status: "completed", startDate: "2024-12-01", dueDate: "2025-09-15", progress: 100, budget: 52000, spent: 48900, teamMembers: ["tm-5", "tm-4"], deliverableCount: 16, pendingApprovals: 0 },
];

// ═══════════════════════════════════════════════════════════════
// DELIVERABLES (mood boards, tech packs, colorways, samples)
// ═══════════════════════════════════════════════════════════════

export const deliverables: Deliverable[] = [
  // Moda Haus SS26
  { id: "del-1", projectId: "proj-1", projectName: "SS26 Ready-to-Wear", name: "RTW Mood Board — Coastal Light", type: "mood-board", status: "approved", version: 3, assignedTo: "tm-3", assignedToName: "Aya Nakamura", createdAt: "2025-09-15", updatedAt: "2025-12-02", commentCount: 8 },
  { id: "del-2", projectId: "proj-1", projectName: "SS26 Ready-to-Wear", name: "Linen Blazer Tech Pack", type: "tech-pack", status: "client-review", version: 2, assignedTo: "tm-4", assignedToName: "Jules Moreau", createdAt: "2025-10-20", updatedAt: "2026-02-18", commentCount: 5 },
  { id: "del-3", projectId: "proj-1", projectName: "SS26 Ready-to-Wear", name: "SS26 Colorway Palette", type: "colorway", status: "revision-requested", version: 4, assignedTo: "tm-3", assignedToName: "Aya Nakamura", createdAt: "2025-10-01", updatedAt: "2026-02-25", commentCount: 12 },
  { id: "del-4", projectId: "proj-1", projectName: "SS26 Ready-to-Wear", name: "Draped Dress Spec Sheet", type: "spec-sheet", status: "internal-review", version: 1, assignedTo: "tm-4", assignedToName: "Jules Moreau", createdAt: "2026-01-15", updatedAt: "2026-02-20", commentCount: 2 },
  // NOX Apparel SS26
  { id: "del-5", projectId: "proj-5", projectName: "SS26 Streetwear Drop", name: "Street Mood Board — Neon Grid", type: "mood-board", status: "approved", version: 2, assignedTo: "tm-4", assignedToName: "Jules Moreau", createdAt: "2025-11-01", updatedAt: "2025-12-15", commentCount: 6 },
  { id: "del-6", projectId: "proj-5", projectName: "SS26 Streetwear Drop", name: "Oversized Hoodie Tech Pack", type: "tech-pack", status: "client-review", version: 1, assignedTo: "tm-6", assignedToName: "Theo Park", createdAt: "2026-01-10", updatedAt: "2026-02-22", commentCount: 3 },
  { id: "del-7", projectId: "proj-5", projectName: "SS26 Streetwear Drop", name: "Drop Lookbook — Preview", type: "lookbook", status: "draft", version: 1, assignedTo: "tm-4", assignedToName: "Jules Moreau", createdAt: "2026-02-10", updatedAt: "2026-02-10", commentCount: 0 },
  // Silk Route SS26
  { id: "del-8", projectId: "proj-7", projectName: "SS26 Silk Collection", name: "Silk Weave Mood Board", type: "mood-board", status: "approved", version: 2, assignedTo: "tm-4", assignedToName: "Jules Moreau", createdAt: "2025-08-20", updatedAt: "2025-10-05", commentCount: 7 },
  { id: "del-9", projectId: "proj-7", projectName: "SS26 Silk Collection", name: "Silk Sari Wrap Tech Pack", type: "tech-pack", status: "approved", version: 3, assignedTo: "tm-4", assignedToName: "Jules Moreau", createdAt: "2025-09-10", updatedAt: "2025-12-20", commentCount: 9 },
  { id: "del-10", projectId: "proj-7", projectName: "SS26 Silk Collection", name: "Jewel Tone Colorway", type: "colorway", status: "client-review", version: 2, assignedTo: "tm-4", assignedToName: "Jules Moreau", createdAt: "2025-11-01", updatedAt: "2026-02-12", commentCount: 4 },
  { id: "del-11", projectId: "proj-7", projectName: "SS26 Silk Collection", name: "Sample Photos — First Pull", type: "sample-photo", status: "revision-requested", version: 1, assignedTo: "tm-4", assignedToName: "Jules Moreau", createdAt: "2026-01-20", updatedAt: "2026-02-24", commentCount: 6 },
  // Aurelia Couture SS26
  { id: "del-12", projectId: "proj-15", projectName: "SS26 Evening Wear", name: "Gala Mood Board — Midnight Garden", type: "mood-board", status: "approved", version: 2, assignedTo: "tm-3", assignedToName: "Aya Nakamura", createdAt: "2025-07-20", updatedAt: "2025-09-10", commentCount: 11 },
  { id: "del-13", projectId: "proj-15", projectName: "SS26 Evening Wear", name: "Beaded Gown Tech Pack", type: "tech-pack", status: "approved", version: 4, assignedTo: "tm-7", assignedToName: "Lena Braun", createdAt: "2025-08-15", updatedAt: "2025-12-01", commentCount: 15 },
  { id: "del-14", projectId: "proj-15", projectName: "SS26 Evening Wear", name: "Sequin Jumpsuit Spec", type: "spec-sheet", status: "client-review", version: 2, assignedTo: "tm-4", assignedToName: "Jules Moreau", createdAt: "2025-11-20", updatedAt: "2026-02-15", commentCount: 8 },
  { id: "del-15", projectId: "proj-15", projectName: "SS26 Evening Wear", name: "Evening Line Sheet — Buyers", type: "line-sheet", status: "internal-review", version: 1, assignedTo: "tm-3", assignedToName: "Aya Nakamura", createdAt: "2026-02-01", updatedAt: "2026-02-20", commentCount: 3 },
  { id: "del-16", projectId: "proj-15", projectName: "SS26 Evening Wear", name: "Sample Photos — Toile Fitting", type: "sample-photo", status: "revision-requested", version: 2, assignedTo: "tm-7", assignedToName: "Lena Braun", createdAt: "2025-12-10", updatedAt: "2026-02-26", commentCount: 7 },
  // Lume Athletics SS26
  { id: "del-17", projectId: "proj-11", projectName: "SS26 Performance Line", name: "Performance Mood Board", type: "mood-board", status: "approved", version: 1, assignedTo: "tm-6", assignedToName: "Theo Park", createdAt: "2025-10-01", updatedAt: "2025-11-15", commentCount: 4 },
  { id: "del-18", projectId: "proj-11", projectName: "SS26 Performance Line", name: "Legging Tech Pack — Compression", type: "tech-pack", status: "draft", version: 1, assignedTo: "tm-4", assignedToName: "Jules Moreau", createdAt: "2026-02-05", updatedAt: "2026-02-05", commentCount: 0 },
  // Drift Streetwear SS26
  { id: "del-19", projectId: "proj-14", projectName: "SS26 Heritage Drop", name: "Heritage Mood Board — Archive", type: "mood-board", status: "approved", version: 2, assignedTo: "tm-6", assignedToName: "Theo Park", createdAt: "2025-10-15", updatedAt: "2025-12-01", commentCount: 5 },
  { id: "del-20", projectId: "proj-14", projectName: "SS26 Heritage Drop", name: "Workwear Jacket Tech Pack", type: "tech-pack", status: "approved", version: 3, assignedTo: "tm-6", assignedToName: "Theo Park", createdAt: "2025-11-10", updatedAt: "2026-01-28", commentCount: 8 },
];

// ═══════════════════════════════════════════════════════════════
// COMMENTS
// ═══════════════════════════════════════════════════════════════

export const comments: Comment[] = [
  { id: "cmt-1", deliverableId: "del-3", authorId: "tm-8", authorName: "Rachel Kim", authorRole: "client", content: "Love the sage green direction but can we see a warmer terracotta option alongside it? Thinking more Mediterranean for SS26.", createdAt: "2026-02-25T10:30:00Z", resolved: false },
  { id: "cmt-2", deliverableId: "del-3", authorId: "tm-3", authorName: "Aya Nakamura", authorRole: "designer", content: "Good call — I'll add a terracotta swatch and a muted coral alternative. Will update v5 by Thursday.", createdAt: "2026-02-25T11:15:00Z", resolved: false },
  { id: "cmt-3", deliverableId: "del-2", authorId: "tm-8", authorName: "Rachel Kim", authorRole: "client", content: "The linen weight looks right. Can we confirm the supplier can do the relaxed drape at this GSM?", createdAt: "2026-02-18T14:00:00Z", resolved: false },
  { id: "cmt-4", deliverableId: "del-11", authorId: "tm-11", authorName: "Priya Sharma", authorRole: "client", content: "The drape on the silk wrap isn't matching the tech pack spec. The hem needs to fall 2cm longer. Requesting revision.", createdAt: "2026-02-24T09:00:00Z", resolved: false },
  { id: "cmt-5", deliverableId: "del-14", authorId: "tm-10", authorName: "Camille Dupont", authorRole: "client", content: "Sequin placement is perfect. One note — can we shift the neckline 1cm higher for the production sample?", createdAt: "2026-02-15T16:30:00Z", resolved: false },
  { id: "cmt-6", deliverableId: "del-16", authorId: "tm-3", authorName: "Aya Nakamura", authorRole: "designer", content: "Toile proportions need adjustment. Waist seam is sitting too high — marking revisions on the overlay.", createdAt: "2026-02-26T11:00:00Z", resolved: false },
  { id: "cmt-7", deliverableId: "del-6", authorId: "tm-9", authorName: "David Archer", authorRole: "client", content: "The oversized fit looks good but I want to see a size run — can we get a graded spec for S through XXL?", createdAt: "2026-02-22T13:45:00Z", resolved: false },
  { id: "cmt-8", deliverableId: "del-1", authorId: "tm-2", authorName: "Marcus Chen", authorRole: "pm", content: "Mood board approved after Rachel's final sign-off. Moving to tech pack phase.", createdAt: "2025-12-02T09:30:00Z", resolved: true },
  { id: "cmt-9", deliverableId: "del-13", authorId: "tm-7", authorName: "Lena Braun", authorRole: "designer", content: "Updated bead placement diagram for v4. The supplier confirmed the Swarovski crystals are available in the colorway we specified.", createdAt: "2025-12-01T15:00:00Z", resolved: true },
  { id: "cmt-10", deliverableId: "del-10", authorId: "tm-4", authorName: "Jules Moreau", authorRole: "designer", content: "Submitted the jewel tone palette with Pantone references. Includes sapphire, emerald, and a muted gold accent.", createdAt: "2026-02-12T10:00:00Z", resolved: false },
];

// ═══════════════════════════════════════════════════════════════
// ACTIVITY LOG
// ═══════════════════════════════════════════════════════════════

export const activityLog: ActivityEntry[] = [
  { id: "act-1", userId: "tm-3", userName: "Aya Nakamura", userRole: "designer", action: "uploaded", target: "Draped Dress Spec Sheet", targetType: "deliverable", projectName: "SS26 Ready-to-Wear", createdAt: "2026-02-27T09:15:00Z" },
  { id: "act-2", userId: "tm-8", userName: "Rachel Kim", userRole: "client", action: "requested-changes", target: "SS26 Colorway Palette", targetType: "deliverable", projectName: "SS26 Ready-to-Wear", createdAt: "2026-02-25T10:30:00Z" },
  { id: "act-3", userId: "tm-11", userName: "Priya Sharma", userRole: "client", action: "requested-changes", target: "Sample Photos — First Pull", targetType: "deliverable", projectName: "SS26 Silk Collection", createdAt: "2026-02-24T09:00:00Z" },
  { id: "act-4", userId: "tm-9", userName: "David Archer", userRole: "client", action: "commented", target: "Oversized Hoodie Tech Pack", targetType: "comment", projectName: "SS26 Streetwear Drop", createdAt: "2026-02-22T13:45:00Z" },
  { id: "act-5", userId: "tm-4", userName: "Jules Moreau", userRole: "designer", action: "uploaded", target: "Drop Lookbook — Preview", targetType: "deliverable", projectName: "SS26 Streetwear Drop", createdAt: "2026-02-20T14:30:00Z" },
  { id: "act-6", userId: "tm-2", userName: "Marcus Chen", userRole: "pm", action: "assigned", target: "Legging Tech Pack — Compression", targetType: "deliverable", projectName: "SS26 Performance Line", createdAt: "2026-02-19T11:00:00Z" },
  { id: "act-7", userId: "tm-3", userName: "Aya Nakamura", userRole: "designer", action: "uploaded", target: "Evening Line Sheet — Buyers", targetType: "deliverable", projectName: "SS26 Evening Wear", createdAt: "2026-02-18T16:00:00Z" },
  { id: "act-8", userId: "tm-5", userName: "Sofia Reyes", userRole: "pm", action: "status-changed", target: "Pre-Fall 25 Knits", targetType: "project", projectName: "Pre-Fall 25 Knits", createdAt: "2026-02-17T10:00:00Z" },
  { id: "act-9", userId: "tm-10", userName: "Camille Dupont", userRole: "client", action: "approved", target: "Sequin Jumpsuit Spec", targetType: "deliverable", projectName: "SS26 Evening Wear", createdAt: "2026-02-15T16:30:00Z" },
  { id: "act-10", userId: "tm-6", userName: "Theo Park", userRole: "designer", action: "uploaded", target: "Workwear Jacket Tech Pack v3", targetType: "deliverable", projectName: "SS26 Heritage Drop", createdAt: "2026-02-14T09:45:00Z" },
  { id: "act-11", userId: "tm-7", userName: "Lena Braun", userRole: "designer", action: "commented", target: "Beaded Gown Tech Pack", targetType: "comment", projectName: "SS26 Evening Wear", createdAt: "2026-02-13T15:00:00Z" },
  { id: "act-12", userId: "tm-2", userName: "Marcus Chen", userRole: "pm", action: "created-project", target: "SS26 Eco Capsule", targetType: "project", projectName: "SS26 Eco Capsule", createdAt: "2026-02-10T09:00:00Z" },
  { id: "act-13", userId: "tm-12", userName: "Lucas Ferreira", userRole: "client", action: "commented", target: "SS26 Eco Capsule", targetType: "comment", projectName: "SS26 Eco Capsule", createdAt: "2026-02-10T11:30:00Z" },
  { id: "act-14", userId: "tm-4", userName: "Jules Moreau", userRole: "designer", action: "uploaded", target: "Legging Tech Pack — Compression", targetType: "deliverable", projectName: "SS26 Performance Line", createdAt: "2026-02-05T14:00:00Z" },
  { id: "act-15", userId: "tm-5", userName: "Sofia Reyes", userRole: "pm", action: "assigned", target: "FW26 Swim Edit", targetType: "project", createdAt: "2026-02-03T10:00:00Z" },
];

// ═══════════════════════════════════════════════════════════════
// TIMELINE PHASES (T&A calendar for projects)
// ═══════════════════════════════════════════════════════════════

export const timelinePhases: TimelinePhase[] = [
  // SS26 Ready-to-Wear (proj-1)
  { id: "tl-1", projectId: "proj-1", name: "Concept & Mood Boards", startDate: "2025-09-01", endDate: "2025-10-15", status: "completed" },
  { id: "tl-2", projectId: "proj-1", name: "Color Development", startDate: "2025-10-01", endDate: "2025-12-01", status: "completed" },
  { id: "tl-3", projectId: "proj-1", name: "Tech Pack & Specs", startDate: "2025-11-15", endDate: "2026-03-01", status: "in-progress" },
  { id: "tl-4", projectId: "proj-1", name: "Sample Development", startDate: "2026-02-01", endDate: "2026-04-15", status: "upcoming" },
  { id: "tl-5", projectId: "proj-1", name: "Client Review & Approval", startDate: "2026-04-01", endDate: "2026-05-15", status: "upcoming" },
  { id: "tl-6", projectId: "proj-1", name: "Production Handoff", startDate: "2026-05-15", endDate: "2026-06-15", status: "upcoming" },
  // SS26 Evening Wear (proj-15)
  { id: "tl-7", projectId: "proj-15", name: "Concept & Mood Boards", startDate: "2025-07-01", endDate: "2025-09-15", status: "completed" },
  { id: "tl-8", projectId: "proj-15", name: "Tech Pack Development", startDate: "2025-08-15", endDate: "2025-12-15", status: "completed" },
  { id: "tl-9", projectId: "proj-15", name: "Toile & Fitting", startDate: "2025-11-01", endDate: "2026-02-01", status: "completed" },
  { id: "tl-10", projectId: "proj-15", name: "Sample Production", startDate: "2026-01-15", endDate: "2026-03-01", status: "in-progress" },
  { id: "tl-11", projectId: "proj-15", name: "Buyer Presentation", startDate: "2026-02-15", endDate: "2026-03-15", status: "in-progress" },
  { id: "tl-12", projectId: "proj-15", name: "Final Delivery", startDate: "2026-03-01", endDate: "2026-03-30", status: "upcoming" },
  // SS26 Silk Collection (proj-7)
  { id: "tl-13", projectId: "proj-7", name: "Research & Sourcing", startDate: "2025-08-01", endDate: "2025-10-01", status: "completed" },
  { id: "tl-14", projectId: "proj-7", name: "Design Development", startDate: "2025-09-15", endDate: "2026-01-15", status: "completed" },
  { id: "tl-15", projectId: "proj-7", name: "Sampling & Review", startDate: "2025-12-01", endDate: "2026-03-15", status: "in-progress" },
  { id: "tl-16", projectId: "proj-7", name: "Production Planning", startDate: "2026-03-01", endDate: "2026-04-30", status: "upcoming" },
];

// ═══════════════════════════════════════════════════════════════
// DASHBOARD STATS
// ═══════════════════════════════════════════════════════════════

export const dashboardStats: DashboardStat[] = [
  { label: "Active Projects", value: 11, change: 2, changeLabel: "vs last month" },
  { label: "Pending Approvals", value: 27, change: -5, changeLabel: "vs last week" },
  { label: "Active Clients", value: 13, change: 1, changeLabel: "new this month" },
  { label: "Deliverables This Month", value: 34, change: 8, changeLabel: "vs last month" },
];

// ═══════════════════════════════════════════════════════════════
// CHART DATA
// ═══════════════════════════════════════════════════════════════

export const monthlyDeliverableData: MonthlyData[] = [
  { month: "Sep", deliverables: 18, approvals: 12, revisions: 6 },
  { month: "Oct", deliverables: 24, approvals: 16, revisions: 8 },
  { month: "Nov", deliverables: 22, approvals: 18, revisions: 4 },
  { month: "Dec", deliverables: 15, approvals: 11, revisions: 5 },
  { month: "Jan", deliverables: 28, approvals: 20, revisions: 9 },
  { month: "Feb", deliverables: 34, approvals: 22, revisions: 12 },
];

export const projectBudgetData: ProjectBudgetData[] = [
  { name: "Moda Haus SS26", budget: 95000, spent: 32000 },
  { name: "Aurelia Couture", budget: 310000, spent: 188000 },
  { name: "Atelier Bleu", budget: 145000, spent: 9800 },
  { name: "Silk Route SS26", budget: 105000, spent: 46000 },
  { name: "Lume Athletics", budget: 98000, spent: 28000 },
  { name: "NOX Streetwear", budget: 75000, spent: 14200 },
];

// ═══════════════════════════════════════════════════════════════
// STATUS HELPERS
// ═══════════════════════════════════════════════════════════════

export const deliverableStatusLabels: Record<string, string> = {
  "draft": "Draft",
  "internal-review": "Internal Review",
  "client-review": "Client Review",
  "revision-requested": "Revision Requested",
  "approved": "Approved",
  "final": "Final",
};

export const deliverableTypeLabels: Record<string, string> = {
  "mood-board": "Mood Board",
  "tech-pack": "Tech Pack",
  "colorway": "Colorway",
  "sample-photo": "Sample Photo",
  "spec-sheet": "Spec Sheet",
  "lookbook": "Lookbook",
  "line-sheet": "Line Sheet",
};

export const projectStatusLabels: Record<string, string> = {
  "active": "Active",
  "on-hold": "On Hold",
  "in-review": "In Review",
  "completed": "Completed",
  "archived": "Archived",
};

export const roleLabels: Record<string, string> = {
  "admin": "Admin",
  "pm": "Project Manager",
  "designer": "Designer",
  "client": "Client",
};
