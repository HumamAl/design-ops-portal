import { ExecutiveSummary } from "@/components/challenges/executive-summary";
import { ChallengeCard } from "@/components/challenges/challenge-card";
import { VizArchitecture } from "@/components/challenges/viz-architecture";
import { VizApprovalFlow } from "@/components/challenges/viz-approval-flow";
import { VizTimeline } from "@/components/challenges/viz-timeline";
import { VizRbac } from "@/components/challenges/viz-rbac";
import { CtaCloser } from "@/components/challenges/cta-closer";
import { challenges, executiveSummary } from "@/data/challenges";
import type { ReactNode } from "react";

export const metadata = { title: "My Approach | DesignOps" };

export default function ChallengesPage() {
  const vizMap: Record<string, ReactNode> = {
    "challenge-1": <VizArchitecture />,
    "challenge-2": <VizApprovalFlow />,
    "challenge-3": <VizTimeline />,
    "challenge-4": <VizRbac />,
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-10 md:px-8 md:py-14">

        {/* Page heading — bold editorial scale */}
        <div className="mb-10">
          <h1
            className="text-3xl md:text-4xl font-black leading-none"
            style={{ letterSpacing: "-0.04em" }}
          >
            My Approach
          </h1>
          <p className="text-sm text-muted-foreground mt-3 max-w-lg leading-relaxed">
            Four architectural decisions that determine whether this portal lasts five seasons or falls apart after two.
          </p>
        </div>

        {/* Executive summary — dark hero banner */}
        <ExecutiveSummary data={executiveSummary} />

        {/* Challenge cards — bordered, editorial layout */}
        <div className="mt-4">
          {challenges.map((challenge, index) => (
            <ChallengeCard
              key={challenge.id}
              title={challenge.title}
              description={challenge.description}
              outcome={challenge.outcome}
              index={index}
            >
              {vizMap[challenge.id]}
            </ChallengeCard>
          ))}

          {/* Closing bottom rule */}
          <div
            className="border-t"
            style={{ borderColor: "var(--border)" }}
          />
        </div>

        {/* CTA closer */}
        <div className="mt-12">
          <CtaCloser />
        </div>

      </div>
    </div>
  );
}
