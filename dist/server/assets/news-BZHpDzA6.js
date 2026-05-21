import { L as jsxRuntimeExports } from "./server-ASaDeMZs.js";
import { e as useQuery, L as Link } from "./router-CO9yg4eA.js";
import { s as supabase } from "./client-5KSn606E.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./index-DdGN5IVl.js";
function NewsPage() {
  const {
    data,
    isLoading
  } = useQuery({
    queryKey: ["public-blogs"],
    queryFn: async () => {
      const {
        data: data2,
        error
      } = await supabase.from("blogs").select("id, title, slug, excerpt, cover_image_url, author_name, published_at").eq("published", true).order("published_at", {
        ascending: false
      });
      if (error) throw error;
      return data2;
    }
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "relative overflow-hidden bg-primary text-primary-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-prose relative py-24 md:py-36", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow text-secondary", children: "Insights" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-3 text-4xl md:text-6xl", children: "News & Articles" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 max-w-2xl text-base md:text-lg text-primary-foreground/80", children: "Perspectives, updates and practical legal guidance from the team at Rapulana Attorneys." })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "container-prose py-20", children: [
      isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Loading…" }),
      !isLoading && data?.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-sm border border-dashed border-border p-12 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "No articles published yet. Check back soon." }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-8 md:grid-cols-2 lg:grid-cols-3", children: data?.map((post) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/news/$slug", params: {
        slug: post.slug
      }, className: "group flex flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-sm transition hover:-translate-y-1 hover:shadow-lg", children: [
        post.cover_image_url ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: post.cover_image_url, alt: post.title, className: "aspect-[16/10] w-full object-cover", loading: "lazy" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-[16/10] w-full bg-secondary/10" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-1 flex-col p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-widest text-muted-foreground", children: post.published_at && new Date(post.published_at).toLocaleDateString("en-ZA", {
            year: "numeric",
            month: "long",
            day: "numeric"
          }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-3 text-xl text-primary transition group-hover:text-secondary", children: post.title }),
          post.excerpt && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 line-clamp-3 text-sm text-muted-foreground", children: post.excerpt }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-auto pt-5 text-xs text-muted-foreground", children: [
            "By ",
            post.author_name
          ] })
        ] })
      ] }, post.id)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "border-y border-border bg-secondary/5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-prose py-16 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow", children: "Need legal counsel?" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-3 text-3xl text-primary md:text-4xl", children: "Book a consultation today." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/booking", className: "mt-6 inline-flex items-center justify-center rounded-sm bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90", children: "Book a Consultation" })
    ] }) })
  ] });
}
export {
  NewsPage as component
};
