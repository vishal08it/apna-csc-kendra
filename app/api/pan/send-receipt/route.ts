import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import PDFDocument from "pdfkit";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      name,
      email,
      mobile,
      panType,
      fee,
      txnId,
      applicationId,
    } = body;

    /* ================= PDF ================= */

    const pdfBuffer = await new Promise<Buffer>((resolve) => {
      const doc = new PDFDocument({ size: "A4", margin: 50 });
      const buffers: Buffer[] = [];

      doc.on("data", buffers.push.bind(buffers));
      doc.on("end", () => resolve(Buffer.concat(buffers)));

      doc.fontSize(18).text("PAN Application Receipt", { align: "center" });
      doc.moveDown();

      doc.fontSize(12);
      doc.text(`Application ID: ${applicationId}`);
      doc.text(`Applicant Name: ${name}`);
      doc.text(`Email: ${email}`);
      doc.text(`Mobile: ${mobile}`);
      doc.text(`Application Type: ${panType}`);
      doc.text(`Transaction ID: ${txnId}`);
      doc.text(`Amount Paid: ₹${fee}`);
      doc.text(`Date: ${new Date().toLocaleString()}`);

      doc.moveDown();
      doc.text("Thank you for applying through Apna CSC Kendra.");

      doc.end();
    });

    /* ================= MAIL ================= */

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Apna CSC Kendra" <${process.env.EMAIL_USER}>`,
      to: `${email}, ${process.env.ADMIN_EMAIL}`,
      subject: "PAN Application Payment Receipt",
      text: `Payment successful. TXN ID: ${txnId}`,
      attachments: [
        {
          filename: "PAN_Receipt.pdf",
          content: pdfBuffer,
        },
      ],
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("MAIL ERROR:", error);
    return NextResponse.json(
      { error: "Email failed" },
      { status: 500 }
    );
  }
}
