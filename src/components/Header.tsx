// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { Menu, X, MapPin } from 'lucide-react';

// const Header: React.FC = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   return (
//     <header className="bg-white shadow-md border-b border-gray-200 sticky top-0 z-50">
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//       <div className="flex justify-between items-center h-16">
//         <div className="flex items-center">
//           <MapPin className="h-8 w-8 text-blue-600" />
//           <span className="ml-2 text-xl font-bold text-gray-800">Enclave Horizon</span>
//         </div>
        
//         <nav className="hidden md:flex space-x-8">
//           <Link to="/" className="text-gray-700 hover:text-blue-500 font-medium transition-colors">Home</Link>
//           <Link to="/properties" className="text-gray-700 hover:text-blue-500 font-medium transition-colors">Properties</Link>
//           <Link to="/about" className="text-gray-700 hover:text-blue-500 font-medium transition-colors">About</Link>
//           <Link to="/contact" className="text-gray-700 hover:text-blue-500 font-medium transition-colors">Contact</Link>
//           {/* <Link to="/blogs" className="text-gray-700 hover:text-blue-500 font-medium transition-colors">Blog</Link> */}
//         </nav>

//         <button
//           className="md:hidden text-gray-800"
//           onClick={() => setIsMenuOpen(!isMenuOpen)}
//         >
//           {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
//         </button>
//       </div>

//       {isMenuOpen && (
//         <div className="md:hidden">
//           <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
//             <Link to="/" className="block px-3 py-2 text-gray-800 hover:text-blue-500">Home</Link>
//             <Link to="/properties" className="block px-3 py-2 text-gray-800 hover:text-blue-500">Properties</Link>
//             <Link to="/about" className="block px-3 py-2 text-gray-800 hover:text-blue-500">About</Link>
//             <Link to="/contact" className="block px-3 py-2 text-gray-800 hover:text-blue-500">Contact</Link>
//             {/* <Link to="/blogs" className="block px-3 py-2 text-gray-800 hover:text-blue-500">Blog</Link> */}
//           </div>
//         </div>
//       )}
//     </div>
//   </header>
//   );
// };

// export default Header;

// src/components/Header.tsx
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import clsx from "clsx";
import LanguageSwitcher from "./LanguageSwitcher";

type HeaderProps = {
  variant?: "home" | "internal";
};

const NAV = [
  { to: "/", label: "Home" },
  { to: "/buy", label: "Buy" },
  { to: "/rent", label: "Rent" },
  { to: "/sell", label: "Sell" },
  { to: "/off-plan", label: "Off Plan" },
  { to: "/commercial", label: "Commercial" },
  { to: "/about", label: "About" },
];

export default function Header({ variant = "internal" }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (variant !== "home") return;
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [variant]);

  const isTransparent = variant === "home" && !scrolled;

  return (
    <header
      className={clsx(
        "fixed inset-x-0 top-0 z-50 transition-colors",
        isTransparent
          ? "bg-transparent"
          : "bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 shadow-sm"
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Brand */}
          <Link to="/" className="flex items-center gap-2">
            {/* If you have a mark, swap this text with <img src="/logo.svg" .../> */}
            <span
              className={clsx(
                "text-xl font-semibold tracking-tight",
                isTransparent ? "text-white" : "text-gray-900"
              )}
            >
              {/* <img src="/enproperties.png" alt="" width="100px" height={"100px"} /> */}
              <img
  src={isTransparent ? "/enproperties_light.png" : "/enproperties_dark.png"}
  alt="Enclave Horizon"
  width={"120px"} height={"120px"}
/>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-7">
            {NAV.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                className={({ isActive }) =>
                  clsx(
                    "text-sm uppercase tracking-wide transition-colors",
                    isTransparent ? "text-white/90 hover:text-white" : "text-gray-700 hover:text-gray-900",
                    isActive && (isTransparent ? "text-white" : "text-gray-900")
                  )
                }
              >
                {n.label}
              </NavLink>
            ))}

            {/* CTA */}
            <Link
              to="/contact"
              className={clsx(
                "rounded-md border px-4 py-2 text-sm font-medium transition",
                isTransparent
                  ? "border-white/70 text-white hover:bg-white/10"
                  : "border-gray-300 text-gray-900 hover:bg-gray-50"
              )}
            >
              Book a Valuation
            </Link>

            
<LanguageSwitcher
  light={isTransparent}                       // white-outlined over hero
  value={(localStorage.getItem("lang") as any) || "en"}
  onChange={(code) => {
    // example: switch direction for Arabic
    document.documentElement.dir = code === "ar" ? "rtl" : "ltr";
    // if you use i18n, call i18n.changeLanguage(code)
  }} />

          </nav>

  {/* <div className="flex items-center justify-end gap-2 lg:hidden h-full">
          <LanguageSwitcher
      light={isTransparent}
      value={(localStorage.getItem("lang") as any) || "en"}
      onChange={(code) => {
        document.documentElement.dir = code === "ar" ? "rtl" : "ltr";
      }}
    />
  </div> */}
          {/* Mobile */}
          {/* <button
            className={clsx(
              "lg:hidden p-2 rounded-md", isTransparent ? "text-white" : "text-gray-900"
            )}
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <Menu />
          </button> */}

<div className="flex items-center gap-2 lg:hidden">
  <LanguageSwitcher
    light={isTransparent}
    value={(localStorage.getItem("lang") as any) || "en"}
    onChange={(code) => {
      document.documentElement.dir = code === "ar" ? "rtl" : "ltr";
    }}
  />
  <button
    className={clsx(
      "p-2 rounded-md",
      isTransparent ? "text-white" : "text-gray-900"
    )}
    onClick={() => setOpen(true)}
    aria-label="Open menu"
  >
    <Menu />
  </button>
</div>


        </div>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-xl">
            <div className="flex items-center justify-between px-4 h-16">
              <span className="text-lg font-semibold">Enclave Horizon</span>
              <button className="p-2" onClick={() => setOpen(false)} aria-label="Close menu">
                <X />
              </button>
            </div>
            <nav className="px-4 py-3 space-y-2">
              {NAV.map((n) => (
                <NavLink
                  key={n.to}
                  to={n.to}
                  onClick={() => setOpen(false)}
                  className="block rounded-md px-3 py-2 text-sm font-medium text-gray-800 hover:bg-gray-100"
                >
                  {n.label}
                </NavLink>
              ))}

              

              <Link
                to="/valuation"
                onClick={() => setOpen(false)}
                className="mt-2 inline-flex w-full items-center justify-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-primary bg-primary text-white"
              >
                Book a Valuation
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
