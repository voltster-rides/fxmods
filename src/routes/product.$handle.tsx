import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Loader2, Plus, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cartStore";
import {
  PRODUCT_BY_HANDLE_QUERY,
  storefrontApiRequest,
  type ShopifyProduct,
} from "@/lib/shopify";

export const Route = createFileRoute("/product/$handle")({
  head: ({ params }) => ({
    meta: [
      { title: `${params.handle.replace(/-/g, " ")} — FX Mods` },
      { property: "og:title", content: `${params.handle.replace(/-/g, " ")} — FX Mods` },
    ],
  }),
  component: ProductDetail,
});

function ProductDetail() {
  const { handle } = Route.useParams();
  const addItem = useCartStore((s) => s.addItem);
  const isLoading = useCartStore((s) => s.isLoading);

  const { data: product, isLoading: loading } = useQuery({
    queryKey: ["product", handle],
    queryFn: async () => {
      const data = await storefrontApiRequest(PRODUCT_BY_HANDLE_QUERY, { handle });
      const node = data?.data?.productByHandle;
      if (!node) return null;
      return { node } as ShopifyProduct;
    },
  });

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 text-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" />
      </div>
    );
  }
  if (!product) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 text-center">
        <h1 className="font-display text-4xl uppercase mb-4">Product not found</h1>
        <Link to="/catalog" className="text-primary hover:underline">Back to catalog</Link>
      </div>
    );
  }

  const variant = product.node.variants.edges[0]?.node;
  const image = product.node.images.edges[0]?.node;
  const price = parseFloat(product.node.priceRange.minVariantPrice.amount);
  const compareAt = variant?.compareAtPrice ? parseFloat(variant.compareAtPrice.amount) : null;
  const onSale = compareAt !== null && compareAt > price;

  const handleAdd = async () => {
    if (!variant) return;
    await addItem({
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions ?? [],
    });
    toast.success("Added to cart", { description: product.node.title, position: "top-right" });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <Link to="/catalog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8">
        <ArrowLeft className="h-4 w-4" /> Back to catalog
      </Link>
      <div className="grid md:grid-cols-2 gap-12">
        <div className="aspect-square bg-card border border-border overflow-hidden flex items-center justify-center">
          {image ? (
            <img src={image.url} alt={image.altText ?? product.node.title} className="w-full h-full object-cover" />
          ) : (
            <div className="bg-grid w-full h-full flex items-center justify-center">
              <span className="font-display text-[12rem] text-primary/30 tracking-widest">FX</span>
            </div>
          )}
        </div>
        <div className="flex flex-col">
          {product.node.productType && (
            <p className="text-xs font-display tracking-[0.3em] uppercase text-primary mb-3">{product.node.productType}</p>
          )}
          <h1 className="font-display text-4xl md:text-5xl uppercase tracking-tight leading-tight">{product.node.title}</h1>
          <div className="mt-6 flex items-baseline gap-3">
            <span className="text-3xl font-bold text-primary">${price.toFixed(2)}</span>
            {onSale && <span className="text-lg text-muted-foreground line-through">${compareAt!.toFixed(2)}</span>}
            {onSale && <span className="text-xs font-bold uppercase tracking-wider bg-primary text-primary-foreground px-2 py-1">Sale</span>}
          </div>
          <p className="mt-8 text-muted-foreground leading-relaxed whitespace-pre-line">
            {product.node.description || "No description yet."}
          </p>
          <div className="mt-10">
            <Button onClick={handleAdd} disabled={isLoading || !variant} size="lg" className="w-full md:w-auto bg-primary text-primary-foreground hover:bg-primary/90 font-display tracking-[0.2em] uppercase text-base h-12 px-10">
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : (<><Plus className="mr-2 h-4 w-4" /> Add to Cart</>)}
            </Button>
          </div>
          {variant && !variant.availableForSale && (
            <p className="mt-4 text-sm text-muted-foreground">Currently out of stock — preorders may take 1–2 weeks to ship.</p>
          )}
        </div>
      </div>
    </div>
  );
}