import Link from "next/link";
import { ArrowUpRight, Boxes, PackageCheck, ShoppingCart, WalletCards } from "lucide-react";
import { redirect } from "next/navigation";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";

const demoMetrics = [
  { label: "Gross sales", value: "₹1,84,920", change: "+12.4%", icon: WalletCards },
  { label: "Orders", value: "128", change: "+8.1%", icon: ShoppingCart },
  { label: "Products", value: "42", change: "4 drafts", icon: Boxes },
  { label: "To fulfill", value: "9", change: "3 due today", icon: PackageCheck },
];

export default async function SellerPage() {
  const demo = !isSupabaseConfigured();
  let storeName = "North & Form";
  let role = "owner";

  if (!demo) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) redirect("/account?error=Sign%20in%20to%20open%20the%20seller%20workspace");
    const { data: membership } = await supabase.from("store_members").select("role, stores(name)").eq("user_id", user.id).limit(1).maybeSingle();
    if (!membership) redirect("/account?error=This%20account%20does%20not%20have%20seller%20access");
    role = membership.role;
    const store = membership.stores as unknown as { name?: string } | null;
    storeName = store?.name || storeName;
  }

  return (
    <main className="seller-page container section">
      <div className="seller-heading"><div><p className="eyebrow">Seller workspace {demo && "· Demo data"}</p><h1>{storeName}</h1><p>Store overview · {role} access</p></div><Link href="/" className="button button-outline">View storefront <ArrowUpRight size={15} /></Link></div>
      <div className="metric-grid">{demoMetrics.map(({ label, value, change, icon: Icon }) => <article key={label}><div className="metric-icon"><Icon size={19} /></div><p>{label}</p><strong>{value}</strong><span>{change}</span></article>)}</div>
      <div className="seller-content-grid">
        <section className="seller-panel"><div className="panel-heading"><div><p className="eyebrow">Recent orders</p><h2>Ready for attention</h2></div><button className="text-link">View all</button></div><div className="order-table"><div className="table-row table-head"><span>Order</span><span>Customer</span><span>Status</span><span>Total</span></div>{[["#NF-1048","Aarav Mehta","Paid","₹6,890"],["#NF-1047","Mira Rao","To fulfill","₹12,490"],["#NF-1046","Kabir Singh","Shipped","₹8,990"],["#NF-1045","Anaya Shah","Paid","₹4,990"]].map((row) => <div className="table-row" key={row[0]}>{row.map((cell, index) => <span key={cell} data-label={["Order","Customer","Status","Total"][index]}>{cell}</span>)}</div>)}</div></section>
        <aside className="seller-panel"><p className="eyebrow">Inventory</p><h2>Low stock</h2><div className="stock-list">{[["Arc Dial Watch","3 left"],["Ember Vessel","5 left"],["Forma Runner · 42","6 left"]].map(([name, stock]) => <div key={name}><span>{name}</span><strong>{stock}</strong></div>)}</div><button className="button button-dark button-full">Manage inventory</button></aside>
      </div>
      {demo && <p className="demo-notice">This dashboard uses sample metrics until Supabase is configured and a user is added to <code>store_members</code>.</p>}
    </main>
  );
}
