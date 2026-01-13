import nodemailer from "nodemailer";

export async function sendMail({ to, subject, text, attachments }: any) {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Apna CSC" <${process.env.MAIL_USER}>`,
    to,
    subject,
    text,
    attachments,
  });
}
