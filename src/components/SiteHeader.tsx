import { Link } from "@tanstack/react-router";
import { ArrowRight, Search } from "lucide-react";
import { CartDrawer } from "./CartDrawer";

const navItems = [
  { to: "/", label: "Home", exact: true },
  { to: "/catalog", label: "Catalog", exact: false },
  { to: "/contact", label: "Contact", exact: false },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 bg-background">
      {/* Announcement bar */}
      <Link
        to="/catalog"
        className="flex items-center justify-center gap-2 bg-primary px-4 py-3 text-center text-[11px] font-bold uppercase tracking-[0.18em] text-primary-foreground transition-opacity hover:opacity-90"
      >
        <span>New mods have landed</span>
        <span aria-hidden>⚡</span>
        <span className="inline-flex items-center gap-1">
          Shop now <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.25} />
        </span>
      </Link>

      {/* Main nav */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="flex h-20 items-center justify-between">
          <Link
            to="/"
            className="text-primary leading-none"
            style={{ fontFamily: "'Pacifico', cursive", fontSize: "2.5rem" }}
          >
            FX Mods
          </Link>

          <nav className="hidden md:flex items-center gap-10">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={item.exact ? { exact: true } : undefined}
                className="text-[11px] font-bold uppercase tracking-[0.2em] text-foreground/80 transition-colors hover:text-primary"
                activeProps={{
                  className:
                    "text-[11px] font-bold uppercase tracking-[0.2em] text-primary",
                }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Search"
              className="inline-flex h-10 w-10 items-center justify-center text-foreground transition-colors hover:text-primary"
            >
              <Search className="h-5 w-5" strokeWidth={1.75} />
            </button>
            <CartDrawer />
          </div>
        </div>
      </div>
    </header>
  );
}