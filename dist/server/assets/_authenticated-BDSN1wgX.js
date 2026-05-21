import { W as reactExports, L as jsxRuntimeExports, O as Outlet } from "./server-ASaDeMZs.js";
import { u as useNavigate, L as Link } from "./router-CO9yg4eA.js";
import { u as useAdminAuth } from "./use-admin-auth-jrLbe9sV.js";
import { s as supabase } from "./client-5KSn606E.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./index-DdGN5IVl.js";
function AuthGate() {
  const auth = useAdminAuth();
  const navigate = useNavigate();
  reactExports.useEffect(() => {
    if (auth.loading || !auth.userId) return;
    supabase.auth.getUser().then(({
      data
    }) => {
      if (data.user?.user_metadata?.must_change_password) {
        navigate({
          to: "/change-password"
        });
      }
    });
  }, [auth.loading, auth.userId, navigate]);
  async function signOut() {
    await supabase.auth.signOut();
    navigate({
      to: "/login"
    });
  }
  if (auth.loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container-prose flex min-h-[60vh] items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Loading…" }) });
  }
  if (!auth.userId) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-prose flex min-h-[60vh] flex-col items-center justify-center text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl text-primary", children: "Sign in required" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "You need to sign in to access this page." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/login", className: "mt-6 inline-flex rounded-sm bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90", children: "Go to sign in" })
    ] });
  }
  if (!auth.isAdmin) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-prose flex min-h-[60vh] flex-col items-center justify-center text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl text-primary", children: "Not authorized" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 text-sm text-muted-foreground", children: [
        "Your account (",
        auth.email,
        ") doesn't have admin access."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap items-center justify-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "inline-flex rounded-sm bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90", children: "Go home" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: signOut, className: "inline-flex rounded-sm border border-border px-5 py-2.5 text-sm font-semibold text-primary hover:bg-secondary/10", children: "Sign out" })
      ] })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {});
}
export {
  AuthGate as component
};
