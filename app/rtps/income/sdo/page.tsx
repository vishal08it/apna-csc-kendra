"use client";

import { useState } from "react";

export default function IncomeSDOPage() {
  const [type, setType] = useState<"normal" | "tatkal">("normal");
  const [roPdf, setRoPdf] = useState<string | null>(null);
  const [docJpg, setDocJpg] = useState<string | null>(null);

  const fee = type === "tatkal" ? 80 : 40;

  return (
    <section className="min-h-screen bg-gray-900 text-white px-4 py-10">
      {/* TITLE */}
      <div className="max-w-5xl mx-auto text-center mb-8">
        <h1 className="text-2xl font-bold">
          Income Certificate Application (SDO Level)
        </h1>
        <p className="text-gray-400 text-sm">
          आय प्रमाण पत्र आवेदन – एसडीओ स्तर
        </p>
      </div>

      <form className="max-w-5xl mx-auto space-y-8">

        {/* APPLICATION TYPE */}
        <Section title="Application Type / आवेदन प्रकार">
          <Radio
            value={type}
            onChange={setType}
            options={[
              { label: "Normal / सामान्य", value: "normal" },
              { label: "Tatkal / तत्काल", value: "tatkal" },
            ]}
          />
        </Section>

        {/* BASIC DETAILS */}
        <Section title="Applicant Details / आवेदक विवरण">
          <Input label="Name / नाम" required />
          <Input label="Mobile Number / मोबाइल नंबर" required />
          <Input label="Email ID / ईमेल आईडी" type="email" required />
        </Section>

        {/* RO CERTIFICATE */}
        <Section title="RO Certificate Details / आरओ प्रमाण पत्र">
          <Input
            label="Certificate No. issued from RO Level / आरओ प्रमाण पत्र संख्या"
            required
          />

          <UploadBox
            title="Upload RO Level Income Certificate (PDF)"
            subtitle="केवल PDF फ़ाइल"
            accept="application/pdf"
            required
            preview={roPdf}
            onChange={setRoPdf}
          />
        </Section>

        {/* SUPPORTING DOCUMENT */}
        <Section title="Supporting Document / सहायक दस्तावेज़">
          <UploadBox
            title="Aadhar / Voter ID / Bank Passbook / Electricity Bill"
            subtitle="केवल JPG • स्व-प्रमाणित"
            accept=".jpg,.jpeg"
            required
            preview={docJpg}
            onChange={setDocJpg}
          />
        </Section>

        {/* FEE */}
        <div className="border-t border-gray-700 pt-4 text-center">
          <p className="text-sm text-gray-400">Application Fee</p>
          <p className="text-2xl font-bold text-green-400">₹ {fee}</p>
        </div>

        <button className="w-full bg-green-600 hover:bg-green-700 py-3 rounded-lg">
          Submit Application
        </button>
      </form>
    </section>
  );
}

/* ================= COMPONENTS ================= */

function Section({ title, children }: any) {
  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold border-b border-gray-700 pb-1">
        {title}
      </h2>
      {children}
    </section>
  );
}

function Input({ label, required, ...props }: any) {
  return (
    <div>
      <label className="form-label">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      <input {...props} required={required} className="form-input" />
    </div>
  );
}

function Radio({ options, value, onChange }: any) {
  return (
    <div className="flex gap-6">
      {options.map((o: any) => (
        <label key={o.value} className="flex gap-2 cursor-pointer">
          <input
            type="radio"
            checked={value === o.value}
            onChange={() => onChange(o.value)}
          />
          {o.label}
        </label>
      ))}
    </div>
  );
}

function UploadBox({ title, subtitle, accept, required, preview, onChange }: any) {
  return (
    <label className="upload-box-full">
      {!preview ? (
        <>
          <span className="text-4xl">📄</span>
          <p className="font-medium">{title}</p>
          <p className="text-xs text-gray-400">{subtitle}</p>
        </>
      ) : (
        <p className="text-green-400">{preview}</p>
      )}
      <input
        type="file"
        hidden
        accept={accept}
        required={required}
        onChange={(e) =>
          onChange(e.target.files?.[0]?.name || null)
        }
      />
    </label>
  );
}
