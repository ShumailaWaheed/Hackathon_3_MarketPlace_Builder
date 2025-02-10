"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";

interface Suggestion {
  name: string;
  image: string;
}

const products: Suggestion[] = [
  { name: "Library Stool Chair", image: "/images/product-01.png" },
  { name: "Rose Lux ArmChair", image: "/images/product-02.png" },
  { name: "Citru Edge", image: "/images/product-03.png" },
  { name: "Ivory Charm", image: "/images/product-04.png" },
  { name: "Gray Elegance", image: "/images/product-05.png" },
  { name: "Nordic Spin", image: "/images/product-08.png" },
  { name: "Library Stool Chair", image: "/images/product-09.png" },
  { name: "Modren Cozy", image: "/images/product-01.png" }
];

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const router = useRouter();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim() !== "") {
      // Filter products based on the search query
      const filteredSuggestions = products.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      router.push(`/filter?query=${searchQuery.trim()}`);
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion: Suggestion) => {
    setSearchQuery(suggestion.name);
    setSuggestions([]);
    router.push(`/filter?query=${suggestion.name}`);
  };

  return (
    <form
      onSubmit={handleSearchSubmit}
      className="relative flex-1 mx-4 flex sm:max-w-[400px] w-full z-20" // Ensure search bar is above other content
    >
      <input
        type="text"
        placeholder="Search for products, categories..."
        value={searchQuery}
        onChange={handleSearchChange}
        className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#029FAE] pr-12 text-lg"
      />
      
      <Link href={`/filter`}>
        <button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[#029FAE] font-semibold py-3 px-6 rounded-full hover:bg-[#029FAE] hover:text-white transition-all duration-300"
        >
          <MagnifyingGlassIcon className="w-6 h-6" />
        </button>
      </Link>

      {suggestions.length > 0 && (
        <div className="absolute top-full left-0 w-full bg-white border border-gray-300 mt-1 rounded-lg shadow-lg z-30"> {/* Ensure the dropdown is on top */}
          <ul>
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                className="px-4 py-3 text-sm text-[#272343] hover:bg-[#029FAE] hover:text-white cursor-pointer flex items-center space-x-3"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                <Image
                  src={suggestion.image || "/images/placeholder.png"}
                  alt={suggestion.name}
                  width={40}
                  height={40}
                  className="object-cover rounded-full"
                />
                <span>{suggestion.name}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </form>
  );
};

export default SearchBar;