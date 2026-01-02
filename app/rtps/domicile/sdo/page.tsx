"use client";

import { useState } from "react";

export default function DomicileSDOForm() {
  const [applicationType, setApplicationType] = useState<"normal" | "tatkal">(
    "normal"
  );
  const [roPdf, setRoPdf] = useState<string | null>(null);
  const [docFile, setDocFile] = useState<string | null>(null);

  const fee = applicationType === "tatkal" ? 80 : 40;

  return (
    <section className="min-h-screen bg-gray-900 text-white px-4 py-10">

      {/* TITLE */}
      <div className="max-w-4xl mx-auto text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold">
          Domicile Certificate Application – SDO Level
        </h1>
        <p className="text-green-400 font-semibold mt-1">
          (एसडीओ स्तर)
        </p>
        <p className="text-gray-400 text-sm mt-2">
          RO स्तर से जारी प्रमाण पत्र के आधार पर आवेदन करें
        </p>
      </div>

      {/* FORM */}
      <form className="max-w-4xl mx-auto space-y-8">

        {/* APPLICATION TYPE */}
        <Section title="Application Type / आवेदन प्रकार *">
          <RadioGroup
            value={applicationType}
            onChange={setApplicationType}
            options={[
              { label: "Normal / सामान्य", value: "normal" },
              { label: "Tatkal / तत्काल", value: "tatkal" },
            ]}
          />
        </Section>

        {/* BASIC DETAILS */}
        <Section title="Basic Details / मूल विवरण">
          <Input label="Name / नाम *" required />
          <Input label="Mobile Number / मोबाइल नंबर *" required />
          <Input label="Email ID / ईमेल आईडी *" required />
          <Input
            label="Certificate No. (Issued from RO Level) / आरओ द्वारा जारी प्रमाण पत्र संख्या *"
            required
          />
        </Section>

        {/* RO CERTIFICATE UPLOAD */}
        <Section title="RO Certificate Upload / आरओ प्रमाण पत्र अपलोड *">
          <UploadBox
            icon="📄"
            title="Upload RO Level Certificate (PDF Only)"
            subtitle="केवल PDF फाइल स्वीकार्य है"
            preview={roPdf}
            onChange={setRoPdf}
            accept="application/pdf"
          />
        </Section>

        {/* ADDITIONAL DOCUMENT */}
        <Section title="Additional Document Upload / अतिरिक्त दस्तावेज़ अपलोड *">
          <UploadBox
            icon="📄"
            title="Upload Document (PDF/JPG)"
            subtitle="केवल PDF या JPG • स्व-प्रमाणित"
            preview={docFile}
            onChange={setDocFile}
            accept=".pdf,.jpg,.jpeg"
          />
        </Section>

        {/* FEE */}
        <div className="bg-black/50 border border-gray-700 rounded-lg p-4 text-center">
          <p className="text-sm text-gray-400">Application Fee / आवेदन शुल्क</p>
          <p className="text-2xl font-bold text-green-400">₹{fee}</p>
        </div>

        {/* SUBMIT */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-semibold transition"
        >
          Submit Application / आवेदन जमा करें
        </button>
      </form>
    </section>
  );
}

/* ================= REUSABLE COMPONENTS ================= */

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

function Input({ label, required = false }: any) {
  return (
    <div>
      <label className="form-label">{label}</label>
      <input required={required} className="form-input" />
    </div>
  );
}

function RadioGroup({ options, value, onChange }: any) {
  return (
    <div className="flex gap-6 flex-wrap">
      {options.map((opt: any) => (
        <label
          key={opt.value}
          className="flex items-center gap-2 cursor-pointer"
        >
          <input
            type="radio"
            checked={value === opt.value}
            onChange={() => onChange(opt.value)}
          />
          <span>{opt.label}</span>
        </label>
      ))}
    </div>
  );
}

function UploadBox({ title, subtitle, preview, onChange, accept, icon }: any) {
  return (
    <label className="upload-box-full cursor-pointer">
      {!preview ? (
        <>
          <span className="text-5xl">{icon}</span>
          <p className="mt-2 font-medium text-center">{title}</p>
          <p className="text-xs text-gray-400 text-center">{subtitle}</p>
        </>
      ) : (
        <div className="text-center">
          <p className="text-green-400 font-semibold">
            File Selected: {preview}
          </p>
        </div>
      )}
      <input
        type="file"
        hidden
        required
        accept={accept}
        onChange={(e) =>
          onChange(e.target.files?.[0] ? e.target.files[0].name : null)
        }
      />
    </label>
  );
}
