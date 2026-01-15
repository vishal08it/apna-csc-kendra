"use client";

import { useState } from "react";

type Props = {
  open: boolean;
  fee: number;
  onClose: () => void;
  onConfirm: (txnId: string) => void;
};

export default function PaymentModal({
  open,
  fee,
  onClose,
  onConfirm,
}: Props) {
  const [txnId, setTxnId] = useState("");

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-white text-black rounded-xl p-6 w-full max-w-md">

        {/* TITLE */}
        <h2 className="text-xl font-bold text-center mb-2">
          Pay ₹{fee}
        </h2>

        <p className="text-center text-sm mb-4">
          Scan QR Code & complete payment
        </p>

        {/* QR IMAGE FROM PUBLIC FOLDER */}
        <div className="flex justify-center mb-4">
          <img
            src="/qrcod.jpeg"   
            alt="UPI QR Code"
            className="w-64 h-64 object-contain border"
          />
        </div>

        {/* TXN INPUT */}
        <input
          type="text"
          maxLength={12}
          placeholder="Enter 12 digit Transaction ID"
          value={txnId}
          onChange={(e) => setTxnId(e.target.value)}
          className="w-full p-3 border rounded mb-4"
        />

        {/* BUTTONS */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="w-1/2 py-2 border rounded"
          >
            Cancel
          </button>

          <button
            disabled={txnId.length !== 12}
            onClick={() => onConfirm(txnId)}
            className="w-1/2 py-2 bg-green-600 text-white rounded disabled:opacity-50"
          >
            Payment Done
          </button>
        </div>

      </div>
    </div>
  );
}
