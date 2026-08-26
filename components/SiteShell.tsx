import { ReactNode } from "react";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { FloatingWhatsApp } from "./FloatingWhatsApp";

// Chrome for all marketing pages (the /build flow uses its own shell).
export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <>
      <Nav />
      <main>{children}</main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
