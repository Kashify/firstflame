import { mockPaymentProvider } from "./mock-provider";
import type { PaymentProvider } from "./types";

/**
 * Single swap point for the payment gateway.
 * Replace `mockPaymentProvider` with `razorpayProvider` when the account
 * is live — every call site already speaks the `PaymentProvider` interface.
 */
export function getPaymentProvider(): PaymentProvider {
  return mockPaymentProvider;
}

export * from "./types";
