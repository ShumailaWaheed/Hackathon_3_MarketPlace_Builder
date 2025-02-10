"use client";

import React, { useState } from "react";
import { QuestionMarkCircleIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs"; 
import Link from "next/link";

const TopHeader = () => {
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);

  const toggleLanguageDropdown = () => {
    setIsLanguageDropdownOpen(!isLanguageDropdownOpen);
  };

  const languages = ["English", "Spanish", "French"];

  return (
    <div>
      <div className="bg-[#272343] text-white h-[45px] flex items-center justify-between px-4 max-w-[1920px] mx-auto relative">
        <p className="text-sm font-normal font-inter hidden sm:block">
          Free shipping on all orders over $50
        </p>
        
        <div className="flex items-center space-x-6">
          <div className="relative">
            <div
              className="flex items-center space-x-2 cursor-pointer"
              onClick={toggleLanguageDropdown}
            >
              <span className="text-sm font-normal font-inter">English</span>
              <ChevronDownIcon className="w-4 h-4 text-white hover:text-gray-300 transition-colors duration-200" />
            </div>

            {/* Dropdown Menu */}
            {isLanguageDropdownOpen && (
              <div className="absolute top-8 right-0 bg-white text-black shadow-lg rounded-lg w-30 z-50">
                {languages.map((language, index) => (
                  <div
                    key={index}
                    className="px-4 py-2 text-sm hover:bg-gray-100 hover:text-[#272343] cursor-pointer transition-colors duration-200"
                    onClick={() => {
                      console.log(`Selected: ${language}`);
                      setIsLanguageDropdownOpen(false);
                    }}
                  >
                    {language}
                  </div>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/faq"
            className="flex items-center space-x-2 cursor-pointer hover:text-gray-300"
          >
            <span className="text-sm font-normal font-inter">Faqs</span>
          </Link>

          <div className="flex items-center space-x-2 cursor-pointer">
            <QuestionMarkCircleIcon className="w-5 h-5 text-white" />
            <span className="text-sm font-normal font-inter">Need Help?</span>
          </div>

          <SignedOut>
            <div className="flex items-center space-x-2 cursor-pointer">
              <SignInButton mode="modal">
                <span className="text-sm font-normal font-inter hover:text-gray-300">
                  Sign In
                </span>
              </SignInButton>
            </div>
          </SignedOut>

          <SignedIn>
            <div className="flex items-center space-x-2 cursor-pointer">
              <UserButton />
            </div>
          </SignedIn>
        </div>
      </div>
    </div>
  );
};

export default TopHeader;
