import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useMemo, useState } from "react";
import { listEmailLogs } from "@/lib/email-logs.functions";

export const Route = createFileRoute("/_authenticated/admin/emails")({
  component: EmailLogsAdmin,
});

const STATUS_STYLES: Record<string, string> = {
  sent: "bg-green-100 text-green-800",
  pending: "bg-amber-100 text-amber-800",
  failed: "bg-red-100 text-red-800",
  dlq: "bg-red-100 text-red-800",
  suppressed: "bg-zinc-200 text-zinc-800",
  bounced: "bg-red-100 text-red-800",
  complained: "bg-red-100 text-red-800",
};

function EmailLogsAdmin() {
  const fetchLogs = useServerFn(listEmailLogs);
  const [status, setStatus] = useState<string>("all");
  const [template, setTemplate] = useState<string>("all");

  const { data, isLoading, error, refetch, isFetching } = useQuery({
    queryKey: ["admin-email-logs"],
    queryFn: () => fetchLogs(),
  });

  const templates = useMemo(() => {
    const set = new Set<string>();
    for (const r of data ?? []) set.add(r.template_name);
    return Array.from(set).sort();
  }, [data]);

  const filtered = useMemo(() => {
    return (data ?? []).filter(
      (r) =>
        (status === "all" || r.status === status) &&
        (template === "all" || r.template_name === template),
    );
  }, [data, status, template]);

  const counts = useMemo(() => {
    const c = { total: 0, sent: 0, failed: 0, suppressed: 0, pending: 0 };
    for (const r of data ?? []) {
      c.total++;
      if (r.status === "sent") c.sent++;
      else if (r.status === "failed" || r.status === "dlq" || r.status === "bounced") c.failed++;
      else if (r.status === "suppressed") c.suppressed++;
      else if (r.status === "pending") c.pending++;
    }
    return c;
  }, [data]);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl text-primary">Email Log</h1>
        <button
          onClick={() => refetch()}
          className="rounded-sm border border-border px-3 py-1.5 text-xs hover:bg-secondary/10"
        >
          {isFetching ? "Refreshing…" : "Refresh"}
        </button>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-5">
        {[
          { label: "Total", value: counts.total },
          { label: "Sent", value: counts.sent },
          { label: "Pending", value: counts.pending },
          { label: "Failed", value: counts.failed },
          { label: "Suppressed", value: counts.suppressed },
        ].map((s) => (
          <div key={s.label} className="rounded-sm border border-border p-3">
            <div className="text-xs uppercase text-muted-foreground">{s.label}</div>
            <div className="mt-1 text-2xl">{s.value}</div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <div className="flex gap-1">
          {["all", "sent", "pending", "failed", "dlq", "suppressed"].map((s) => (
            <button
              key={s}
              onClick={() => setStatus(s)}
              className={`rounded-sm border px-3 py-1.5 text-xs capitalize ${
                status === s ? "border-primary bg-primary text-primary-foreground" : "border-border"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
        <select
          value={template}
          onChange={(e) => setTemplate(e.target.value)}
          className="rounded-sm border border-border bg-background px-3 py-1.5 text-xs"
        >
          <option value="all">All templates</option>
          {templates.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>

      <div className="mt-4 overflow-x-auto rounded-sm border border-border">
        <table className="w-full text-sm">
          <thead className="bg-secondary/10 text-left text-xs uppercase text-muted-foreground">
            <tr>
              <th className="px-3 py-2">When</th>
              <th className="px-3 py-2">Template</th>
              <th className="px-3 py-2">Recipient</th>
              <th className="px-3 py-2">Status</th>
              <th className="px-3 py-2">Error</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr><td colSpan={5} className="p-6 text-center text-muted-foreground">Loading…</td></tr>
            )}
            {error && (
              <tr><td colSpan={5} className="p-6 text-center text-destructive">{(error as Error).message}</td></tr>
            )}
            {!isLoading && filtered.length === 0 && (
              <tr><td colSpan={5} className="p-6 text-center text-muted-foreground">No emails yet.</td></tr>
            )}
            {filtered.map((r) => (
              <tr key={r.id} className="border-t border-border align-top">
                <td className="px-3 py-3 whitespace-nowrap text-xs">
                  {new Date(r.created_at).toLocaleString("en-ZA", { dateStyle: "medium", timeStyle: "short" })}
                </td>
                <td className="px-3 py-3 text-xs">{r.template_name}</td>
                <td className="px-3 py-3 text-xs">{r.recipient_email}</td>
                <td className="px-3 py-3">
                  <span className={`rounded-full px-2 py-0.5 text-xs capitalize ${STATUS_STYLES[r.status] ?? "bg-zinc-100 text-zinc-800"}`}>
                    {r.status}
                  </span>
                </td>
                <td className="px-3 py-3 max-w-md text-xs text-muted-foreground">{r.error_message || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
