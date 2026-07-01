import { Link } from "@tanstack/react-router";
import { ChevronDown, Search, User } from "lucide-react";
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
    label: "Collaborations",
    children: [
      { to: "/catalog", label: "Surron × FX", description: "Signature collab drops" },
      { to: "/catalog", label: "Team Riders", description: "Pro-spec builds" },
      { to: "/catalog", label: "Limited Edition", description: "Numbered releases" },
    ],
  },
  { label: "Compare", to: "/catalog" },
  { label: "Blog", to: "/" },
  { label: "About", to: "/" },
  { label: "Theme Features", to: "/contact" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50">
      {/* Announcement bar */}
      <div className="bg-black text-white">
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
      <div className="bg-gradient-to-r from-[#3a4a2a] via-[#4a5a38] to-[#6a7a52] text-white">
        <div className="mx-auto flex h-20 max-w-[1600px] items-center justify-between gap-8 px-6 lg:px-12">
          <Link
            to="/"
            className="text-white leading-none font-display uppercase tracking-tight"
            style={{ fontSize: "2rem", letterSpacing: "-0.02em" }}
          >
            IMPACT
          </Link>

          <nav className="hidden md:flex items-center gap-8 lg:gap-10">
            {navItems.map((item) => (
              <div key={item.label} className="group relative">
                {item.to ? (
                  <Link
                    to={item.to}
                    className="inline-flex items-center gap-1.5 text-[15px] font-bold text-white/95 transition-colors hover:text-white"
                  >
                    {item.label}
                    {item.children && (
                      <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" strokeWidth={2.5} />
                    )}
                  </Link>
                ) : (
                  <button
                    type="button"
                    className="inline-flex items-center gap-1.5 text-[15px] font-bold text-white/95 transition-colors hover:text-white"
                  >
                    {item.label}
                    {item.children && (
                      <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" strokeWidth={2.5} />
                    )}
                  </button>
                )}

                {item.children && (
                  <div className="invisible absolute left-1/2 top-full z-50 w-72 -translate-x-1/2 pt-4 opacity-0 transition-all duration-150 group-hover:visible group-hover:opacity-100">
                    <div className="border-t-2 border-primary bg-card text-foreground shadow-2xl">
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

          <div className="flex items-center gap-3 text-white">
            <button
              type="button"
              className="hidden lg:inline-flex items-center gap-1.5 text-[15px] font-bold text-white/95 hover:text-white"
            >
              <span className="inline-flex h-6 w-6 items-center justify-center overflow-hidden rounded-full bg-white/10 text-xs">🇺🇸</span>
              USD $
              <ChevronDown className="h-4 w-4" strokeWidth={2.5} />
            </button>
            <button
              type="button"
              aria-label="Search"
              className="inline-flex h-10 w-10 items-center justify-center text-white transition-opacity hover:opacity-80"
            >
              <Search className="h-6 w-6" strokeWidth={2} />
            </button>
            <button
              type="button"
              aria-label="Account"
              className="hidden sm:inline-flex h-10 w-10 items-center justify-center text-white transition-opacity hover:opacity-80"
            >
              <User className="h-6 w-6" strokeWidth={2} />
            </button>
            <CartDrawer />
          </div>
        </div>
      </div>
    </header>
  );
}