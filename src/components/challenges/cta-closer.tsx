import Link from "next/link";

export function CtaCloser() {
  return (
    <section
      className="px-8 py-8 md:py-10"
      style={{
        backgroundColor: "oklch(0.08 0.03 355)",
        backgroundImage:
          "radial-gradient(ellipse at 80% 50%, oklch(0.40 0.14 355 / 0.10), transparent 60%)",
      }}
    >
      {/* Bold editorial: thick top rule */}
      <div
        className="w-12 h-[3px] mb-6"
        style={{ background: "var(--primary)" }}
      />

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h3 className="text-xl md:text-2xl font-black tracking-tight text-white leading-tight">
            Ready to build this?
          </h3>
          <p className="text-sm text-white/50 mt-2 max-w-sm leading-relaxed">
            I&apos;ve mapped the hard parts. Happy to walk through any of this on a call or send a more detailed plan.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 shrink-0">
          <Link
            href="/proposal"
            className="text-sm text-white/50 hover:text-white/80 transition-colors underline underline-offset-2"
            style={{ transitionDuration: "var(--dur-normal)" }}
          >
            See how I work →
          </Link>
          <span
            className="text-sm font-semibold px-4 py-2 border"
            style={{
              color: "var(--primary-foreground)",
              backgroundColor: "var(--primary)",
              borderColor: "var(--primary)",
            }}
          >
            Reply on Upwork to start
          </span>
        </div>
      </div>
    </section>
  );
}
