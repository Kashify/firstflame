import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, Minus, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { applyCoupon } from "@/lib/coupons";
import { computeTotals, inr } from "@/lib/format";
import { FreeShippingMeter } from "@/components/free-shipping-meter";
import { lineUnitPrice, useStore } from "@/lib/store";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Shopping Bag | First flame Spices" },
      { name: "description", content: "Review your selected single-origin spices and gift boxes." },
      { property: "og:title", content: "Your Shopping Bag | First flame Spices" },
      { property: "og:description", content: "Review your bag and proceed to secure checkout." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { cartLines, subtotal, setQty, removeLine, moveToWishlist, couponCode, discount, setCoupon } =
    useStore();
  const [code, setCode] = useState("");
  const totals = computeTotals(subtotal, discount);

  if (cartLines.length === 0) {
    return (
      <div className="container-page py-24 text-center">
        <h1 className="font-display text-3xl">Your bag is empty</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Start with a best seller — the Royal Garam Masala is where most people begin.
        </p>
        <Button asChild className="mt-7 rounded-full px-8">
          <Link to="/shop">Browse the shop</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container-page py-12 md:py-16">
      <h1 className="font-display text-3xl md:text-4xl">Your bag</h1>

      <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px]">
        <ul className="h-fit min-w-0 divide-y divide-border rounded-2xl border border-border">
          {cartLines.map((line) => (
            <li key={`${line.slug}-${line.weight}`} className="flex gap-4 p-4">
              <Link
                to="/product/$slug"
                params={{ slug: line.slug }}
                className="h-24 w-24 shrink-0 overflow-hidden rounded-xl"
              >
                <img
                  src={line.product.images[0]}
                  alt={line.product.name}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </Link>
              <div className="min-w-0 flex-1">
                <Link to="/product/$slug" params={{ slug: line.slug }}>
                  <p className="truncate font-display text-base">{line.product.name}</p>
                </Link>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {line.weight} · {line.product.origin}
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <div className="flex items-center rounded-full border border-border">
                    <button
                      aria-label="Decrease quantity"
                      onClick={() => setQty(line.slug, line.weight, line.qty - 1)}
                      className="grid h-8 w-8 place-items-center rounded-l-full hover:bg-surface"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="w-8 text-center text-sm">{line.qty}</span>
                    <button
                      aria-label="Increase quantity"
                      onClick={() => setQty(line.slug, line.weight, line.qty + 1)}
                      className="grid h-8 w-8 place-items-center rounded-r-full hover:bg-surface"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <button
                    onClick={() => {
                      moveToWishlist(line.slug, line.weight);
                      toast.success("Moved to wishlist");
                    }}
                    className="flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-spice"
                  >
                    <Heart className="h-3.5 w-3.5" /> Save for later
                  </button>
                  <button
                    onClick={() => removeLine(line.slug, line.weight)}
                    className="flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-destructive"
                  >
                    <Trash2 className="h-3.5 w-3.5" /> Remove
                  </button>
                </div>
              </div>
              <div className="shrink-0 text-right">
                <p className="font-display text-base">{inr(line.lineTotal)}</p>
                <p className="text-xs text-muted-foreground">
                  {inr(lineUnitPrice(line.product, line.weight))} each
                </p>
              </div>
            </li>
          ))}
        </ul>

        <aside className="h-fit rounded-2xl border border-border bg-card p-6 lg:sticky lg:top-28">
          <p className="font-display text-xl">Price details</p>

          <form
            className="mt-5 flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              const result = applyCoupon(code, subtotal);
              if (!result.ok) {
                toast.error(result.reason);
                return;
              }
              setCoupon(result.coupon.code);
              setCode("");
              toast.success(`${result.coupon.code} applied — you saved ${inr(result.discount)}`);
            }}
          >
            <Input
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              placeholder="Coupon code"
              className="h-10 rounded-full"
            />
            <Button type="submit" variant="outline" className="h-10 shrink-0 rounded-full">
              Apply
            </Button>
          </form>
          {couponCode ? (
            <div className="mt-2 flex items-center justify-between rounded-xl bg-surface px-3 py-2 text-xs">
              <span className="font-medium">{couponCode} applied</span>
              <button
                onClick={() => setCoupon(null)}
                className="text-muted-foreground transition-colors hover:text-destructive"
              >
                Remove
              </button>
            </div>
          ) : (
            <p className="mt-2 text-xs text-muted-foreground">Try FIRST10, MASALA200 or FESTIVE15.</p>
          )}

          <Separator className="my-5" />

          <dl className="space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Subtotal</dt>
              <dd>{inr(totals.subtotal)}</dd>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-primary">
                <dt>Discount ({couponCode})</dt>
                <dd>−{inr(totals.discount)}</dd>
              </div>
            )}
            <div className="flex justify-between">
              <dt className="text-muted-foreground">GST (5%)</dt>
              <dd>{inr(totals.gst)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Shipping</dt>
              <dd>{totals.shipping === 0 ? "Free" : inr(totals.shipping)}</dd>
            </div>
          </dl>

          <div className="mt-4">
            <FreeShippingMeter amount={totals.taxable} />
          </div>

          <Separator className="my-5" />

          <div className="flex items-center justify-between">
            <span className="font-display text-lg">Total</span>
            <span className="font-display text-lg">{inr(totals.total)}</span>
          </div>

          <Button asChild size="lg" className="mt-6 w-full rounded-full">
            <Link to="/checkout">Proceed to checkout</Link>
          </Button>
          <Button asChild variant="ghost" className="mt-2 w-full rounded-full">
            <Link to="/shop">Continue shopping</Link>
          </Button>
        </aside>
      </div>
    </div>
  );
}
