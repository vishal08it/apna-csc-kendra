"use client";

import { useState } from "react";

export default function CasteROApplyForm() {
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [docPreview, setDocPreview] = useState<string | null>(null);
  const [applicationType, setApplicationType] = useState<"normal" | "tatkal">("normal");
  const [gender, setGender] = useState("");
  const [status, setStatus] = useState("");
  const fee = applicationType === "tatkal" ? 80 : 40;

  return (
    <section className="min-h-screen bg-gray-900 text-white px-4 py-10">
      {/* TITLE */}
      <div className="max-w-5xl mx-auto text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold">
          Caste Certificate Application
        </h1>
        <p className="text-green-400 font-semibold mt-1">
          (जाति प्रमाण पत्र – आरओ स्तर)
        </p>
        <p className="text-gray-400 text-sm mt-2">
          सभी आवश्यक विवरण सावधानीपूर्वक भरें
        </p>
      </div>

      {/* FORM */}
      <form className="max-w-5xl mx-auto space-y-8">

        {/* APPLICATION TYPE */}
        <Section title="Application Type / आवेदन प्रकार">
          <RadioGroup
            value={applicationType}
            onChange={setApplicationType}
            options={[
              { label: "Normal / सामान्य", value: "normal" },
              { label: "Tatkal / तत्काल", value: "tatkal" },
            ]}
          />
        </Section>

        {/* STATUS */}
        <Section title="Marital Status / वैवाहिक स्थिति">
          <RadioGroup
            value={status}
            onChange={setStatus}
            options={[
              { label: "Married / विवाहित", value: "married" },
              { label: "Unmarried / अविवाहित", value: "unmarried" },
            ]}
          />
        </Section>

        {/* BASIC DETAILS */}
        <Section title="Basic Details / मूल विवरण">
          <Input label="Name / नाम *" required />
          <div className="grid md:grid-cols-2 gap-4">
            <Input label="Father Name / पिता का नाम *" required />
            <Input label="Mother Name / माता का नाम *" required />
          </div>
          <Input label="Husband Name / पति का नाम" />
        </Section>

        {/* CONTACT */}
        <Section title="Contact Details / संपर्क विवरण">
          <div className="grid md:grid-cols-2 gap-4">
            <Input label="Mobile Number / मोबाइल नंबर *" required />
            <Select
              label="Gender / लिंग *"
              value={gender}
              onChange={setGender}
              options={["Male / पुरुष", "Female / महिला"]}
            />
          </div>

          <Input label="Email ID / ईमेल आईडी *" required />
          <Input label="Police Station / थाना *" required />

          {/* ADDRESS LOGIC */}
          {gender.includes("Female") && status === "married" ? (
            <>
              <Textarea label="Permanent Address (Father/Mother/Brother) / स्थायी पता *" />
              <Textarea label="Present Address / वर्तमान पता *" />
            </>
          ) : (
            <Textarea label="Address / पता *" />
          )}
        </Section>

        {/* PROFESSION */}
        <Section title="Profession / व्यवसाय">
          <Select
            label="Profession / व्यवसाय *"
            options={[
              "Student / छात्र",
              "Govt Service / सरकारी सेवा",
              "Private Service / निजी सेवा",
              "Business / व्यवसाय",
              "Farmer / किसान",
              "Housewife / गृहिणी",
            ]}
          />
        </Section>

        {/* CASTE */}
        <Section title="Caste Details / जाति विवरण">
          <Input label="Caste / जाति *" required />
        </Section>

        {/* PHOTO */}
        <Section title="Photo Upload / फोटो अपलोड">
          <UploadBox
            icon="📸"
            title="Color Photo (Self Attested)"
            subtitle="रंगीन फोटो (स्व-प्रमाणित)"
            preview={photoPreview}
            onChange={setPhotoPreview}
            accept="image/*"
          />
        </Section>

        {/* DOCUMENT */}
        <Section title="Document Upload / दस्तावेज़ अपलोड">
          <UploadBox
            icon="📄"
            title={
              gender.includes("Female") && status === "married"
                ? "Applicant + Father/Mother/Brother Aadhar"
                : "Aadhar / Voter ID / Bank Passbook / Electricity Bill"
            }
            subtitle="केवल JPG • स्व-प्रमाणित"
            preview={docPreview}
            onChange={setDocPreview}
            accept=".jpg,.jpeg"
          />
        </Section>

        {/* PURPOSE */}
        <Section title="Purpose of Application / आवेदन का उद्देश्य">
          <Textarea label="Purpose / उद्देश्य" />
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

/* =================== REUSABLE COMPONENTS =================== */

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

function Textarea({ label }: any) {
  return (
    <div>
      <label className="form-label">{label}</label>
      <textarea rows={3} className="form-input" />
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
        onChange={(e) => onChange?.(e.target.value)}
      >
        <option value="">Select / चुनें</option>
        {options.map((o: string) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}

function RadioGroup({ options, value, onChange }: any) {
  return (
    <div className="flex gap-6 flex-wrap">
      {options.map((opt: any) => (
        <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
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
    <label className="upload-box-full">
      {!preview ? (
        <>
          <span className="text-5xl">{icon}</span>
          <p className="mt-2 font-medium text-center">{title}</p>
          <p className="text-xs text-gray-400 text-center">{subtitle}</p>
        </>
      ) : (
        <img src={preview} className="h-48 rounded border border-gray-600 mx-auto" />
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
  );
}
