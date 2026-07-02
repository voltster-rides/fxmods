import { Link } from "@tanstack/react-router";
import { Loader2, Plus } from "lucide-react";
import { toast } from "sonner";
import { useCartStore } from "@/stores/cartStore";
import type { ShopifyProduct } from "@/lib/shopify";
import { useFormatPrice } from "@/stores/currencyStore";

export function ProductCard({ product }: { product: ShopifyProduct }) {
  const addItem = useCartStore((s) => s.addItem);
  const isLoading = useCartStore((s) => s.isLoading);
  const format = useFormatPrice();

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
      className="group relative flex flex-col"
    >
      <div className="relative aspect-square bg-secondary rounded-2xl overflow-hidden">
        {image ? (
          <img
            src={image.url}
            alt={image.altText ?? product.node.title}
            className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-grid">
            <span className="font-display text-6xl text-foreground/10 font-black">FX</span>
          </div>
        )}
        {onSale && (
          <span className="absolute top-3 left-3 bg-foreground text-background text-[10px] font-semibold px-2.5 py-1 rounded-full">
            SALE
          </span>
        )}
        {soldOut && (
          <span className="absolute top-3 right-3 bg-background text-foreground text-[10px] font-semibold px-2.5 py-1 rounded-full border border-border">
            SOLD OUT
          </span>
        )}
        <button
          onClick={handleAdd}
          disabled={isLoading || !variant}
          aria-label="Add to cart"
          className="absolute bottom-3 right-3 h-9 w-9 inline-flex items-center justify-center rounded-full bg-foreground text-background opacity-0 group-hover:opacity-100 transition-opacity hover:bg-foreground/90 disabled:opacity-50"
        >
          {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
        </button>
      </div>
      <div className="pt-4 flex items-start justify-between gap-3">
        <h3 className="text-[14px] font-medium leading-snug text-foreground line-clamp-2">
          {product.node.title}
        </h3>
        <div className="flex items-baseline gap-1.5 shrink-0">
          {onSale && (
            <span className="text-xs text-muted-foreground line-through">{format(compareAt!)}</span>
          )}
          <span className="text-[14px] font-semibold text-foreground">{format(price)}</span>
        </div>
      </div>
    </Link>
  );
}