export const inr = (value: number): string =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

export const GST_RATE = 0.05;
export const FREE_SHIPPING_THRESHOLD = 999;
export const SHIPPING_FLAT = 79;

export interface OrderTotals {
  subtotal: number;
  discount: number;
  taxable: number;
  gst: number;
  shipping: number;
  total: number;
}

export function computeTotals(subtotal: number, discount = 0): OrderTotals {
  const taxable = Math.max(0, subtotal - discount);
  const gst = Math.round(taxable * GST_RATE);
  const shipping = taxable === 0 || taxable >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FLAT;
  return {
    subtotal,
    discount,
    taxable,
    gst,
    shipping,
    total: taxable + gst + shipping,
  };
}

export function deliveryEstimate(pincode?: string): string {
  const base = new Date();
  const days = pincode && /^[1-9]\d{5}$/.test(pincode) ? 2 + (Number(pincode[0]) % 4) : 4;
  base.setDate(base.getDate() + days);
  return base.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" });
}
