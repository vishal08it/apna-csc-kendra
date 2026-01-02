"use client";

import { useState } from "react";

export default function IncomeROApplyForm() {
  const [applyType, setApplyType] = useState<"normal" | "tatkal">("normal");
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [docPreview, setDocPreview] = useState<string | null>(null);
  const [photoConfirmed, setPhotoConfirmed] = useState(false);
  const [docConfirmed, setDocConfirmed] = useState(false);
  const [profession, setProfession] = useState("");

  const fee = applyType === "normal" ? 40 : 80;
  const canSubmit =
    photoPreview && docPreview && photoConfirmed && docConfirmed;

  return (
    <section className="min-h-screen bg-gray-900 text-white px-4 py-10">

      {/* PAGE HEADER */}
      <div className="max-w-5xl mx-auto text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold">
          Income Certificate Application
        </h1>
        <p className="text-green-400 font-semibold mt-1">
          (आय प्रमाण पत्र – आरओ स्तर)
        </p>
        <p className="text-gray-400 text-sm mt-2">
          कृपया सभी विवरण सही-सही भरें
        </p>
      </div>

      {/* FORM */}
      <form className="max-w-5xl mx-auto space-y-10">

        {/* APPLICATION TYPE */}
        <section className="space-y-4">
          <h2 className="section-title">
            Application Type / आवेदन प्रकार
          </h2>

          <div className="flex flex-col sm:flex-row gap-4">
            <label className="radio-card">
              <input
                type="radio"
                checked={applyType === "normal"}
                onChange={() => setApplyType("normal")}
              />
              <div>
                <p className="font-semibold">Normal / सामान्य</p>
                <p className="text-sm text-gray-400">Fee ₹40</p>
              </div>
            </label>

            <label className="radio-card">
              <input
                type="radio"
                checked={applyType === "tatkal"}
                onChange={() => setApplyType("tatkal")}
              />
              <div>
                <p className="font-semibold text-yellow-400">
                  Tatkal / तत्काल
                </p>
                <p className="text-sm text-gray-400">Fee ₹80</p>
              </div>
            </label>
          </div>
        </section>

        {/* BASIC DETAILS */}
        <section className="space-y-5">
          <h2 className="section-title">Basic Details / मूल विवरण</h2>

          <Input label="Name / नाम *" required />

          <div className="grid md:grid-cols-2 gap-4">
            <Input label="Father Name / पिता का नाम *" required />
            <Input label="Mother Name / माता का नाम *" required />
          </div>

          <Input label="Husband Name / पति का नाम" />
        </section>

        {/* CONTACT */}
        <section className="space-y-5">
          <h2 className="section-title">Contact Details / संपर्क विवरण</h2>

          <div className="grid md:grid-cols-2 gap-4">
            <Input label="Mobile Number / मोबाइल नंबर *" required />
            <Select label="Gender / लिंग *" />
          </div>

          <Input label="Email ID / ईमेल आईडी *" required />
          <Input label="Police Station / थाना *" required />
          <Textarea label="Address / पता *" />
        </section>

        {/* PROFESSION & INCOME */}
        <section className="space-y-5">
          <h2 className="section-title">
            Profession & Income / पेशा एवं आय
          </h2>

          <div>
            <label className="form-label">Profession / पेशा *</label>
            <select
              className="form-input"
              required
              value={profession}
              onChange={(e) => setProfession(e.target.value)}
            >
              <option value="">Select / चुनें</option>
              <option value="student">Student / छात्र</option>
              <option value="govt">Govt Service / सरकारी सेवा</option>
              <option value="private">Private Service / निजी सेवा</option>
              <option value="business">Business / व्यवसाय</option>
              <option value="farmer">Farmer / किसान</option>
              <option value="housewife">Housewife / गृहिणी</option>
            </select>
          </div>

          {profession === "govt" && (
            <Input label="Income from Govt. Service / सरकारी सेवा से आय *" required />
          )}
          {profession === "private" && (
            <Input label="Income from Other Sources / अन्य स्रोतों से आय *" required />
          )}
          {profession === "farmer" && (
            <Input label="Income from Farmer / कृषि से आय *" required />
          )}
          {profession === "business" && (
            <Input label="Income from Business / व्यवसाय से आय *" required />
          )}
          {profession &&
            !["govt", "private", "farmer", "business"].includes(profession) && (
              <Input label="Other Income / अन्य आय *" required />
            )}
        </section>

        {/* PHOTO */}
        <section className="space-y-4">
          <h2 className="section-title">Photo Upload / फोटो अपलोड</h2>

          <UploadBox
            title="Color Photo (Self Attested)"
            subtitle="रंगीन फोटो (स्व-प्रमाणित)"
            preview={photoPreview}
            onChange={setPhotoPreview}
            accept="image/*"
            icon="📸"
          />

          {photoPreview && (
            <Confirmation
              checked={photoConfirmed}
              onChange={setPhotoConfirmed}
              text="I confirm the photo is self attested"
            />
          )}
        </section>

        {/* DOCUMENT */}
        <section className="space-y-4">
          <h2 className="section-title">Document Upload / दस्तावेज़ अपलोड</h2>

          <UploadBox
            title="Aadhar / Voter ID / Bank Passbook / Electricity Bill"
            subtitle="केवल JPG • स्व-प्रमाणित"
            preview={docPreview}
            onChange={setDocPreview}
            accept=".jpg,.jpeg"
            icon="📄"
          />

          {docPreview && (
            <Confirmation
              checked={docConfirmed}
              onChange={setDocConfirmed}
              text="I confirm the document is self attested"
            />
          )}
        </section>

        {/* PURPOSE */}
        <section>
          <Textarea label="Purpose of Application / आवेदन का उद्देश्य" />
        </section>

        {/* FEE */}
        <section className="bg-black/60 border border-gray-700 rounded-xl p-5 text-center">
          <p className="text-sm text-gray-400">
            Application Fee / आवेदन शुल्क
          </p>
          <p className="text-3xl font-bold text-green-400">
            ₹{fee}
          </p>
        </section>

        {/* WARNING */}
        {!canSubmit && (
          <p className="text-center text-red-500 font-semibold animate-pulse">
            ⚠ Please upload documents and confirm self-attestation
          </p>
        )}

        {/* SUBMIT */}
        <button
          type="submit"
          disabled={!canSubmit}
          className={`w-full py-4 rounded-xl font-semibold text-lg transition
            ${
              canSubmit
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-600 cursor-not-allowed"
            }`}
        >
          Submit Application / आवेदन जमा करें
        </button>
      </form>
    </section>
  );
}

/* ================= COMPONENTS ================= */

function Input({ label, required = false }: any) {
  return (
    <div>
      <label className="form-label">{label}</label>
      <input required={required} className="form-input" />
    </div>
  );
}

function Textarea({ label }: any) {
  return (
    <div>
      <label className="form-label">{label}</label>
      <textarea rows={3} className="form-input" />
    </div>
  );
}

function Select({ label }: any) {
  return (
    <div>
      <label className="form-label">{label}</label>
      <select className="form-input" required>
        <option value="">Select / चुनें</option>
        <option>Male / पुरुष</option>
        <option>Female / महिला</option>
      </select>
    </div>
  );
}

function UploadBox({ title, subtitle, preview, onChange, accept, icon }: any) {
  return (
    <label className="upload-box-full">
      {!preview ? (
        <>
          <span className="text-5xl">{icon}</span>
          <p className="mt-2 font-medium">{title}</p>
          <p className="text-xs text-gray-400">{subtitle}</p>
        </>
      ) : (
        <img
          src={preview}
          className="h-48 mx-auto rounded-xl border border-gray-600 object-contain"
        />
      )}
      <input
        type="file"
        hidden
        accept={accept}
        onChange={(e) =>
          onChange(
            e.target.files?.[0]
              ? URL.createObjectURL(e.target.files[0])
              : null
          )
        }
      />
    </label>
  );
}

function Confirmation({ checked, onChange, text }: any) {
  return (
    <label
      className={`flex justify-center items-center gap-3 font-bold text-sm mt-2
      ${checked ? "text-green-400" : "text-red-500 animate-pulse"}`}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="scale-110"
      />
      {text}
    </label>
  );
}
