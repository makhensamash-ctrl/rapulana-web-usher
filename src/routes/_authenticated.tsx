import { createFileRoute, Outlet, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAdminAuth } from "@/hooks/use-admin-auth";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated")({
  component: AuthGate,
});

function AuthGate() {
  const auth = useAdminAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.loading || !auth.userId) return;
    supabase.auth.getUser().then(({ data }) => {
      if (data.user?.user_metadata?.must_change_password) {
        navigate({ to: "/change-password" });
      }
    });
  }, [auth.loading, auth.userId, navigate]);

  async function signOut() {
    await supabase.auth.signOut();
    navigate({ to: "/login" });
  }

  if (auth.loading) {
    return (
      <div className="container-prose flex min-h-[60vh] items-center justify-center">
        <p className="text-sm text-muted-foreground">Loading…</p>
      </div>
    );
  }

  if (!auth.userId) {
    return (
      <div className="container-prose flex min-h-[60vh] flex-col items-center justify-center text-center">
        <h1 className="text-2xl text-primary">Sign in required</h1>
        <p className="mt-2 text-sm text-muted-foreground">You need to sign in to access this page.</p>
        <Link
          to="/login"
          className="mt-6 inline-flex rounded-sm bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
        >
          Go to sign in
        </Link>
      </div>
    );
  }

  if (!auth.isAdmin) {
    return (
      <div className="container-prose flex min-h-[60vh] flex-col items-center justify-center text-center">
        <h1 className="text-2xl text-primary">Not authorized</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Your account ({auth.email}) doesn't have admin access.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/"
            className="inline-flex rounded-sm bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
          >
            Go home
          </Link>
          <button
            onClick={signOut}
            className="inline-flex rounded-sm border border-border px-5 py-2.5 text-sm font-semibold text-primary hover:bg-secondary/10"
          >
            Sign out
          </button>
        </div>
      </div>
    );
  }

  return <Outlet />;
}
