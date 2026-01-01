import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Apna CSC Kendra",
  description: "Digital India CSC Center",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-900 text-white">
        <Header />
        <main className="min-h-screen bg-gray-900">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
