import Link from "next/link";
import { Package, Store, UserRound } from "lucide-react";
import { AuthPanel } from "@/components/auth-panel";
import { signOut } from "@/app/account/actions";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";

type AccountPageProps = { searchParams: Promise<{ error?: string; success?: string }> };

export default async function AccountPage({ searchParams }: AccountPageProps) {
  const params = await searchParams;
  if (!isSupabaseConfigured()) {
    return (
      <main className="account-page container section">
        <p className="eyebrow">Customer account · Demo mode</p>
        <h1>Authentication is ready to connect.</h1>
        <p className="account-lead">Add the Supabase variables from <code>.env.example</code> to enable email/password and Google login. The UI, callbacks, session refresh, and protected routes are already wired.</p>
        <div className="account-grid">
          <article><UserRound /><h2>Customer profile</h2><p>Saved addresses and identity managed through Supabase Auth.</p></article>
          <article><Package /><h2>Order history</h2><p>RLS-protected access to each customer&apos;s purchases.</p></article>
          <article><Store /><h2>Seller workspace</h2><p>Role-gated catalog, stock, and fulfillment operations.</p><Link className="text-link" href="/seller">Preview dashboard →</Link></article>
        </div>
      </main>
    );
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return <main><AuthPanel error={params.error} success={params.success} /></main>;

  const [{ data: profile }, { data: orders }, { data: membership }] = await Promise.all([
    supabase.from("profiles").select("full_name, phone").eq("id", user.id).maybeSingle(),
    supabase.from("orders").select("id, order_no, total_minor, currency, status, created_at").order("created_at", { ascending: false }).limit(8),
    supabase.from("store_members").select("role, stores(name, slug)").limit(1).maybeSingle(),
  ]);

  return (
    <main className="account-page container section">
      <div className="account-heading"><div><p className="eyebrow">Customer account</p><h1>Hello, {profile?.full_name || user.email?.split("@")[0]}.</h1><p>{user.email}</p></div><form action={signOut}><button className="button button-outline">Sign out</button></form></div>
      <div className="account-grid">
        <article><UserRound /><h2>Profile</h2><p>{profile?.phone || "Add a phone number during checkout."}</p></article>
        <article><Package /><h2>Orders</h2><p>{orders?.length ? `${orders.length} recent order${orders.length === 1 ? "" : "s"}` : "Your first order will appear here."}</p></article>
        <article><Store /><h2>Seller workspace</h2><p>{membership ? `Access: ${membership.role}` : "No seller access assigned."}</p>{membership && <Link className="text-link" href="/seller">Open dashboard →</Link>}</article>
      </div>
    </main>
  );
}
