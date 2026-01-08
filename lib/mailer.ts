import nodemailer from "nodemailer";

export async function sendMail(
  to: string,
  subject: string,
  text: string,
  pdfBuffer: Buffer
) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"APNA CSC KENDRA" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text,
    attachments: [
      {
        filename: "PAN_Receipt.pdf",
        content: pdfBuffer,
      },
    ],
  });
}
