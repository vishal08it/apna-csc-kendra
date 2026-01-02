"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation"; // ✅ ADDED

const services = [
  { img: "/driving.jpg", title: "Driving Licence", desc: "Update, correction & linking services" },
  { img: "/pan.png", title: "PAN Card Services", desc: "New PAN & PAN corrections" },
  {
    img: "/rtps1.jpg",
    title: "Cast, Domicile, Income, OBC NCL",
    desc: "Government certificate services",
    isRTPS: true,
  },
  { img: "/voter.jpg", title: "Voter ID", desc: "New registration & correction" },
  { img: "/ration.jpg", title: "Ration Card", desc: "Add, update & correction services" },
  { img: "/elabharthi.png", title: "Elabharthi Pension", desc: "Pension application & updates" },
];

const certificates = [
  "Domicile Certificate",
  "Income Certificate",
  "Caste Certificate",
  "OBC NCL (State)",
  "OBC NCL (Central)",
];

export default function Home() {
  const [openRTPS, setOpenRTPS] = useState(false);
  const [selectedCert, setSelectedCert] = useState<string | null>(null);

  const router = useRouter(); // ✅ ADDED

  return (
    <section className="min-h-screen bg-gray-900 relative overflow-hidden">

      {/* Background watermark */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[url('/digital.png')]
                   bg-no-repeat bg-center bg-contain
                   opacity-10 pointer-events-none"
      />

      <div className="relative max-w-7xl mx-auto px-4 py-10 text-white">

        <h1 className="text-3xl md:text-4xl font-bold text-center mb-3">
          Welcome to Apna CSC Kendra
        </h1>

        <p className="text-gray-300 text-center mb-10">
          We provide all Government & Digital Services under one roof
        </p>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {services.map((item) => (
            <div
              key={item.title}
              className="bg-black/40 border border-gray-700 rounded-xl p-4 shadow-md
                         min-h-[260px] flex flex-col transition-transform duration-300
                         hover:scale-[1.02]"
            >
              <div className="relative w-full h-[64px] mb-4">
                <Image src={item.img} alt={item.title} fill className="object-contain" />
              </div>

              <h3 className="text-lg font-semibold text-center mb-2">{item.title}</h3>
              <p className="text-gray-300 text-center text-sm flex-grow mb-4">{item.desc}</p>

              <button
                className="apply-btn mx-auto"
                onClick={() => item.isRTPS && setOpenRTPS(true)}
              >
                Apply Now
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ================= POPUP ================= */}
      {openRTPS && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-3">

          <div className="bg-gray-900 border border-gray-700 rounded-2xl
                          w-full max-w-sm p-5 text-white shadow-2xl relative">

            {/* Close */}
            <button
              onClick={() => {
                setOpenRTPS(false);
                setSelectedCert(null);
              }}
              className="absolute top-3 right-3 text-gray-400 hover:text-white text-xl"
            >
              ✕
            </button>

            {/* STEP 1 */}
            {!selectedCert && (
              <>
                <h2 className="text-xl font-bold text-center mb-2">
                  Apply for Certificate
                </h2>

                <p className="text-gray-400 text-center text-sm mb-5">
                  Select the certificate
                </p>

                <div className="space-y-3">
                  {certificates.map((cert) => (
                    <button
                      key={cert}
                      onClick={() => setSelectedCert(cert)}
                      className="w-full bg-black/40 border border-gray-700
                                 py-3 rounded-lg text-left px-4 text-sm
                                 hover:bg-blue-600 hover:border-blue-500 transition"
                    >
                      {cert}
                    </button>
                  ))}
                </div>
              </>
            )}

            {/* STEP 2 */}
            {selectedCert && (
              <>
                <h2 className="text-lg font-bold text-center mb-2">
                  {selectedCert}
                </h2>

                <p className="text-gray-400 text-center text-sm mb-5">
                  Select application level
                </p>

               <div className="space-y-3">
  {["RO Level", "SDO Level", "DM Level"].map((level) => (
    <button
      key={level}
      onClick={() => {
        const levelPath =
          level === "RO Level" ? "ro" :
          level === "SDO Level" ? "sdo" :
          "dm";

        if (selectedCert === "Domicile Certificate") {
          router.push(`/rtps/domicile/${levelPath}`);
        }

        if (selectedCert === "Income Certificate") {
          router.push(`/rtps/income/${levelPath}`);
        }

        if (selectedCert === "Caste Certificate") {
          router.push(`/rtps/caste/${levelPath}`);
        }
      }}
      className="w-full bg-black/40 border border-gray-700
                 py-3 rounded-lg text-center text-sm
                 hover:bg-green-600 hover:border-green-500 transition"
    >
      Apply for {level}
    </button>
  ))}
</div>


                <button
                  onClick={() => setSelectedCert(null)}
                  className="mt-4 text-sm text-gray-400 hover:text-white block mx-auto"
                >
                  ← Back
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
