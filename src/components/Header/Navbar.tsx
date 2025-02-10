"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { HiMenu, HiX } from "react-icons/hi";
import SearchBar from "./SearchBar";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); 
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/filter", label: "Shop" },
    { href: "/allproducts", label: "Product" },
    { href: "/about", label: "About" },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  if (!isClient) return null;

  return (
    <div className="border-t border-b border-gray-200">
      <div className="bg-white p-4 flex items-center justify-between max-w-[1920px] mx-auto h-[74px]">
        <div className="hidden sm:flex space-x-8 lg:space-x-12 items-center pl-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-lg font-medium text-[#272343] hover:text-[#029FAE]"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <SearchBar />

        <div className="hidden sm:flex items-center space-x-6">
          <Link
            href="/contact"
            className="text-lg font-medium text-[#272343] hover:text-[#029FAE]"
          >
            Contact
          </Link>
          <span className="text-sm sm:text-base md:text-lg lg:text-md font-medium text-[#272343]">
            (808) 555-0111
          </span>
        </div>
        <div className="sm:hidden flex justify-end">
          <button onClick={toggleMenu} className="text-[#272343]">
            {isMenuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 sm:hidden">
          <div className="absolute top-0 left-0 right-0 bg-white p-4 flex flex-col space-y-6">
            <button
              onClick={toggleMenu}
              className="text-right text-[#272343] mb-4"
            >
              <HiX size={24} className="ml-auto" />
            </button>

            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-[#272343] hover:text-[#029FAE]"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="text-sm font-medium text-[#272343] hover:text-[#029FAE]"
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
