import { ExternalLink, TrendingUp } from "lucide-react";
import { proposalData } from "@/data/proposal";

// ──────────────────────────────────────────────────────────────────────────────
// Tab 3 — Work With Me
// Aesthetic: Bold Editorial
//   • 0rem radius everywhere (sharp edges, no rounding)
//   • Type is the hero — dramatic weight contrast, generous whitespace
//   • Thick horizontal rules as structural dividers
//   • 400-600ms motion character
//   • No shadows, no rounded cards
//   • Dark panels for hero + CTA, white/light content sections between
// ──────────────────────────────────────────────────────────────────────────────

export default function ProposalPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-0">

      {/* ══════════════════════════════════════════════════════
          SECTION 1 — Hero (Project Brief)
          Dark full-bleed panel. Type-as-hero. Project-first.
          ══════════════════════════════════════════════════════ */}
      <section
        className="overflow-hidden"
        style={{ background: "var(--section-dark)" }}
      >
        <div className="px-10 pt-12 pb-0">

          {/* Effort badge — mandatory trust signal */}
          <div className="flex items-center gap-2.5 mb-10">
            <span className="relative inline-flex h-1.5 w-1.5">
              <span
                className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                style={{ backgroundColor: "var(--success)" }}
              />
              <span
                className="relative inline-flex rounded-full h-1.5 w-1.5"
                style={{ backgroundColor: "var(--success)" }}
              />
            </span>
            <span className="text-xs tracking-[0.12em] uppercase text-white/50">
              Built this demo for your project
            </span>
          </div>

          {/* Role prefix */}
          <p className="text-xs tracking-[0.2em] uppercase text-white/30 mb-5">
            {proposalData.hero.rolePrefix}
          </p>

          {/* Weight-contrast headline */}
          <h1
            className="leading-none mb-6"
            style={{ fontSize: "clamp(3.5rem, 8vw, 6rem)", letterSpacing: "-0.04em" }}
          >
            <span className="font-light text-white/50">Hi, I&apos;m </span>
            <span className="font-black text-white">{proposalData.hero.name}</span>
          </h1>

          {/* Thick graphic rule — editorial signature */}
          <div
            className="mb-8"
            style={{
              height: "3px",
              background:
                "linear-gradient(to right, var(--primary) 0%, oklch(0.40 0.14 355 / 0.2) 60%, transparent 100%)",
            }}
          />

          {/* Value prop — tailored to this job */}
          <p className="text-xl text-white/70 max-w-2xl leading-relaxed mb-10">
            {proposalData.hero.valueProp}
          </p>
        </div>

        {/* Stats shelf — separated by thin rule */}
        <div
          className="px-10 py-5"
          style={{ borderTop: "1px solid oklch(1 0 0 / 0.08)", background: "oklch(1 0 0 / 0.04)" }}
        >
          <div className="grid grid-cols-3 gap-8">
            {proposalData.hero.stats.map((stat) => (
              <div key={stat.label}>
                <div
                  className="font-black text-white leading-none mb-1"
                  style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", letterSpacing: "-0.04em" }}
                >
                  {stat.value}
                </div>
                <div className="text-xs tracking-[0.08em] uppercase text-white/40">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section divider */}
      <div className="py-16">
        <div className="h-px bg-foreground/10" />
      </div>

      {/* ══════════════════════════════════════════════════════
          SECTION 2 — Proof of Work
          Bold Editorial: large project name as display type,
          thick left-border accent (4px solid primary), stark outcome
          ══════════════════════════════════════════════════════ */}
      <section className="space-y-6">
        <div className="mb-10">
          <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-3">
            Proof of Work
          </p>
          <h2
            className="font-black text-foreground leading-none"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", letterSpacing: "-0.04em" }}
          >
            Relevant Projects
          </h2>
        </div>

        <div className="space-y-0">
          {proposalData.portfolioProjects.map((project, index) => (
            <div key={project.id}>
              <div
                className="py-8 flex gap-6"
                style={{ borderLeft: "4px solid var(--primary)", paddingLeft: "2rem" }}
              >
                {/* Left column: project meta */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h3
                      className="font-black text-foreground leading-tight"
                      style={{ fontSize: "clamp(1.125rem, 2.5vw, 1.5rem)", letterSpacing: "-0.03em" }}
                    >
                      {project.name}
                    </h3>
                    {project.url && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 text-muted-foreground hover:text-primary transition-colors"
                        style={{ transitionDuration: "var(--dur-normal)" }}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {project.description}
                  </p>

                  {/* Outcome — always present, bold statement */}
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingUp
                      className="w-3.5 h-3.5 shrink-0"
                      style={{ color: "var(--success)" }}
                    />
                    <span
                      className="text-sm font-semibold"
                      style={{ color: "var(--success)" }}
                    >
                      {project.outcome}
                    </span>
                  </div>

                  {/* Tech tags — stark, no pill rounding in bold-editorial */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-0.5 text-xs font-mono text-muted-foreground"
                        style={{ border: "1px solid color-mix(in oklch, var(--border), transparent 20%)" }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Relevance note — why this matters for this job */}
                  <p className="text-xs text-primary/70 italic">{project.relevance}</p>
                </div>
              </div>

              {/* Thin rule between projects (not after last) */}
              {index < proposalData.portfolioProjects.length - 1 && (
                <div className="h-px bg-foreground/6 ml-12" />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Section divider */}
      <div className="py-16">
        <div className="h-px bg-foreground/10" />
      </div>

      {/* ══════════════════════════════════════════════════════
          SECTION 3 — How I Work
          Bold Editorial: large step numbers as display type,
          generous whitespace, one key outcome per step
          ══════════════════════════════════════════════════════ */}
      <section className="space-y-6">
        <div className="mb-10">
          <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-3">
            Process
          </p>
          <h2
            className="font-black text-foreground leading-none"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", letterSpacing: "-0.04em" }}
          >
            How I Work
          </h2>
        </div>

        <div className="space-y-0">
          {proposalData.approach.map((step, index) => (
            <div key={step.step}>
              <div className="py-8 grid grid-cols-[auto_1fr] gap-8 items-start">
                {/* Large step number — editorial anchor */}
                <div
                  className="font-black text-foreground/10 leading-none select-none w-20"
                  style={{ fontSize: "clamp(4rem, 10vw, 7rem)", letterSpacing: "-0.05em" }}
                >
                  {step.step}
                </div>

                {/* Step content */}
                <div className="pt-3">
                  <div className="flex items-baseline justify-between gap-4 mb-3">
                    <h3
                      className="font-black text-foreground"
                      style={{ fontSize: "clamp(1.125rem, 2.5vw, 1.375rem)", letterSpacing: "-0.03em" }}
                    >
                      {step.title}
                    </h3>
                    <span className="text-xs tracking-[0.08em] uppercase text-muted-foreground shrink-0">
                      {step.timeline}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-lg">
                    {step.description}
                  </p>
                </div>
              </div>

              {index < proposalData.approach.length - 1 && (
                <div className="h-px bg-foreground/6" />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Section divider */}
      <div className="py-16">
        <div className="h-px bg-foreground/10" />
      </div>

      {/* ══════════════════════════════════════════════════════
          SECTION 4 — Skills Grid
          Bold Editorial: simple comma-separated list in large text,
          category headers as uppercase trackers, no pill cards
          ══════════════════════════════════════════════════════ */}
      <section className="space-y-6">
        <div className="mb-10">
          <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-3">
            Tech Stack
          </p>
          <h2
            className="font-black text-foreground leading-none"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", letterSpacing: "-0.04em" }}
          >
            What I Build With
          </h2>
        </div>

        <div className="space-y-0">
          {proposalData.skills.map((category, index) => (
            <div key={category.category}>
              <div className="py-6 grid grid-cols-[160px_1fr] gap-8 items-baseline">
                <p className="text-xs tracking-[0.12em] uppercase text-muted-foreground">
                  {category.category}
                </p>
                <p className="text-base text-foreground leading-relaxed">
                  {category.items.join(", ")}
                </p>
              </div>
              {index < proposalData.skills.length - 1 && (
                <div className="h-px bg-foreground/6" />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Section divider */}
      <div className="py-16">
        <div className="h-px bg-foreground/10" />
      </div>

      {/* ══════════════════════════════════════════════════════
          SECTION 5 — CTA (Dark Panel)
          Bold Editorial close: dramatic headline, singular CTA,
          maximum negative space
          ══════════════════════════════════════════════════════ */}
      <section
        className="overflow-hidden"
        style={{ background: "var(--section-dark)" }}
      >
        <div className="px-10 py-12 space-y-8">

          {/* Availability indicator */}
          <div className="flex items-center gap-2.5">
            <span className="relative inline-flex h-2 w-2">
              <span
                className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                style={{ backgroundColor: "var(--success)" }}
              />
              <span
                className="relative inline-flex rounded-full h-2 w-2"
                style={{ backgroundColor: "var(--success)" }}
              />
            </span>
            <span
              className="text-sm"
              style={{ color: "color-mix(in oklch, var(--success) 80%, white)" }}
            >
              {proposalData.cta.availability}
            </span>
          </div>

          {/* Headline — tailored, specific */}
          <div>
            <div
              className="mb-2"
              style={{
                height: "3px",
                width: "3rem",
                background: "var(--primary)",
              }}
            />
            <h2
              className="font-black text-white leading-tight"
              style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", letterSpacing: "-0.04em" }}
            >
              {proposalData.cta.headline}
            </h2>
          </div>

          {/* Body copy — specific to this demo */}
          <p className="text-white/60 max-w-lg leading-relaxed">
            {proposalData.cta.body}
          </p>

          {/* Primary action — text, not a dead-end button */}
          <p
            className="text-lg font-black text-white tracking-tight"
            style={{ letterSpacing: "-0.02em" }}
          >
            {proposalData.cta.action}
          </p>

          {/* Back to demo */}
          <a
            href="/"
            className="inline-flex items-center gap-1 text-sm text-white/40 hover:text-white/60 transition-colors"
            style={{ transitionDuration: "var(--dur-normal)" }}
          >
            ← Back to the demo
          </a>

          {/* Signature */}
          <div
            className="pt-6 mt-2"
            style={{ borderTop: "1px solid oklch(1 0 0 / 0.10)" }}
          >
            <p className="text-sm text-white/30">— Humam</p>
          </div>
        </div>
      </section>

    </div>
  );
}
