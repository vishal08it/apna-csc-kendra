import { Suspense } from "react";
import PaymentClient from "../payment/payment-client";

export default function PaymentPage() {
  return (
    <Suspense fallback={<div className="text-center p-10">Loading payment...</div>}>
      <PaymentClient />
    </Suspense>
  );
}
