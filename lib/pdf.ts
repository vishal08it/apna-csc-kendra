import PDFDocument from "pdfkit";

export async function generatePDF(app: any): Promise<Buffer> {
  return new Promise((resolve) => {
    const doc = new PDFDocument({ size: "A4", margin: 50 });
    const buffers: Uint8Array[] = [];

    doc.on("data", buffers.push.bind(buffers));
    doc.on("end", () => {
      resolve(Buffer.concat(buffers));
    });

    doc.fontSize(20).text("PAN Application Payment Receipt", { align: "center" });
    doc.moveDown();

    doc.fontSize(12);
    doc.text(`Application Type: ${app.panType}`);
    doc.text(`Transaction ID: ${app.txnId}`);
    doc.text(`Amount Paid: ₹${app.fee}`);
    doc.text(`Status: ${app.status}`);
    doc.moveDown();

    const f = app.formData || {};

    doc.text(`Applicant Name: ${f.applicantFirst || ""} ${f.applicantLast || ""}`);
    doc.text(`Mobile: ${f.mobile || ""}`);
    doc.text(`Email: ${f.email || ""}`);
    doc.text(`DOB: ${f.dob || ""}`);
    doc.text(`Address: ${f.address || ""}`);
    doc.text(`PIN Code: ${f.pinCode || ""}`);

    doc.moveDown();
    doc.text("Thank you for using APNA CSC KENDRA");

    doc.end();
  });
}
