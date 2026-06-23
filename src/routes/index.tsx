import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import {
  PRODUCTS_QUERY,
  storefrontApiRequest,
  type ShopifyProduct,
} from "@/lib/shopify";
import heroImg from "@/assets/hero-surron.jpg";
import throttleImg from "@/assets/feature-throttle.jpg";

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

  return (
    <div>
      {/* HERO — full-bleed overlay */}
      <section className="relative isolate overflow-hidden bg-card">
        <img
          src={heroImg}
          alt="Surron rider catching air in the desert"
          width={1600}
          height={900}
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/40 via-black/30 to-black/70" />
        <div className="mx-auto flex min-h-[78vh] max-w-7xl flex-col items-center justify-center px-6 py-24 text-center lg:px-12">
          <span className="font-display text-[11px] font-bold uppercase tracking-[0.3em] text-primary">
            Plug-and-Play Performance
          </span>
          <h1 className="mt-6 font-display uppercase leading-[0.95] tracking-tight text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl max-w-5xl">
            Freedom to ride.
          </h1>
          <p className="mt-8 max-w-xl text-base md:text-lg text-white/80 leading-relaxed">
            Plug-and-play throttles, baja lights, and bundles engineered on our own
            bikes — built to survive a season in the dirt.
          </p>
          <Link
            to="/catalog"
            className="mt-10 inline-flex items-center rounded-full bg-primary px-12 py-4 font-display text-sm uppercase tracking-[0.2em] text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Discover Collection
          </Link>
          <div className="mt-12 flex items-center gap-3">
            {[1, 2, 3].map((n, i) => (
              <span
                key={n}
                className={`flex h-7 w-7 items-center justify-center rounded-full border text-[10px] font-bold ${
                  i === 0
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-white/50 text-white/70"
                }`}
              >
                {n}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-6 lg:px-12 py-12 md:py-20">
          {products.length === 0 ? (
            <p className="text-muted-foreground text-center py-20">No products found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-16">
              {products.slice(0, 4).map((p) => (
                <ProductCard key={p.node.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* TEAM / FEATURE SPLIT */}
      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-6 lg:px-12 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-10 items-center">
          <img
            src={throttleImg}
            alt="Custom throttle mod close-up"
            loading="lazy"
            width={1024}
            height={1024}
            className="w-full h-auto object-cover aspect-square"
          />
          <div>
            <h2 className="font-display uppercase text-4xl md:text-5xl leading-[0.95] tracking-tight">
              Built by riders<br />for riders.
            </h2>
            <p className="mt-8 text-base text-muted-foreground leading-relaxed max-w-sm">
              "We design every mod on our own bikes first. If it doesn't survive a
              season in the dirt, it doesn't ship — full stop."
            </p>
          </div>
        </div>
      </section>

      {/* CALLOUT BAR */}
      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="bg-card p-10 md:p-14">
            <h3 className="font-display uppercase text-2xl md:text-3xl tracking-tight max-w-2xl">
              Plug-and-play, every time.
            </h3>
            <p className="mt-4 text-muted-foreground max-w-2xl leading-relaxed">
              No splicing, no soldering, no headaches. Our harnesses click straight
              into your stock connectors so you can be riding in minutes.
            </p>
            <Link
              to="/catalog"
              className="mt-6 inline-flex items-center gap-3 text-primary font-display tracking-[0.2em] uppercase text-sm hover:gap-4 transition-all"
            >
              Shop Mods <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
