"use client";

import { useState } from "react";

export default function NewVoterIdApply() {
  const [gender, setGender] = useState("");
  const [relativeType, setRelativeType] = useState("Father");

  return (
    <section className="min-h-screen bg-gray-900 text-white px-4 py-10">

      {/* TITLE */}
      <div className="max-w-5xl mx-auto mb-4 text-center">
        <h1 className="text-2xl md:text-3xl font-bold">
          New Voter ID/Correction Application
        </h1>
        <p className="text-green-400 font-semibold mt-1">
          (नया मतदाता पहचान पत्र / सुधार आवेदन – प्रपत्र 6)
        </p>
      </div>

      <form className="max-w-5xl mx-auto space-y-10">

        {/* A. LOCATION */}
        <section className="space-y-5">
          <h2 className="section-title">Constituency Details</h2>
          <Input label="State *" required />
          <Input label="District *" required />
          <Input label="Assembly Constituency No & Name *" required />
        </section>

        {/* B. PERSONAL DETAILS */}
        <section className="space-y-5">
          <h2 className="section-title">Personal Details</h2>
          <Input label="First Name *" required />
          <Input label="Surname" />

          <FileUpload label="Upload Photograph (Passport Size, White Background, max size 2MB JPG/PNG/PDF) *" />
        </section>

        {/* C. RELATIVE DETAILS */}
        <section className="space-y-5">
          <h2 className="section-title">Relative Details</h2>
          <Select
            label="Relation Type *"
            value={relativeType}
            onChange={setRelativeType}
            options={["Father", "Mother", "Husband", "Wife", "Guardian"]}
          />
          <Input label={`${relativeType}'s Name *`} required />
        </section>

        {/* D. CONTACT */}
        <section className="space-y-5">
          <h2 className="section-title">Contact Details</h2>
          <Input label="Mobile Number *" required />
          <Input label="Email ID" />
        </section>

        {/* E. AADHAAR */}
        <section className="space-y-5">
          <h2 className="section-title">Aadhaar Details</h2>
          <Input label="Aadhaar Number" />
        </section>

        {/* F. GENDER */}
        <section className="space-y-5">
          <h2 className="section-title">Gender</h2>
          <Select
            label="Select Gender *"
            value={gender}
            onChange={setGender}
            options={["Male", "Female", "Third Gender"]}
          />
        </section>

        {/* G. DOB */}
        <section className="space-y-5">
          <h2 className="section-title">Date of Birth</h2>
          <Input type="date" label="Date of Birth *" required />
          <FileUpload label="Age Proof Document (Self Attested) *" />
        </section>

        {/* H. ADDRESS */}
        <section className="space-y-5">
          <h2 className="section-title">Present Address</h2>
          <Textarea label="House / Street / Locality *" required />
          <Input label="Village / Town *" required />
          <Input label="Post Office *" required />
          <Input label="PIN Code *" required />
          <Input label="Tehsil / Block *" required />
          <Input label="District *" required />
          <Input label="State *" defaultValue="Bihar" />
          <FileUpload label="Address Proof (Self Attested) *" />
        </section>

        {/* K. DECLARATION */}
        <section className="space-y-5">
          <h2 className="section-title">Declaration</h2>
          <p className="text-sm text-gray-300">
            I declare that I am a citizen of India, above 18 years of age and
            information provided is true.
          </p>
          <FileUpload label="Upload Signature / Thumb Impression *" />
        </section>

        {/* ✅ FEE SECTION (ADDED) */}
        <section className="bg-black/60 border border-gray-700 rounded-xl p-5 text-center">
          <p className="text-sm text-gray-400">
            Application Fee / आवेदन शुल्क
          </p>
          <p className="text-3xl font-bold text-green-400 mt-1">
            ₹100
          </p>
        </section>

        {/* SUBMIT */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 py-4 rounded-xl font-semibold text-lg"
        >
          Submit Application
        </button>
      </form>
    </section>
  );
}

/* ================= COMPONENTS ================= */

function Input({ label, required, type = "text", defaultValue }: any) {
  return (
    <div>
      <label className="form-label">{label}</label>
      <input
        type={type}
        required={required}
        defaultValue={defaultValue}
        className="form-input"
      />
    </div>
  );
}

function Textarea({ label, required }: any) {
  return (
    <div>
      <label className="form-label">{label}</label>
      <textarea rows={3} required={required} className="form-input" />
    </div>
  );
}

function Select({ label, options, value, onChange }: any) {
  return (
    <div>
      <label className="form-label">{label}</label>
      <select
        className="form-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
      >
        <option value="">Select</option>
        {options.map((o: string) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}

function FileUpload({ label }: any) {
  return (
    <div className="space-y-2">
      <label className="form-label font-semibold">{label}</label>
      <label className="upload-box-full cursor-pointer">
        <p className="text-gray-400 text-sm">
          Click to upload (PDF / JPG / PNG)
        </p>
        <input
          type="file"
          hidden
          accept=".pdf,.jpg,.jpeg,.png"
          required
        />
      </label>
    </div>
  );
}
