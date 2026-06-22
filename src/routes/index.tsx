import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Zap, Truck, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import {
  PRODUCTS_QUERY,
  storefrontApiRequest,
  type ShopifyProduct,
} from "@/lib/shopify";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FX Mods — Premium E-Bike & Surron Mods" },
      { name: "description", content: "Plug-and-play throttles, baja lights, and bundles for Surron and e-bikes." },
      { property: "og:title", content: "FX Mods — Premium E-Bike & Surron Mods" },
      { property: "og:description", content: "Plug-and-play throttles, baja lights, and bundles for Surron and e-bikes." },
    ],
  }),
  component: Index,
});

async function fetchProducts(query?: string) {
  const data = await storefrontApiRequest(PRODUCTS_QUERY, { first: 20, query });
  return (data?.data?.products?.edges ?? []) as ShopifyProduct[];
}

function Index() {
  const { data: products = [] } = useQuery({
    queryKey: ["products"],
    queryFn: () => fetchProducts(),
  });

  const bundles = products.filter((p) =>
    p.node.tags?.includes("bundle") || p.node.productType === "Bundle",
  );
  const singles = products.filter(
    (p) => !(p.node.tags?.includes("bundle") || p.node.productType === "Bundle"),
  );

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/40 to-background" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 md:py-40">
          <div className="max-w-3xl">
            <span className="inline-block text-xs font-display tracking-[0.3em] uppercase text-primary border border-primary px-3 py-1 mb-6">
              EST. 2026 / Ride Smarter
            </span>
            <h1 className="font-display uppercase leading-[0.9] text-6xl md:text-8xl lg:text-9xl tracking-tight">
              Built for the <span className="text-primary">throttle</span> twist.
            </h1>
            <p className="mt-8 text-lg md:text-xl text-muted-foreground max-w-xl">
              Plug-and-play mods for Surron and e-bikes. No splicing, no headaches —
              just upgrade and ride.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-display tracking-[0.2em] uppercase text-base h-12 px-8">
                <Link to="/catalog">Shop All <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-border font-display tracking-[0.2em] uppercase text-base h-12 px-8 hover:bg-secondary">
                <a href="#bundles">View Bundles</a>
              </Button>
            </div>
          </div>
        </div>
        {/* edge decoration */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-2 pr-6 text-right">
          <span className="font-display text-[10rem] leading-none text-stroke opacity-40">FX</span>
        </div>
      </section>

      {/* feature strip */}
      <section className="border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: Zap, t: "Plug N Play", d: "Zero wiring. Zero fuss." },
            { icon: Wrench, t: "Rider-Tested", d: "Designed and abused by us." },
            { icon: Truck, t: "Fast Shipping", d: "Preorders ship in 1–2 weeks." },
          ].map(({ icon: Icon, t, d }) => (
            <div key={t} className="flex items-center gap-4">
              <Icon className="h-8 w-8 text-primary flex-shrink-0" />
              <div>
                <p className="font-display tracking-wider uppercase">{t}</p>
                <p className="text-sm text-muted-foreground">{d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs font-display tracking-[0.3em] uppercase text-primary mb-2">// Products</p>
            <h2 className="font-display text-4xl md:text-6xl uppercase tracking-tight">The Lineup</h2>
          </div>
          <Link to="/catalog" className="hidden md:inline-flex items-center gap-2 text-sm font-display tracking-[0.2em] uppercase hover:text-primary">
            View All <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        {singles.length === 0 ? (
          <p className="text-muted-foreground">Loading products…</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {singles.map((p) => (
              <ProductCard key={p.node.id} product={p} />
            ))}
          </div>
        )}
      </section>

      {/* BUNDLES */}
      <section id="bundles" className="border-t border-border bg-card/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-xs font-display tracking-[0.3em] uppercase text-primary mb-2">// Save More</p>
              <h2 className="font-display text-4xl md:text-6xl uppercase tracking-tight">Bundles</h2>
            </div>
          </div>
          {bundles.length === 0 ? (
            <p className="text-muted-foreground">No bundles yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {bundles.map((p) => (
                <ProductCard key={p.node.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
