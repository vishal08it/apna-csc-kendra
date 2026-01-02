"use client";

import { useState } from "react";

/* ---------- UI Helpers ---------- */
const Section = ({ title, children }: any) => (
  <section className="space-y-4">
    <h2 className="text-lg font-semibold text-green-400 border-b border-gray-700 pb-2">
      {title}
    </h2>
    {children}
  </section>
);

const Input = ({ label, required = false, ...props }: any) => (
  <div>
    <label className="block text-sm mb-1">
      {label} {required && <span className="text-red-400">*</span>}
    </label>
    <input
      {...props}
      required={required}
      className="w-full px-3 py-2 rounded-md bg-black/40 border border-gray-700
                 focus:outline-none focus:border-green-500"
    />
  </div>
);

/* ---------- PAGE ---------- */
export default function DMDomicilePage() {
  const [applicationType, setApplicationType] = useState("normal");
  const [sdoPdf, setSdoPdf] = useState<string | null>(null);
  const [docs, setDocs] = useState<File[]>([]);

  const fee = applicationType === "tatkal" ? 80 : 40;

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">

      {/* HEADER */}
      <div className="max-w-5xl mx-auto px-4 py-6 text-center">
        <h1 className="text-2xl font-bold">
          Domicile Certificate Application (DM Level)
        </h1>
        <p className="text-sm text-gray-400">
          निवास प्रमाण पत्र आवेदन – डीएम स्तर
        </p>
      </div>

      {/* FORM */}
      <form className="max-w-5xl mx-auto px-4 pb-16 space-y-10">

        {/* APPLICATION TYPE */}
        <Section title="Application Type / आवेदन प्रकार">
          <div className="flex gap-6">
            {["normal", "tatkal"].map((type) => (
              <label key={type} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="applicationType"
                  checked={applicationType === type}
                  onChange={() => setApplicationType(type)}
                />
                {type === "normal"
                  ? "Normal (सामान्य)"
                  : "Tatkal (तत्काल)"}
              </label>
            ))}
          </div>
        </Section>

        {/* BASIC DETAILS */}
        <Section title="Applicant Details / आवेदक विवरण">
          <Input label="Name / नाम" required />
          <Input label="Mobile Number / मोबाइल नंबर" required />
          <Input label="Email ID / ईमेल आईडी" type="email" required />
        </Section>

        {/* SDO CERTIFICATE UPLOAD */}
        <Section title="SDO Certificate Upload / एसडीओ प्रमाण पत्र अपलोड">
          <label className="block text-sm mb-2">
            Certificate issued from SDO Level (PDF only)
            <span className="text-red-400"> *</span>
            <br />
            <span className="text-xs text-gray-400">
              एसडीओ स्तर से जारी निवास प्रमाण पत्र (केवल PDF)
            </span>
          </label>

          <label className="border-2 border-dashed border-gray-600
                            rounded-lg p-6 flex flex-col items-center
                            cursor-pointer hover:border-green-500 transition">
            <span className="text-4xl">📄</span>
            <p className="mt-2">Upload SDO Certificate PDF</p>

            {sdoPdf && (
              <p className="text-green-400 text-sm mt-2">
                Selected: {sdoPdf}
              </p>
            )}

            <input
              type="file"
              hidden
              required
              accept="application/pdf"
              onChange={(e) =>
                setSdoPdf(e.target.files?.[0]?.name || null)
              }
            />
          </label>
        </Section>

        {/* SUPPORTING DOCUMENTS */}
        <Section title="Supporting Documents / सहायक दस्तावेज">
          <label className="block text-sm mb-2">
            Upload Aadhaar / Voter ID / Bank Passbook / Electricity Bill (JPG only)
            <span className="text-red-400"> *</span>
            <br />
            <span className="text-xs text-gray-400">
              आधार / वोटर आईडी / बैंक पासबुक / बिजली बिल (केवल JPG)
            </span>
          </label>

          <label className="border-2 border-dashed border-gray-600
                            rounded-lg p-6 flex flex-col items-center
                            cursor-pointer hover:border-green-500 transition">
            <span className="text-4xl">🪪</span>
            <p className="mt-2">Upload Supporting Documents</p>

            <input
              type="file"
              hidden
              multiple
              required
              accept="image/jpeg"
              onChange={(e) =>
                setDocs(Array.from(e.target.files || []))
              }
            />
          </label>

          {/* PREVIEW */}
          {docs.length > 0 && (
            <ul className="mt-3 text-sm text-green-400 list-disc list-inside">
              {docs.map((file, i) => (
                <li key={i}>{file.name}</li>
              ))}
            </ul>
          )}
        </Section>

        {/* FEE */}
        <Section title="Application Fee / आवेदन शुल्क">
          <p className="text-lg">
            Fee Payable:{" "}
            <span className="text-green-400 font-bold">₹ {fee}</span>
          </p>
          <p className="text-sm text-gray-400">
            Normal – ₹40 | Tatkal – ₹80
          </p>
        </Section>

        {/* SUBMIT */}
        <div className="text-center pt-6">
          <button
            type="submit"
            className="px-10 py-3 bg-green-600 hover:bg-green-700
                       rounded-lg font-semibold transition"
          >
            Submit Application / आवेदन सबमिट करें
          </button>
        </div>

      </form>
    </div>
  );
}
