import { T as TSS_SERVER_FUNCTION, i as createServerFn } from "./server-ASaDeMZs.js";
import { r as requireSupabaseAuth } from "./auth-middleware-BMJ4TvCg.js";
import { c as createClient } from "./index-DdGN5IVl.js";
import { o as objectType, b as booleanType, s as stringType, e as enumType } from "./types-DBxYw-g_.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
var createServerRpc = (serverFnMeta, splitImportFn) => {
  const url = "/_serverFn/" + serverFnMeta.id;
  return Object.assign(splitImportFn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
function createSupabaseAdminClient() {
  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    const missing = [
      ...!SUPABASE_URL ? ["SUPABASE_URL"] : [],
      ...!SUPABASE_SERVICE_ROLE_KEY ? ["SUPABASE_SERVICE_ROLE_KEY"] : []
    ];
    const message = `Missing Supabase environment variable(s): ${missing.join(", ")}. Connect Supabase in Lovable Cloud.`;
    console.error(`[Supabase] ${message}`);
    throw new Error(message);
  }
  return createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: {
      storage: void 0,
      persistSession: false,
      autoRefreshToken: false
    }
  });
}
let _supabaseAdmin;
const supabaseAdmin = new Proxy({}, {
  get(_, prop, receiver) {
    if (!_supabaseAdmin) _supabaseAdmin = createSupabaseAdminClient();
    return Reflect.get(_supabaseAdmin, prop, receiver);
  }
});
async function assertAdmin(userId) {
  const {
    data,
    error
  } = await supabaseAdmin.from("user_roles").select("role").eq("user_id", userId).eq("role", "admin").maybeSingle();
  if (error) throw new Error(error.message);
  if (!data) throw new Error("Forbidden: admin role required");
}
const listUsers_createServerFn_handler = createServerRpc({
  id: "392804649a7ada2fdee0597dc35f31b4c801d9f28e2d2a70c1a0ca8d817cfe5f",
  name: "listUsers",
  filename: "src/lib/admin-users.functions.ts"
}, (opts) => listUsers.__executeServer(opts));
const listUsers = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(listUsers_createServerFn_handler, async ({
  context
}) => {
  await assertAdmin(context.userId);
  const {
    data,
    error
  } = await supabaseAdmin.auth.admin.listUsers({
    page: 1,
    perPage: 200
  });
  if (error) throw new Error(error.message);
  const ids = data.users.map((u) => u.id);
  const {
    data: roles,
    error: rolesError
  } = await supabaseAdmin.from("user_roles").select("user_id, role").in("user_id", ids.length ? ids : ["00000000-0000-0000-0000-000000000000"]);
  if (rolesError) throw new Error(rolesError.message);
  const roleMap = /* @__PURE__ */ new Map();
  for (const r of roles ?? []) {
    const arr = roleMap.get(r.user_id) ?? [];
    arr.push(r.role);
    roleMap.set(r.user_id, arr);
  }
  return data.users.map((u) => ({
    id: u.id,
    email: u.email ?? null,
    createdAt: u.created_at,
    lastSignInAt: u.last_sign_in_at ?? null,
    roles: roleMap.get(u.id) ?? []
  }));
});
const createUser_createServerFn_handler = createServerRpc({
  id: "dfed4d3b7170b2a44ccdd3121c91f139b718e1f1d433960119cbc7fc6a04414f",
  name: "createUser",
  filename: "src/lib/admin-users.functions.ts"
}, (opts) => createUser.__executeServer(opts));
const createUser = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
  email: stringType().email(),
  password: stringType().min(8).max(128).optional(),
  makeAdmin: booleanType().optional()
}).parse(input)).handler(createUser_createServerFn_handler, async ({
  data,
  context
}) => {
  await assertAdmin(context.userId);
  const {
    data: created,
    error
  } = await supabaseAdmin.auth.admin.createUser({
    email: data.email,
    password: data.password,
    email_confirm: true,
    user_metadata: {
      must_change_password: true
    }
  });
  if (error) throw new Error(error.message);
  const newUserId = created.user?.id;
  if (!newUserId) throw new Error("Failed to create user");
  if (data.makeAdmin) {
    const {
      error: roleError
    } = await supabaseAdmin.from("user_roles").insert({
      user_id: newUserId,
      role: "admin"
    });
    if (roleError && !roleError.message.includes("duplicate")) {
      throw new Error(roleError.message);
    }
  }
  return {
    ok: true,
    userId: newUserId
  };
});
const assignRole_createServerFn_handler = createServerRpc({
  id: "c60c202dcbef08e693b9e7c7ed9e14a31e9c27127962c104867194ec2bbb24ff",
  name: "assignRole",
  filename: "src/lib/admin-users.functions.ts"
}, (opts) => assignRole.__executeServer(opts));
const assignRole = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
  userId: stringType().uuid(),
  role: enumType(["admin", "user"])
}).parse(input)).handler(assignRole_createServerFn_handler, async ({
  data,
  context
}) => {
  await assertAdmin(context.userId);
  const {
    error
  } = await supabaseAdmin.from("user_roles").insert({
    user_id: data.userId,
    role: data.role
  });
  if (error && !error.message.includes("duplicate")) throw new Error(error.message);
  return {
    ok: true
  };
});
const removeRole_createServerFn_handler = createServerRpc({
  id: "bed62953ef695416dee16252e82dcb9186c28b8fbe9992b0fbcbef77900e09da",
  name: "removeRole",
  filename: "src/lib/admin-users.functions.ts"
}, (opts) => removeRole.__executeServer(opts));
const removeRole = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
  userId: stringType().uuid(),
  role: enumType(["admin", "user"])
}).parse(input)).handler(removeRole_createServerFn_handler, async ({
  data,
  context
}) => {
  await assertAdmin(context.userId);
  if (data.userId === context.userId && data.role === "admin") {
    throw new Error("You cannot remove your own admin role");
  }
  const {
    error
  } = await supabaseAdmin.from("user_roles").delete().eq("user_id", data.userId).eq("role", data.role);
  if (error) throw new Error(error.message);
  return {
    ok: true
  };
});
export {
  assignRole_createServerFn_handler,
  createUser_createServerFn_handler,
  listUsers_createServerFn_handler,
  removeRole_createServerFn_handler
};
