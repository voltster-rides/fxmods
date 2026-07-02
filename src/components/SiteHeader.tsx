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
      {/* Announcement bar — dark with bullets */}
      <div className="bg-[#0A0A0A] text-white">
        <div className="mx-auto flex max-w-[1600px] items-center justify-center gap-5 px-6 py-2.5 text-[11px] font-medium tracking-[0.08em] lg:px-10">
          <span>Free shipping over $75</span>
          <span aria-hidden className="opacity-40">•</span>
          <span className="hidden md:inline">2-year warranty on every mod</span>
          <span aria-hidden className="hidden md:inline opacity-40">•</span>
          <Link to="/catalog" className="hidden md:inline underline-offset-2 hover:underline">
            Shop the new drop →
          </Link>
        </div>
      </div>

      {/* Main nav */}
      <div className="border-b border-border bg-background/95 backdrop-blur text-foreground">
        <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between gap-8 px-6 lg:px-10">
          <Link
            to="/"
            className="font-display leading-none tracking-tight text-foreground font-black text-xl"
          >
            FX MODS
          </Link>

          <nav className="hidden md:flex items-center gap-8 lg:gap-10">
            {navItems.map((item) => (
              <div key={item.label} className="group relative">
                {item.to ? (
                  <Link
                    to={item.to}
                    className="inline-flex items-center gap-1 text-[13px] font-medium text-foreground/80 transition-colors group-hover:text-foreground"
                  >
                    {item.label}
                    {item.children && (
                      <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:rotate-180" strokeWidth={2} />
                    )}
                  </Link>
                ) : (
                  <button
                    type="button"
                    className="inline-flex items-center gap-1 text-[13px] font-medium text-foreground/80 transition-colors group-hover:text-foreground"
                  >
                    {item.label}
                    {item.children && (
                      <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:rotate-180" strokeWidth={2} />
                    )}
                  </button>
                )}

                {item.children && (
                  <div className="invisible absolute left-1/2 top-full z-50 w-72 -translate-x-1/2 pt-3 opacity-0 transition-all duration-150 group-hover:visible group-hover:opacity-100">
                    <div className="rounded-2xl border border-border bg-card text-foreground shadow-xl overflow-hidden">
                      <ul className="py-2">
                        {item.children.map((child) => (
                          <li key={child.label}>
                            <Link
                              to={child.to}
                              className="block px-5 py-3 transition-colors hover:bg-secondary"
                            >
                              <div className="text-[13px] font-semibold text-foreground">
                                {child.label}
                              </div>
                              {child.description && (
                                <div className="mt-0.5 text-xs text-muted-foreground">
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
                  className="hidden lg:inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-[13px] font-medium text-foreground/80 hover:text-foreground focus:outline-none"
                >
                  <span className="text-base leading-none">{active.flag}</span>
                  <span>{active.label} {active.symbol}</span>
                  <ChevronDown className="h-3.5 w-3.5" strokeWidth={2} />
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
                      {selected && <Check className="h-4 w-4" />}
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Search products"
              className="inline-flex h-10 w-10 items-center justify-center text-foreground transition-opacity hover:opacity-70"
            >
              <Search className="h-[18px] w-[18px]" strokeWidth={2} />
            </button>
            <button
              type="button"
              aria-label="Account"
              className="hidden sm:inline-flex h-10 w-10 items-center justify-center text-foreground transition-opacity hover:opacity-70"
            >
              <User className="h-[18px] w-[18px]" strokeWidth={2} />
            </button>
            <CartDrawer />
          </div>
        </div>
      </div>
      <SearchModal open={searchOpen} onOpenChange={setSearchOpen} />
    </header>
  );
}