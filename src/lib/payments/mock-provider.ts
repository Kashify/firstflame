import type {
  CheckoutOptions,
  CreateOrderInput,
  PaymentOrder,
  PaymentProvider,
  PaymentResult,
} from "./types";

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Mock provider used until the Razorpay account is live.
 * Mirrors the Razorpay flow exactly: create order -> open checkout ->
 * verify signature. Failure is simulated for the reserved test UPI id.
 */
export const mockPaymentProvider: PaymentProvider = {
  id: "mock",
  displayName: "Secure Payments (Test Mode)",
  supportedMethods: ["upi", "card", "netbanking", "wallet", "emi", "cod"],

  async createOrder(input: CreateOrderInput): Promise<PaymentOrder> {
    await wait(450);
    const suffix = Math.floor(Math.random() * 1_000_000)
      .toString(36)
      .padStart(6, "0");
    return {
      orderId: `order_mock_${Date.now().toString(36)}${suffix}`,
      amountInPaise: input.amountInPaise,
      currency: input.currency,
      provider: "mock",
      createdAt: new Date().toISOString(),
    };
  },

  async openCheckout({ order, method }: CheckoutOptions): Promise<PaymentResult> {
    await wait(1400);
    if (method === "cod") {
      return { status: "success", orderId: order.orderId, method, paymentId: "cod_pending" };
    }
    // Deterministic simulated failure so the failure UI is reachable in test mode.
    const shouldFail = order.amountInPaise % 7 === 3;
    if (shouldFail) {
      return {
        status: "failed",
        orderId: order.orderId,
        method,
        errorCode: "PAYMENT_DECLINED",
        errorMessage: "Your bank declined the transaction. No amount was deducted.",
      };
    }
    return {
      status: "success",
      orderId: order.orderId,
      method,
      paymentId: `pay_mock_${Date.now().toString(36)}`,
      signature: `sig_mock_${order.orderId.slice(-8)}`,
    };
  },

  async verifyPayment(result: PaymentResult): Promise<boolean> {
    await wait(300);
    return result.status === "success";
  },
};
