import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ShoppingCart, Minus, Plus, Trash2, ExternalLink, Loader2, ArrowRight, Truck } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { useFormatPrice } from "@/stores/currencyStore";

export const CartDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { items, isLoading, isSyncing, updateQuantity, removeItem, getCheckoutUrl, syncCart } =
    useCartStore();
  const format = useFormatPrice();
  const totalItems = items.reduce((s, i) => s + i.quantity, 0);
  const totalPrice = items.reduce((s, i) => s + parseFloat(i.price.amount) * i.quantity, 0);
  const FREE_SHIPPING_THRESHOLD = 75;
  const remainingForFree = Math.max(0, FREE_SHIPPING_THRESHOLD - totalPrice);
  const freeShippingProgress = Math.min(100, (totalPrice / FREE_SHIPPING_THRESHOLD) * 100);

  useEffect(() => {
    if (isOpen) syncCart();
  }, [isOpen, syncCart]);

  const handleCheckout = () => {
    const url = getCheckoutUrl();
    if (url) {
      window.open(url, "_blank");
      setIsOpen(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <button
          type="button"
          aria-label="Open cart"
          className="relative inline-flex h-10 w-10 items-center justify-center text-foreground transition-opacity hover:opacity-70"
        >
          <ShoppingCart className="h-[18px] w-[18px]" strokeWidth={2} />
          {totalItems > 0 && (
            <span className="absolute top-1 right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-foreground px-1 text-[10px] font-semibold text-background">
              {totalItems}
            </span>
          )}
        </button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg flex flex-col h-full bg-card border-border">
        <SheetHeader className="flex-shrink-0">
          <SheetTitle className="font-display text-3xl tracking-wider uppercase flex items-center gap-3">
            Your Cart
            {totalItems > 0 && (
              <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-primary px-2 text-xs font-bold text-primary-foreground">
                {totalItems}
              </span>
            )}
          </SheetTitle>
          <SheetDescription>
            {totalItems === 0
              ? "Nothing here yet — go grab some mods."
              : `${totalItems} item${totalItems !== 1 ? "s" : ""} ready to ride`}
          </SheetDescription>
        </SheetHeader>

        {/* Free shipping progress */}
        {items.length > 0 && (
          <div className="flex-shrink-0 mt-4 rounded-md border border-border bg-background/40 px-4 py-3">
            <div className="flex items-center gap-2 text-xs">
              <Truck className="h-3.5 w-3.5 text-primary" />
              {remainingForFree > 0 ? (
                <span className="text-muted-foreground">
                  Add <span className="font-bold text-foreground">{format(remainingForFree)}</span> more for free shipping
                </span>
              ) : (
                <span className="font-semibold text-primary">You've unlocked free shipping 🎉</span>
              )}
            </div>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-border">
              <div
                className="h-full bg-primary transition-all duration-300"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>
        )}

        <div className="flex flex-col flex-1 pt-6 min-h-0">
          {items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center max-w-xs">
                <div className="mx-auto mb-5 inline-flex h-16 w-16 items-center justify-center rounded-full border border-border bg-background/40">
                  <ShoppingCart className="h-7 w-7 text-muted-foreground" strokeWidth={1.75} />
                </div>
                <h3 className="font-display text-2xl uppercase tracking-wider">Empty cart</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Throttles, lights, and bundles are one click away.
                </p>
                <Button
                  asChild
                  className="mt-6 bg-primary text-primary-foreground hover:bg-primary/90 font-bold uppercase tracking-widest"
                  onClick={() => setIsOpen(false)}
                >
                  <Link to="/catalog">
                    Shop Products
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto pr-2 min-h-0">
                <div className="space-y-3">
                  {items.map((item) => (
                    <div key={item.variantId} className="group flex gap-4 p-3 border border-border rounded-md bg-background/40 transition-colors hover:border-primary/50">
                      <div className="w-20 h-20 bg-secondary rounded-md overflow-hidden flex-shrink-0 flex items-center justify-center">
                        {item.product.node.images?.edges?.[0]?.node ? (
                          <img
                            src={item.product.node.images.edges[0].node.url}
                            alt={item.product.node.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="font-display text-primary text-xl">FX</span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0 flex flex-col">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-semibold text-sm leading-snug line-clamp-2">{item.product.node.title}</h4>
                          <button
                            type="button"
                            onClick={() => removeItem(item.variantId)}
                            className="shrink-0 text-muted-foreground hover:text-destructive transition-colors"
                            aria-label="Remove"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        {item.selectedOptions.filter((o) => o.value !== "Default Title").length > 0 && (
                          <p className="mt-0.5 text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                            {item.selectedOptions
                              .filter((o) => o.value !== "Default Title")
                              .map((o) => o.value)
                              .join(" • ")}
                          </p>
                        )}
                        <div className="mt-auto flex items-center justify-between pt-2">
                          <div className="inline-flex items-center rounded-full border border-border bg-background">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                              className="h-7 w-7 inline-flex items-center justify-center text-foreground hover:text-primary disabled:opacity-40"
                              disabled={item.quantity <= 1}
                              aria-label="Decrease"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="w-6 text-center text-xs font-semibold tabular-nums">{item.quantity}</span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                              className="h-7 w-7 inline-flex items-center justify-center text-foreground hover:text-primary"
                              aria-label="Increase"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                          <div className="text-sm font-bold text-primary">
                            {format(parseFloat(item.price.amount) * item.quantity)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex-shrink-0 space-y-4 pt-4 mt-4 border-t border-border bg-card">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span className="text-foreground font-semibold">{format(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Shipping</span>
                    <span className="font-semibold text-foreground">
                      {remainingForFree > 0 ? "Calculated at checkout" : "Free"}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center border-t border-border pt-3">
                  <span className="font-display text-2xl tracking-wider uppercase">Total</span>
                  <span className="text-2xl font-bold text-primary">
                    {format(totalPrice)}
                  </span>
                </div>
                <Button
                  onClick={handleCheckout}
                  className="w-full font-display text-lg tracking-widest uppercase bg-primary text-primary-foreground hover:bg-primary/90"
                  size="lg"
                  disabled={items.length === 0 || isLoading || isSyncing}
                >
                  {isLoading || isSyncing ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Checkout
                    </>
                  )}
                </Button>
                <p className="text-center text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                  Secure checkout · 2-year warranty
                </p>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};