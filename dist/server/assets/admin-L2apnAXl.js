import { a8 as useRouter, L as jsxRuntimeExports, O as Outlet } from "./server-ASaDeMZs.js";
import { c as createLucideIcon, u as useNavigate, N as Newspaper, L as Link } from "./router-CO9yg4eA.js";
import { s as supabase } from "./client-5KSn606E.js";
import { u as useAdminAuth } from "./use-admin-auth-jrLbe9sV.js";
import { C as CalendarCheck } from "./calendar-check-Bcwuc7DS.js";
import { U as UserCog } from "./user-cog-Bvj_gwhQ.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./index-DdGN5IVl.js";
function useRouterState(opts) {
  const contextRouter = useRouter({ warn: opts?.router === void 0 });
  const router = opts?.router || contextRouter;
  {
    const state = router.stores.__store.get();
    return opts?.select ? opts.select(state) : state;
  }
}
const __iconNode$1 = [
  ["rect", { width: "7", height: "9", x: "3", y: "3", rx: "1", key: "10lvy0" }],
  ["rect", { width: "7", height: "5", x: "14", y: "3", rx: "1", key: "16une8" }],
  ["rect", { width: "7", height: "9", x: "14", y: "12", rx: "1", key: "1hutg5" }],
  ["rect", { width: "7", height: "5", x: "3", y: "16", rx: "1", key: "ldoo1y" }]
];
const LayoutDashboard = createLucideIcon("layout-dashboard", __iconNode$1);
const __iconNode = [
  ["path", { d: "m16 17 5-5-5-5", key: "1bji2h" }],
  ["path", { d: "M21 12H9", key: "dn1m92" }],
  ["path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4", key: "1uf3rs" }]
];
const LogOut = createLucideIcon("log-out", __iconNode);
const nav = [{
  to: "/admin",
  label: "Overview",
  icon: LayoutDashboard,
  exact: true
}, {
  to: "/admin/bookings",
  label: "Bookings",
  icon: CalendarCheck
}, {
  to: "/admin/blogs",
  label: "Blogs",
  icon: Newspaper
}, {
  to: "/admin/users",
  label: "Users & Roles",
  icon: UserCog
}];
function AdminLayout() {
  const auth = useAdminAuth();
  const navigate = useNavigate();
  const pathname = useRouterState({
    select: (s) => s.location.pathname
  });
  async function signOut() {
    await supabase.auth.signOut();
    navigate({
      to: "/login"
    });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container-prose py-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-8 md:grid-cols-[220px_1fr]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "space-y-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow mb-4", children: "Admin" }),
      nav.map(({
        to,
        label,
        icon: Icon,
        exact
      }) => {
        const active = exact ? pathname === to : pathname.startsWith(to);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to, className: `flex items-center gap-2 rounded-sm px-3 py-2 text-sm transition ${active ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-secondary/10"}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4" }),
          label
        ] }, to);
      }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "px-3 text-xs text-muted-foreground", children: auth.email }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: signOut, className: "mt-2 flex w-full items-center gap-2 rounded-sm px-3 py-2 text-sm text-muted-foreground hover:bg-secondary/10 hover:text-primary", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "h-4 w-4" }),
          " Sign out"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "min-w-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) })
  ] }) });
}
export {
  AdminLayout as component
};
