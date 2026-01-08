import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import PanApplication from "@/models/PanApplication";
import { generatePDF } from "@/lib/pdf";
import { sendMail } from "@/lib/mailer";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { draftId, txn } = await req.json();

    if (!draftId || !txn) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    // Update application
    const app = await PanApplication.findByIdAndUpdate(
      draftId,
      {
        txnId: txn,
        status: "PAID",
      },
      { new: true }
    );

    if (!app) {
      return NextResponse.json({ error: "Application not found" }, { status: 404 });
    }

    // Generate PDF
    const pdfBuffer = await generatePDF(app);

    // Send email to USER
    await sendMail(
      app.formData.email,
      "PAN Application Payment Successful",
      "Your payment was successful. Receipt attached.",
      pdfBuffer
    );

    // Send email to ADMIN
    await sendMail(
      process.env.ADMIN_EMAIL!,
      "New PAN Application Payment",
      "A new PAN application payment has been received.",
      pdfBuffer
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
