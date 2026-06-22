import { Link } from "@tanstack/react-router";
import { CartDrawer } from "./CartDrawer";

const navItems = [
  { to: "/", label: "Home", exact: true },
  { to: "/catalog", label: "Catalog", exact: false },
  { to: "/contact", label: "Contact", exact: false },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 bg-background/85 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
        <div className="relative group">
          {/* Glow */}
          <div className="pointer-events-none absolute -inset-0.5 bg-primary/10 opacity-20 blur transition duration-1000 group-hover:opacity-40" />

          <div className="relative flex h-16 items-center justify-between border border-white/5 bg-card px-4 sm:px-8">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <span className="block h-8 w-1 bg-primary" />
              <span className="text-xl sm:text-2xl font-extrabold tracking-tighter text-foreground uppercase">
                FX <span className="text-primary">Mods</span>
              </span>
            </Link>

            {/* Nav */}
            <nav className="hidden md:flex items-center">
              {navItems.map((item, i) => (
                <div key={item.to} className="flex items-center">
                  {i > 0 && <span className="h-4 w-px bg-white/10" />}
                  <Link
                    to={item.to}
                    activeOptions={item.exact ? { exact: true } : undefined}
                    className="px-6 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-foreground/60 transition-colors hover:text-foreground"
                    activeProps={{
                      className:
                        "px-6 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary border-b border-primary",
                    }}
                  >
                    {item.label}
                  </Link>
                </div>
              ))}
            </nav>

            {/* Cart */}
            <CartDrawer />

            {/* Industrial corner brackets */}
            <span className="pointer-events-none absolute top-0 left-0 h-2 w-2 border-t border-l border-white/20" />
            <span className="pointer-events-none absolute top-0 right-0 h-2 w-2 border-t border-r border-white/20" />
            <span className="pointer-events-none absolute bottom-0 left-0 h-2 w-2 border-b border-l border-white/20" />
            <span className="pointer-events-none absolute bottom-0 right-0 h-2 w-2 border-b border-r border-white/20" />
          </div>
        </div>
      </div>
    </header>
  );
}