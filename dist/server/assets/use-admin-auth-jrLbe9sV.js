import { W as reactExports } from "./server-ASaDeMZs.js";
import { s as supabase } from "./client-5KSn606E.js";
function useAdminAuth() {
  const [state, setState] = reactExports.useState({
    loading: true,
    userId: null,
    email: null,
    isAdmin: false
  });
  reactExports.useEffect(() => {
    let cancelled = false;
    async function check(userId, email) {
      if (!userId) {
        if (!cancelled) setState({ loading: false, userId: null, email: null, isAdmin: false });
        return;
      }
      const { data, error } = await supabase.from("user_roles").select("role").eq("user_id", userId).eq("role", "admin").maybeSingle();
      if (cancelled) return;
      setState({
        loading: false,
        userId,
        email,
        isAdmin: !error && data?.role === "admin"
      });
    }
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      check(session?.user?.id ?? null, session?.user?.email ?? null);
    });
    supabase.auth.getSession().then(({ data }) => {
      check(data.session?.user?.id ?? null, data.session?.user?.email ?? null);
    });
    return () => {
      cancelled = true;
      sub.subscription.unsubscribe();
    };
  }, []);
  return state;
}
export {
  useAdminAuth as u
};
