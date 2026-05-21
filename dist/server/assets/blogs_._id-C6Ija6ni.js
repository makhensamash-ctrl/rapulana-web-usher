import { W as reactExports, L as jsxRuntimeExports } from "./server-ASaDeMZs.js";
import { c as createLucideIcon, a as Route, u as useNavigate, L as Link } from "./router-CO9yg4eA.js";
import { s as supabase } from "./client-5KSn606E.js";
import { A as ArrowLeft } from "./arrow-left-C5TTuicD.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./index-DdGN5IVl.js";
const __iconNode = [
  ["path", { d: "M12 3v12", key: "1x0j5s" }],
  ["path", { d: "m17 8-5-5-5 5", key: "7q97r8" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }]
];
const Upload = createLucideIcon("upload", __iconNode);
function slugify(s) {
  return s.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").slice(0, 80);
}
const empty = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  cover_image_url: "",
  author_name: "Rapulana Attorneys",
  published: false
};
function BlogEditor() {
  const {
    id
  } = Route.useParams();
  const navigate = useNavigate();
  const isNew = id === "new";
  const [form, setForm] = reactExports.useState(empty);
  const [loading, setLoading] = reactExports.useState(!isNew);
  const [saving, setSaving] = reactExports.useState(false);
  const [uploading, setUploading] = reactExports.useState(false);
  const [slugTouched, setSlugTouched] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (isNew) return;
    supabase.from("blogs").select("*").eq("id", id).maybeSingle().then(({
      data,
      error: error2
    }) => {
      if (error2) setError(error2.message);
      if (data) {
        setForm({
          title: data.title,
          slug: data.slug,
          excerpt: data.excerpt ?? "",
          content: data.content,
          cover_image_url: data.cover_image_url ?? "",
          author_name: data.author_name,
          published: data.published
        });
        setSlugTouched(true);
      }
      setLoading(false);
    });
  }, [id, isNew]);
  function update(key, value) {
    setForm((f) => ({
      ...f,
      [key]: value
    }));
  }
  async function handleUpload(file) {
    setUploading(true);
    const ext = file.name.split(".").pop();
    const path = `${crypto.randomUUID()}.${ext}`;
    const {
      error: error2
    } = await supabase.storage.from("blog-images").upload(path, file, {
      cacheControl: "3600",
      upsert: false
    });
    if (error2) {
      alert(error2.message);
      setUploading(false);
      return;
    }
    const {
      data
    } = supabase.storage.from("blog-images").getPublicUrl(path);
    update("cover_image_url", data.publicUrl);
    setUploading(false);
  }
  async function save(e) {
    e.preventDefault();
    setError(null);
    setSaving(true);
    const payload = {
      ...form,
      slug: form.slug || slugify(form.title),
      excerpt: form.excerpt || null,
      cover_image_url: form.cover_image_url || null,
      published_at: form.published ? (/* @__PURE__ */ new Date()).toISOString() : null
    };
    let result;
    if (isNew) {
      result = await supabase.from("blogs").insert(payload).select("id").single();
    } else {
      result = await supabase.from("blogs").update(payload).eq("id", id).select("id").single();
    }
    setSaving(false);
    if (result.error) {
      setError(result.error.message);
      return;
    }
    navigate({
      to: "/admin/blogs"
    });
  }
  if (loading) return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Loading…" });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/admin/blogs", className: "inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-3.5 w-3.5" }),
      " Back to blogs"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-2 text-3xl text-primary", children: isNew ? "New post" : "Edit post" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: save, className: "mt-6 space-y-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Title", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { required: true, value: form.title, onChange: (e) => {
        update("title", e.target.value);
        if (!slugTouched) update("slug", slugify(e.target.value));
      }, className: "input" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Slug", hint: "URL: /news/your-slug", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { required: true, value: form.slug, onChange: (e) => {
        setSlugTouched(true);
        update("slug", slugify(e.target.value));
      }, className: "input" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Excerpt", hint: "Short summary shown on the news list (optional)", children: /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { rows: 2, value: form.excerpt, onChange: (e) => update("excerpt", e.target.value), className: "input" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Cover image", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        form.cover_image_url && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: form.cover_image_url, alt: "cover", className: "h-32 w-full rounded-sm object-cover" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: form.cover_image_url, onChange: (e) => update("cover_image_url", e.target.value), placeholder: "Paste URL or upload", className: "input flex-1" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "inline-flex cursor-pointer items-center gap-1 rounded-sm border border-border bg-background px-3 py-2 text-xs hover:bg-secondary/10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-3.5 w-3.5" }),
            " ",
            uploading ? "Uploading…" : "Upload",
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "file", accept: "image/*", className: "hidden", onChange: (e) => {
              const f = e.target.files?.[0];
              if (f) handleUpload(f);
            } })
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Author", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: form.author_name, onChange: (e) => update("author_name", e.target.value), className: "input" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Content", hint: "Markdown supported (#, **bold**, lists, links)", children: /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { required: true, rows: 16, value: form.content, onChange: (e) => update("content", e.target.value), className: "input font-mono text-sm" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: form.published, onChange: (e) => update("published", e.target.checked) }),
        "Published"
      ] }),
      error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-destructive", children: error }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: saving, className: "rounded-sm bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-60", children: saving ? "Saving…" : "Save" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/blogs", className: "rounded-sm border border-border px-5 py-2.5 text-sm hover:bg-secondary/10", children: "Cancel" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `.input{width:100%;border-radius:0.125rem;border:1px solid hsl(var(--border));background:hsl(var(--background));padding:0.5rem 0.75rem;font-size:0.875rem;}` })
  ] });
}
function Field({
  label,
  hint,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium text-primary", children: label }),
    hint && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-1 text-xs text-muted-foreground", children: hint }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1", children })
  ] });
}
export {
  BlogEditor as component
};
