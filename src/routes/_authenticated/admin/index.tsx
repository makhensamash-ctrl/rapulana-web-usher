import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { CalendarCheck, Newspaper } from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin/")({
  component: AdminOverview,
});

function AdminOverview() {
  const { data } = useQuery({
    queryKey: ["admin-overview"],
    queryFn: async () => {
      const now = new Date().toISOString();
      const [bookings, upcoming, blogs, published] = await Promise.all([
        supabase.from("bookings").select("id", { count: "exact", head: true }),
        supabase
          .from("bookings")
          .select("id", { count: "exact", head: true })
          .gte("starts_at", now),
        supabase.from("blogs").select("id", { count: "exact", head: true }),
        supabase
          .from("blogs")
          .select("id", { count: "exact", head: true })
          .eq("published", true),
      ]);
      return {
        bookingsTotal: bookings.count ?? 0,
        bookingsUpcoming: upcoming.count ?? 0,
        blogsTotal: blogs.count ?? 0,
        blogsPublished: published.count ?? 0,
      };
    },
  });

  return (
    <div>
      <h1 className="text-3xl text-primary">Overview</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Manage bookings and blog content for the Rapulana Attorneys website.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <Link
          to="/admin/bookings"
          className="rounded-sm border border-border bg-background p-6 transition hover:-translate-y-0.5 hover:shadow-md"
        >
          <CalendarCheck className="h-6 w-6 text-secondary" />
          <h3 className="mt-3 text-xl text-primary">Bookings</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {data?.bookingsUpcoming ?? "—"} upcoming · {data?.bookingsTotal ?? "—"} total
          </p>
        </Link>
        <Link
          to="/admin/blogs"
          className="rounded-sm border border-border bg-background p-6 transition hover:-translate-y-0.5 hover:shadow-md"
        >
          <Newspaper className="h-6 w-6 text-secondary" />
          <h3 className="mt-3 text-xl text-primary">Blogs</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {data?.blogsPublished ?? "—"} published · {data?.blogsTotal ?? "—"} total
          </p>
        </Link>
      </div>
    </div>
  );
}
