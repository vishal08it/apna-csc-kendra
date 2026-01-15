import React from "react";

export default function ThankYouPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 text-green-400">
          🎉 Payment Successful!
        </h1>
        <p className="text-lg mb-8">
          Your PAN application has been submitted successfully.
        </p>

        {/* Centered Image */}
        <div className="flex justify-center">
          <img
            src="/logos.jpg"
            alt="Thank You"
            className="w-96 max-w-full rounded-xl shadow-lg border border-gray-700"
          />
        </div>

        <p className="mt-6 text-sm text-gray-400">
          Thank you for using Apna CSC. Please check your email for the PDF copy.
        </p>
      </div>
    </div>
  );
}
