import { W as reactExports, L as jsxRuntimeExports } from "./server-ASaDeMZs.js";
import { f as useQueryClient, e as useQuery } from "./router-CO9yg4eA.js";
import { s as supabase } from "./client-5KSn606E.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./index-DdGN5IVl.js";
const STATUSES = ["all", "pending", "paid", "cancelled"];
function BookingsAdmin() {
  const qc = useQueryClient();
  const [status, setStatus] = reactExports.useState("all");
  const {
    data,
    isLoading
  } = useQuery({
    queryKey: ["admin-bookings", status],
    queryFn: async () => {
      let q = supabase.from("bookings").select("*").order("starts_at", {
        ascending: false
      });
      if (status !== "all") q = q.eq("payment_status", status);
      const {
        data: data2,
        error
      } = await q;
      if (error) throw error;
      return data2;
    }
  });
  async function updateStatus(id, payment_status) {
    const {
      error
    } = await supabase.from("bookings").update({
      payment_status
    }).eq("id", id);
    if (error) return alert(error.message);
    qc.invalidateQueries({
      queryKey: ["admin-bookings"]
    });
  }
  async function remove(id) {
    if (!confirm("Delete this booking?")) return;
    const {
      error
    } = await supabase.from("bookings").delete().eq("id", id);
    if (error) return alert(error.message);
    qc.invalidateQueries({
      queryKey: ["admin-bookings"]
    });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl text-primary", children: "Bookings" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: STATUSES.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setStatus(s), className: `rounded-sm border px-3 py-1.5 text-xs capitalize ${status === s ? "border-primary bg-primary text-primary-foreground" : "border-border"}`, children: s }, s)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 overflow-x-auto rounded-sm border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-secondary/10 text-left text-xs uppercase text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2", children: "When" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2", children: "Client" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2", children: "Contact" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2", children: "Matter" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2", children: "Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2 text-right", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
        isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 6, className: "p-6 text-center text-muted-foreground", children: "Loading…" }) }),
        !isLoading && data?.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 6, className: "p-6 text-center text-muted-foreground", children: "No bookings." }) }),
        data?.map((b) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t border-border align-top", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-3 whitespace-nowrap", children: new Date(b.starts_at).toLocaleString("en-ZA", {
            dateStyle: "medium",
            timeStyle: "short"
          }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-3", children: b.client_name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-3 py-3 text-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: b.client_email }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-muted-foreground", children: b.client_phone })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-3 max-w-xs text-xs text-muted-foreground", children: b.matter || "—" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `rounded-full px-2 py-0.5 text-xs capitalize ${b.payment_status === "paid" ? "bg-green-100 text-green-800" : b.payment_status === "cancelled" ? "bg-red-100 text-red-800" : "bg-amber-100 text-amber-800"}`, children: b.payment_status }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-3 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap justify-end gap-1", children: [
            b.payment_status !== "paid" && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => updateStatus(b.id, "paid"), className: "rounded-sm border border-border px-2 py-1 text-xs hover:bg-secondary/10", children: "Mark paid" }),
            b.payment_status !== "cancelled" && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => updateStatus(b.id, "cancelled"), className: "rounded-sm border border-border px-2 py-1 text-xs hover:bg-secondary/10", children: "Cancel" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => remove(b.id), className: "rounded-sm border border-destructive/40 px-2 py-1 text-xs text-destructive hover:bg-destructive/10", children: "Delete" })
          ] }) })
        ] }, b.id))
      ] })
    ] }) })
  ] });
}
export {
  BookingsAdmin as component
};
