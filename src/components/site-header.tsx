"use client";

import Link from "next/link";
import { Menu, Search, ShoppingBag, UserRound, X } from "lucide-react";
import { useEffect, useState } from "react";
import { storeConfig } from "@/config/store";
import { CartDrawer } from "@/components/cart-drawer";
import { useCart } from "@/components/cart-provider";

export function SiteHeader() {
  const { itemCount, openCart } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className="announcement">{storeConfig.announcement}</div>
      <header className={`site-header ${scrolled ? "scrolled" : ""}`}>
        <div className="header-inner container">
          <button className="icon-button mobile-menu-button" onClick={() => setMenuOpen((value) => !value)} aria-label="Toggle menu" aria-expanded={menuOpen}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <nav className="desktop-nav" aria-label="Primary navigation">
            {storeConfig.navigation.slice(0, 3).map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
          </nav>
          <Link className="brand" href="/">NORTH <b>&</b> FORM</Link>
          <div className="header-actions">
            <button className="icon-button" onClick={() => setSearchOpen((value) => !value)} aria-label="Search">
              {searchOpen ? <X size={19} /> : <Search size={19} />}
            </button>
            <Link className="icon-button" href="/account" aria-label="Account"><UserRound size={19} /></Link>
            <button className="icon-button" onClick={openCart} aria-label={`Shopping bag with ${itemCount} items`}>
              <ShoppingBag size={20} />
              {itemCount > 0 && <span className="cart-count">{itemCount}</span>}
            </button>
          </div>
        </div>
      </header>
      {menuOpen && (
        <nav className="mobile-menu" aria-label="Mobile navigation">
          {storeConfig.navigation.map((item) => <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>{item.label}</Link>)}
        </nav>
      )}
      {searchOpen && (
        <div className="search-panel">
          <form action="/shop">
            <Search size={22} />
            <input name="q" autoFocus placeholder="Search bags, living, accessories…" aria-label="Search products" />
          </form>
        </div>
      )}
      <CartDrawer />
    </>
  );
}
