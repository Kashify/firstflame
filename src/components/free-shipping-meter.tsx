import { Truck } from "lucide-react";
import { FREE_SHIPPING_THRESHOLD, inr } from "@/lib/format";

export function FreeShippingMeter({ amount }: { amount: number }) {
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - amount);
  const pct = Math.min(100, Math.round((amount / FREE_SHIPPING_THRESHOLD) * 100));

  return (
    <div className="rounded-xl bg-surface p-3">
      <p className="flex items-center gap-2 text-xs text-muted-foreground">
        <Truck className="h-3.5 w-3.5 shrink-0 text-primary" />
        {remaining === 0 ? (
          <span className="text-foreground">You've unlocked free shipping.</span>
        ) : (
          <span>
            Add <span className="font-semibold text-foreground">{inr(remaining)}</span> more for
            free shipping.
          </span>
        )}
      </p>
      <div
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Progress to free shipping"
        className="mt-2 h-1.5 overflow-hidden rounded-full bg-border"
      >
        <div
          className="h-full rounded-full bg-primary transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
