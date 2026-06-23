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
import lightsImg from "@/assets/feature-lights.jpg";

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
      {/* HERO — split layout */}
      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-6 lg:px-12 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="order-2 lg:order-1">
            <h1 className="font-display uppercase leading-[0.95] text-6xl md:text-7xl lg:text-8xl tracking-tight">
              Freedom<br />to ride.
            </h1>
            <p className="mt-8 text-base md:text-lg text-muted-foreground max-w-md leading-relaxed">
              As riders, we have a deep-rooted need to escape. Whether it's chasing
              dust through the desert or carving the trails behind town, there's no
              freedom quite like twisting the throttle on a bike built your way.
            </p>
            <div className="mt-10">
              <Link
                to="/catalog"
                className="inline-flex items-center bg-primary text-primary-foreground font-display tracking-[0.2em] uppercase text-sm px-10 py-4 hover:bg-primary/90 transition-colors"
              >
                Find Your Mod
              </Link>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <img
              src={heroImg}
              alt="Surron rider catching air in the desert"
              width={896}
              height={1152}
              className="w-full h-auto object-cover aspect-[3/4] lg:aspect-[4/5]"
            />
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

      {/* BIG FEATURE IMAGE */}
      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-6 lg:px-12 py-16">
          <img
            src={lightsImg}
            alt="Baja lights cutting through the dark"
            loading="lazy"
            width={1024}
            height={1024}
            className="w-full h-auto object-cover aspect-[16/9]"
          />
        </div>
      </section>
    </div>
  );
}
