import { createFileRoute, Outlet, Link, useRouterState, useNavigate } from "@tanstack/react-router";
import { LayoutDashboard, CalendarCheck, Newspaper, LogOut, UserCog, Mail } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAdminAuth } from "@/hooks/use-admin-auth";

export const Route = createFileRoute("/_authenticated/admin")({
  component: AdminLayout,
});

const nav: Array<{ to: string; label: string; icon: typeof LayoutDashboard; exact?: boolean }> = [
  { to: "/admin", label: "Overview", icon: LayoutDashboard, exact: true },
  { to: "/admin/bookings", label: "Bookings", icon: CalendarCheck },
  { to: "/admin/blogs", label: "Blogs", icon: Newspaper },
  { to: "/admin/emails", label: "Email Log", icon: Mail },
  { to: "/admin/users", label: "Users & Roles", icon: UserCog },
];

function AdminLayout() {
  const auth = useAdminAuth();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  async function signOut() {
    await supabase.auth.signOut();
    navigate({ to: "/login" });
  }

  return (
    <div className="container-prose py-10">
      <div className="grid gap-8 md:grid-cols-[220px_1fr]">
        <aside className="space-y-1">
          <p className="eyebrow mb-4">Admin</p>
          {nav.map(({ to, label, icon: Icon, exact }) => {
            const active = exact ? pathname === to : pathname.startsWith(to);
            return (
              <Link
                key={to}
                to={to as "/admin"}
                className={`flex items-center gap-2 rounded-sm px-3 py-2 text-sm transition ${
                  active
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-secondary/10"
                }`}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            );
          })}
          <div className="pt-6">
            <p className="px-3 text-xs text-muted-foreground">{auth.email}</p>
            <button
              onClick={signOut}
              className="mt-2 flex w-full items-center gap-2 rounded-sm px-3 py-2 text-sm text-muted-foreground hover:bg-secondary/10 hover:text-primary"
            >
              <LogOut className="h-4 w-4" /> Sign out
            </button>
          </div>
        </aside>
        <main className="min-w-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
