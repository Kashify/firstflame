/**
 * Payment provider abstraction.
 *
 * The app never talks to a gateway directly — it calls `getPaymentProvider()`
 * and uses this interface. To move to Razorpay later, add
 * `razorpay-provider.ts` implementing `PaymentProvider` (createOrder ->
 * /orders API, openCheckout -> Razorpay checkout.js, verifyPayment ->
 * signature check on the server) and swap the export in `index.ts`.
 * No UI or checkout code needs to change.
 */

export type PaymentMethod = "upi" | "card" | "netbanking" | "wallet" | "emi" | "cod";

export interface PaymentCustomer {
  name: string;
  email: string;
  phone: string;
}

export interface CreateOrderInput {
  /** Amount in the smallest currency unit (paise). */
  amountInPaise: number;
  currency: "INR";
  receiptId: string;
  customer: PaymentCustomer;
  notes?: Record<string, string>;
}

export interface PaymentOrder {
  orderId: string;
  amountInPaise: number;
  currency: "INR";
  provider: string;
  createdAt: string;
}

export interface PaymentResult {
  status: "success" | "failed";
  orderId: string;
  paymentId?: string;
  signature?: string;
  method?: PaymentMethod;
  errorCode?: string;
  errorMessage?: string;
}

export interface CheckoutOptions {
  order: PaymentOrder;
  customer: PaymentCustomer;
  method: PaymentMethod;
}

export interface PaymentProvider {
  readonly id: string;
  readonly displayName: string;
  readonly supportedMethods: PaymentMethod[];
  createOrder(input: CreateOrderInput): Promise<PaymentOrder>;
  openCheckout(options: CheckoutOptions): Promise<PaymentResult>;
  verifyPayment(result: PaymentResult): Promise<boolean>;
}
