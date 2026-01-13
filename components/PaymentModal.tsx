"use client";
import { useState } from "react";

export default function PaymentModal({
  open,
  onClose,
  onConfirm,
  fee,
}: any) {
  const [txnId, setTxnId] = useState("");

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md text-black">
        <h2 className="text-xl font-bold text-center mb-2">
          Pay ₹{fee}
        </h2>

        <div className="flex justify-center mb-4">
          <img
            src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=upi://pay?pa=${process.env.NEXT_PUBLIC_UPI}&am=${fee}`}
          />
        </div>

        <input
          type="text"
          maxLength={12}
          placeholder="Enter 12 digit Transaction ID"
          value={txnId}
          onChange={(e) => setTxnId(e.target.value)}
          className="w-full border p-3 rounded mb-4"
        />

        <div className="flex gap-3">
          <button onClick={onClose} className="w-1/2 border py-2 rounded">
            Cancel
          </button>
          <button
            disabled={txnId.length !== 12}
            onClick={() => onConfirm(txnId)}
            className="w-1/2 bg-green-600 text-white py-2 rounded disabled:opacity-50"
          >
            Payment Done
          </button>
        </div>
      </div>
    </div>
  );
}
