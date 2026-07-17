import Link from "next/link";

const footerGroups = [
  { title: "Shop", links: [["New arrivals", "/collections/new-arrivals"], ["Everyday carry", "/collections/everyday-carry"], ["Wear", "/collections/wear"], ["Living", "/collections/living"]] },
  { title: "Help", links: [["Contact", "/contact"], ["Delivery & returns", "/delivery"], ["Care guide", "/care"], ["FAQ", "/faq"]] },
  { title: "Follow", links: [["Instagram", "#"], ["Pinterest", "#"], ["Journal", "/journal"]] },
];

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-intro">
          <Link className="footer-brand" href="/">NORTH <b>&</b> FORM</Link>
          <p>Objects with purpose, stories worth keeping, and less noise in between.</p>
        </div>
        {footerGroups.map((group) => (
          <div className="footer-column" key={group.title}>
            <h3>{group.title}</h3>
            {group.links.map(([label, href]) => <Link key={label} href={href}>{label}</Link>)}
          </div>
        ))}
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} North & Form. Template demonstration.</span>
        <span>Privacy · Terms · Accessibility</span>
      </div>
    </footer>
  );
}
