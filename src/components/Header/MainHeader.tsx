"use client";

import React from "react";
import Image from "next/image";
import { ShoppingCartIcon, HeartIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishListContext";

const MainHeader = () => {
  const { cart } = useCart();
  const { wishlist } = useWishlist();

  return (
    <div className="bg-[#F0F2F3] p-2 flex items-center justify-between max-w-[1920px] mx-auto h-[60px] md:h-[80px]">
      <div className="flex items-center space-x-4">
        <div className="w-10 h-10 md:w-12 md:h-12">
        <Link href="/">
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={48}
            height={48}
            className="rounded-full ml-2"
          />
          </Link>
        </div>
        <h1 className="text-lg xl-text-xl md:text-2xl font-semibold text-[#272343]">Comforty</h1>
      </div>
      <div className="flex items-center space-x-4">
        <div className="w-[80px] h-[30px] lg:w-[132px] lg:h-[42px] md:w-[130px] md:h-[40px] bg-white flex items-center justify-between px-3 border border-[#272343]">
          <Link href="/wishlist" className="flex items-center space-x-1">
            <HeartIcon className="w-5 h-5 text-[#272343] cursor-pointer" />
            <span className="hidden sm:inline font-bold text-sm text-[#272343]">Wishlist</span>
          </Link>
          <div className="w-5 h-5 ml-2 rounded-full bg-[#029FAE] flex items-center justify-center text-white text-xs font-semibold">
            <span>{wishlist.length}</span>
          </div>
        </div>
        <div className="w-[80px] h-[30px] lg:w-[118px] lg:h-[42px] md:w-[110px] md:h-[40px] bg-white flex items-center justify-between px-3 border border-[#272343]">
          <Link href="/cart" className="flex items-center space-x-1">
            <ShoppingCartIcon className="w-5 h-5 text-[#272343] cursor-pointer" />
            <span className="hidden sm:inline font-bold text-[#272343]">Cart</span>
          </Link>
          <div className="w-5 h-5 rounded-full bg-[#029FAE] flex items-center justify-center text-white text-xs font-semibold">
            <span>{cart.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainHeader;

