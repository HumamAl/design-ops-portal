import { AlertTriangle } from "lucide-react";

interface Phase {
  name: string;
  project: string;
  start: number; // week number, 0-indexed
  duration: number; // weeks
  status: "completed" | "in-progress" | "upcoming" | "overdue";
}

const phases: Phase[] = [
  { name: "Concept", project: "Maison Aurel SS26", start: 0, duration: 6, status: "completed" },
  { name: "Development", project: "Maison Aurel SS26", start: 5, duration: 8, status: "in-progress" },
  { name: "Sampling", project: "Maison Aurel SS26", start: 12, duration: 6, status: "upcoming" },
  { name: "Production", project: "Maison Aurel SS26", start: 17, duration: 5, status: "upcoming" },

  { name: "Concept", project: "Studio Nomade FW25", start: 2, duration: 5, status: "completed" },
  { name: "Development", project: "Studio Nomade FW25", start: 6, duration: 7, status: "overdue" },
  { name: "Sampling", project: "Studio Nomade FW25", start: 12, duration: 5, status: "upcoming" },

  { name: "Concept", project: "Ligne Blanche Resort", start: 8, duration: 4, status: "in-progress" },
  { name: "Development", project: "Ligne Blanche Resort", start: 11, duration: 6, status: "upcoming" },
];

const statusStyle: Record<Phase["status"], { bg: string; text: string }> = {
  completed: {
    bg: "color-mix(in oklch, var(--success) 25%, var(--muted))",
    text: "var(--success)",
  },
  "in-progress": {
    bg: "color-mix(in oklch, var(--primary) 30%, transparent)",
    text: "var(--primary)",
  },
  upcoming: {
    bg: "color-mix(in oklch, var(--border), transparent 30%)",
    text: "var(--muted-foreground)",
  },
  overdue: {
    bg: "color-mix(in oklch, var(--destructive) 30%, transparent)",
    text: "oklch(0.577 0.245 27.325)",
  },
};

const TOTAL_WEEKS = 22;

const projects = [
  "Maison Aurel SS26",
  "Studio Nomade FW25",
  "Ligne Blanche Resort",
];

export function VizTimeline() {
  return (
    <div className="space-y-3 overflow-x-auto">
      {/* Week header */}
      <div className="flex gap-0 items-center">
        <div className="w-36 shrink-0 text-[10px] font-mono uppercase tracking-wide text-muted-foreground pr-2">
          Project
        </div>
        <div className="flex-1 relative" style={{ minWidth: "280px" }}>
          <div className="flex">
            {Array.from({ length: TOTAL_WEEKS }).map((_, i) => (
              <div
                key={i}
                className="flex-1 text-center"
                style={{ fontSize: "9px", color: "var(--muted-foreground)" }}
              >
                {i % 4 === 0 ? `W${i + 1}` : ""}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Project rows */}
      {projects.map((project) => {
        const projectPhases = phases.filter((p) => p.project === project);
        const hasOverdue = projectPhases.some((p) => p.status === "overdue");

        return (
          <div key={project} className="flex items-center gap-0">
            <div className="w-36 shrink-0 pr-2 flex items-center gap-1">
              {hasOverdue && (
                <AlertTriangle
                  className="h-3 w-3 shrink-0"
                  style={{ color: "oklch(0.577 0.245 27.325)" }}
                />
              )}
              <span
                className="text-xs font-medium truncate leading-tight"
                style={{ fontSize: "11px" }}
              >
                {project.split(" ").slice(0, 2).join(" ")}
              </span>
            </div>
            <div
              className="flex-1 relative h-8"
              style={{ minWidth: "280px" }}
            >
              {/* Background grid */}
              <div className="absolute inset-0 flex">
                {Array.from({ length: TOTAL_WEEKS }).map((_, i) => (
                  <div
                    key={i}
                    className="flex-1 border-r"
                    style={{
                      borderColor: "color-mix(in oklch, var(--border), transparent 50%)",
                    }}
                  />
                ))}
              </div>

              {/* Phase bars */}
              {projectPhases.map((phase, j) => {
                const left = (phase.start / TOTAL_WEEKS) * 100;
                const width = (phase.duration / TOTAL_WEEKS) * 100;
                const style = statusStyle[phase.status];
                return (
                  <div
                    key={j}
                    className="absolute top-1 h-6 flex items-center justify-center overflow-hidden"
                    style={{
                      left: `${left}%`,
                      width: `calc(${width}% - 2px)`,
                      backgroundColor: style.bg,
                      borderLeft: `2px solid ${style.text}`,
                    }}
                    title={`${phase.name} — ${phase.status}`}
                  >
                    <span
                      className="text-[9px] font-medium px-1 truncate"
                      style={{ color: style.text }}
                    >
                      {phase.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      {/* Legend */}
      <div className="flex flex-wrap gap-3 pt-1">
        {(["completed", "in-progress", "upcoming", "overdue"] as Phase["status"][]).map(
          (s) => (
            <div key={s} className="flex items-center gap-1.5">
              <div
                className="h-2.5 w-5"
                style={{
                  backgroundColor: statusStyle[s].bg,
                  borderLeft: `2px solid ${statusStyle[s].text}`,
                }}
              />
              <span
                className="text-[10px] capitalize"
                style={{ color: "var(--muted-foreground)" }}
              >
                {s.replace("-", " ")}
              </span>
            </div>
          )
        )}
      </div>
    </div>
  );
}
