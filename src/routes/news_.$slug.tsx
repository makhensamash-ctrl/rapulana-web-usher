import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import ReactMarkdown from "react-markdown";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/news_/$slug")({
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
        <div className="mx-auto max-w-3xl space-y-5 text-base leading-relaxed text-foreground/90 [&_h1]:mt-10 [&_h1]:text-3xl [&_h1]:text-primary [&_h2]:mt-8 [&_h2]:text-2xl [&_h2]:text-primary [&_h3]:mt-6 [&_h3]:text-xl [&_h3]:text-primary [&_a]:text-secondary [&_a]:underline [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_strong]:text-primary [&_blockquote]:border-l-4 [&_blockquote]:border-secondary [&_blockquote]:pl-4 [&_blockquote]:italic [&_code]:rounded [&_code]:bg-muted [&_code]:px-1 [&_img]:rounded-sm">
          <ReactMarkdown>{data.content}</ReactMarkdown>
        </div>
      </section>
    </article>
  );
}
