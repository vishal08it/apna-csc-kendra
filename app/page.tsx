import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 relative flex items-center">
      {/* Background Watermark Logo */}
      <div
        className="absolute inset-0 bg-[url('/digital.png')] bg-no-repeat bg-center bg-contain opacity-10"
      />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto p-6 text-white w-full">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Welcome to Apna CSC Kendra
        </h2>

        <p className="text-gray-300 mb-10 text-center">
          We provide all Government & Digital Services under one roof
        </p>

        {/* Services */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Aadhaar */}
          <div className="group bg-black/40 border border-gray-700 p-6 rounded-xl shadow-lg hover:scale-105 transition duration-300">
            <Image
              src="/driving.jpg"
              alt="Driving Licence"
              width={60}
              height={60}
              className="mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold text-center mb-2">
              Driving Licence
            </h3>
            <p className="text-gray-300 text-center mb-4">
              Update, correction & linking services
            </p>
            <button className="w-full bg-orange-500 hover:bg-orange-600 text-black font-semibold py-2 rounded">
              Apply Now
            </button>
          </div>

          {/* PAN */}
          <div className="group bg-black/40 border border-gray-700 p-6 rounded-xl shadow-lg hover:scale-105 transition duration-300">
            <Image
              src="/pan.png"
              alt="PAN Card"
              width={60}
              height={60}
              className="mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold text-center mb-2">
              PAN Card Services
            </h3>
            <p className="text-gray-300 text-center mb-4">
              New PAN & PAN corrections
            </p>
            <button className="w-full bg-green-500 hover:bg-green-600 text-black font-semibold py-2 rounded">
              Apply Now
            </button>
          </div>

          {/* Online Forms */}
          <div className="group bg-black/40 border border-gray-700 p-6 rounded-xl shadow-lg hover:scale-105 transition duration-300">
            <Image
              src="/rtps1.jpg"
              alt="Cast, Domicile,Income,OBC NCL"
              width={60}
              height={60}
              className="mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold text-center mb-2">
              Cast, Domicile,Income,OBC NCL
            </h3>
            <p className="text-gray-300 text-center mb-4">
              Government & private applications
            </p>
            <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded">
              Apply Now
            </button>
          </div>
           <div className="group bg-black/40 border border-gray-700 p-6 rounded-xl shadow-lg hover:scale-105 transition duration-300">
            <Image
              src="/voter.jpg"
              alt="VOter ID"
              width={60}
              height={60}
              className="mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold text-center mb-2">
              Voter ID
            </h3>
            <p className="text-gray-300 text-center mb-4">
              Government & private applications
            </p>
            <button className="w-full  bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded">
              Apply Now
            </button>
          </div>
           <div className="group bg-black/40 border border-gray-700 p-6 rounded-xl shadow-lg hover:scale-105 transition duration-300">
            <Image
              src="/ration.jpg"
              alt="Ration Card"
              width={60}
              height={60}
              className="mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold text-center mb-2">
              Ration Card
            </h3>
            <p className="text-gray-300 text-center mb-4">
              Government & private applications
            </p>
            <button className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded">
              Apply Now
            </button>
          </div>
           <div className="group bg-black/40 border border-gray-700 p-6 rounded-xl shadow-lg hover:scale-105 transition duration-300">
            <Image
              src="/elabharthi.png"
              alt="elabharti "
              width={60}
              height={60}
              className="mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold text-center mb-2">
              Elabarthi Pension 
            </h3>
            <p className="text-gray-300 text-center mb-4">
              Government & private applications
            </p>
            <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded">
              Apply Now
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
