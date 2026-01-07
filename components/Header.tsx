"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Header() {
  const [openMenu, setOpenMenu] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const router = useRouter();

  /* ✅ CHECK LOGIN STATUS ON LOAD */
  useEffect(() => {
    const loggedIn = localStorage.getItem("adminLoggedIn");
    if (loggedIn === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  /* ✅ LOGIN */
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userId || !password) {
      alert("Please enter User ID and Password");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Login failed");
        return;
      }

      /* ✅ SAVE LOGIN */
      localStorage.setItem("adminLoggedIn", "true");
      setIsLoggedIn(true);

      /* ✅ RESET */
      setOpenLogin(false);
      setUserId("");
      setPassword("");

      router.push("/admin");
    } catch {
      alert("Server error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  /* ✅ LOGOUT */
  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn");
    setIsLoggedIn(false);
    router.push("/");
  };

  return (
    <>
      {/* ================= HEADER ================= */}
      <header className="sticky top-0 z-40 bg-black/70 backdrop-blur-md shadow-md">
        <div className="relative max-w-7xl mx-auto h-[80px] md:h-[110px] flex items-center px-3 md:px-6">

          {/* Logo */}
          <div className="absolute left-3 md:left-6">
            <Image
              src="/digital.png"
              alt="Digital India"
              width={60}
              height={60}
              className="md:w-[90px] md:h-[90px]"
              priority
            />
          </div>

          {/* Title */}
          <div className="mx-auto text-center">
            <h1 className="text-lg sm:text-xl md:text-3xl font-bold tricolor-wave">
              {"Apna CSC Kendra".split("").map((c, i) => (
                <span key={i} style={{ animationDelay: `${i * 0.12}s` }}>
                  {c === " " ? "\u00A0" : c}
                </span>
              ))}
            </h1>
            <p className="text-[10px] sm:text-xs md:text-sm tracking-widest text-white/90">
              Common Service Center
            </p>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="absolute right-3 md:hidden text-2xl text-white"
            onClick={() => setOpenMenu(!openMenu)}
          >
            ☰
          </button>

          {/* Desktop Menu */}
          <nav className="hidden md:flex absolute right-6 gap-6 text-white font-medium">
            <a href="/">Home</a>
            <a href="/contact">Contact</a>

            {!isLoggedIn ? (
              <button onClick={() => setOpenLogin(true)}>Admin Login</button>
            ) : (
              <button
                onClick={handleLogout}
                className="bg-red-600 px-4 py-1 rounded-md hover:bg-red-700"
              >
                Logout
              </button>
            )}
          </nav>
        </div>

        {/* Mobile Dropdown */}
        {openMenu && (
          <div className="md:hidden bg-black/90 text-white px-4 py-3 space-y-3 text-center">
            <a className="block" href="/">Home</a>
            <a className="block" href="/contact">Contact</a>

            {!isLoggedIn ? (
              <button
                className="block mx-auto"
                onClick={() => {
                  setOpenMenu(false);
                  setOpenLogin(true);
                }}
              >
                Admin Login
              </button>
            ) : (
              <button
                onClick={handleLogout}
                className="block mx-auto bg-red-600 px-4 py-2 rounded-md"
              >
                Logout
              </button>
            )}
          </div>
        )}
      </header>

      {/* ================= LOGIN MODAL ================= */}
      {openLogin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
          <div
            aria-hidden
            className="absolute inset-0 bg-[url('/digital.png')]
                       bg-no-repeat bg-center bg-contain opacity-10"
          />

          <div className="relative bg-gray-900 border border-gray-700
                          rounded-2xl p-6 w-full max-w-sm
                          shadow-2xl text-white">

            <button
              onClick={() => setOpenLogin(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-white text-xl"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold text-center mb-6">
              Admin Login
            </h2>

            <form className="space-y-4" onSubmit={handleLogin}>
              <input
                type="text"
                placeholder="User ID"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                className="w-full p-3 rounded bg-gray-800 border border-gray-600"
              />

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 rounded bg-gray-800 border border-gray-600"
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 py-3 rounded-lg
                           font-semibold hover:bg-green-700
                           disabled:opacity-50"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
