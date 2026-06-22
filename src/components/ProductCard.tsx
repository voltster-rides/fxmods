import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Loader2, Plus } from "lucide-react";
import { toast } from "sonner";
import { useCartStore } from "@/stores/cartStore";
import type { ShopifyProduct } from "@/lib/shopify";

export function ProductCard({ product }: { product: ShopifyProduct }) {
  const addItem = useCartStore((s) => s.addItem);
  const isLoading = useCartStore((s) => s.isLoading);

  const variant = product.node.variants.edges[0]?.node;
  const image = product.node.images.edges[0]?.node;
  const price = parseFloat(product.node.priceRange.minVariantPrice.amount);
  const compareAt = variant?.compareAtPrice
    ? parseFloat(variant.compareAtPrice.amount)
    : null;
  const onSale = compareAt !== null && compareAt > price;
  const soldOut = variant ? !variant.availableForSale : false;

  const handleAdd = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!variant) return;
    await addItem({
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions ?? [],
    });
    toast.success("Added to cart", {
      description: product.node.title,
      position: "top-right",
    });
  };

  return (
    <Link
      to="/product/$handle"
      params={{ handle: product.node.handle }}
      className="group relative flex flex-col bg-card border border-border hover:border-primary transition-colors duration-200"
    >
      <div className="relative aspect-square bg-secondary overflow-hidden">
        {image ? (
          <img
            src={image.url}
            alt={image.altText ?? product.node.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-grid">
            <span className="font-display text-7xl text-primary/30 tracking-widest">FX</span>
          </div>
        )}
        {onSale && (
          <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-bold px-2 py-1 uppercase tracking-wider">
            Sale
          </span>
        )}
        {soldOut && (
          <span className="absolute top-3 right-3 bg-background/90 text-foreground text-xs font-bold px-2 py-1 uppercase tracking-wider border border-border">
            Sold Out
          </span>
        )}
      </div>
      <div className="p-4 flex flex-col gap-2 flex-1">
        <h3 className="font-display text-xl tracking-wide uppercase leading-tight">
          {product.node.title}
        </h3>
        <div className="mt-auto flex items-center justify-between pt-2">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-primary">${price.toFixed(2)}</span>
            {onSale && (
              <span className="text-sm text-muted-foreground line-through">
                ${compareAt!.toFixed(2)}
              </span>
            )}
          </div>
          <Button
            size="sm"
            onClick={handleAdd}
            disabled={isLoading || !variant}
            className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold uppercase tracking-wider text-xs"
          >
            {isLoading ? <Loader2 className="w-3 h-3 animate-spin" /> : (
              <>
                <Plus className="w-3 h-3 mr-1" />
                Add
              </>
            )}
          </Button>
        </div>
      </div>
    </Link>
  );
}