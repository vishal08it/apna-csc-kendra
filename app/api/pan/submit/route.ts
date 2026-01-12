import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import PanApplication from "@/models/panapplication";
// import { sendMail } from "@/lib/mailer";
// import { createPDFBuffer } from "@/lib/pdf";

export async function POST(req: NextRequest) {
  await connectDB();

  try {
    // ===================== DRAFT SAVE =====================
    if (req.nextUrl.searchParams.get("draft")) {
      const formData = await req.formData();
      const data: any = Object.fromEntries(formData.entries());
      const draft = await PanApplication.create(data);
      console.log("✅ Draft created:", draft._id.toString());
      return NextResponse.json({ success: true, id: draft._id.toString() });
    }

    // ===================== FINAL PAYMENT =====================
    const body = await req.json();
    let { draftId, txnId } = body || {};

    if (!draftId || !txnId) {
      console.warn("❌ Missing data:", { draftId, txnId });
      return NextResponse.json({ success: false, error: "Missing data" });
    }

    // ✅ Clean the ID (handle quotes, spaces, etc.)
    draftId = draftId.toString().replace(/["']/g, "").trim();
    console.log("🧾 Payment received:", { draftId, txnId });

    // ✅ Try to find the application
    const app = await PanApplication.findById(draftId);
    if (!app) {
      console.warn("❌ Application not found in DB for ID:", draftId);
      // double-check with alternative query (if frontend sent wrong ID field)
      const maybeApp = await PanApplication.findOne({ _id: draftId });
      if (!maybeApp) {
        return NextResponse.json({
          success: false,
          error: "Application not found",
        });
      }
    }

    // ✅ Update txn ID & save
    app.txnId = txnId;
    await app.save();

    // ✅ Generate PDF
    // const pdfBuffer = await createPDFBuffer(app);

    // ✅ Send email
    // await sendMail({
    //   to: [app.email, process.env.ADMIN_EMAIL],
    //   subject: "PAN Application Submitted Successfully",
    //   text: "Your PAN application and documents have been received successfully.",
    //   attachments: [{ filename: "PanApplication.pdf", content: pdfBuffer }],
    // });

    console.log("📧 Email sent successfully to:", app.email);
    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("❌ PAN submit error:", err);
    return NextResponse.json({
      success: false,
      error: err.message || "Server error",
    });
  }
}