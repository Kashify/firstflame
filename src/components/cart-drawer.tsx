import { Link } from "@tanstack/react-router";
import { Heart, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { FreeShippingMeter } from "@/components/free-shipping-meter";
import { computeTotals, inr } from "@/lib/format";
import { lineUnitPrice, useStore } from "@/lib/store";

export function CartDrawer() {
  const {
    cartOpen,
    setCartOpen,
    cartLines,
    subtotal,
    discount,
    couponCode,
    setQty,
    removeLine,
    moveToWishlist,
  } = useStore();
  const totals = computeTotals(subtotal, discount);
  const close = () => setCartOpen(false);

  return (
    <Sheet open={cartOpen} onOpenChange={setCartOpen}>
      <SheetContent side="right" className="flex w-[92vw] max-w-md flex-col gap-0 p-0">
        <div className="border-b border-border px-5 py-4">
          <SheetTitle className="flex items-center gap-2 font-display text-xl">
            <ShoppingBag className="h-5 w-5" /> Your bag
          </SheetTitle>
        </div>

        {cartLines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <p className="font-display text-lg">Your bag is empty</p>
            <p className="text-sm text-muted-foreground">
              Add a jar of freshly ground masala to get started.
            </p>
            <Button asChild className="rounded-full px-7" onClick={close}>
              <Link to="/shop">Browse the shop</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4">
              <FreeShippingMeter amount={totals.taxable} />
              <ul className="mt-4 divide-y divide-border">
                {cartLines.map((line) => (
                  <li key={`${line.slug}-${line.weight}`} className="flex gap-3 py-4">
                    <Link
                      to="/product/$slug"
                      params={{ slug: line.slug }}
                      onClick={close}
                      className="h-20 w-20 shrink-0 overflow-hidden rounded-xl"
                    >
                      <img
                        src={line.product.images[0]}
                        alt={line.product.name}
                        loading="lazy"
                        className="h-full w-full object-cover"
                      />
                    </Link>
                    <div className="min-w-0 flex-1">
                      <Link to="/product/$slug" params={{ slug: line.slug }} onClick={close}>
                        <p className="truncate text-sm font-medium">{line.product.name}</p>
                      </Link>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {line.weight} · {inr(lineUnitPrice(line.product, line.weight))}
                      </p>
                      <div className="mt-2 flex items-center gap-2">
                        <div className="flex items-center rounded-full border border-border">
                          <button
                            aria-label="Decrease quantity"
                            onClick={() => setQty(line.slug, line.weight, line.qty - 1)}
                            className="grid h-7 w-7 place-items-center rounded-l-full hover:bg-surface"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-7 text-center text-xs">{line.qty}</span>
                          <button
                            aria-label="Increase quantity"
                            onClick={() => setQty(line.slug, line.weight, line.qty + 1)}
                            className="grid h-7 w-7 place-items-center rounded-r-full hover:bg-surface"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <button
                          aria-label="Save to wishlist"
                          onClick={() => moveToWishlist(line.slug, line.weight)}
                          className="grid h-7 w-7 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:text-spice"
                        >
                          <Heart className="h-3.5 w-3.5" />
                        </button>
                        <button
                          aria-label="Remove item"
                          onClick={() => removeLine(line.slug, line.weight)}
                          className="grid h-7 w-7 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:text-destructive"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                    <p className="shrink-0 text-sm font-medium">{inr(line.lineTotal)}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-border px-5 py-4">
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Subtotal</dt>
                  <dd>{inr(totals.subtotal)}</dd>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-primary">
                    <dt>Discount ({couponCode})</dt>
                    <dd>−{inr(discount)}</dd>
                  </div>
                )}
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Shipping</dt>
                  <dd>{totals.shipping === 0 ? "Free" : inr(totals.shipping)}</dd>
                </div>
              </dl>
              <Separator className="my-3" />
              <div className="flex items-center justify-between font-display text-lg">
                <span>Total</span>
                <span>{inr(totals.total)}</span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">Incl. 5% GST</p>
              <Button asChild size="lg" className="mt-4 w-full rounded-full" onClick={close}>
                <Link to="/checkout">Checkout</Link>
              </Button>
              <Button asChild variant="ghost" className="mt-1.5 w-full rounded-full" onClick={close}>
                <Link to="/cart">View full bag</Link>
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
