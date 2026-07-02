import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { ArrowRight, Plus, Minus } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import {
  PRODUCTS_QUERY,
  storefrontApiRequest,
  type ShopifyProduct,
} from "@/lib/shopify";
import heroImg from "@/assets/hero-main.jpg";
import catThrottles from "@/assets/cat-throttles.jpg";
import catLights from "@/assets/cat-lights.jpg";
import catIgnitions from "@/assets/cat-ignitions.jpg";
import catBundles from "@/assets/cat-bundles.jpg";
import catHardware from "@/assets/cat-hardware.jpg";
import featureRider from "@/assets/feature-rider.jpg";

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

const categories = [
  { label: "Throttles", img: catThrottles },
  { label: "Baja Lights", img: catLights },
  { label: "Ignitions", img: catIgnitions },
  { label: "Bundles", img: catBundles },
  { label: "Hardware", img: catHardware },
];

const faqs = [
  {
    q: "Will these mods fit my Surron?",
    a: "Every FX Mods product is designed as a plug-and-play kit for Surron Light Bee X and most 48V–72V e-bikes. If your bike isn't listed, reach out and we'll confirm compatibility.",
  },
  {
    q: "How long does shipping take?",
    a: "Orders ship within 1 business day. US delivery is 2–5 days, international 7–14 days. Free shipping on orders over $75.",
  },
  {
    q: "Do you offer a warranty?",
    a: "Yes — every FX Mods product carries a 2-year warranty against manufacturing defects. If something goes wrong, we'll replace it.",
  },
  {
    q: "Are the mods legal for street use?",
    a: "Legality varies by region. Some mods are intended for off-road / closed-course use only. Check your local regulations before installing.",
  },
  {
    q: "What's your return policy?",
    a: "30-day returns on unopened items. Installed parts can still be returned if the issue is a defect — just contact support first.",
  },
];

function Index() {
  const { data: products = [] } = useQuery({
    queryKey: ["products"],
    queryFn: () => fetchProducts(),
  });

  const bestSellers = products.slice(0, 4);

  return (
    <div className="bg-background">
      {/* HERO — rounded full-bleed image */}
      <section className="px-3 pt-3 lg:px-4 lg:pt-4">
        <div className="relative isolate overflow-hidden rounded-3xl bg-secondary">
          <img
            src={heroImg}
            alt="Surron e-bike ripping through the desert"
            width={1920}
            height={1080}
            className="h-[78vh] w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10" />
          <div className="absolute inset-0 flex flex-col items-center justify-end pb-16 md:pb-24 px-6 text-center text-white">
            <p className="text-[11px] font-medium tracking-[0.3em] uppercase opacity-80 mb-4">
              New Season · 2026
            </p>
            <h1 className="font-display font-black tracking-[-0.03em] text-5xl md:text-7xl lg:text-8xl max-w-4xl leading-[0.95]">
              Ride further.<br />Ride harder.
            </h1>
            <p className="mt-5 max-w-lg text-sm md:text-base opacity-90">
              Premium plug-and-play mods engineered for Surron and modern e-bikes.
            </p>
            <Link
              to="/catalog"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-foreground transition-transform hover:scale-[1.02]"
            >
              Discover the collection
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CATEGORY GRID */}
      <section className="mx-auto max-w-[1600px] px-6 lg:px-10 py-20 md:py-28">
        <div className="flex items-end justify-between mb-10">
          <h2 className="font-display font-black text-3xl md:text-5xl tracking-[-0.02em]">Shop by category</h2>
          <Link to="/catalog" className="hidden md:inline-flex items-center gap-1.5 text-sm font-medium text-foreground/80 hover:text-foreground">
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((c) => (
            <Link
              key={c.label}
              to="/catalog"
              className="group flex flex-col items-center"
            >
              <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-secondary">
                <img
                  src={c.img}
                  alt={c.label}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <span className="mt-4 text-sm font-medium">{c.label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* BIG FEATURE TEXT SPLIT */}
      <section className="mx-auto max-w-[1600px] px-6 lg:px-10 pb-20 md:pb-28">
        <div className="grid lg:grid-cols-2 gap-4">
          <div className="rounded-3xl bg-foreground text-background p-10 md:p-14 flex flex-col justify-between min-h-[420px]">
            <p className="text-[11px] font-medium tracking-[0.3em] uppercase opacity-60">Built by riders</p>
            <div>
              <h3 className="font-display font-black text-4xl md:text-6xl tracking-[-0.03em] leading-[0.95]">
                A leap forward for every ride.
              </h3>
              <p className="mt-6 max-w-md text-sm opacity-70">
                Every mod is designed, tested, and abused in the real world before it hits your build. No fluff — just parts that hold up.
              </p>
              <Link to="/catalog" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold">
                Explore the lineup <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-3xl bg-secondary min-h-[420px]">
            <img
              src={featureRider}
              alt="Rider next to their Surron"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* BEST SELLERS */}
      {bestSellers.length > 0 && (
        <section className="mx-auto max-w-[1600px] px-6 lg:px-10 pb-20 md:pb-28">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-[11px] font-medium tracking-[0.3em] uppercase text-muted-foreground mb-3">Best Sellers</p>
              <h2 className="font-display font-black text-3xl md:text-5xl tracking-[-0.02em]">What riders love.</h2>
            </div>
            <Link to="/catalog" className="hidden md:inline-flex items-center gap-1.5 text-sm font-medium text-foreground/80 hover:text-foreground">
              Shop all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {bestSellers.map((p) => (
              <ProductCard key={p.node.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="mx-auto max-w-[1600px] px-6 lg:px-10 pb-24 md:pb-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          <div>
            <p className="text-[11px] font-medium tracking-[0.3em] uppercase text-muted-foreground mb-4">FAQ</p>
            <h2 className="font-display font-black text-4xl md:text-6xl tracking-[-0.03em] leading-[0.95]">
              Have a<br />question?
            </h2>
            <p className="mt-6 text-muted-foreground max-w-md">
              Answers to the things we get asked most. Can't find what you need? Get in touch.
            </p>
            <Link to="/contact" className="mt-8 inline-flex items-center gap-2 rounded-full bg-foreground text-background px-6 py-3 text-sm font-semibold hover:bg-foreground/90">
              Contact us <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="divide-y divide-border border-y border-border">
            {faqs.map((item, i) => (
              <FaqItem key={i} q={item.q} a={item.a} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 py-5 text-left"
      >
        <span className="text-base md:text-lg font-medium">{q}</span>
        {open ? <Minus className="h-5 w-5 shrink-0" /> : <Plus className="h-5 w-5 shrink-0" />}
      </button>
      {open && <p className="pb-5 text-sm text-muted-foreground max-w-xl">{a}</p>}
    </div>
  );
}

