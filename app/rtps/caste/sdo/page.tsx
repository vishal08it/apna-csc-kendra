"use client";

import { useState } from "react";

/* ---------- REUSABLE COMPONENTS ---------- */

function Section({ title, children }: any) {
  return (
    <div className="space-y-4 border border-gray-700 rounded-lg p-6">
      <h2 className="font-semibold text-lg">{title}</h2>
      {children}
    </div>
  );
}

function Input({ label, type = "text", required = false }: any) {
  return (
    <div>
      <label className="block text-sm mb-1">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      <input
        type={type}
        required={required}
        className="w-full p-3 rounded bg-gray-800 border border-gray-600"
      />
    </div>
  );
}

function Radio({ value, onChange, options }: any) {
  return (
    <div className="flex gap-6">
      {options.map((opt: any) => (
        <label key={opt.value} className="flex items-center gap-2">
          <input
            type="radio"
            checked={value === opt.value}
            onChange={() => onChange(opt.value)}
          />
          {opt.label}
        </label>
      ))}
    </div>
  );
}

function Select({ label, value, onChange, options }: any) {
  return (
    <div>
      <label className="block text-sm mb-1">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-3 rounded bg-gray-800 border border-gray-600"
      >
        <option value="">Select</option>
        {options.map((o: string) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}

function UploadBox({
  title,
  subtitle,
  accept,
  required,
  onChange,
}: any) {
  return (
    <div className="border border-dashed border-gray-500 p-4 rounded">
      <p className="font-medium">{title}</p>
      <p className="text-xs text-gray-400 mb-2">{subtitle}</p>
      <input
        type="file"
        accept={accept}
        required={required}
        onChange={(e) =>
          onChange(URL.createObjectURL(e.target.files?.[0]!))
        }
      />
    </div>
  );
}

/* ---------- MAIN PAGE ---------- */

export default function CasteSDOPage() {
  const [type, setType] = useState("normal");
  const [gender, setGender] = useState("");
  const [status, setStatus] = useState("");

  const fee = type === "tatkal" ? 80 : 40;
  const isFemaleMarried = gender === "Female" && status === "married";

  return (
    <section className="min-h-screen bg-gray-900 text-white px-4 py-10">
      <div className="max-w-5xl mx-auto space-y-8">

        <h1 className="text-2xl font-bold text-center">
          Caste Certificate (SDO Level)
        </h1>

        <form className="space-y-6">

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

          <Section title="Applicant Details / आवेदक विवरण">
            <Input label="Name / नाम" required />
            <Input label="Mobile Number / मोबाइल नंबर" required />
            <Input label="Email ID / ईमेल आईडी" type="email" required />
            <Select
              label="Gender / लिंग"
              value={gender}
              onChange={setGender}
              options={["Male", "Female"]}
            />
            <Radio
              value={status}
              onChange={setStatus}
              options={[
                { label: "Married / विवाहित", value: "married" },
                { label: "Unmarried / अविवाहित", value: "unmarried" },
              ]}
            />
          </Section>

          <Section title="Documents / दस्तावेज़">
            <Input label="Certificate No. issued from RO Level" required />

            <UploadBox
              title="RO Level Caste Certificate (PDF)"
              subtitle="केवल PDF फ़ाइल"
              accept="application/pdf"
              required
            />

            <UploadBox
              title={
                isFemaleMarried
                  ? "Applicant ID Proof + Father/Mother/Brother ID Proof"
                  : "Applicant ID Proof"
              }
              subtitle="Aadhar / Voter / Bank Passbook (JPG)"
              accept=".jpg,.jpeg"
              required
            />
          </Section>

          <div className="text-center">
            <p className="text-gray-400">Application Fee</p>
            <p className="text-2xl text-green-400 font-bold">₹ {fee}</p>
          </div>

          <button className="w-full bg-green-600 py-3 rounded-lg font-semibold">
            Submit Application
          </button>

        </form>
      </div>
    </section>
  );
}
