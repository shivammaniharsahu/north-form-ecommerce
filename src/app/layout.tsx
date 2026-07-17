import type { Metadata } from "next";
import { CartProvider } from "@/components/cart-provider";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { storeConfig } from "@/config/store";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: `${storeConfig.name} — Considered objects for everyday life`,
    template: `%s — ${storeConfig.name}`,
  },
  description: storeConfig.description,
  metadataBase: new URL("https://north-and-form.example"),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <SiteHeader />
          {children}
          <SiteFooter />
        </CartProvider>
      </body>
    </html>
  );
}
