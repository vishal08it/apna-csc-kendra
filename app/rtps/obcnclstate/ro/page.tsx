"use client";

import { useState } from "react";

export default function OBCNCLROApplyForm() {
  const [applyType, setApplyType] = useState<"normal" | "tatkal">("normal");
  const [oldCert, setOldCert] = useState("");
  const [gender, setGender] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");

  const [formXI, setFormXI] = useState<string | null>(null);
  const [formIV, setFormIV] = useState<string | null>(null);
  const [idProof, setIdProof] = useState<string | null>(null);

  const fee = applyType === "normal" ? 150 : 300;

  return (
    <section className="min-h-screen bg-gray-900 text-white px-4 py-10">

      {/* TITLE */}
      <div className="max-w-5xl mx-auto mb-4 text-center">
        <h1 className="text-2xl md:text-3xl font-bold">
          OBC-NCL Certificate Application
        </h1>
        <p className="text-green-400 font-semibold mt-1">
          (अन्य पिछड़ा वर्ग – नॉन क्रीमी लेयर | RO स्तर)
        </p>
      </div>

      {/* DOWNLOAD */}
      <div className="max-w-5xl mx-auto text-center mb-8">
        <a
          href="/Form_XI.pdf"
          download
          className="inline-block bg-green-600 hover:bg-green-700 px-6 py-2 rounded-lg font-semibold"
        >
          📄 Download Form-XI / शपथ पत्र
        </a>
      </div>

      <form className="max-w-5xl mx-auto space-y-10">

        {/* APPLICATION TYPE */}
        <section className="space-y-4">
          <h2 className="section-title">Application Type / आवेदन प्रकार</h2>
          <div className="flex gap-4">
            <RadioCard
              checked={applyType === "normal"}
              onChange={() => setApplyType("normal")}
              title="Normal / सामान्य"
              fee="₹150"
            />
            <RadioCard
              checked={applyType === "tatkal"}
              onChange={() => setApplyType("tatkal")}
              title="Tatkal / तत्काल"
              fee="₹300"
            />
          </div>
        </section>

        {/* OLD CERT */}
        <section>
          <h2 className="section-title">
            Do you have old issued certificate? / क्या पहले से प्रमाण-पत्र है
          </h2>
          <Select
            value={oldCert}
            onChange={setOldCert}
            options={["Yes / हाँ", "No / नहीं"]}
          />
        </section>

        {/* BASIC DETAILS */}
        <section className="space-y-5">
          <h2 className="section-title">Basic Details / मूल विवरण</h2>

          <Input label="Applicant Name / आवेदक का नाम *" required />

          <Input
            label="Date of Birth / जन्म तिथि *"
            type="date"
            required
          />

          <Select
            label="Gender / लिंग *"
            value={gender}
            onChange={setGender}
            options={["Male / पुरुष", "Female / महिला"]}
          />

          <Select
            label="Marital Status / वैवाहिक स्थिति *"
            value={maritalStatus}
            onChange={setMaritalStatus}
            options={["Unmarried / अविवाहित", "Married / विवाहित"]}
          />

          <Input label="Father’s Name / पिता का नाम *" required />
          <Input label="Mother’s Name / माता का नाम *" required />

          {maritalStatus === "Married / विवाहित" && (
            <Input label="Husband’s Name / पति का नाम *" required />
          )}
        </section>

        {/* ADDRESS */}
        <section className="space-y-5">
          <h2 className="section-title">Residential Address / निवास पता</h2>
          <Textarea label="Permanent Address / स्थायी पता *" required />
          <Textarea label="Temporary Address / अस्थायी पता *" required />
        </section>

        {/* CASTE & PROFESSION */}
        <section className="space-y-5">
          <h2 className="section-title">Caste & Profession</h2>

          <Input label="Caste / जाति *" required />

          <Select
            label="Profession / पेशा *"
            options={[
              "Student / छात्र",
              "Govt Service / सरकारी सेवा",
              "Private Service / निजी सेवा",
              "Business / व्यवसाय",
              "Farmer / किसान",
              "Housewife / गृहिणी",
            ]}
          />
        </section>

        {/* CONTACT */}
        <section className="space-y-5">
          <h2 className="section-title">Contact Details / संपर्क विवरण</h2>
          <Input label="Mobile Number / मोबाइल नंबर *" required />
          <Input label="Email ID / ईमेल आईडी *" required />
        </section>

        {/* DOCUMENT UPLOAD */}
        <section className="space-y-8">
          <h2 className="section-title">Document Upload / दस्तावेज़ अपलोड</h2>

          <DocumentField
            label="Form-XI – Applicant Self Affidavit / शपथ पत्र *"
            preview={formXI}
            onChange={setFormXI}
          />

          <DocumentField
            label="Form-IV – Caste Certificate / जाति प्रमाण-पत्र *"
            preview={formIV}
            onChange={setFormIV}
          />

          <DocumentField
            label="ID Proof – Aadhar / Voter / Bank / Electricity Bill *"
            preview={idProof}
            onChange={setIdProof}
          />
        </section>

        {/* FEE */}
        <section className="bg-black/60 border border-gray-700 rounded-xl p-5 text-center">
          <p className="text-sm text-gray-400">Application Fee / आवेदन शुल्क</p>
          <p className="text-3xl font-bold text-green-400">₹{fee}</p>
        </section>

        {/* SUBMIT */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 py-4 rounded-xl font-semibold"
        >
          Submit Application / आवेदन जमा करें
        </button>
      </form>
    </section>
  );
}

/* ================= COMPONENTS ================= */

function Input({ label, required, type = "text" }: any) {
  return (
    <div>
      <label className="form-label">{label}</label>
      <input type={type} required={required} className="form-input" />
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
      {label && <label className="form-label">{label}</label>}
      <select
        className="form-input"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        required
      >
        <option value="">Select / चुनें</option>
        {options.map((o: string) => (
          <option key={o}>{o}</option>
        ))}
      </select>
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

function DocumentField({ label, preview, onChange }: any) {
  return (
    <div className="space-y-2">
      <label className="form-label font-semibold">{label}</label>
      <label className="upload-box-full cursor-pointer">
        {!preview ? (
          <p className="text-gray-400 text-sm">
            Click to upload (PDF / JPG)
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
          accept=".pdf,.jpg,.jpeg"
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
