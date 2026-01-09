"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function PaymentClient() {
  const search = useSearchParams();
  const router = useRouter();

  const draftId = search.get("draftId");

  const [fee, setFee] = useState<number>(0);
  const [txnId, setTxnId] = useState("");

  useEffect(() => {
    if (!draftId) return;

    fetch(`/api/pan/get?draftId=${draftId}`)
      .then(res => res.json())
      .then(data => setFee(data.fee))
      .catch(() => alert("Failed to load fee"));
  }, [draftId]);

  async function submitPayment() {
    if (txnId.length !== 12) {
      alert("Enter valid 12 digit TXN ID");
      return;
    }

    const res = await fetch("/api/pan/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ draftId, txnId }),
    });

    if (!res.ok) {
      alert("Payment save failed");
      return;
    }

    alert("Payment Successful");
    router.push("/");
  }

  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=upi://pay?pa=${process.env.NEXT_PUBLIC_UPI}&am=${fee}`;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-gray-900 text-white">
      <h1 className="text-2xl font-bold">Pay ₹{fee}</h1>

      {/* SAFE IMAGE */}
      <img
        src={qrUrl}
        alt="UPI QR"
        width={300}
        height={300}
        className="rounded bg-white p-2"
      />

      <input
        value={txnId}
        maxLength={12}
        inputMode="numeric"
        onChange={(e) => setTxnId(e.target.value.replace(/\D/g, ""))}
        placeholder="Enter 12 Digit TXN ID"
        className="p-3 text-center text-xl tracking-widest rounded bg-gray-800 border border-gray-600"
      />

      <button
        onClick={submitPayment}
        className="px-8 py-3 bg-green-600 rounded font-bold hover:bg-green-700"
      >
        Confirm Payment
      </button>
    </div>
  );
}
