import Link from "next/link";
import type { ExecutiveSummaryData } from "@/data/challenges";

interface ExecutiveSummaryProps {
  data: ExecutiveSummaryData;
}

export function ExecutiveSummary({ data }: ExecutiveSummaryProps) {
  const { commonApproach, differentApproach, accentWord } = data;

  const renderDifferentApproach = () => {
    if (!accentWord) return <span>{differentApproach}</span>;
    const escaped = accentWord.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const parts = differentApproach.split(new RegExp(`(${escaped})`, "i"));
    return (
      <>
        {parts.map((part, i) =>
          part.toLowerCase() === accentWord.toLowerCase() ? (
            <span key={i} className="text-primary font-semibold">
              {part}
            </span>
          ) : (
            <span key={i}>{part}</span>
          )
        )}
      </>
    );
  };

  return (
    <div
      className="relative overflow-hidden p-8 md:p-10"
      style={{
        background: "oklch(0.08 0.03 355)",
        backgroundImage:
          "radial-gradient(ellipse at 20% 60%, oklch(0.40 0.14 355 / 0.12), transparent 60%)",
      }}
    >
      {/* Bold editorial: thick top rule as accent */}
      <div
        className="absolute top-0 left-0 right-0 h-[3px]"
        style={{ background: "var(--primary)" }}
      />

      <p className="text-sm md:text-base leading-relaxed text-white/45 max-w-2xl">
        {commonApproach}
      </p>

      <div
        className="my-5 border-t"
        style={{ borderColor: "oklch(1 0 0 / 0.10)" }}
      />

      <p className="text-base md:text-lg leading-relaxed font-medium text-white/90 max-w-2xl">
        {renderDifferentApproach()}
      </p>

      <p className="text-xs text-white/35 mt-5">
        <Link
          href="/"
          className="hover:text-white/60 transition-colors underline underline-offset-2"
          style={{ transitionDuration: "var(--dur-normal)" }}
        >
          ← See the working demo
        </Link>
      </p>
    </div>
  );
}
