"use client";


export default function ContactPage() {
  return (
    <section className="min-h-screen bg-gray-900 text-white px-4 py-12">

      {/* TITLE */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold">Contact Us</h1>
        <p className="text-green-400 mt-2">संपर्क करें</p>
      </div>

      {/* CARDS */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        <ContactCard
          image="/monu.png"
          designation="CSC SUPERVISOR"
          name="Vikash Kumar"
          phone="9963291796"
        />

        <ContactCard
          image="/vk.png"
          designation="CSC OPERATOR"
          name="Vishal Kumar"
          phone="7541037802"
        />
      </div>

    </section>
  );
}

/* ============ CARD COMPONENT ============ */

function ContactCard({
  image,
  name,
  phone,
  designation,
}: {
  image: string;
  name: string;
  phone: string;
  designation: string;
}) {
  return (
    <div className="
      bg-gradient-to-br from-gray-800 to-gray-900
      rounded-2xl p-6 text-center
      hover:-translate-y-2 transition-all duration-300
      border border-gray-700 shadow-xl
    ">

      {/* PHOTO */}
      <div className="flex justify-center">
        <img
          src={image}
          alt={name}
          className="w-40 h-40 rounded-xl border-4 border-gray-700 shadow-lg object-cover"
        />
      </div>

      {/* TRICOLOR WAVE TEXT */}
      <p className="mt-6 text-xl tricolor-wave">
        {designation.split("").map((char, i) => (
          <span key={i}>
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </p>

      {/* NAME */}
      <h2 className="mt-4 text-xl font-bold">{name}</h2>

      {/* PHONE */}
      <p className="mt-2 text-green-400 font-semibold text-lg">
        📞 {phone}
      </p>

    </div>
  );
}
