"use client";

import { useState } from "react";

export default function OBCNCLDMApplicationForm() {
  const [applicationType, setApplicationType] =
    useState<"normal" | "tatkal">("normal");

  const [sdoCertPdf, setSdoCertPdf] = useState<string | null>(null);
  const [documentPdf, setDocumentPdf] = useState<string | null>(null);

  const fee = applicationType === "normal" ? 150 : 300;

  return (
    <section className="min-h-screen bg-gray-900 text-white px-4 py-10">

      {/* TITLE */}
      <div className="max-w-4xl mx-auto mb-8 text-center">
        <h1 className="text-2xl md:text-3xl font-bold">
          OBC-NCL(Central) Certificate Application
        </h1>
        <p className="text-green-400 font-semibold mt-1">
          (अन्य पिछड़ा वर्ग – नॉन क्रीमी लेयर | DM स्तर)
        </p>
      </div>

      {/* FORM */}
      <form className="max-w-4xl mx-auto space-y-10">

        {/* APPLICATION TYPE */}
        <section className="space-y-4">
          <h2 className="section-title">
            Application Type / आवेदन प्रकार
          </h2>

          <div className="flex gap-4">
            <RadioCard
              checked={applicationType === "normal"}
              onChange={() => setApplicationType("normal")}
              title="Normal / सामान्य"
              fee="₹150"
            />

            <RadioCard
              checked={applicationType === "tatkal"}
              onChange={() => setApplicationType("tatkal")}
              title="Tatkal / तत्काल"
              fee="₹300"
            />
          </div>
        </section>

        {/* BASIC DETAILS */}
        <section className="space-y-5">
          <h2 className="section-title">
            Applicant Details / आवेदक विवरण
          </h2>

          <Input label="Name / नाम *" required />
          <Input label="Mobile Number / मोबाइल नंबर *" required />
          <Input label="Email ID / ईमेल आईडी *" required />
        </section>

        {/* SDO CERTIFICATE DETAILS */}
        <section className="space-y-6">
          <h2 className="section-title">
            SDO Certificate Details / एसडीओ प्रमाण-पत्र विवरण
          </h2>

          <Input
            label="Certificate No. (Issued from SDO Level) / एसडीओ प्रमाण-पत्र संख्या *"
            required
          />

          <UploadField
            label="Upload SDO Level Certificate (PDF Only) / एसडीओ प्रमाण-पत्र अपलोड *"
            preview={sdoCertPdf}
            onChange={setSdoCertPdf}
            accept="application/pdf"
          />

          <UploadField
            label="Document Upload / दस्तावेज़ अपलोड *"
            preview={documentPdf}
            onChange={setDocumentPdf}
            accept=".pdf,.jpg,.jpeg"
          />
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

        {/* SUBMIT */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 py-4 rounded-xl
                     font-semibold text-lg transition"
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

function RadioCard({ checked, onChange, title, fee }: any) {
  return (
    <label className="radio-card">
      <input type="radio" checked={checked} onChange={onChange} />
      <div>
        <p className="font-semibold">{title}</p>
        <p className="text-sm text-gray-400">{fee}</p>
      </div>
    </label>
  );
}

function UploadField({ label, preview, onChange, accept }: any) {
  return (
    <div className="space-y-2">
      <label className="form-label font-semibold">{label}</label>

      <label className="upload-box-full cursor-pointer">
        {!preview ? (
          <p className="text-gray-400 text-sm">
            Click to upload file
          </p>
        ) : (
          <p className="text-green-400 font-semibold">
            ✔ File Selected
          </p>
        )}

        <input
          type="file"
          hidden
          required
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
    </div>
  );
}
