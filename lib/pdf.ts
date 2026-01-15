import fs from "fs";
import path from "path";
import * as fontkit from "fontkit";
import { PDFDocument, rgb } from "pdf-lib";

/**
 * Create PAN Application PDF with Unicode-safe font (₹ supported)
 * ✅ Fixed type mismatch error (pdf-lib <-> fontkit)
 * ✅ Works on Windows, Next.js, TypeScript
 * ✅ Fee removed
 */
export async function createPDFBuffer(app: any): Promise<Buffer> {
  // Load Unicode-safe font
  const fontPath = path.join(process.cwd(), "public", "fonts", "Roboto-Regular.ttf");
  const fontBytes = fs.readFileSync(fontPath);

  // Create PDF & register fontkit safely
  const pdfDoc = await PDFDocument.create();
  pdfDoc.registerFontkit(fontkit as any); // ✅ type fixed here

  // Embed font
  const customFont = await pdfDoc.embedFont(fontBytes);

  const page = pdfDoc.addPage([595.28, 841.89]); // A4
  const { height } = page.getSize();

  let y = height - 80;
  const lineGap = 20;

  const write = (text: string) => {
    page.drawText(text, {
      x: 50,
      y,
      size: 12,
      font: customFont,
      color: rgb(0, 0, 0),
    });
    y -= lineGap;
  };

  // ===== HEADER =====
  page.drawText("PAN Application Summary", {
    x: 150,
    y,
    size: 18,
    font: customFont,
    color: rgb(0.2, 0.2, 0.7),
  });
  y -= 40;

  // ===== DETAILS =====
  write(`Application Type: ${app.panType || ""}`);
  write(
    `Applicant: ${app.applicantName?.first || ""} ${app.applicantName?.middle || ""} ${app.applicantName?.last || ""}`
  );
  write(
    `Father's Name: ${app.fatherName?.first || ""} ${app.fatherName?.middle || ""} ${app.fatherName?.last || ""}`
  );
  write(
    `Mother's Name: ${app.motherName?.first || ""} ${app.motherName?.middle || ""} ${app.motherName?.last || ""}`
  );
  write(`Date of Birth: ${app.dob || ""}`);
  write(`Gender: ${app.gender || ""}`);
  write(`Email: ${app.email || ""}`);
  write(`Mobile: ${app.mobile || ""}`);
  write(`Aadhaar: ${app.aadhaar || ""}`);
  write(`Address: ${app.address || ""}`);
  write(`PIN Code: ${app.pinCode || ""}`);
  write(`Transaction ID: ${app.txnId || ""}`);
  write(`Created At: ${new Date(app.createdAt).toLocaleString()}`);

  y -= 40;
  write("Thank you for applying for your PAN card through Apna CSC.");

  const pdfBytes = await pdfDoc.save();
  return Buffer.from(pdfBytes);
}
