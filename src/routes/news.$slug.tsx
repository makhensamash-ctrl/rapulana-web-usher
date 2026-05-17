import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import ReactMarkdown from "react-markdown";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/news/$slug")({
  head: ({ params }) => ({
    meta: [
      { title: `${params.slug.replace(/-/g, " ")} — Rapulana Attorneys` },
    ],
  }),
  component: ArticlePage,
});

function ArticlePage() {
  const { slug } = Route.useParams();
  const { data, isLoading, error } = useQuery({
    queryKey: ["public-blog", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .eq("slug", slug)
        .eq("published", true)
        .maybeSingle();
      if (error) throw error;
      if (!data) throw notFound();
      return data;
    },
  });

  if (isLoading) {
    return <div className="container-prose py-24 text-muted-foreground">Loading…</div>;
  }
  if (error || !data) {
    return (
      <div className="container-prose py-24 text-center">
        <h1 className="text-2xl text-primary">Article not found</h1>
        <Link to="/news" className="mt-6 inline-flex text-sm text-secondary hover:underline">
          ← Back to News
        </Link>
      </div>
    );
  }

  return (
    <article>
      {/* HERO */}
      <section className="relative overflow-hidden bg-primary text-primary-foreground">
        {data.cover_image_url && (
          <>
            <img src={data.cover_image_url} alt="" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/60 to-primary/40" />
          </>
        )}
        <div className="container-prose relative py-20 md:py-28">
          <Link to="/news" className="inline-flex items-center gap-1 text-xs text-primary-foreground/80 hover:text-secondary">
            <ArrowLeft className="h-3.5 w-3.5" /> News &amp; Articles
          </Link>
          <h1 className="mt-4 text-3xl md:text-5xl">{data.title}</h1>
          <p className="mt-4 text-sm text-primary-foreground/80">
            By {data.author_name}
            {data.published_at && " · " + new Date(data.published_at).toLocaleDateString("en-ZA", { year: "numeric", month: "long", day: "numeric" })}
          </p>
        </div>
      </section>

      {/* BODY */}
      <section className="container-prose py-16">
        <div className="prose prose-neutral mx-auto max-w-3xl prose-headings:text-primary prose-a:text-secondary">
          <ReactMarkdown>{data.content}</ReactMarkdown>
        </div>
      </section>
    </article>
  );
}
