import nodemailer from "nodemailer";

/**
 * Sends email via Gmail using MAIL_USER and MAIL_PASS
 * ✅ Works locally & on Vercel
 * ✅ Safe for build
 */
export async function sendMail({
  to,
  subject,
  text,
  attachments,
}: {
  to: string | string[];
  subject: string;
  text: string;
  attachments?: any[];
}) {
  const user = process.env.MAIL_USER;
  const pass = process.env.MAIL_PASS;

  if (!user || !pass) {
    console.error("❌ Missing MAIL_USER or MAIL_PASS environment variable");
    throw new Error("Email credentials missing");
  }

  // Create secure transporter
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user, pass },
  });

  // Send email
  await transporter.sendMail({
    from: `"Apna CSC" <${user}>`,
    to,
    subject,
    text,
    attachments,
  });

  console.log("📧 Email sent successfully to:", to);
}
