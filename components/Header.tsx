"use client";
import Image from "next/image";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-black/70 backdrop-blur-md shadow-md">
      <div className="relative max-w-7xl mx-auto h-[80px] md:h-[110px] flex items-center px-3 md:px-6">

        {/* Left: Logo */}
        <div className="absolute left-3 md:left-6 flex items-center">
          <Image
            src="/digital.png"
            alt="Digital India"
            width={60}
            height={60}
            className="md:w-[90px] md:h-[90px]"
            priority
          />
        </div>

        {/* Center: Title (PERFECT CENTER) */}
        <div className="mx-auto text-center">
          <h1 className="csc-3d-text glow-text text-lg sm:text-xl md:text-3xl">
            Apna CSC Kendra
          </h1>
          <p className="text-[10px] sm:text-xs md:text-sm tracking-widest text-white/90">
            Common Service Center
          </p>
        </div>

        {/* Right: Mobile Menu */}
        <button
          className="absolute right-3 md:right-6 md:hidden text-2xl text-white"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>

        {/* Desktop Menu */}
        <nav className="hidden md:flex absolute right-6 gap-6 text-white font-medium">
          <a href="/">Home</a>
         <a href="#">Contact</a>
          <a href="#">Login</a>
        </nav>
      </div>

      {/* Mobile Menu Dropdown */}
      {open && (
        <div className="md:hidden bg-black/90 text-white px-4 py-3 space-y-3 text-center">
          <a className="block" href="/">Home</a>
           <a className="block" href="#">Contact</a>
          <a className="block" href="#">Login</a>
        </div>
      )}
    </header>
  );
}
