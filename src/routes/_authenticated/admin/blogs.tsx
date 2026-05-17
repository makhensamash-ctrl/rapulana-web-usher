import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Plus } from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin/blogs")({
  component: BlogsAdmin,
});

function BlogsAdmin() {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["admin-blogs"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  async function remove(id: string) {
    if (!confirm("Delete this blog post?")) return;
    const { error } = await supabase.from("blogs").delete().eq("id", id);
    if (error) return alert(error.message);
    qc.invalidateQueries({ queryKey: ["admin-blogs"] });
  }

  async function togglePublish(id: string, published: boolean) {
    const { error } = await supabase
      .from("blogs")
      .update({
        published: !published,
        published_at: !published ? new Date().toISOString() : null,
      })
      .eq("id", id);
    if (error) return alert(error.message);
    qc.invalidateQueries({ queryKey: ["admin-blogs"] });
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl text-primary">Blogs</h1>
        <Link
          to="/admin/blogs/$id"
          params={{ id: "new" }}
          className="inline-flex items-center gap-1.5 rounded-sm bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
        >
          <Plus className="h-4 w-4" /> New post
        </Link>
      </div>

      <div className="mt-6 overflow-x-auto rounded-sm border border-border">
        <table className="w-full text-sm">
          <thead className="bg-secondary/10 text-left text-xs uppercase text-muted-foreground">
            <tr>
              <th className="px-3 py-2">Title</th>
              <th className="px-3 py-2">Status</th>
              <th className="px-3 py-2">Updated</th>
              <th className="px-3 py-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && <tr><td colSpan={4} className="p-6 text-center text-muted-foreground">Loading…</td></tr>}
            {!isLoading && data?.length === 0 && (
              <tr><td colSpan={4} className="p-6 text-center text-muted-foreground">No posts yet — create your first one.</td></tr>
            )}
            {data?.map((b) => (
              <tr key={b.id} className="border-t border-border">
                <td className="px-3 py-3">
                  <div className="font-medium text-primary">{b.title}</div>
                  <div className="text-xs text-muted-foreground">/{b.slug}</div>
                </td>
                <td className="px-3 py-3">
                  <span className={`rounded-full px-2 py-0.5 text-xs ${
                    b.published ? "bg-green-100 text-green-800" : "bg-muted text-muted-foreground"
                  }`}>{b.published ? "Published" : "Draft"}</span>
                </td>
                <td className="px-3 py-3 text-xs text-muted-foreground whitespace-nowrap">
                  {new Date(b.updated_at).toLocaleDateString("en-ZA")}
                </td>
                <td className="px-3 py-3 text-right">
                  <div className="flex flex-wrap justify-end gap-1">
                    <button
                      onClick={() => togglePublish(b.id, b.published)}
                      className="rounded-sm border border-border px-2 py-1 text-xs hover:bg-secondary/10"
                    >
                      {b.published ? "Unpublish" : "Publish"}
                    </button>
                    <Link
                      to="/admin/blogs/$id"
                      params={{ id: b.id }}
                      className="rounded-sm border border-border px-2 py-1 text-xs hover:bg-secondary/10"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => remove(b.id)}
                      className="rounded-sm border border-destructive/40 px-2 py-1 text-xs text-destructive hover:bg-destructive/10"
                    >
                      Delete
                    </button>
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
