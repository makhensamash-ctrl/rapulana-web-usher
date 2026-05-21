import { W as reactExports, L as jsxRuntimeExports } from "./server-ASaDeMZs.js";
import { u as useNavigate } from "./router-CO9yg4eA.js";
import { s as supabase } from "./client-5KSn606E.js";
import { t as toast } from "./index-CPFCxFfm.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./index-DdGN5IVl.js";
function ChangePasswordPage() {
  const navigate = useNavigate();
  const [checking, setChecking] = reactExports.useState(true);
  const [email, setEmail] = reactExports.useState(null);
  const [password, setPassword] = reactExports.useState("");
  const [confirm, setConfirm] = reactExports.useState("");
  const [submitting, setSubmitting] = reactExports.useState(false);
  reactExports.useEffect(() => {
    supabase.auth.getUser().then(({
      data
    }) => {
      if (!data.user) {
        navigate({
          to: "/login"
        });
        return;
      }
      setEmail(data.user.email ?? null);
      setChecking(false);
    });
  }, [navigate]);
  async function onSubmit(e) {
    e.preventDefault();
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }
    if (password !== confirm) {
      toast.error("Passwords do not match");
      return;
    }
    setSubmitting(true);
    const {
      error
    } = await supabase.auth.updateUser({
      password,
      data: {
        must_change_password: false
      }
    });
    setSubmitting(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Password updated");
    navigate({
      to: "/admin"
    });
  }
  if (checking) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container-prose flex min-h-[60vh] items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Loading…" }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container-prose flex min-h-[60vh] items-center justify-center py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit, className: "w-full max-w-sm space-y-4 rounded-sm border border-border bg-background p-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl text-primary", children: "Set a new password" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-sm text-muted-foreground", children: [
        "For security, please replace the temporary password for",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: email }),
        " before continuing."
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mb-1 block text-muted-foreground", children: "New password" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "password", required: true, minLength: 8, value: password, onChange: (e) => setPassword(e.target.value), className: "w-full rounded-sm border border-border bg-background px-3 py-2" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mb-1 block text-muted-foreground", children: "Confirm password" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "password", required: true, minLength: 8, value: confirm, onChange: (e) => setConfirm(e.target.value), className: "w-full rounded-sm border border-border bg-background px-3 py-2" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: submitting, className: "w-full rounded-sm bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-50", children: submitting ? "Updating…" : "Update password" })
  ] }) });
}
export {
  ChangePasswordPage as component
};
