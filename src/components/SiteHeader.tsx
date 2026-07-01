import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronDown, Search, User, Check } from "lucide-react";
import { CartDrawer } from "./CartDrawer";
import { SearchModal } from "./SearchModal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CURRENCIES, useCurrencyStore, type CurrencyCode } from "@/stores/currencyStore";

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
      { to: "/catalog", label: "Throttles", description: "Plug-and-play twist grips" },
      { to: "/catalog", label: "Baja Lights", description: "Race-grade LED bars & pods" },
      { to: "/catalog", label: "Key Ignitions", description: "Locking security kits" },
      { to: "/catalog", label: "Bundles", description: "Save when you stack mods" },
      { to: "/catalog", label: "New Arrivals", description: "Freshest drops this week" },
    ],
  },
  {
    label: "Collaborations",
    children: [
      { to: "/catalog", label: "Surron × FX", description: "Signature collab drops" },
      { to: "/catalog", label: "Team Riders", description: "Pro-spec rider builds" },
      { to: "/catalog", label: "Limited Edition", description: "Numbered releases" },
      { to: "/catalog", label: "Artist Series", description: "Custom-painted parts" },
    ],
  },
  { label: "Compare", to: "/catalog" },
  {
    label: "Support",
    children: [
      { to: "/contact", label: "Install Guides", description: "Step-by-step how-tos" },
      { to: "/contact", label: "Warranty", description: "Two-year coverage" },
      { to: "/contact", label: "Contact Us", description: "Talk to a rider" },
      { to: "/contact", label: "Order Tracking", description: "Where's my kit?" },
    ],
  },
  { label: "About", to: "/" },
];

export function SiteHeader() {
  const [searchOpen, setSearchOpen] = useState(false);
  const currencyCode = useCurrencyStore((s) => s.code);
  const setCurrency = useCurrencyStore((s) => s.setCode);
  const active = CURRENCIES[currencyCode];

  return (
    <header className="sticky top-0 z-50">
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
      <div className="border-b border-border bg-background text-foreground">
        <div className="mx-auto flex h-20 max-w-[1600px] items-center justify-between gap-8 px-6 lg:px-12">
          <Link
            to="/"
            className="font-display leading-none uppercase tracking-tight text-foreground"
            style={{ fontSize: "2.25rem", letterSpacing: "0.01em" }}
          >
            FX<span className="text-primary">.</span>Mods
          </Link>

          <nav className="hidden md:flex items-center gap-8 lg:gap-10">
            {navItems.map((item) => (
              <div key={item.label} className="group relative">
                {item.to ? (
                  <Link
                    to={item.to}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold uppercase tracking-[0.14em] text-foreground/80 transition-colors group-hover:text-primary"
                  >
                    {item.label}
                    {item.children && (
                      <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" strokeWidth={2.5} />
                    )}
                  </Link>
                ) : (
                  <button
                    type="button"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold uppercase tracking-[0.14em] text-foreground/80 transition-colors group-hover:text-primary"
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

          <div className="flex items-center gap-2 text-foreground">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="hidden lg:inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-sm font-semibold text-foreground/90 hover:text-primary focus:outline-none"
                >
                  <span className="text-base leading-none">{active.flag}</span>
                  <span>{active.label} {active.symbol}</span>
                  <ChevronDown className="h-4 w-4" strokeWidth={2.25} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-44 bg-card border-border">
                {(Object.keys(CURRENCIES) as CurrencyCode[]).map((code) => {
                  const c = CURRENCIES[code];
                  const selected = code === currencyCode;
                  return (
                    <DropdownMenuItem
                      key={code}
                      onSelect={() => setCurrency(code)}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <span className="text-base leading-none">{c.flag}</span>
                      <span className="flex-1">{c.label} <span className="text-muted-foreground">{c.symbol}</span></span>
                      {selected && <Check className="h-4 w-4 text-primary" />}
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Search products"
              className="inline-flex h-10 w-10 items-center justify-center text-foreground transition-colors hover:text-primary"
            >
              <Search className="h-5 w-5" strokeWidth={2} />
            </button>
            <button
              type="button"
              aria-label="Account"
              className="hidden sm:inline-flex h-10 w-10 items-center justify-center text-foreground transition-colors hover:text-primary"
            >
              <User className="h-5 w-5" strokeWidth={2} />
            </button>
            <CartDrawer />
          </div>
        </div>
      </div>
      <SearchModal open={searchOpen} onOpenChange={setSearchOpen} />
    </header>
  );
}