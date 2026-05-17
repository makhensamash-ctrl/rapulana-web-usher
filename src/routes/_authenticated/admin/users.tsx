import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { ShieldCheck, ShieldOff, UserCog } from "lucide-react";
import { listUsers, assignRole, removeRole } from "@/lib/admin-users.functions";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/admin/users")({
  component: UsersAdmin,
});

function UsersAdmin() {
  const fetchUsers = useServerFn(listUsers);
  const assignFn = useServerFn(assignRole);
  const removeFn = useServerFn(removeRole);
  const qc = useQueryClient();
  const [filter, setFilter] = useState("");

  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-users"],
    queryFn: () => fetchUsers(),
  });

  const grant = useMutation({
    mutationFn: (userId: string) => assignFn({ data: { userId, role: "admin" } }),
    onSuccess: () => {
      toast.success("Admin role granted");
      qc.invalidateQueries({ queryKey: ["admin-users"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const revoke = useMutation({
    mutationFn: (userId: string) => removeFn({ data: { userId, role: "admin" } }),
    onSuccess: () => {
      toast.success("Admin role revoked");
      qc.invalidateQueries({ queryKey: ["admin-users"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const users = (data ?? []).filter((u) =>
    filter ? (u.email ?? "").toLowerCase().includes(filter.toLowerCase()) : true,
  );

  return (
    <div>
      <div className="flex items-center gap-2">
        <UserCog className="h-6 w-6 text-secondary" />
        <h1 className="text-3xl text-primary">Users & Roles</h1>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">
        Grant or revoke admin access for registered users.
      </p>

      <div className="mt-6">
        <input
          type="search"
          placeholder="Search by email…"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full max-w-sm rounded-sm border border-border bg-background px-3 py-2 text-sm"
        />
      </div>

      {isLoading && <p className="mt-6 text-sm text-muted-foreground">Loading users…</p>}
      {error && (
        <p className="mt-6 text-sm text-destructive">
          {(error as Error).message}
        </p>
      )}

      {!isLoading && !error && (
        <div className="mt-6 overflow-hidden rounded-sm border border-border">
          <table className="w-full text-sm">
            <thead className="bg-secondary/10 text-left text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Roles</th>
                <th className="px-4 py-3">Last sign in</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => {
                const isAdmin = u.roles.includes("admin");
                const busy = grant.isPending || revoke.isPending;
                return (
                  <tr key={u.id} className="border-t border-border">
                    <td className="px-4 py-3">
                      <div className="text-primary">{u.email ?? "(no email)"}</div>
                      <div className="text-xs text-muted-foreground">{u.id}</div>
                    </td>
                    <td className="px-4 py-3">
                      {u.roles.length ? (
                        <div className="flex flex-wrap gap-1">
                          {u.roles.map((r) => (
                            <span
                              key={r}
                              className={`rounded-sm px-2 py-0.5 text-xs ${
                                r === "admin"
                                  ? "bg-primary text-primary-foreground"
                                  : "bg-secondary/20 text-foreground"
                              }`}
                            >
                              {r}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-xs text-muted-foreground">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {u.lastSignInAt
                        ? new Date(u.lastSignInAt).toLocaleString()
                        : "Never"}
                    </td>
                    <td className="px-4 py-3 text-right">
                      {isAdmin ? (
                        <button
                          disabled={busy}
                          onClick={() => revoke.mutate(u.id)}
                          className="inline-flex items-center gap-1 rounded-sm border border-border px-3 py-1.5 text-xs text-foreground hover:bg-secondary/10 disabled:opacity-50"
                        >
                          <ShieldOff className="h-3.5 w-3.5" />
                          Revoke admin
                        </button>
                      ) : (
                        <button
                          disabled={busy}
                          onClick={() => grant.mutate(u.id)}
                          className="inline-flex items-center gap-1 rounded-sm bg-primary px-3 py-1.5 text-xs text-primary-foreground hover:opacity-90 disabled:opacity-50"
                        >
                          <ShieldCheck className="h-3.5 w-3.5" />
                          Make admin
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
              {users.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-4 py-8 text-center text-sm text-muted-foreground">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
