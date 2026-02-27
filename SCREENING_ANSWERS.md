# Screening Answers — DesignOps Portal

---

**1. 2-3 relevant SaaS/internal systems you've built**

DealerHub — multi-tenant SaaS with RBAC, inventory, lead pipeline, and approval workflows across dealerships: https://dealer-platform-neon.vercel.app

Fleet Maintenance SaaS — 6-module internal ops platform covering asset registry, work orders, preventive scheduling, and parts inventory.

Lead Intake CRM — internal intake and pipeline tool with configurable automation rules and role-based dashboards, handles 200+ leads/day.

---

**2. Recommended stack and why**

Next.js (frontend) + PostgreSQL + Prisma ORM + Node/Express or Next.js API routes for the backend — gives you clean multi-tenancy with row-level isolation, fast UI, and a codebase that's easy to hand off or extend. AWS S3 for file uploads, SendGrid for email notifications.

Built a working version for your project specifically: https://design-ops-portal.vercel.app

---

**3. Estimated timeline for MVP**

Phase 1 MVP (multi-tenant orgs, RBAC, T&A tracking, file uploads, comment threads, approval flow, email notifications, activity log): 8-10 weeks.

---

**4. Budget estimate**

$6,000–$9,000 for the Phase 1 MVP as described, depending on the complexity of the approval workflow and notification rules.

---

**5. Experience with Claude or other AI-assisted development**

Yes — built WMF Agent Dashboard using Claude API for email classification and structured RFQ extraction. I use Claude throughout the development workflow for architecture decisions, code review, and generating domain-specific mock data. It meaningfully compresses iteration cycles.
