import { X, Check, FolderOpen, Mail, AlertCircle, Shield, Eye, Users } from "lucide-react";

interface AccessRow {
  resource: string;
  admin: boolean | "partial";
  pm: boolean | "partial";
  designer: boolean | "partial";
  client: boolean | "partial";
}

const accessMatrix: AccessRow[] = [
  { resource: "All client projects", admin: true, pm: true, designer: false, client: false },
  { resource: "Own assigned projects", admin: true, pm: true, designer: true, client: false },
  { resource: "Own org projects", admin: true, pm: true, designer: "partial", client: true },
  { resource: "Draft deliverables", admin: true, pm: true, designer: true, client: false },
  { resource: "Approved deliverables", admin: true, pm: true, designer: true, client: true },
  { resource: "Comment threads", admin: true, pm: true, designer: true, client: "partial" },
  { resource: "T&A calendar (all)", admin: true, pm: true, designer: false, client: false },
  { resource: "Budget & invoicing", admin: true, pm: "partial", designer: false, client: false },
];

function AccessCell({ value }: { value: boolean | "partial" }) {
  if (value === true)
    return (
      <Check
        className="h-3.5 w-3.5 mx-auto"
        style={{ color: "var(--success)" }}
      />
    );
  if (value === false)
    return (
      <X
        className="h-3.5 w-3.5 mx-auto text-muted-foreground/40"
      />
    );
  return (
    <span
      className="text-[10px] font-mono mx-auto block text-center"
      style={{ color: "var(--warning)" }}
      title="Limited access"
    >
      lim
    </span>
  );
}

export function VizRbac() {
  return (
    <div className="space-y-4">
      {/* Before — scattered tools */}
      <div>
        <p
          className="text-xs font-semibold uppercase tracking-widest mb-2"
          style={{ color: "oklch(0.577 0.245 27.325)" }}
        >
          Current state
        </p>
        <div
          className="grid grid-cols-3 gap-2 p-3"
          style={{
            backgroundColor: "color-mix(in oklch, var(--destructive) 6%, transparent)",
            borderColor: "color-mix(in oklch, var(--destructive) 18%, transparent)",
            borderWidth: "1px",
            borderStyle: "solid",
          }}
        >
          {[
            { label: "Google Drive folders", icon: FolderOpen, note: "Manual, per-client" },
            { label: "Email threads", icon: Mail, note: "No version control" },
            { label: "Asana (internal only)", icon: AlertCircle, note: "Clients never see this" },
          ].map((item) => (
            <div key={item.label} className="flex flex-col items-center gap-1 text-center">
              <item.icon
                className="h-5 w-5"
                style={{ color: "oklch(0.577 0.245 27.325)" }}
              />
              <p className="text-xs font-medium leading-tight">{item.label}</p>
              <p className="text-[10px] text-muted-foreground">{item.note}</p>
            </div>
          ))}
        </div>
      </div>

      {/* After — unified RBAC table */}
      <div>
        <p
          className="text-xs font-semibold uppercase tracking-widest mb-2"
          style={{ color: "var(--success)" }}
        >
          Proposed — unified permission model
        </p>
        <div
          className="overflow-x-auto"
          style={{
            backgroundColor: "color-mix(in oklch, var(--success) 4%, transparent)",
            borderColor: "color-mix(in oklch, var(--success) 18%, transparent)",
            borderWidth: "1px",
            borderStyle: "solid",
          }}
        >
          <table className="w-full text-xs min-w-[360px]">
            <thead>
              <tr
                style={{
                  borderBottom: "1px solid color-mix(in oklch, var(--border), transparent 30%)",
                }}
              >
                <th className="text-left px-3 py-2 font-semibold text-muted-foreground w-48">
                  Resource
                </th>
                {[
                  { label: "Admin", icon: Shield },
                  { label: "PM", icon: Users },
                  { label: "Designer", icon: Eye },
                  { label: "Client", icon: Eye },
                ].map((col) => (
                  <th key={col.label} className="text-center px-2 py-2 font-semibold">
                    <div className="flex flex-col items-center gap-0.5">
                      <col.icon className="h-3 w-3 text-muted-foreground" />
                      <span>{col.label}</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {accessMatrix.map((row, i) => (
                <tr
                  key={row.resource}
                  style={{
                    backgroundColor:
                      i % 2 === 0
                        ? "transparent"
                        : "color-mix(in oklch, var(--muted), transparent 60%)",
                  }}
                >
                  <td className="px-3 py-1.5 text-xs text-muted-foreground">
                    {row.resource}
                  </td>
                  <td className="px-2 py-1.5">
                    <AccessCell value={row.admin} />
                  </td>
                  <td className="px-2 py-1.5">
                    <AccessCell value={row.pm} />
                  </td>
                  <td className="px-2 py-1.5">
                    <AccessCell value={row.designer} />
                  </td>
                  <td className="px-2 py-1.5">
                    <AccessCell value={row.client} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-[10px] text-muted-foreground mt-1.5 font-mono">
          lim = limited access · enforced server-side on every request
        </p>
      </div>
    </div>
  );
}
