import { a8 as useRouter, W as reactExports, I as isRedirect, T as TSS_SERVER_FUNCTION, y as getServerFnById, i as createServerFn, L as jsxRuntimeExports } from "./server-ASaDeMZs.js";
import { S as Subscribable, s as shallowEqualObjects, h as hashKey, g as getDefaultState, b as notifyManager, f as useQueryClient, n as noop, d as shouldThrowError, c as createLucideIcon, e as useQuery } from "./router-CO9yg4eA.js";
import { r as requireSupabaseAuth } from "./auth-middleware-BMJ4TvCg.js";
import { o as objectType, b as booleanType, s as stringType, e as enumType } from "./types-DBxYw-g_.js";
import { t as toast } from "./index-CPFCxFfm.js";
import { U as UserCog } from "./user-cog-Bvj_gwhQ.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./client-5KSn606E.js";
import "./index-DdGN5IVl.js";
function useServerFn(serverFn) {
  const router = useRouter();
  return reactExports.useCallback(async (...args) => {
    try {
      const res = await serverFn(...args);
      if (isRedirect(res)) throw res;
      return res;
    } catch (err) {
      if (isRedirect(err)) {
        err.options._fromLocation = router.stores.location.get();
        return router.navigate(router.resolveRedirect(err).options);
      }
      throw err;
    }
  }, [router, serverFn]);
}
var MutationObserver = class extends Subscribable {
  #client;
  #currentResult = void 0;
  #currentMutation;
  #mutateOptions;
  constructor(client, options) {
    super();
    this.#client = client;
    this.setOptions(options);
    this.bindMethods();
    this.#updateResult();
  }
  bindMethods() {
    this.mutate = this.mutate.bind(this);
    this.reset = this.reset.bind(this);
  }
  setOptions(options) {
    const prevOptions = this.options;
    this.options = this.#client.defaultMutationOptions(options);
    if (!shallowEqualObjects(this.options, prevOptions)) {
      this.#client.getMutationCache().notify({
        type: "observerOptionsUpdated",
        mutation: this.#currentMutation,
        observer: this
      });
    }
    if (prevOptions?.mutationKey && this.options.mutationKey && hashKey(prevOptions.mutationKey) !== hashKey(this.options.mutationKey)) {
      this.reset();
    } else if (this.#currentMutation?.state.status === "pending") {
      this.#currentMutation.setOptions(this.options);
    }
  }
  onUnsubscribe() {
    if (!this.hasListeners()) {
      this.#currentMutation?.removeObserver(this);
    }
  }
  onMutationUpdate(action) {
    this.#updateResult();
    this.#notify(action);
  }
  getCurrentResult() {
    return this.#currentResult;
  }
  reset() {
    this.#currentMutation?.removeObserver(this);
    this.#currentMutation = void 0;
    this.#updateResult();
    this.#notify();
  }
  mutate(variables, options) {
    this.#mutateOptions = options;
    this.#currentMutation?.removeObserver(this);
    this.#currentMutation = this.#client.getMutationCache().build(this.#client, this.options);
    this.#currentMutation.addObserver(this);
    return this.#currentMutation.execute(variables);
  }
  #updateResult() {
    const state = this.#currentMutation?.state ?? getDefaultState();
    this.#currentResult = {
      ...state,
      isPending: state.status === "pending",
      isSuccess: state.status === "success",
      isError: state.status === "error",
      isIdle: state.status === "idle",
      mutate: this.mutate,
      reset: this.reset
    };
  }
  #notify(action) {
    notifyManager.batch(() => {
      if (this.#mutateOptions && this.hasListeners()) {
        const variables = this.#currentResult.variables;
        const onMutateResult = this.#currentResult.context;
        const context = {
          client: this.#client,
          meta: this.options.meta,
          mutationKey: this.options.mutationKey
        };
        if (action?.type === "success") {
          try {
            this.#mutateOptions.onSuccess?.(
              action.data,
              variables,
              onMutateResult,
              context
            );
          } catch (e) {
            void Promise.reject(e);
          }
          try {
            this.#mutateOptions.onSettled?.(
              action.data,
              null,
              variables,
              onMutateResult,
              context
            );
          } catch (e) {
            void Promise.reject(e);
          }
        } else if (action?.type === "error") {
          try {
            this.#mutateOptions.onError?.(
              action.error,
              variables,
              onMutateResult,
              context
            );
          } catch (e) {
            void Promise.reject(e);
          }
          try {
            this.#mutateOptions.onSettled?.(
              void 0,
              action.error,
              variables,
              onMutateResult,
              context
            );
          } catch (e) {
            void Promise.reject(e);
          }
        }
      }
      this.listeners.forEach((listener) => {
        listener(this.#currentResult);
      });
    });
  }
};
function useMutation(options, queryClient) {
  const client = useQueryClient();
  const [observer] = reactExports.useState(
    () => new MutationObserver(
      client,
      options
    )
  );
  reactExports.useEffect(() => {
    observer.setOptions(options);
  }, [observer, options]);
  const result = reactExports.useSyncExternalStore(
    reactExports.useCallback(
      (onStoreChange) => observer.subscribe(notifyManager.batchCalls(onStoreChange)),
      [observer]
    ),
    () => observer.getCurrentResult(),
    () => observer.getCurrentResult()
  );
  const mutate = reactExports.useCallback(
    (variables, mutateOptions) => {
      observer.mutate(variables, mutateOptions).catch(noop);
    },
    [observer]
  );
  if (result.error && shouldThrowError(observer.options.throwOnError, [result.error])) {
    throw result.error;
  }
  return { ...result, mutate, mutateAsync: result.mutate };
}
const __iconNode$2 = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const ShieldCheck = createLucideIcon("shield-check", __iconNode$2);
const __iconNode$1 = [
  ["path", { d: "m2 2 20 20", key: "1ooewy" }],
  [
    "path",
    {
      d: "M5 5a1 1 0 0 0-1 1v7c0 5 3.5 7.5 7.67 8.94a1 1 0 0 0 .67.01c2.35-.82 4.48-1.97 5.9-3.71",
      key: "1jlk70"
    }
  ],
  [
    "path",
    {
      d: "M9.309 3.652A12.252 12.252 0 0 0 11.24 2.28a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1v7a9.784 9.784 0 0 1-.08 1.264",
      key: "18rp1v"
    }
  ]
];
const ShieldOff = createLucideIcon("shield-off", __iconNode$1);
const __iconNode = [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }],
  ["line", { x1: "19", x2: "19", y1: "8", y2: "14", key: "1bvyxn" }],
  ["line", { x1: "22", x2: "16", y1: "11", y2: "11", key: "1shjgl" }]
];
const UserPlus = createLucideIcon("user-plus", __iconNode);
var createSsrRpc = (functionId) => {
  const url = "/_serverFn/" + functionId;
  const serverFnMeta = { id: functionId };
  const fn = async (...args) => {
    return (await getServerFnById(functionId))(...args);
  };
  return Object.assign(fn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
const listUsers = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("392804649a7ada2fdee0597dc35f31b4c801d9f28e2d2a70c1a0ca8d817cfe5f"));
const createUser = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
  email: stringType().email(),
  password: stringType().min(8).max(128).optional(),
  makeAdmin: booleanType().optional()
}).parse(input)).handler(createSsrRpc("dfed4d3b7170b2a44ccdd3121c91f139b718e1f1d433960119cbc7fc6a04414f"));
const assignRole = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
  userId: stringType().uuid(),
  role: enumType(["admin", "user"])
}).parse(input)).handler(createSsrRpc("c60c202dcbef08e693b9e7c7ed9e14a31e9c27127962c104867194ec2bbb24ff"));
const removeRole = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
  userId: stringType().uuid(),
  role: enumType(["admin", "user"])
}).parse(input)).handler(createSsrRpc("bed62953ef695416dee16252e82dcb9186c28b8fbe9992b0fbcbef77900e09da"));
function UsersAdmin() {
  const fetchUsers = useServerFn(listUsers);
  const assignFn = useServerFn(assignRole);
  const removeFn = useServerFn(removeRole);
  const createFn = useServerFn(createUser);
  const qc = useQueryClient();
  const [filter, setFilter] = reactExports.useState("");
  const [showAdd, setShowAdd] = reactExports.useState(false);
  const [newEmail, setNewEmail] = reactExports.useState("");
  const [newPassword, setNewPassword] = reactExports.useState("");
  const [newIsAdmin, setNewIsAdmin] = reactExports.useState(false);
  const {
    data,
    isLoading,
    error
  } = useQuery({
    queryKey: ["admin-users"],
    queryFn: () => fetchUsers()
  });
  const grant = useMutation({
    mutationFn: (userId) => assignFn({
      data: {
        userId,
        role: "admin"
      }
    }),
    onSuccess: () => {
      toast.success("Admin role granted");
      qc.invalidateQueries({
        queryKey: ["admin-users"]
      });
    },
    onError: (e) => toast.error(e.message)
  });
  const revoke = useMutation({
    mutationFn: (userId) => removeFn({
      data: {
        userId,
        role: "admin"
      }
    }),
    onSuccess: () => {
      toast.success("Admin role revoked");
      qc.invalidateQueries({
        queryKey: ["admin-users"]
      });
    },
    onError: (e) => toast.error(e.message)
  });
  const create = useMutation({
    mutationFn: () => createFn({
      data: {
        email: newEmail.trim(),
        password: newPassword || void 0,
        makeAdmin: newIsAdmin
      }
    }),
    onSuccess: () => {
      toast.success("User created");
      setShowAdd(false);
      setNewEmail("");
      setNewPassword("");
      setNewIsAdmin(false);
      qc.invalidateQueries({
        queryKey: ["admin-users"]
      });
    },
    onError: (e) => toast.error(e.message)
  });
  const users = (data ?? []).filter((u) => filter ? (u.email ?? "").toLowerCase().includes(filter.toLowerCase()) : true);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(UserCog, { className: "h-6 w-6 text-secondary" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl text-primary", children: "Users & Roles" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Grant or revoke admin access for registered users." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap items-center justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "search", placeholder: "Search by email…", value: filter, onChange: (e) => setFilter(e.target.value), className: "w-full max-w-sm rounded-sm border border-border bg-background px-3 py-2 text-sm" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setShowAdd((v) => !v), className: "inline-flex items-center gap-2 rounded-sm bg-primary px-3 py-2 text-sm text-primary-foreground hover:opacity-90", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { className: "h-4 w-4" }),
        showAdd ? "Cancel" : "Add user"
      ] })
    ] }),
    showAdd && /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: (e) => {
      e.preventDefault();
      if (!newEmail.trim()) return;
      create.mutate();
    }, className: "mt-4 grid gap-3 rounded-sm border border-border bg-secondary/5 p-4 sm:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mb-1 block text-muted-foreground", children: "Email" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "email", required: true, value: newEmail, onChange: (e) => setNewEmail(e.target.value), className: "w-full rounded-sm border border-border bg-background px-3 py-2" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mb-1 block text-muted-foreground", children: "Password (min 8 chars)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", minLength: 8, required: true, value: newPassword, onChange: (e) => setNewPassword(e.target.value), className: "w-full rounded-sm border border-border bg-background px-3 py-2" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2 text-sm sm:col-span-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: newIsAdmin, onChange: (e) => setNewIsAdmin(e.target.checked) }),
        "Grant admin role"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sm:col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: create.isPending, className: "rounded-sm bg-primary px-4 py-2 text-sm text-primary-foreground hover:opacity-90 disabled:opacity-50", children: create.isPending ? "Creating…" : "Create user" }) })
    ] }),
    isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 text-sm text-muted-foreground", children: "Loading users…" }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 text-sm text-destructive", children: error.message }),
    !isLoading && !error && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 overflow-hidden rounded-sm border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-secondary/10 text-left text-xs uppercase tracking-wide text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "Email" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "Roles" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "Last sign in" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-right", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
        users.map((u) => {
          const isAdmin = u.roles.includes("admin");
          const busy = grant.isPending || revoke.isPending;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-primary", children: u.email ?? "(no email)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: u.id })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: u.roles.length ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1", children: u.roles.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `rounded-sm px-2 py-0.5 text-xs ${r === "admin" ? "bg-primary text-primary-foreground" : "bg-secondary/20 text-foreground"}`, children: r }, r)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "—" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground", children: u.lastSignInAt ? new Date(u.lastSignInAt).toLocaleString() : "Never" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right", children: isAdmin ? /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { disabled: busy, onClick: () => revoke.mutate(u.id), className: "inline-flex items-center gap-1 rounded-sm border border-border px-3 py-1.5 text-xs text-foreground hover:bg-secondary/10 disabled:opacity-50", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldOff, { className: "h-3.5 w-3.5" }),
              "Revoke admin"
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { disabled: busy, onClick: () => grant.mutate(u.id), className: "inline-flex items-center gap-1 rounded-sm bg-primary px-3 py-1.5 text-xs text-primary-foreground hover:opacity-90 disabled:opacity-50", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-3.5 w-3.5" }),
              "Make admin"
            ] }) })
          ] }, u.id);
        }),
        users.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 4, className: "px-4 py-8 text-center text-sm text-muted-foreground", children: "No users found." }) })
      ] })
    ] }) })
  ] });
}
export {
  UsersAdmin as component
};
