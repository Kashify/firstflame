import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { inr } from "@/lib/format";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/order/$id")({
  validateSearch: (search: Record<string, unknown>) => ({
    status: search["status"] === "failed" ? ("failed" as const) : ("success" as const),
  }),
  head: () => ({
    meta: [
      { title: "Order Status | First flame Spices" },
      { name: "description", content: "Your First flame Spices order status." },
      { property: "og:title", content: "Order Status | First flame Spices" },
      { property: "og:description", content: "Your order status." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: OrderStatus,
});

function OrderStatus() {
  const { id } = Route.useParams();
  const { status } = Route.useSearch();
  const { orders } = useStore();
  const order = orders.find((o) => o.id === id);

  return (
    <div className="container-page py-20">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-xl rounded-3xl border border-border bg-card p-8 text-center"
      >
        {status === "success" ? (
          <>
            <CheckCircle2 className="mx-auto h-14 w-14 text-primary" />
            <h1 className="mt-5 font-display text-3xl">Order confirmed</h1>
            <p className="mt-3 text-sm text-muted-foreground">
              Thank you. We've started packing. You'll get an email and SMS with tracking as soon as
              your parcel leaves Jaipur.
            </p>
          </>
        ) : (
          <>
            <XCircle className="mx-auto h-14 w-14 text-destructive" />
            <h1 className="mt-5 font-display text-3xl">Payment failed</h1>
            <p className="mt-3 text-sm text-muted-foreground">
              Your bank declined the transaction and no amount was deducted. Your bag is still
              saved — you can try a different method.
            </p>
          </>
        )}

        <p className="mt-5 rounded-xl bg-surface px-4 py-3 font-mono text-xs">Reference: {id}</p>

        {order && (
          <div className="mt-6 space-y-2 text-left text-sm">
            {order.lines.map((l) => (
              <div key={`${l.name}-${l.weight}`} className="flex justify-between gap-3">
                <span className="min-w-0 truncate text-muted-foreground">
                  {l.name} · {l.weight} × {l.qty}
                </span>
                <span className="shrink-0">{inr(l.price)}</span>
              </div>
            ))}
            <div className="flex justify-between border-t border-border pt-2 font-display text-base">
              <span>Total paid</span>
              <span>{inr(order.total)}</span>
            </div>
          </div>
        )}

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {status === "success" ? (
            <>
              <Button asChild className="rounded-full px-7">
                <Link to="/account">View my orders</Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full px-7">
                <Link to="/shop">Keep shopping</Link>
              </Button>
            </>
          ) : (
            <>
              <Button asChild className="rounded-full px-7">
                <Link to="/checkout">Retry payment</Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full px-7">
                <Link to="/cart">Back to bag</Link>
              </Button>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}
