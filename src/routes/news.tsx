import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/news")({
  head: () => ({
    meta: [
      { title: "News & Articles — Rapulana Attorneys" },
      { name: "description", content: "Insights, updates and legal perspectives from Rapulana Attorneys." },
      { property: "og:title", content: "News & Articles — Rapulana Attorneys" },
      { property: "og:description", content: "Insights, updates and legal perspectives from Rapulana Attorneys." },
    ],
  }),
  component: NewsPage,
});

function NewsPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["public-blogs"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blogs")
        .select("id, title, slug, excerpt, cover_image_url, author_name, published_at")
        .eq("published", true)
        .order("published_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-primary text-primary-foreground">
        <div className="container-prose relative py-24 md:py-36">
          <p className="eyebrow text-secondary">Insights</p>
          <h1 className="mt-3 text-4xl md:text-6xl">News &amp; Articles</h1>
          <p className="mt-6 max-w-2xl text-base md:text-lg text-primary-foreground/80">
            Perspectives, updates and practical legal guidance from the team at Rapulana Attorneys.
          </p>
        </div>
      </section>

      {/* LIST */}
      <section className="container-prose py-20">
        {isLoading && <p className="text-muted-foreground">Loading…</p>}
        {!isLoading && data?.length === 0 && (
          <div className="rounded-sm border border-dashed border-border p-12 text-center">
            <p className="text-muted-foreground">No articles published yet. Check back soon.</p>
          </div>
        )}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {data?.map((post) => (
            <Link
              key={post.id}
              to="/news/$slug"
              params={{ slug: post.slug }}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              {post.cover_image_url ? (
                <img
                  src={post.cover_image_url}
                  alt={post.title}
                  className="aspect-[16/10] w-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="aspect-[16/10] w-full bg-secondary/10" />
              )}
              <div className="flex flex-1 flex-col p-6">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">
                  {post.published_at && new Date(post.published_at).toLocaleDateString("en-ZA", {
                    year: "numeric", month: "long", day: "numeric",
                  })}
                </p>
                <h2 className="mt-3 text-xl text-primary transition group-hover:text-secondary">
                  {post.title}
                </h2>
                {post.excerpt && (
                  <p className="mt-3 line-clamp-3 text-sm text-muted-foreground">{post.excerpt}</p>
                )}
                <p className="mt-auto pt-5 text-xs text-muted-foreground">By {post.author_name}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-y border-border bg-secondary/5">
        <div className="container-prose py-16 text-center">
          <p className="eyebrow">Need legal counsel?</p>
          <h2 className="mt-3 text-3xl text-primary md:text-4xl">Book a consultation today.</h2>
          <Link
            to="/booking"
            className="mt-6 inline-flex items-center justify-center rounded-sm bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
          >
            Book a Consultation
          </Link>
        </div>
      </section>
    </>
  );
}
