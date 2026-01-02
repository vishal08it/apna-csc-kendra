"use client";

import { useState } from "react";

export default function ROApplyForm() {
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [docPreview, setDocPreview] = useState<string | null>(null);
  const [applyType, setApplyType] = useState<"normal" | "tatkal">("normal");

  // NEW STATES (ONLY ADDITION)
  const [photoAttested, setPhotoAttested] = useState(false);
  const [docAttested, setDocAttested] = useState(false);

  const fee = applyType === "normal" ? 40 : 80;

  // FORM VALIDATION
  const isFormValid =
    photoPreview && docPreview && photoAttested && docAttested;

  return (
    <section className="min-h-screen bg-gray-900 text-white px-4 py-10">

      {/* PAGE TITLE */}
      <div className="max-w-5xl mx-auto mb-8 text-center">
        <h1 className="text-2xl md:text-3xl font-bold">
          Domicile Certificate Application
        </h1>
        <p className="text-green-400 font-semibold mt-1">
          (आरओ स्तर – RO Level)
        </p>
        <p className="text-gray-400 text-sm mt-2">
          कृपया सभी आवश्यक विवरण सावधानीपूर्वक भरें
        </p>
      </div>

      {/* FORM */}
      <form className="max-w-5xl mx-auto space-y-10">

        {/* APPLY TYPE */}
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

        {/* CONTACT DETAILS */}
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

        {/* PHOTO UPLOAD */}
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

          {/* CONFIRMATION — ONLY ADDITION */}
          {photoPreview && (
            <div className="text-center mt-2">
              <label
                className={`inline-flex items-center gap-2 font-bold text-sm
                  ${photoAttested ? "text-green-400" : "text-red-400"}`}
              >
                <input
                  type="checkbox"
                  checked={photoAttested}
                  onChange={(e) => setPhotoAttested(e.target.checked)}
                />
                I confirm the photo is self attested
              </label>

              {!photoAttested && (
                <p className="text-xs text-red-400 animate-pulse mt-1">
                  ❌ Signature on Photo required
                </p>
              )}
            </div>
          )}
        </section>

        {/* DOCUMENT UPLOAD */}
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

          {/* CONFIRMATION — ONLY ADDITION */}
          {docPreview && (
            <div className="text-center mt-2">
              <label
                className={`inline-flex items-center gap-2 font-bold text-sm
                  ${docAttested ? "text-green-400" : "text-red-400"}`}
              >
                <input
                  type="checkbox"
                  checked={docAttested}
                  onChange={(e) => setDocAttested(e.target.checked)}
                />
                I confirm the document is self attested
              </label>

              {!docAttested && (
                <p className="text-xs text-red-400 animate-pulse mt-1">
                  ❌ Signature on Document required
                </p>
              )}
            </div>
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
          <p className="text-3xl font-bold text-green-400 mt-1">
            ₹{fee}
          </p>
        </section>

        {/* SUBMIT */}
        <button
          type="submit"
          disabled={!isFormValid}
          className={`w-full py-4 rounded-xl font-semibold text-lg transition
            ${
              isFormValid
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-600 cursor-not-allowed opacity-60"
            }`}
        >
          Submit Application / आवेदन जमा करें
        </button>

      </form>
    </section>
  );
}

/* ================= SMALL COMPONENTS ================= */

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
      <select className="form-input">
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
