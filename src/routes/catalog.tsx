import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ProductCard } from "@/components/ProductCard";
import {
  PRODUCTS_QUERY,
  storefrontApiRequest,
  type ShopifyProduct,
} from "@/lib/shopify";

export const Route = createFileRoute("/catalog")({
  head: () => ({
    meta: [
      { title: "Catalog — FX Mods" },
      { name: "description", content: "Browse every FX Mods product: throttles, lights, ignitions, hardware, and bundles." },
      { property: "og:title", content: "Catalog — FX Mods" },
      { property: "og:description", content: "Browse every FX Mods product for Surron and e-bikes." },
    ],
  }),
  component: Catalog,
});

function Catalog() {
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const data = await storefrontApiRequest(PRODUCTS_QUERY, { first: 50 });
      return (data?.data?.products?.edges ?? []) as ShopifyProduct[];
    },
  });

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-12">
        <p className="text-xs font-display tracking-[0.3em] uppercase text-primary mb-2">// Catalog</p>
        <h1 className="font-display text-5xl md:text-7xl uppercase tracking-tight">All Products</h1>
        <p className="mt-4 text-muted-foreground">{products.length} item{products.length !== 1 ? "s" : ""}</p>
      </div>
      {isLoading ? (
        <p className="text-muted-foreground">Loading…</p>
      ) : products.length === 0 ? (
        <div className="text-center py-24 border border-border">
          <p className="font-display text-2xl uppercase tracking-wider">No products found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {products.map((p) => (
            <ProductCard key={p.node.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}