import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Check, CreditCard, Loader2, Lock } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { computeTotals, deliveryEstimate, inr } from "@/lib/format";
import { useStore, type Address } from "@/lib/store";
import { getPaymentProvider, type PaymentMethod } from "@/lib/payments";

import logoImg from "@/assets/brand-logo.png";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Secure Checkout | First Flames Spices" },
      { name: "description", content: "Complete your First Flames Spices order securely." },
      { property: "og:title", content: "Secure Checkout | First Flames Spices" },
      { property: "og:description", content: "Complete your order securely." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Checkout,
});

const steps = ["Address", "Delivery", "Payment"] as const;

const methods: { id: PaymentMethod; label: string; hint: string }[] = [
  { id: "upi", label: "UPI", hint: "GPay, PhonePe, Paytm, any UPI app" },
  { id: "card", label: "Credit / Debit Card", hint: "Visa, Mastercard, RuPay, Amex" },
  { id: "netbanking", label: "Net Banking", hint: "All major Indian banks" },
  { id: "wallet", label: "Wallets", hint: "Paytm, Amazon Pay, Mobikwik" },
  { id: "emi", label: "EMI", hint: "3 / 6 / 9 month plans" },
  { id: "cod", label: "Cash on Delivery", hint: "₹49 handling fee applies" },
];

function Checkout() {
  const navigate = useNavigate();
  const { cartLines, subtotal, discount, couponCode, setCoupon, addresses, saveAddress, addOrder, clearCart } =
    useStore();
  const [step, setStep] = useState(0);
  const [method, setMethod] = useState<PaymentMethod>("upi");
  const [processing, setProcessing] = useState(false);
  const [billingSame, setBillingSame] = useState(true);
  const [form, setForm] = useState<Omit<Address, "id">>({
    label: "Home",
    name: "",
    phone: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    pincode: "",
  });

  const totals = computeTotals(subtotal, discount);

  if (cartLines.length === 0) {
    return (
      <div className="container-page py-24 text-center">
        <h1 className="font-display text-3xl">Nothing to check out</h1>
        <Button asChild className="mt-6 rounded-full px-8">
          <Link to="/shop">Browse the shop</Link>
        </Button>
      </div>
    );
  }

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const addressValid =
    form.name.trim().length > 2 &&
    /^[6-9]\d{9}$/.test(form.phone) &&
    form.line1.trim().length > 4 &&
    form.city.trim().length > 1 &&
    form.state.trim().length > 1 &&
    /^[1-9]\d{5}$/.test(form.pincode);

  const pay = async () => {
    setProcessing(true);
    const provider = getPaymentProvider();
    const address: Address = { ...form, id: `addr_${Date.now().toString(36)}` };
    try {
      const order = await provider.createOrder({
        amountInPaise: totals.total * 100,
        currency: "INR",
        receiptId: `rcpt_${Date.now().toString(36)}`,
        customer: { name: form.name, email: "guest@firstflames.in", phone: form.phone },
      });
      const result = await provider.openCheckout({
        order,
        method,
        customer: { name: form.name, email: "guest@firstflames.in", phone: form.phone },
      });

      if (result.status === "failed" || !(await provider.verifyPayment(result))) {
        toast.error(result.errorMessage ?? "Payment could not be verified.");
        navigate({ to: "/order/$id", params: { id: order.orderId }, search: { status: "failed" } });
        return;
      }

      saveAddress(address);
      addOrder({
        id: order.orderId,
        placedAt: new Date().toISOString(),
        lines: cartLines.map((l) => ({
          name: l.product.name,
          weight: l.weight,
          qty: l.qty,
          price: l.lineTotal,
        })),
        total: totals.total,
        status: "Confirmed",
        paymentId: result.paymentId ?? order.orderId,
        address,
      });

      try {
        const confetti = (await import("canvas-confetti")).default;
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: ["#D4AF37", "#C94A29", "#2E3430", "#FFD700"],
        });
      } catch (e) {
        // Fallback silently if confetti unsupported
      }

      clearCart();
      setCoupon(null);
      navigate({ to: "/order/$id", params: { id: order.orderId }, search: { status: "success" } });
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="container-page py-12 md:py-16">
      <div className="flex items-center gap-4 mb-2">
        <img src={logoImg} alt="FIRST FLAME" className="h-12 w-12 object-contain rounded-full border border-gold/40 shadow-soft" />
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold">FIRST FLAME Checkout</h1>
          <p className="text-xs text-muted-foreground">Har Vyanjan Mein, Shuddhata Ka Vaada!</p>
        </div>
      </div>

      <ol className="mt-6 flex flex-wrap items-center gap-3 text-sm">
        {steps.map((s, i) => (
          <li key={s} className="flex items-center gap-2">
            <span
              className={`grid h-7 w-7 place-items-center rounded-full text-xs font-semibold ${
                i <= step ? "bg-primary text-primary-foreground" : "bg-surface text-muted-foreground"
              }`}
            >
              {i < step ? <Check className="h-3.5 w-3.5" /> : i + 1}
            </span>
            <span className={i <= step ? "text-foreground" : "text-muted-foreground"}>{s}</span>
            {i < steps.length - 1 && <span className="mx-1 h-px w-8 bg-border" />}
          </li>
        ))}
      </ol>

      <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px]">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="min-w-0 rounded-2xl border border-border bg-card p-6"
        >
          {step === 0 && (
            <div className="space-y-5">
              <p className="font-display text-xl">Shipping address</p>

              {addresses.length > 0 && (
                <div className="space-y-2">
                  <p className="eyebrow text-muted-foreground">Saved addresses</p>
                  {addresses.map((a) => (
                    <button
                      key={a.id}
                      onClick={() => setForm({ ...a })}
                      className="block w-full rounded-xl border border-border p-3 text-left text-sm transition-colors hover:bg-surface"
                    >
                      <span className="font-medium">{a.name}</span> · {a.line1}, {a.city} {a.pincode}
                    </button>
                  ))}
                </div>
              )}

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <Label htmlFor="name">Full name</Label>
                  <Input id="name" value={form.name} onChange={set("name")} className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    inputMode="numeric"
                    value={form.phone}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, phone: e.target.value.replace(/\D/g, "").slice(0, 10) }))
                    }
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="pincode">Pincode</Label>
                  <Input
                    id="pincode"
                    inputMode="numeric"
                    value={form.pincode}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        pincode: e.target.value.replace(/\D/g, "").slice(0, 6),
                      }))
                    }
                    className="mt-1.5"
                  />
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="line1">Address</Label>
                  <Input id="line1" value={form.line1} onChange={set("line1")} className="mt-1.5" />
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="line2">Landmark / delivery instructions (optional)</Label>
                  <Input id="line2" value={form.line2} onChange={set("line2")} className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input id="city" value={form.city} onChange={set("city")} className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="state">State</Label>
                  <Input id="state" value={form.state} onChange={set("state")} className="mt-1.5" />
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Checkbox
                  id="billing"
                  checked={billingSame}
                  onCheckedChange={(v) => setBillingSame(Boolean(v))}
                />
                <Label htmlFor="billing" className="text-sm font-normal">
                  Billing address is the same as shipping
                </Label>
              </div>

              <Button
                disabled={!addressValid}
                onClick={() => setStep(1)}
                size="lg"
                className="rounded-full px-8"
              >
                Continue to delivery
              </Button>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-5">
              <p className="font-display text-xl">Delivery</p>
              <RadioGroup defaultValue="standard" className="space-y-3">
                {[
                  { id: "standard", label: "Standard delivery", note: "Free above ₹999 · 3–5 days" },
                  { id: "express", label: "Express delivery", note: "₹149 · 1–2 days in metros" },
                ].map((o) => (
                  <label
                    key={o.id}
                    className="flex cursor-pointer items-start gap-3 rounded-xl border border-border p-4 transition-colors hover:bg-surface"
                  >
                    <RadioGroupItem value={o.id} className="mt-0.5" />
                    <span className="min-w-0">
                      <span className="block text-sm font-medium">{o.label}</span>
                      <span className="block text-xs text-muted-foreground">{o.note}</span>
                    </span>
                  </label>
                ))}
              </RadioGroup>
              <p className="text-sm text-muted-foreground">
                Estimated arrival: <span className="text-foreground">{deliveryEstimate(form.pincode)}</span>
              </p>
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep(0)} className="rounded-full px-6">
                  Back
                </Button>
                <Button onClick={() => setStep(2)} size="lg" className="rounded-full px-8">
                  Continue to payment
                </Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5">
              <p className="font-display text-xl">Payment method</p>
              <p className="flex items-center gap-2 rounded-xl bg-surface p-3 text-xs text-muted-foreground">
                <Lock className="h-3.5 w-3.5" /> Test mode — no real money moves. The gateway layer
                is ready for Razorpay.
              </p>
              <RadioGroup
                value={method}
                onValueChange={(v) => setMethod(v as PaymentMethod)}
                className="space-y-3"
              >
                {methods.map((m) => (
                  <label
                    key={m.id}
                    className="flex cursor-pointer items-start gap-3 rounded-xl border border-border p-4 transition-colors hover:bg-surface"
                  >
                    <RadioGroupItem value={m.id} className="mt-0.5" />
                    <span className="min-w-0">
                      <span className="block text-sm font-medium">{m.label}</span>
                      <span className="block text-xs text-muted-foreground">{m.hint}</span>
                    </span>
                  </label>
                ))}
              </RadioGroup>
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep(1)} className="rounded-full px-6">
                  Back
                </Button>
                <Button onClick={pay} disabled={processing} size="lg" className="rounded-full px-8">
                  {processing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing
                    </>
                  ) : (
                    <>
                      <CreditCard className="mr-2 h-4 w-4" /> Pay {inr(totals.total)}
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </motion.div>

        <aside className="h-fit rounded-2xl border border-border bg-card p-6 lg:sticky lg:top-28">
          <p className="font-display text-xl">Order summary</p>
          <ul className="mt-4 space-y-3">
            {cartLines.map((l) => (
              <li key={`${l.slug}-${l.weight}`} className="flex gap-3 text-sm">
                <img
                  src={l.product.images[0]}
                  alt=""
                  loading="lazy"
                  className="h-12 w-12 shrink-0 rounded-lg object-cover"
                />
                <span className="min-w-0 flex-1">
                  <span className="block truncate">{l.product.name}</span>
                  <span className="block text-xs text-muted-foreground">
                    {l.weight} × {l.qty}
                  </span>
                </span>
                <span className="shrink-0">{inr(l.lineTotal)}</span>
              </li>
            ))}
          </ul>
          <Separator className="my-5" />
          <dl className="space-y-3 text-sm">
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
              <dt className="text-muted-foreground">GST (5%)</dt>
              <dd>{inr(totals.gst)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Shipping</dt>
              <dd>{totals.shipping === 0 ? "Free" : inr(totals.shipping)}</dd>
            </div>
          </dl>
          <Separator className="my-5" />
          <div className="flex items-center justify-between font-display text-lg">
            <span>Total</span>
            <span>{inr(totals.total)}</span>
          </div>
        </aside>
      </div>
    </div>
  );
}
