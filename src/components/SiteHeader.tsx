import { Link } from "@tanstack/react-router";
import { CartDrawer } from "./CartDrawer";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className="inline-block h-7 w-7 bg-primary" style={{ clipPath: "polygon(20% 0, 100% 0, 80% 100%, 0 100%)" }} />
            <span className="font-display text-2xl tracking-[0.2em] uppercase">FX Mods</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8 font-display text-sm tracking-[0.2em] uppercase">
            <Link to="/" className="hover:text-primary transition-colors" activeProps={{ className: "text-primary" }} activeOptions={{ exact: true }}>
              Home
            </Link>
            <Link to="/catalog" className="hover:text-primary transition-colors" activeProps={{ className: "text-primary" }}>
              Catalog
            </Link>
            <Link to="/contact" className="hover:text-primary transition-colors" activeProps={{ className: "text-primary" }}>
              Contact
            </Link>
          </nav>
          <CartDrawer />
        </div>
      </div>
    </header>
  );
}