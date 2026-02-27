import type { LucideIcon } from "lucide-react";

// Sidebar navigation
export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

// Challenge visualization types
export type VisualizationType =
  | "flow"
  | "before-after"
  | "metrics"
  | "architecture"
  | "risk-matrix"
  | "timeline"
  | "dual-kpi"
  | "tech-stack"
  | "decision-flow";

export interface Challenge {
  id: string;
  title: string;
  description: string;
  visualizationType: VisualizationType;
  outcome?: string;
}

// Proposal types
export interface Profile {
  name: string;
  tagline: string;
  bio: string;
  approach: { title: string; description: string }[];
  skillCategories: { name: string; skills: string[] }[];
}

export interface PortfolioProject {
  id: string;
  title: string;
  description: string;
  tech: string[];
  relevance?: string;
  outcome?: string;
  liveUrl?: string;
}

// ═══════════════════════════════════════════════════════════════
// DOMAIN TYPES — Fashion Design Agency Operations
// ═══════════════════════════════════════════════════════════════

export type UserRole = "admin" | "pm" | "designer" | "client";

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  organizationId: string;
}

export type ProjectStatus = "active" | "on-hold" | "in-review" | "completed" | "archived";
export type Season = "SS25" | "FW25" | "SS26" | "FW26" | "Resort 25" | "Pre-Fall 25";

export interface ClientOrganization {
  id: string;
  name: string;
  contactName: string;
  contactEmail: string;
  activeProjects: number;
  totalBudget: number;
  joinedDate: string;
  status: "active" | "inactive" | "onboarding";
}

export interface Project {
  id: string;
  name: string;
  clientId: string;
  clientName: string;
  season: Season;
  status: ProjectStatus;
  startDate: string;
  dueDate: string;
  progress: number;
  budget: number;
  spent: number;
  teamMembers: string[];
  deliverableCount: number;
  pendingApprovals: number;
}

export type DeliverableType = "mood-board" | "tech-pack" | "colorway" | "sample-photo" | "spec-sheet" | "lookbook" | "line-sheet";
export type DeliverableStatus = "draft" | "internal-review" | "client-review" | "revision-requested" | "approved" | "final";

export interface Deliverable {
  id: string;
  projectId: string;
  projectName: string;
  name: string;
  type: DeliverableType;
  status: DeliverableStatus;
  version: number;
  assignedTo: string;
  assignedToName: string;
  createdAt: string;
  updatedAt: string;
  commentCount: number;
  fileUrl?: string;
}

export interface Comment {
  id: string;
  deliverableId: string;
  authorId: string;
  authorName: string;
  authorRole: UserRole;
  content: string;
  createdAt: string;
  resolved: boolean;
}

export type ActivityAction =
  | "uploaded"
  | "commented"
  | "approved"
  | "requested-changes"
  | "created-project"
  | "assigned"
  | "status-changed"
  | "mentioned";

export interface ActivityEntry {
  id: string;
  userId: string;
  userName: string;
  userRole: UserRole;
  action: ActivityAction;
  target: string;
  targetType: "deliverable" | "project" | "comment" | "client";
  projectName?: string;
  createdAt: string;
}

export interface TimelinePhase {
  id: string;
  projectId: string;
  name: string;
  startDate: string;
  endDate: string;
  status: "completed" | "in-progress" | "upcoming" | "overdue";
}

// Dashboard stats
export interface DashboardStat {
  label: string;
  value: number;
  change: number;
  changeLabel: string;
}

// Chart data
export interface MonthlyData {
  month: string;
  deliverables: number;
  approvals: number;
  revisions: number;
}

export interface ProjectBudgetData {
  name: string;
  budget: number;
  spent: number;
}
