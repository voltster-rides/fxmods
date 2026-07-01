import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Search, Loader2, X } from "lucide-react";
import { PRODUCTS_QUERY, storefrontApiRequest, type ShopifyProduct } from "@/lib/shopify";
import { useFormatPrice } from "@/stores/currencyStore";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SearchModal({ open, onOpenChange }: Props) {
  const [query, setQuery] = useState("");
  const format = useFormatPrice();

  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  const { data: products = [], isLoading } = useQuery<ShopifyProduct[]>({
    queryKey: ["search-products"],
    queryFn: async () => {
      const data = await storefrontApiRequest(PRODUCTS_QUERY, { first: 50 });
      return data?.data?.products?.edges ?? [];
    },
    enabled: open,
    staleTime: 60_000,
  });

  const q = query.trim().toLowerCase();
  const results = q
    ? products.filter((p) => {
        const n = p.node;
        return (
          n.title.toLowerCase().includes(q) ||
          n.description?.toLowerCase().includes(q) ||
          n.productType?.toLowerCase().includes(q) ||
          n.tags?.some((t) => t.toLowerCase().includes(q))
        );
      })
    : products.slice(0, 8);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="max-w-2xl p-0 gap-0 bg-card border-border overflow-hidden top-[15%] translate-y-0"
      >
        <div className="flex items-center gap-3 border-b border-border px-5 py-4">
          <Search className="h-5 w-5 text-muted-foreground shrink-0" strokeWidth={2} />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search throttles, lights, bundles…"
            className="flex-1 bg-transparent text-base text-foreground placeholder:text-muted-foreground outline-none"
          />
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="text-muted-foreground hover:text-foreground"
            aria-label="Close search"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto">
          {isLoading ? (
            <div className="flex items-center justify-center py-16 text-muted-foreground">
              <Loader2 className="h-5 w-5 animate-spin" />
            </div>
          ) : results.length === 0 ? (
            <div className="px-5 py-16 text-center text-sm text-muted-foreground">
              No products match "{query}".
            </div>
          ) : (
            <>
              <div className="px-5 pt-4 pb-2 text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                {q ? `${results.length} result${results.length === 1 ? "" : "s"}` : "Popular products"}
              </div>
              <ul className="pb-3">
                {results.map((p) => {
                  const img = p.node.images.edges[0]?.node;
                  const price = parseFloat(p.node.priceRange.minVariantPrice.amount);
                  return (
                    <li key={p.node.id}>
                      <Link
                        to="/product/$handle"
                        params={{ handle: p.node.handle }}
                        onClick={() => onOpenChange(false)}
                        className="flex items-center gap-4 px-5 py-3 hover:bg-background transition-colors"
                      >
                        <div className="h-14 w-14 shrink-0 overflow-hidden rounded-md bg-secondary flex items-center justify-center">
                          {img ? (
                            <img src={img.url} alt={img.altText ?? p.node.title} className="h-full w-full object-cover" />
                          ) : (
                            <span className="font-display text-primary">FX</span>
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="truncate text-sm font-semibold text-foreground">{p.node.title}</div>
                          {p.node.productType && (
                            <div className="mt-0.5 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                              {p.node.productType}
                            </div>
                          )}
                        </div>
                        <div className="text-sm font-bold text-primary">{format(price)}</div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}