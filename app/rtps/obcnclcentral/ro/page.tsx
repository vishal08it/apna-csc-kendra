"use client";

import { useState } from "react";

export default function OBCNCLCentralROForm() {
  const [applyType, setApplyType] = useState<"normal" | "tatkal">("normal");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [categoryChoice, setCategoryChoice] = useState("");

  const [photo, setPhoto] = useState<string | null>(null);
  const [photoAttested, setPhotoAttested] = useState(false);

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
          (अन्य पिछड़ा वर्ग – नॉन क्रीमी लेयर | RO स्तर – Central)
        </p>
      </div>

      {/* DOWNLOAD */}
      <div className="max-w-5xl mx-auto text-center mb-8">
        <a
          href="/Form_VIII.pdf"
          download
          className="inline-block bg-green-600 hover:bg-green-700 px-6 py-2 rounded-lg font-semibold"
        >
          📄 Download Form-VIII / फॉर्म-VIII डाउनलोड करें
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

        {/* BASIC DETAILS */}
        <section className="space-y-5">
          <h2 className="section-title">Basic Details / मूल विवरण</h2>

          <Input label="Applicant Name / आवेदक का नाम *" required />
          <Input type="date" label="Date of Birth / जन्म तिथि *" required />

          <Select
            label="Gender / लिंग *"
            options={["Male / पुरुष", "Female / महिला"]}
          />

          <Select
            label="Marital Status / वैवाहिक स्थिति *"
            options={["Unmarried / अविवाहित", "Married / विवाहित"]}
            value={maritalStatus}
            onChange={setMaritalStatus}
          />

          <Input label="Father’s Name / पिता का नाम *" required />
          <Input label="Mother’s Name / माता का नाम *" required />

          {maritalStatus === "Married / विवाहित" && (
            <Input label="Husband’s Name / पति का नाम *" required />
          )}
        </section>

        {/* CONTACT */}
        <section className="space-y-5">
          <h2 className="section-title">Contact Details / संपर्क विवरण</h2>
          <Input label="Mobile Number / मोबाइल नंबर *" required />
          <Input label="Email ID / ईमेल आईडी *" required />
        </section>

        {/* ✅ CATEGORY RADIO — NOW AFTER EMAIL */}
        <section className="space-y-4">
          <h2 className="section-title">
            (क) एवं (ख) में से किसी एक को चुने | Choose any one *
          </h2>

          <label className="radio-card">
            <input
              type="radio"
              checked={categoryChoice === "a"}
              onChange={() => setCategoryChoice("a")}
              required
            />
            <p className="text-sm leading-relaxed">
              (क) केन्द्र हेतु अधिसूचित अन्य पिछड़ा वर्ग (OBC) एवं बिहार हेतु
              अधिसूचित अनुसूचित जाति, अनुसूचित जनजाति, पिछड़ा वर्ग तथा अत्यंत
              पिछड़ा वर्ग की सूची में सूचीबद्ध नहीं हैं।
            </p>
          </label>

          <label className="radio-card">
            <input
              type="radio"
              checked={categoryChoice === "b"}
              onChange={() => setCategoryChoice("b")}
            />
            <p className="text-sm leading-relaxed">
              (ख) बिहार हेतु अधिसूचित अनुसूचित जाति, अनुसूचित जनजाति की सूची में
              सूचीबद्ध नहीं हैं, जबकि पिछड़ा वर्ग एवं अत्यंत पिछड़ा वर्ग की सूची
              में सूचीबद्ध हैं, परन्तु केन्द्र सरकार द्वारा बिहार हेतु OBC की
              सूची में सूचीबद्ध नहीं हैं।
            </p>
          </label>
        </section>

        {/* PHOTO */}
        <section className="space-y-4">
          <h2 className="section-title">Photo Upload / फोटो अपलोड</h2>

          <UploadBox
            label="Upload Photo (Self Attested) *"
            preview={photo}
            onChange={setPhoto}
            accept="image/*"
          />

          {photo && (
            <div className="text-center">
              <label className="inline-flex items-center gap-2 font-bold text-green-400">
                <input
                  type="checkbox"
                  checked={photoAttested}
                  onChange={(e) => setPhotoAttested(e.target.checked)}
                  required
                />
                I confirm the photo is self attested
              </label>
            </div>
          )}
        </section>

        {/* DOCUMENTS */}
        <section className="space-y-6">
          <h2 className="section-title">Document Upload / दस्तावेज़ अपलोड</h2>

          <UploadBox
            label="Form-IV – Caste Certificate *"
            preview={formIV}
            onChange={setFormIV}
          />

          <UploadBox
            label="ID Proof – Aadhaar / Voter / Bank / Electricity Bill *"
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
          className="w-full bg-blue-600 hover:bg-blue-700 py-4 rounded-xl font-semibold text-lg"
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

function Select({ label, options, value, onChange }: any) {
  return (
    <div>
      <label className="form-label">{label}</label>
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

function UploadBox({ label, preview, onChange, accept = ".pdf,.jpg,.jpeg" }: any) {
  return (
    <div className="space-y-2">
      <label className="form-label font-semibold">{label}</label>
      <label className="upload-box-full cursor-pointer">
        {!preview ? (
          <p className="text-gray-400 text-sm">Click to upload</p>
        ) : (
          <p className="text-green-400 font-semibold">✔ File Selected</p>
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
