import { Link } from "@tanstack/react-router";
import { ArrowRight, ChevronDown, Search } from "lucide-react";
import { CartDrawer } from "./CartDrawer";

type NavLeaf = { to: string; label: string; description?: string };
type NavItem = {
  label: string;
  to?: string;
  exact?: boolean;
  children?: NavLeaf[];
};

const navItems: NavItem[] = [
  {
    label: "Shop",
    to: "/catalog",
    children: [
      { to: "/catalog", label: "All Products", description: "Every mod in the lineup" },
      { to: "/catalog", label: "Throttles", description: "Plug-and-play twist" },
      { to: "/catalog", label: "Lights", description: "Baja-grade beams" },
      { to: "/catalog", label: "Bundles", description: "Save when you stack" },
    ],
  },
  {
    label: "Explore",
    children: [
      { to: "/", label: "Our Story", description: "Built by riders, for riders" },
      { to: "/contact", label: "Support", description: "Install help & warranty" },
      { to: "/contact", label: "Contact", description: "Get in touch" },
    ],
  },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 bg-background">
      {/* Announcement bar */}
      <div className="bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-3 text-[11px] font-bold uppercase tracking-[0.18em] lg:px-10">
          <span className="flex-1 text-left">New drop: Surron Light Bee throttle kit</span>
          <span aria-hidden className="hidden md:block">•</span>
          <span className="hidden flex-1 text-center md:block">Free US shipping on orders $75+</span>
          <span aria-hidden className="hidden md:block">•</span>
          <Link to="/catalog" className="flex-1 text-right transition-opacity hover:opacity-80">
            Use code RIDE10 for 10% off
          </Link>
        </div>
      </div>

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
              <div key={item.label} className="group relative">
                {item.to ? (
                  <Link
                    to={item.to}
                    className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-foreground/80 transition-colors group-hover:text-primary"
                    activeProps={{ className: "text-primary" }}
                  >
                    {item.label}
                    {item.children && (
                      <ChevronDown className="h-3 w-3 transition-transform group-hover:rotate-180" strokeWidth={2.5} />
                    )}
                  </Link>
                ) : (
                  <button
                    type="button"
                    className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-foreground/80 transition-colors group-hover:text-primary"
                  >
                    {item.label}
                    {item.children && (
                      <ChevronDown className="h-3 w-3 transition-transform group-hover:rotate-180" strokeWidth={2.5} />
                    )}
                  </button>
                )}

                {item.children && (
                  <div className="invisible absolute left-1/2 top-full z-50 w-72 -translate-x-1/2 pt-4 opacity-0 transition-all duration-150 group-hover:visible group-hover:opacity-100">
                    <div className="border-t-2 border-primary bg-card shadow-2xl">
                      <ul className="py-2">
                        {item.children.map((child) => (
                          <li key={child.label}>
                            <Link
                              to={child.to}
                              className="block px-5 py-3 transition-colors hover:bg-background"
                            >
                              <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-foreground hover:text-primary">
                                {child.label}
                              </div>
                              {child.description && (
                                <div className="mt-1 text-xs text-muted-foreground normal-case tracking-normal font-normal">
                                  {child.description}
                                </div>
                              )}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
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