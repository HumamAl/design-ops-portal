import { Building2, Users, Shield, Database, Lock } from "lucide-react";

interface TenantLayer {
  label: string;
  sublabel: string;
  color: "primary" | "accent" | "muted" | "destructive";
}

const layers: TenantLayer[] = [
  {
    label: "Client A — Maison Aurel",
    sublabel: "Org ID: org_a1b2 · Isolated row-level scope",
    color: "primary",
  },
  {
    label: "Client B — Studio Nomade",
    sublabel: "Org ID: org_c3d4 · Isolated row-level scope",
    color: "primary",
  },
  {
    label: "Client C — Ligne Blanche",
    sublabel: "Org ID: org_e5f6 · Isolated row-level scope",
    color: "primary",
  },
];

export function VizArchitecture() {
  return (
    <div className="space-y-4">
      {/* Tenant rows */}
      <div className="space-y-2">
        {layers.map((layer, i) => (
          <div
            key={i}
            className="flex items-center gap-3 px-4 py-3 border-l-2"
            style={{
              borderLeftColor: "var(--primary)",
              backgroundColor: "color-mix(in oklch, var(--primary) 5%, transparent)",
              borderTopColor: "color-mix(in oklch, var(--primary) 15%, transparent)",
              borderRightColor: "color-mix(in oklch, var(--primary) 15%, transparent)",
              borderBottomColor: "color-mix(in oklch, var(--primary) 15%, transparent)",
              borderWidth: "1px",
              borderLeftWidth: "2px",
            }}
          >
            <Building2
              className="h-4 w-4 shrink-0"
              style={{ color: "var(--primary)" }}
            />
            <div className="min-w-0">
              <p className="text-sm font-semibold truncate">{layer.label}</p>
              <p className="text-xs text-muted-foreground font-mono">{layer.sublabel}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Separator with label */}
      <div className="flex items-center gap-3">
        <div className="flex-1 border-t border-dashed border-border/60" />
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground px-2">
          <Shield className="h-3 w-3" />
          <span className="font-mono uppercase tracking-wide text-[10px]">Tenant boundary enforced at query level</span>
        </div>
        <div className="flex-1 border-t border-dashed border-border/60" />
      </div>

      {/* Internal layer — crosses tenants */}
      <div
        className="flex items-center gap-3 px-4 py-3 border"
        style={{
          borderColor: "color-mix(in oklch, var(--accent) 30%, transparent)",
          backgroundColor: "color-mix(in oklch, var(--accent) 6%, transparent)",
        }}
      >
        <Users
          className="h-4 w-4 shrink-0"
          style={{ color: "var(--accent)" }}
        />
        <div className="min-w-0">
          <p className="text-sm font-semibold">Internal Designers</p>
          <p className="text-xs text-muted-foreground">
            Cross-tenant access via explicit project membership — never implicit org access
          </p>
        </div>
        <Lock
          className="h-3.5 w-3.5 shrink-0 text-muted-foreground"
        />
      </div>

      {/* Data store */}
      <div
        className="flex items-center gap-3 px-4 py-3 border"
        style={{
          borderColor: "color-mix(in oklch, var(--border), transparent 20%)",
          backgroundColor: "var(--muted)",
        }}
      >
        <Database className="h-4 w-4 shrink-0 text-muted-foreground" />
        <div className="min-w-0">
          <p className="text-sm font-medium">Single database — scoped by <code className="font-mono text-xs bg-border/40 px-1 py-0.5">organization_id</code> on every query</p>
          <p className="text-xs text-muted-foreground mt-0.5">Row-level security · No cross-tenant joins possible</p>
        </div>
      </div>
    </div>
  );
}
