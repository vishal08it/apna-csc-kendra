"use client";

import { useState } from "react";

/* ================= COMMON COMPONENTS ================= */

function Section({ title, children }: any) {
  return (
    <div className="border border-gray-700 rounded-lg p-6 space-y-4">
      <h2 className="text-lg font-semibold">{title}</h2>
      {children}
    </div>
  );
}

function Input({ label, type = "text", required = false }: any) {
  return (
    <div>
      <label className="block text-sm mb-1">
        {label} {required && <span className="text-red-500">*</span>}
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
    <div className="flex flex-wrap gap-6">
      {options.map((o: any) => (
        <label key={o.value} className="flex items-center gap-2">
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

function UploadBox({ title, subtitle, accept, required }: any) {
  return (
    <div className="border border-dashed border-gray-500 rounded-lg p-4">
      <p className="font-medium">{title}</p>
      <p className="text-xs text-gray-400 mb-2">{subtitle}</p>
      <input type="file" accept={accept} required={required} />
    </div>
  );
}

/* ================= PAGE ================= */

export default function CasteDMPage() {
  const [type, setType] = useState("normal");
  const [gender, setGender] = useState("");
  const [status, setStatus] = useState("");

  const isFemaleMarried = gender === "Female" && status === "married";
  const fee = type === "tatkal" ? 80 : 40;

  return (
    <section className="min-h-screen bg-gray-900 text-white px-4 py-10">
      <div className="max-w-5xl mx-auto space-y-8">

        <h1 className="text-2xl font-bold text-center">
          Caste Certificate Application (DM Level)
        </h1>
        <p className="text-center text-gray-400 text-sm">
          जाति प्रमाण पत्र आवेदन – डीएम स्तर
        </p>

        <form className="space-y-6">

          {/* Application Type */}
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

          {/* Applicant */}
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

          {/* Certificate */}
          <Section title="SDO Certificate Details / एसडीओ प्रमाण पत्र">
            <Input
              label="Certificate No. issued from SDO Level"
              required
            />

            <UploadBox
              title="Upload SDO Level Caste Certificate"
              subtitle="केवल PDF फ़ाइल"
              accept="application/pdf"
              required
            />
          </Section>

          {/* Documents */}
          <Section title="Supporting Documents / सहायक दस्तावेज़">
            <UploadBox
              title={
                isFemaleMarried
                  ? "Applicant ID + Father/Mother/Brother ID Proof"
                  : "Applicant ID Proof"
              }
              subtitle="Aadhar / Voter ID / Bank Passbook / Electricity Bill (JPG)"
              accept=".jpg,.jpeg"
              required
            />
          </Section>

          {/* Fee */}
          <div className="border-t border-gray-700 pt-4 text-center">
            <p className="text-gray-400 text-sm">Application Fee</p>
            <p className="text-2xl font-bold text-green-400">₹ {fee}</p>
          </div>

          <button className="w-full bg-green-600 hover:bg-green-700 py-3 rounded-lg font-semibold">
            Submit Application
          </button>

        </form>
      </div>
    </section>
  );
}
