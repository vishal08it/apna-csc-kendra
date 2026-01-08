// import { transporter } from "@/lib/mailer";

// export async function POST(req: Request) {
//   const { userEmail } = await req.json();

//   await transporter.sendMail({
//     from: `"Apna CSC Kendra" <${process.env.EMAIL_USER}>`,
//     to: `${userEmail}, admin@gmail.com`,
//     subject: "Application Submitted",
//     html: `
//       <h3>Application Received</h3>
//       <p>Your application has been submitted successfully.</p>
//     `,
//   });

//   return Response.json({ success: true });
// }
