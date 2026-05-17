import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, Upload } from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin/blogs_/$id")({
  component: BlogEditor,
});

function slugify(s: string) {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}

type FormState = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image_url: string;
  author_name: string;
  published: boolean;
};

const empty: FormState = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  cover_image_url: "",
  author_name: "Rapulana Attorneys",
  published: false,
};

function BlogEditor() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const isNew = id === "new";
  const [form, setForm] = useState<FormState>(empty);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [slugTouched, setSlugTouched] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isNew) return;
    supabase.from("blogs").select("*").eq("id", id).maybeSingle().then(({ data, error }) => {
      if (error) setError(error.message);
      if (data) {
        setForm({
          title: data.title,
          slug: data.slug,
          excerpt: data.excerpt ?? "",
          content: data.content,
          cover_image_url: data.cover_image_url ?? "",
          author_name: data.author_name,
          published: data.published,
        });
        setSlugTouched(true);
      }
      setLoading(false);
    });
  }, [id, isNew]);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleUpload(file: File) {
    setUploading(true);
    const ext = file.name.split(".").pop();
    const path = `${crypto.randomUUID()}.${ext}`;
    const { error } = await supabase.storage.from("blog-images").upload(path, file, {
      cacheControl: "3600",
      upsert: false,
    });
    if (error) {
      alert(error.message);
      setUploading(false);
      return;
    }
    const { data } = supabase.storage.from("blog-images").getPublicUrl(path);
    update("cover_image_url", data.publicUrl);
    setUploading(false);
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSaving(true);
    const payload = {
      ...form,
      slug: form.slug || slugify(form.title),
      excerpt: form.excerpt || null,
      cover_image_url: form.cover_image_url || null,
      published_at: form.published ? new Date().toISOString() : null,
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
    navigate({ to: "/admin/blogs" });
  }

  if (loading) return <p className="text-sm text-muted-foreground">Loading…</p>;

  return (
    <div>
      <Link to="/admin/blogs" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary">
        <ArrowLeft className="h-3.5 w-3.5" /> Back to blogs
      </Link>
      <h1 className="mt-2 text-3xl text-primary">{isNew ? "New post" : "Edit post"}</h1>

      <form onSubmit={save} className="mt-6 space-y-5">
        <Field label="Title">
          <input
            required
            value={form.title}
            onChange={(e) => {
              update("title", e.target.value);
              if (!slugTouched) update("slug", slugify(e.target.value));
            }}
            className="input"
          />
        </Field>

        <Field label="Slug" hint="URL: /news/your-slug">
          <input
            required
            value={form.slug}
            onChange={(e) => { setSlugTouched(true); update("slug", slugify(e.target.value)); }}
            className="input"
          />
        </Field>

        <Field label="Excerpt" hint="Short summary shown on the news list (optional)">
          <textarea
            rows={2}
            value={form.excerpt}
            onChange={(e) => update("excerpt", e.target.value)}
            className="input"
          />
        </Field>

        <Field label="Cover image">
          <div className="space-y-2">
            {form.cover_image_url && (
              <img src={form.cover_image_url} alt="cover" className="h-32 w-full rounded-sm object-cover" />
            )}
            <div className="flex gap-2">
              <input
                value={form.cover_image_url}
                onChange={(e) => update("cover_image_url", e.target.value)}
                placeholder="Paste URL or upload"
                className="input flex-1"
              />
              <label className="inline-flex cursor-pointer items-center gap-1 rounded-sm border border-border bg-background px-3 py-2 text-xs hover:bg-secondary/10">
                <Upload className="h-3.5 w-3.5" /> {uploading ? "Uploading…" : "Upload"}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) handleUpload(f);
                  }}
                />
              </label>
            </div>
          </div>
        </Field>

        <Field label="Author">
          <input
            value={form.author_name}
            onChange={(e) => update("author_name", e.target.value)}
            className="input"
          />
        </Field>

        <Field label="Content" hint="Markdown supported (#, **bold**, lists, links)">
          <textarea
            required
            rows={16}
            value={form.content}
            onChange={(e) => update("content", e.target.value)}
            className="input font-mono text-sm"
          />
        </Field>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={form.published}
            onChange={(e) => update("published", e.target.checked)}
          />
          Published
        </label>

        {error && <p className="text-sm text-destructive">{error}</p>}

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={saving}
            className="rounded-sm bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-60"
          >
            {saving ? "Saving…" : "Save"}
          </button>
          <Link
            to="/admin/blogs"
            className="rounded-sm border border-border px-5 py-2.5 text-sm hover:bg-secondary/10"
          >
            Cancel
          </Link>
        </div>
      </form>

      <style>{`.input{width:100%;border-radius:0.125rem;border:1px solid hsl(var(--border));background:hsl(var(--background));padding:0.5rem 0.75rem;font-size:0.875rem;}`}</style>
    </div>
  );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-sm font-medium text-primary">{label}</label>
      {hint && <p className="mb-1 text-xs text-muted-foreground">{hint}</p>}
      <div className="mt-1">{children}</div>
    </div>
  );
}
