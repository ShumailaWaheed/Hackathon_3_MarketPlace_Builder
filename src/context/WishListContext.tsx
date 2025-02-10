"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface WishlistItem {
  id: string;
  name: string;
  image: string;
  price: number;
}

interface WishlistContextType {
  wishlist: WishlistItem[];
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (id: string) => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const useWishlist = (): WishlistContextType => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);

  useEffect(() => {
    const storedWishlist = localStorage.getItem("wishlist");
    if (storedWishlist) {
      setWishlist(JSON.parse(storedWishlist));
    }
  }, []);

  const addToWishlist = (item: WishlistItem) => {
    setWishlist((prev) => {
      const existingItem = prev.find((i) => i.id === item.id);
      if (!existingItem) {
        const updatedWishlist = [...prev, item];
        localStorage.setItem("wishlist", JSON.stringify(updatedWishlist)); // Save to localStorage
        return updatedWishlist;
      }
      return prev;
    });
  };

  const removeFromWishlist = (id: string) => {
    setWishlist((prev) => {
      const updatedWishlist = prev.filter((item) => item.id !== id);
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist)); 
      return updatedWishlist;
    });
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};
