import { cn } from "@/lib/utils";
import { OutcomeStatement } from "./outcome-statement";
import type { ReactNode } from "react";

interface ChallengeCardProps {
  title: string;
  description: string;
  outcome?: string;
  index: number;
  children?: ReactNode;
  className?: string;
}

export function ChallengeCard({
  title,
  description,
  outcome,
  index,
  children,
  className,
}: ChallengeCardProps) {
  const stepNumber = String(index + 1).padStart(2, "0");

  return (
    <div
      className={cn("py-10 border-t", className)}
      style={{ borderColor: "var(--border)" }}
    >
      <div className="flex flex-col md:flex-row md:gap-10">
        {/* Left column: oversized step number */}
        <div className="shrink-0 mb-4 md:mb-0 md:w-16">
          <span
            className="text-6xl font-black leading-none select-none"
            style={{
              color: "color-mix(in oklch, var(--primary) 20%, transparent)",
              letterSpacing: "-0.04em",
            }}
          >
            {stepNumber}
          </span>
        </div>

        {/* Right column: content */}
        <div className="flex-1 space-y-5">
          <div>
            <h2
              className="text-xl md:text-2xl font-black leading-tight"
              style={{ letterSpacing: "-0.03em" }}
            >
              {title}
            </h2>
            <p className="text-sm text-muted-foreground mt-2 leading-relaxed max-w-2xl">
              {description}
            </p>
          </div>

          {children && (
            <div className="mt-4">{children}</div>
          )}

          {outcome && (
            <OutcomeStatement outcome={outcome} />
          )}
        </div>
      </div>
    </div>
  );
}
