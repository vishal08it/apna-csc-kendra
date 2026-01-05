"use client";

import { useState } from "react";

/* ================= MAIN PAGE ================= */

export default function PanCardPage() {
  const [type, setType] = useState<"new" | "correction">("new");

  return (
    <section className="min-h-screen bg-gray-900 text-white px-4 py-10">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-3xl font-bold text-center mb-2">
          PAN Card Application
        </h1>
        <p className="text-center text-green-400 mb-6">पैन कार्ड आवेदन</p>

        <div className="flex justify-center gap-6 mb-10">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="panType"
              checked={type === "new"}
              onChange={() => setType("new")}
            />
            New PAN Card
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="panType"
              checked={type === "correction"}
              onChange={() => setType("correction")}
            />
            Correction PAN Card
          </label>
        </div>

        {type === "new" ? <NewPanForm /> : <CorrectionPanForm />}
      </div>
    </section>
  );
}

/* ================= NEW PAN ================= */

function NewPanForm() {
  return (
    <form className="space-y-8">

      <Section title="Applicant Name">
        <ThreeInput a="First Name" b="Middle Name" c="Last Name" />
      </Section>

      <Section title="Personal Details">
        <Input type="date" label="Date of Birth" />
        <Input label="Email ID*" />
        <Input label="Mobile Number*" />
        <Input label="Aadhaar Number" />
        <Input label="Name on Aadhaar Card" />
        <Select label="Gender" options={["Male", "Female"]} />
      </Section>

      <Section title="Father's Name">
        <ThreeInput a="First Name" b="Middle Name" c="Last Name" />
      </Section>

      <Section title="Mother's Name">
        <ThreeInput a="First Name" b="Middle Name" c="Last Name" />
      </Section>

      <Section title="Name to be printed on PAN">
        <RadioGroup name="panPrint" options={["Father", "Mother"]} />
      </Section>

      <IncomeSourceSection />
      <AddressSection />

      <Section title="Representative Assessee">
        <RadioGroup name="representative" options={["Yes", "No"]} />
      </Section>

      <DocumentsWithUpload />
      <UploadPhotoSign />

      <FeeSection amount={250} />
      <Note />
      <SubmitButton />
    </form>
  );
}

/* ================= CORRECTION PAN ================= */

function CorrectionPanForm() {
  return (
    <form className="space-y-8">

      <Section title="Applicant Name">
        <ThreeInput a="First Name" b="Middle Name" c="Last Name" />
      </Section>

      <Section title="Personal Details">
        <Input type="date" label="Date of Birth" />
        <Input label="Email ID*" />
        <Input label="Mobile Number*" />
        <RadioGroup name="citizen" label="Citizen of India" options={["Yes", "No"]} />
        <Input label="PAN Number*" />
        <Input label="Aadhaar Number" />
        <Input label="Name on Aadhaar Card" />
        <Select label="Gender" options={["Male", "Female"]} />
      </Section>

      <Section title="Father's Name">
        <ThreeInput a="First Name" b="Middle Name" c="Last Name" />
      </Section>

      <Section title="Mother's Name">
        <ThreeInput a="First Name" b="Middle Name" c="Last Name" />
      </Section>

      <Section title="Name to be printed on PAN">
        <RadioGroup name="panPrintCorrection" options={["Father", "Mother"]} />
      </Section>

      <AddressSection />
      <DocumentsWithUpload />
      <UploadPhotoSign />

      <FeeSection amount={200} />
      <Note />
      <SubmitButton />
    </form>
  );
}

/* ================= DOCUMENT SECTION ================= */

function DocumentUpload({ label }: any) {
  const [selected, setSelected] = useState("");
  const [preview, setPreview] = useState<string | null>(null);

  return (
    <div className="grid md:grid-cols-2 gap-4 col-span-2 items-center">
      <div>
        <select
          className="w-full p-3 rounded bg-gray-900 border border-gray-600"
          value={selected}
          onChange={(e) => {
            setSelected(e.target.value);
            setPreview(null);
          }}
        >
          <option value="">{label}</option>
          <option>Aadhaar</option>
          <option>Voter ID</option>
          <option>Passport</option>
          <option>Driving Licence</option>
        </select>

        {selected && (
          <input
            type="file"
            accept=".jpg,.jpeg,.png"
            className="mt-3 w-full p-2 bg-gray-900 border border-gray-600 rounded"
            onChange={(e) =>
              e.target.files &&
              setPreview(URL.createObjectURL(e.target.files[0]))
            }
          />
        )}
      </div>

      {preview && (
        <img
          src={preview}
          className="w-40 h-28 object-cover border border-gray-600 rounded justify-self-end"
        />
      )}
    </div>
  );
}

function DocumentsWithUpload() {
  return (
    <Section title="Documents">
      <DocumentUpload label="Proof of Identity" />
      <DocumentUpload label="Address Proof" />
      <DocumentUpload label="Date of Birth Proof" />
    </Section>
  );
}

/* ================= PHOTO & SIGN ================= */

function UploadPhotoSign() {
  const [photo, setPhoto] = useState<string | null>(null);
  const [sign, setSign] = useState<string | null>(null);

  return (
    <Section title="Upload Documents">
      <UploadBox label="Photo (JPG max 50KB)" preview={photo} setPreview={setPhoto} />
      <UploadBox label="Signature(Hindi or English) (JPG max 50KB)" preview={sign} setPreview={setSign} />
    </Section>
  );
}

function UploadBox({ label, preview, setPreview }: any) {
  return (
    <div className="grid md:grid-cols-2 gap-4 col-span-2 items-center">
      <div>
        <p className="text-sm font-medium mb-1">{label}</p>
        <input
          type="file"
          accept=".jpg,.jpeg"
          className="w-full p-2 bg-gray-900 border border-gray-600 rounded"
          onChange={(e) =>
            e.target.files &&
            setPreview(URL.createObjectURL(e.target.files[0]))
          }
        />
      </div>

      {preview && (
        <img
          src={preview}
          className="w-32 h-32 object-cover border rounded justify-self-end"
        />
      )}
    </div>
  );
}

/* ================= REUSABLE ================= */

function Section({ title, children }: any) {
  return (
    <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
      <h2 className="text-lg font-bold mb-4">{title}</h2>
      <div className="grid md:grid-cols-2 gap-4">{children}</div>
    </div>
  );
}

function Input({ label, type = "text" }: any) {
  return (
    <input
      type={type}
      placeholder={label}
      className="w-full p-3 rounded bg-gray-900 border border-gray-600"
    />
  );
}

function Select({ label, options }: any) {
  return (
    <select className="w-full p-3 rounded bg-gray-900 border border-gray-600">
      <option value="">{label}</option>
      {options.map((o: string) => (
        <option key={o}>{o}</option>
      ))}
    </select>
  );
}

function ThreeInput({ a, b, c }: any) {
  return (
    <>
      <Input label={a} />
      <Input label={b} />
      <Input label={c} />
    </>
  );
}

/* ✅ FIXED RADIO GROUP */
function RadioGroup({ options, label, name }: any) {
  const [value, setValue] = useState("");

  return (
    <div className="flex flex-wrap gap-6 col-span-2">
      {label && <p className="w-full font-semibold">{label}</p>}

      {options.map((o: string) => (
        <label key={o} className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name={name}
            checked={value === o}
            onChange={() => setValue(o)}
          />
          {o}
        </label>
      ))}
    </div>
  );
}

/* ✅ SINGLE SELECT CHECKBOX LOGIC */
function IncomeSourceSection() {
  const [value, setValue] = useState("");

  const options = [
    "Salary",
    "Business / Profession",
    "House Property",
    "Capital Gains",
    "Other Sources",
    "No Income",
  ];

  return (
    <Section title="Source of Income">
      <div className="grid grid-cols-2 gap-4 col-span-2">
        {options.map((o) => (
          <label key={o} className="flex gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={value === o}
              onChange={() => setValue(o)}
            />
            {o}
          </label>
        ))}
      </div>
    </Section>
  );
}

function AddressSection() {
  return (
    <Section title="Full Address for Communication">
      <RadioGroup name="addressType" options={["Residence", "Office"]} />
      <Input label="Full Address" />
      <Input label="PIN Code" />
    </Section>
  );
}

function FeeSection({ amount }: any) {
  return (
    <div className="text-center text-xl font-bold text-green-400">
      Fee: ₹{amount}
    </div>
  );
}

function Note() {
  return (
    <p className="text-yellow-400 text-center text-sm">
      * Aadhaar OTP required during application
    </p>
  );
}

function SubmitButton() {
  return (
    <div className="text-center">
      <button className="px-8 py-3 bg-green-600 rounded-lg font-bold hover:bg-green-700">
        Submit Application
      </button>
    </div>
  );
}
