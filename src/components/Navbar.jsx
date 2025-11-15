import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full bg-gradient-to-r from-amber-400 via-orange-500 to-yellow-400 text-white shadow-lg border-b border-orange-200/30 relative z-50">
      {/* 🌅 Navbar Header */}
      <nav className="flex justify-between items-center backdrop-blur-md px-8 py-5">
        {/* 🍳 Brand Name */}
        <h2
          className="relative text-4xl font-extrabold select-none cursor-pointer group tracking-wider"
        >
          <span
            className="bg-gradient-to-r from-yellow-200 via-orange-100 to-yellow-300 bg-clip-text text-transparent font-[Pacifico]
            drop-shadow-[0_0_12px_rgba(255,255,255,0.6)]"
          >
            🍳 Darshini
          </span>{" "}
          <span
            className="font-serif text-white group-hover:text-yellow-100 transition-all duration-500 ease-in-out drop-shadow-[0_0_8px_rgba(255,255,200,0.6)]"
          >
            Hotel
          </span>

          {/* 🌟 Glow shimmer underline */}
          <span
            className="absolute -bottom-1 left-1/2 w-0 h-[3px] bg-gradient-to-r from-yellow-100 to-orange-300 rounded-full 
            transition-all duration-500 ease-in-out group-hover:w-[60%] group-hover:-translate-x-1/2"
          ></span>
        </h2>

        {/* ☰ Mobile Menu Button */}
        <button
          className="md:hidden focus:outline-none p-2 rounded-lg hover:bg-white/20 transition duration-300"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="space-y-1">
            <div className="w-6 h-0.5 bg-white"></div>
            <div className="w-6 h-0.5 bg-white"></div>
            <div className="w-6 h-0.5 bg-white"></div>
          </div>
        </button>

        {/* 🖥️ Desktop Links */}
        <div className="hidden md:flex space-x-8 text-lg font-medium tracking-wide">
          {["Home", "Menu", "Booking", "Login", "Signup", "Dashboard"].map((item) => (
            <Link
              key={item}
              to={`/${item === "Home" ? "" : item.toLowerCase()}`}
              className="relative group transition duration-300"
            >
              {item}
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </div>
      </nav>

      {/* 📱 Mobile Dropdown */}
      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-400 md:hidden shadow-md ${
          isOpen ? "max-h-96 opacity-100 py-5" : "max-h-0 opacity-0 py-0"
        }`}
      >
        <div className="flex flex-col items-center space-y-4 text-lg font-medium">
          {["Home", "Menu", "Booking", "Login", "Signup", "Dashboard"].map((item) => (
            <Link
              key={item}
              to={`/${item === "Home" ? "" : item.toLowerCase()}`}
              className="hover:text-yellow-100 transition duration-200"
              onClick={() => setIsOpen(false)}
            >
              {item}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
