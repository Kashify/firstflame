export interface Coupon {
  code: string;
  label: string;
  description: string;
  type: "percent" | "flat";
  value: number;
  minSubtotal: number;
  maxDiscount?: number;
}

export const coupons: Coupon[] = [
  {
    code: "FIRST10",
    label: "10% off your first order",
    description: "Valid on orders above ₹499. Maximum discount ₹300.",
    type: "percent",
    value: 10,
    minSubtotal: 499,
    maxDiscount: 300,
  },
  {
    code: "MASALA200",
    label: "₹200 off",
    description: "Flat ₹200 off on orders above ₹1,499.",
    type: "flat",
    value: 200,
    minSubtotal: 1499,
  },
  {
    code: "FESTIVE15",
    label: "15% festival offer",
    description: "Valid on orders above ₹2,499. Maximum discount ₹750.",
    type: "percent",
    value: 15,
    minSubtotal: 2499,
    maxDiscount: 750,
  },
];

export function applyCoupon(
  code: string,
  subtotal: number,
): { ok: true; coupon: Coupon; discount: number } | { ok: false; reason: string } {
  const coupon = coupons.find((c) => c.code.toLowerCase() === code.trim().toLowerCase());
  if (!coupon) return { ok: false, reason: "That coupon code isn't valid." };
  if (subtotal < coupon.minSubtotal)
    return {
      ok: false,
      reason: `Add ₹${(coupon.minSubtotal - subtotal).toLocaleString("en-IN")} more to use ${coupon.code}.`,
    };
  const raw = coupon.type === "flat" ? coupon.value : (subtotal * coupon.value) / 100;
  const discount = Math.round(Math.min(raw, coupon.maxDiscount ?? raw));
  return { ok: true, coupon, discount };
}
