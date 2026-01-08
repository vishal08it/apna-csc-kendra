import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import PanApplication from "@/models/PanApplication";
import cloudinary from "@/lib/cloudinary";

async function uploadFile(file: File | null, folder: string) {
  if (!file) return "";

  const bytes = Buffer.from(await file.arrayBuffer());

  return new Promise<string>((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder }, (err, res) => {
        if (err) reject(err);
        else resolve(res?.secure_url || "");
      })
      .end(bytes);
  });
}

export async function POST(req: NextRequest) {
  await connectDB();

  const isDraft = req.nextUrl.searchParams.get("draft");

  // ✅ FINAL SUBMIT (after QR payment)
  if (!isDraft) {
    const { draftId, txnId } = await req.json();
    await PanApplication.findByIdAndUpdate(draftId, { txnId });
    return NextResponse.json({ success: true });
  }

  // ✅ DRAFT SAVE
  const formData = await req.formData();

  const photo = formData.get("photo") as File;
  const signature = formData.get("signature") as File;

  const identityDoc = formData.get("identityDoc") as File;
  const addressDoc = formData.get("addressDoc") as File;
  const dobDoc = formData.get("dobDoc") as File;

  const photoUrl = await uploadFile(photo, "pan/photo");
  const signatureUrl = await uploadFile(signature, "pan/signature");

  const identityUrl = await uploadFile(identityDoc, "pan/docs");
  const addressUrl = await uploadFile(addressDoc, "pan/docs");
  const dobUrl = await uploadFile(dobDoc, "pan/docs");

  const doc = await PanApplication.create({
    panType: formData.get("panType"),

    applicantName: {
      first: formData.get("applicantFirst"),
      middle: formData.get("applicantMiddle"),
      last: formData.get("applicantLast"),
    },

    fatherName: {
      first: formData.get("fatherFirst"),
      middle: formData.get("fatherMiddle"),
      last: formData.get("fatherLast"),
    },

    motherName: {
      first: formData.get("motherFirst"),
      middle: formData.get("motherMiddle"),
      last: formData.get("motherLast"),
    },

    dob: formData.get("dob"),
    gender: formData.get("gender"),
    email: formData.get("email"),
    mobile: formData.get("mobile"),
    aadhaar: formData.get("aadhaar"),
    aadhaarName: formData.get("aadhaarName"),
    panNumber: formData.get("panNumber"),

    addressType: formData.get("addressType"),
    address: formData.get("address"),
    pinCode: formData.get("pinCode"),

    incomeSource: formData.get("incomeSource"),
    panPrint: formData.get("panPrint"),
    representative: formData.get("representative"),

    documents: {
      identityType: formData.get("identityType"),
      identityUrl,
      addressType: formData.get("addressDocType"),
      addressUrl,
      dobType: formData.get("dobDocType"),
      dobUrl,
    },

    photoUrl,
    signatureUrl,

    fee: Number(formData.get("fee")),
  });

  return NextResponse.json({ id: doc._id });
}
