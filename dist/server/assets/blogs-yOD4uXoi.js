import { L as jsxRuntimeExports } from "./server-ASaDeMZs.js";
import { c as createLucideIcon, f as useQueryClient, e as useQuery, L as Link } from "./router-CO9yg4eA.js";
import { s as supabase } from "./client-5KSn606E.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./index-DdGN5IVl.js";
const __iconNode = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
];
const Plus = createLucideIcon("plus", __iconNode);
function BlogsAdmin() {
  const qc = useQueryClient();
  const {
    data,
    isLoading
  } = useQuery({
    queryKey: ["admin-blogs"],
    queryFn: async () => {
      const {
        data: data2,
        error
      } = await supabase.from("blogs").select("*").order("created_at", {
        ascending: false
      });
      if (error) throw error;
      return data2;
    }
  });
  async function remove(id) {
    if (!confirm("Delete this blog post?")) return;
    const {
      error
    } = await supabase.from("blogs").delete().eq("id", id);
    if (error) return alert(error.message);
    qc.invalidateQueries({
      queryKey: ["admin-blogs"]
    });
  }
  async function togglePublish(id, published) {
    const {
      error
    } = await supabase.from("blogs").update({
      published: !published,
      published_at: !published ? (/* @__PURE__ */ new Date()).toISOString() : null
    }).eq("id", id);
    if (error) return alert(error.message);
    qc.invalidateQueries({
      queryKey: ["admin-blogs"]
    });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl text-primary", children: "Blogs" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/admin/blogs/$id", params: {
        id: "new"
      }, className: "inline-flex items-center gap-1.5 rounded-sm bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
        " New post"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 overflow-x-auto rounded-sm border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-secondary/10 text-left text-xs uppercase text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2", children: "Title" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2", children: "Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2", children: "Updated" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2 text-right", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
        isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 4, className: "p-6 text-center text-muted-foreground", children: "Loading…" }) }),
        !isLoading && data?.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 4, className: "p-6 text-center text-muted-foreground", children: "No posts yet — create your first one." }) }),
        data?.map((b) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-3 py-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium text-primary", children: b.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
              "/",
              b.slug
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `rounded-full px-2 py-0.5 text-xs ${b.published ? "bg-green-100 text-green-800" : "bg-muted text-muted-foreground"}`, children: b.published ? "Published" : "Draft" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-3 text-xs text-muted-foreground whitespace-nowrap", children: new Date(b.updated_at).toLocaleDateString("en-ZA") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-3 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap justify-end gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => togglePublish(b.id, b.published), className: "rounded-sm border border-border px-2 py-1 text-xs hover:bg-secondary/10", children: b.published ? "Unpublish" : "Publish" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/blogs/$id", params: {
              id: b.id
            }, className: "rounded-sm border border-border px-2 py-1 text-xs hover:bg-secondary/10", children: "Edit" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => remove(b.id), className: "rounded-sm border border-destructive/40 px-2 py-1 text-xs text-destructive hover:bg-destructive/10", children: "Delete" })
          ] }) })
        ] }, b.id))
      ] })
    ] }) })
  ] });
}
export {
  BlogsAdmin as component
};
