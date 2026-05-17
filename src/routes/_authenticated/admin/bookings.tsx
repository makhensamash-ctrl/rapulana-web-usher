import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/admin/bookings")({
  component: BookingsAdmin,
});

const STATUSES = ["all", "pending", "paid", "cancelled"] as const;
type Status = (typeof STATUSES)[number];

function BookingsAdmin() {
  const qc = useQueryClient();
  const [status, setStatus] = useState<Status>("all");

  const { data, isLoading } = useQuery({
    queryKey: ["admin-bookings", status],
    queryFn: async () => {
      let q = supabase.from("bookings").select("*").order("starts_at", { ascending: false });
      if (status !== "all") q = q.eq("payment_status", status);
      const { data, error } = await q;
      if (error) throw error;
      return data;
    },
  });

  async function updateStatus(id: string, payment_status: string) {
    const { error } = await supabase.from("bookings").update({ payment_status }).eq("id", id);
    if (error) return alert(error.message);
    qc.invalidateQueries({ queryKey: ["admin-bookings"] });
  }

  async function remove(id: string) {
    if (!confirm("Delete this booking?")) return;
    const { error } = await supabase.from("bookings").delete().eq("id", id);
    if (error) return alert(error.message);
    qc.invalidateQueries({ queryKey: ["admin-bookings"] });
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl text-primary">Bookings</h1>
        <div className="flex gap-2">
          {STATUSES.map((s) => (
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
      </div>

      <div className="mt-6 overflow-x-auto rounded-sm border border-border">
        <table className="w-full text-sm">
          <thead className="bg-secondary/10 text-left text-xs uppercase text-muted-foreground">
            <tr>
              <th className="px-3 py-2">When</th>
              <th className="px-3 py-2">Client</th>
              <th className="px-3 py-2">Contact</th>
              <th className="px-3 py-2">Matter</th>
              <th className="px-3 py-2">Status</th>
              <th className="px-3 py-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr><td colSpan={6} className="p-6 text-center text-muted-foreground">Loading…</td></tr>
            )}
            {!isLoading && data?.length === 0 && (
              <tr><td colSpan={6} className="p-6 text-center text-muted-foreground">No bookings.</td></tr>
            )}
            {data?.map((b) => (
              <tr key={b.id} className="border-t border-border align-top">
                <td className="px-3 py-3 whitespace-nowrap">
                  {new Date(b.starts_at).toLocaleString("en-ZA", { dateStyle: "medium", timeStyle: "short" })}
                </td>
                <td className="px-3 py-3">{b.client_name}</td>
                <td className="px-3 py-3 text-xs">
                  <div>{b.client_email}</div>
                  <div className="text-muted-foreground">{b.client_phone}</div>
                </td>
                <td className="px-3 py-3 max-w-xs text-xs text-muted-foreground">{b.matter || "—"}</td>
                <td className="px-3 py-3">
                  <span className={`rounded-full px-2 py-0.5 text-xs capitalize ${
                    b.payment_status === "paid" ? "bg-green-100 text-green-800"
                    : b.payment_status === "cancelled" ? "bg-red-100 text-red-800"
                    : "bg-amber-100 text-amber-800"
                  }`}>{b.payment_status}</span>
                </td>
                <td className="px-3 py-3 text-right">
                  <div className="flex flex-wrap justify-end gap-1">
                    {b.payment_status !== "paid" && (
                      <button onClick={() => updateStatus(b.id, "paid")} className="rounded-sm border border-border px-2 py-1 text-xs hover:bg-secondary/10">Mark paid</button>
                    )}
                    {b.payment_status !== "cancelled" && (
                      <button onClick={() => updateStatus(b.id, "cancelled")} className="rounded-sm border border-border px-2 py-1 text-xs hover:bg-secondary/10">Cancel</button>
                    )}
                    <button onClick={() => remove(b.id)} className="rounded-sm border border-destructive/40 px-2 py-1 text-xs text-destructive hover:bg-destructive/10">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
