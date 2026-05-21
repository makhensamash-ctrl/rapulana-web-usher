import { L as jsxRuntimeExports } from "./server-ASaDeMZs.js";
import { e as useQuery, L as Link, N as Newspaper } from "./router-CO9yg4eA.js";
import { s as supabase } from "./client-5KSn606E.js";
import { C as CalendarCheck } from "./calendar-check-Bcwuc7DS.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./index-DdGN5IVl.js";
function AdminOverview() {
  const {
    data
  } = useQuery({
    queryKey: ["admin-overview"],
    queryFn: async () => {
      const now = (/* @__PURE__ */ new Date()).toISOString();
      const [bookings, upcoming, blogs, published] = await Promise.all([supabase.from("bookings").select("id", {
        count: "exact",
        head: true
      }), supabase.from("bookings").select("id", {
        count: "exact",
        head: true
      }).gte("starts_at", now), supabase.from("blogs").select("id", {
        count: "exact",
        head: true
      }), supabase.from("blogs").select("id", {
        count: "exact",
        head: true
      }).eq("published", true)]);
      return {
        bookingsTotal: bookings.count ?? 0,
        bookingsUpcoming: upcoming.count ?? 0,
        blogsTotal: blogs.count ?? 0,
        blogsPublished: published.count ?? 0
      };
    }
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl text-primary", children: "Overview" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Manage bookings and blog content for the Rapulana Attorneys website." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 grid gap-4 sm:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/admin/bookings", className: "rounded-sm border border-border bg-background p-6 transition hover:-translate-y-0.5 hover:shadow-md", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarCheck, { className: "h-6 w-6 text-secondary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-3 text-xl text-primary", children: "Bookings" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-sm text-muted-foreground", children: [
          data?.bookingsUpcoming ?? "—",
          " upcoming · ",
          data?.bookingsTotal ?? "—",
          " total"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/admin/blogs", className: "rounded-sm border border-border bg-background p-6 transition hover:-translate-y-0.5 hover:shadow-md", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Newspaper, { className: "h-6 w-6 text-secondary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-3 text-xl text-primary", children: "Blogs" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-sm text-muted-foreground", children: [
          data?.blogsPublished ?? "—",
          " published · ",
          data?.blogsTotal ?? "—",
          " total"
        ] })
      ] })
    ] })
  ] });
}
export {
  AdminOverview as component
};
