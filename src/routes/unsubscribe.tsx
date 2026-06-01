import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { CheckCircle2, Loader2, XCircle } from "lucide-react";

export const Route = createFileRoute("/unsubscribe")({
  validateSearch: (s: Record<string, unknown>) => ({
    token: typeof s.token === "string" ? s.token : "",
  }),
  component: UnsubscribePage,
});

type State =
  | { kind: "loading" }
  | { kind: "ready"; email: string }
  | { kind: "already" }
  | { kind: "invalid"; message: string }
  | { kind: "submitting" }
  | { kind: "done" };

function UnsubscribePage() {
  const { token } = Route.useSearch();
  const [state, setState] = useState<State>({ kind: "loading" });

  useEffect(() => {
    if (!token) {
      setState({ kind: "invalid", message: "Missing unsubscribe token." });
      return;
    }
    (async () => {
      try {
        const res = await fetch(`/email/unsubscribe?token=${encodeURIComponent(token)}`);
        const data = await res.json();
        if (data.alreadyUnsubscribed) return setState({ kind: "already" });
        if (!res.ok || !data.valid)
          return setState({ kind: "invalid", message: data.error || "This unsubscribe link is invalid or has expired." });
        setState({ kind: "ready", email: data.email });
      } catch {
        setState({ kind: "invalid", message: "We couldn't validate that link." });
      }
    })();
  }, [token]);

  async function confirm() {
    setState({ kind: "submitting" });
    try {
      const res = await fetch("/email/unsubscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      if (!res.ok) throw new Error();
      setState({ kind: "done" });
    } catch {
      setState({ kind: "invalid", message: "Something went wrong. Please try again." });
    }
  }

  return (
    <section className="container-prose flex min-h-[70vh] items-center justify-center py-16">
      <div className="mx-auto w-full max-w-md rounded-sm border border-border bg-card p-8 text-center">
        {state.kind === "loading" && (
          <div className="flex flex-col items-center gap-3 text-muted-foreground">
            <Loader2 className="h-6 w-6 animate-spin" />
            <p className="text-sm">Validating link…</p>
          </div>
        )}
        {state.kind === "ready" && (
          <>
            <h1 className="text-2xl text-primary">Unsubscribe</h1>
            <p className="mt-3 text-sm text-muted-foreground">
              You're about to unsubscribe <span className="font-semibold text-primary">{state.email}</span> from
              Rapulana Attorneys emails.
            </p>
            <button
              onClick={confirm}
              className="mt-6 inline-flex items-center justify-center rounded-sm bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
            >
              Confirm Unsubscribe
            </button>
          </>
        )}
        {state.kind === "submitting" && (
          <div className="flex flex-col items-center gap-3 text-muted-foreground">
            <Loader2 className="h-6 w-6 animate-spin" />
            <p className="text-sm">Processing…</p>
          </div>
        )}
        {state.kind === "done" && (
          <>
            <CheckCircle2 className="mx-auto h-10 w-10 text-secondary" />
            <h1 className="mt-4 text-2xl text-primary">You've been unsubscribed</h1>
            <p className="mt-2 text-sm text-muted-foreground">You won't receive further emails from us.</p>
            <Link to="/" className="mt-6 inline-block text-sm font-semibold text-primary hover:underline">
              Back to home
            </Link>
          </>
        )}
        {state.kind === "already" && (
          <>
            <CheckCircle2 className="mx-auto h-10 w-10 text-secondary" />
            <h1 className="mt-4 text-2xl text-primary">Already unsubscribed</h1>
            <p className="mt-2 text-sm text-muted-foreground">This email address is already opted out.</p>
          </>
        )}
        {state.kind === "invalid" && (
          <>
            <XCircle className="mx-auto h-10 w-10 text-destructive" />
            <h1 className="mt-4 text-2xl text-primary">Link invalid</h1>
            <p className="mt-2 text-sm text-muted-foreground">{state.message}</p>
          </>
        )}
      </div>
    </section>
  );
}
