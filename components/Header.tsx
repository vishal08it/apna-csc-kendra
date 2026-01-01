import Image from "next/image";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 text-white bg-gradient-to-b from-orange-500 via-white to-green-600 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center gap-4 p-4">
        <Image
          src="/digital.png"
          alt="Digital India"
          width={130}
          height={130}
        />

        <div className="flex flex-col items-center justify-center text-center w-full">
          <h1 className="csc-3d-text glow-text">
            Apna CSC Kendra
          </h1>
          <p className="text-sm tracking-widest mt-1">
            Common Service Center
          </p>
        </div>
      </div>
    </header>
  );
}
