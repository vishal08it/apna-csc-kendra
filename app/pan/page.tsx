"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); // 🚫 STOP REFRESH

    const formData = new FormData(e.currentTarget);
    formData.append("panType", "new");
    formData.append("fee", "250");

    const res = await fetch("/api/pan/submit?draft=true", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (res.ok) {
      router.push(`/payment?draftId=${data.id}`);
    } else {
      alert("Server error");
    }
  }

  return (
    <form className="space-y-8" onSubmit={handleSubmit}>

      <Section title="Applicant Name">
        <ThreeInput a="First Name" b="Middle Name" c="Last Name" prefix="applicant" />
      </Section>

      <Section title="Personal Details">
        <Input type="date" label="Date of Birth" name="dob" />
        <Input label="Email ID*" name="email" />
        <Input label="Mobile Number*" name="mobile" />
        <Input label="Aadhaar Number" name="aadhaar" />
        <Input label="Name on Aadhaar Card" name="aadhaarName" />
        <Select label="Gender" name="gender" options={["Male", "Female"]} />
      </Section>

      <Section title="Father's Name">
        <ThreeInput a="First Name" b="Middle Name" c="Last Name" prefix="father" />
      </Section>

      <Section title="Mother's Name">
        <ThreeInput a="First Name" b="Middle Name" c="Last Name" prefix="mother" />
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
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    formData.append("panType", "correction");
    formData.append("fee", "200");

    const res = await fetch("/api/pan/submit?draft=true", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (res.ok) {
      router.push(`/payment?draftId=${data.id}`);
    } else {
      alert("Server error");
    }
  }

  return (
    <form className="space-y-8" onSubmit={handleSubmit}>

      <Section title="Applicant Name">
        <ThreeInput a="First Name" b="Middle Name" c="Last Name" prefix="applicant" />
      </Section>

      <Section title="Personal Details">
        <Input type="date" label="Date of Birth" name="dob" />
        <Input label="Email ID*" name="email" />
        <Input label="Mobile Number*" name="mobile" />
        <Input label="PAN Number*" name="panNumber" />
        <Input label="Aadhaar Number" name="aadhaar" />
        <Input label="Name on Aadhaar Card" name="aadhaarName" />
        <Select label="Gender" name="gender" options={["Male", "Female"]} />
      </Section>

      <Section title="Father's Name">
        <ThreeInput a="First Name" b="Middle Name" c="Last Name" prefix="father" />
      </Section>

      <Section title="Mother's Name">
        <ThreeInput a="First Name" b="Middle Name" c="Last Name" prefix="mother" />
      </Section>

      <Section title="Name to be printed on PAN">
        <RadioGroup name="panPrint" options={["Father", "Mother"]} />
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

function DocumentUpload({ label, nameType, nameFile }: any) {
  const [preview, setPreview] = useState<string | null>(null);

  return (
    <div className="grid md:grid-cols-2 gap-4 col-span-2 items-center">
      <div>
        <select name={nameType} className="w-full p-3 rounded bg-gray-900 border border-gray-600">
          <option value="">{label}</option>
          <option>Aadhaar</option>
          <option>Voter ID</option>
          <option>Passport</option>
          <option>Driving Licence</option>
        </select>

        <input
          type="file"
          name={nameFile}
          accept=".jpg,.jpeg,.png"
          className="mt-3 w-full p-2 bg-gray-900 border border-gray-600 rounded"
          onChange={(e) =>
            e.target.files &&
            setPreview(URL.createObjectURL(e.target.files[0]))
          }
        />
      </div>

      {preview && <img src={preview} className="w-40 h-28 object-cover border rounded justify-self-end" />}
    </div>
  );
}

function DocumentsWithUpload() {
  return (
    <Section title="Documents">
      <DocumentUpload label="Proof of Identity" nameType="identityType" nameFile="identityDoc" />
      <DocumentUpload label="Address Proof" nameType="addressDocType" nameFile="addressDoc" />
      <DocumentUpload label="Date of Birth Proof" nameType="dobDocType" nameFile="dobDoc" />
    </Section>
  );
}

/* ================= PHOTO & SIGN ================= */

function UploadPhotoSign() {
  return (
    <Section title="Upload Documents">
      <UploadBox label="Photo" name="photo" />
      <UploadBox label="Signature" name="signature" />
    </Section>
  );
}

function UploadBox({ label, name }: any) {
  const [preview, setPreview] = useState<string | null>(null);

  return (
    <div className="grid md:grid-cols-2 gap-4 col-span-2 items-center">
      <div>
        <p className="text-sm font-medium mb-1">{label}</p>
        <input
          type="file"
          name={name}
          accept=".jpg,.jpeg"
          className="w-full p-2 bg-gray-900 border border-gray-600 rounded"
          onChange={(e) =>
            e.target.files &&
            setPreview(URL.createObjectURL(e.target.files[0]))
          }
        />
      </div>

      {preview && <img src={preview} className="w-32 h-32 object-cover border rounded justify-self-end" />}
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

function Input({ label, type = "text", name }: any) {
  return (
    <input
      type={type}
      name={name}
      placeholder={label}
      className="w-full p-3 rounded bg-gray-900 border border-gray-600"
    />
  );
}

function Select({ label, options, name }: any) {
  return (
    <select name={name} className="w-full p-3 rounded bg-gray-900 border border-gray-600">
      <option value="">{label}</option>
      {options.map((o: string) => (
        <option key={o}>{o}</option>
      ))}
    </select>
  );
}

function ThreeInput({ a, b, c, prefix }: any) {
  return (
    <>
      <Input label={a} name={`${prefix}First`} />
      <Input label={b} name={`${prefix}Middle`} />
      <Input label={c} name={`${prefix}Last`} />
    </>
  );
}

function RadioGroup({ options, name }: any) {
  return (
    <div className="flex flex-wrap gap-6 col-span-2">
      {options.map((o: string) => (
        <label key={o} className="flex items-center gap-2 cursor-pointer">
          <input type="radio" name={name} value={o} />
          {o}
        </label>
      ))}
    </div>
  );
}

function IncomeSourceSection() {
  return (
    <Section title="Source of Income">
      <select name="incomeSource" className="w-full p-3 rounded bg-gray-900 border border-gray-600 col-span-2">
        <option value="">Select</option>
        <option>Salary</option>
        <option>Business / Profession</option>
        <option>House Property</option>
        <option>Capital Gains</option>
        <option>Other Sources</option>
        <option>No Income</option>
      </select>
    </Section>
  );
}

function AddressSection() {
  return (
    <Section title="Full Address for Communication">
      <RadioGroup name="addressType" options={["Residence", "Office"]} />
      <Input label="Full Address" name="address" />
      <Input label="PIN Code" name="pinCode" />
    </Section>
  );
}

function FeeSection({ amount }: any) {
  return <div className="text-center text-xl font-bold text-green-400">Fee: ₹{amount}</div>;
}

function Note() {
  return <p className="text-yellow-400 text-center text-sm">* Aadhaar OTP required during application</p>;
}

function SubmitButton() {
  return (
    <div className="text-center">
      <button type="submit" className="px-8 py-3 bg-green-600 rounded-lg font-bold hover:bg-green-700">
        Submit Application
      </button>
    </div>
  );
}
