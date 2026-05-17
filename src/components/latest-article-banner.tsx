import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Newspaper } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export function LatestArticleBanner() {
  const { data } = useQuery({
    queryKey: ["latest-blog-banner"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blogs")
        .select("title, slug, published_at")
        .eq("published", true)
        .order("published_at", { ascending: false })
        .limit(1)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
    staleTime: 60_000,
  });

  if (!data) return null;

  const text = `Latest article: ${data.title}`;

  return (
    <div className="relative w-full overflow-hidden border-b border-primary/20 bg-primary text-primary-foreground">
      <Link
        to="/news/$slug"
        params={{ slug: data.slug }}
        className="group flex items-center gap-3 py-2"
        aria-label={`Read latest article: ${data.title}`}
      >
        <span className="flex shrink-0 items-center gap-2 border-r border-primary-foreground/20 px-4 text-[11px] font-semibold uppercase tracking-widest text-secondary">
          <Newspaper className="h-3.5 w-3.5" />
          New
        </span>
        <div className="relative flex-1 overflow-hidden">
          <div className="flex w-max animate-marquee gap-16 whitespace-nowrap pr-16 text-sm font-medium group-hover:[animation-play-state:paused]">
            {Array.from({ length: 2 }).map((_, i) => (
              <span key={i} className="inline-flex items-center gap-3">
                <span className="opacity-90">{text}</span>
                <span className="text-secondary underline-offset-4 group-hover:underline">
                  Read article →
                </span>
              </span>
            ))}
          </div>
        </div>
      </Link>
    </div>
  );
}
