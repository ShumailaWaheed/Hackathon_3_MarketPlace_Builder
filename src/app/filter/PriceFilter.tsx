"use client";

import { FC, useState } from "react";
import ReactSlider from "react-slider";
import { RotateCcw, Filter } from "lucide-react";

interface ProductFiltersProps {
  categories: string[];
}

const ProductFilters: FC<ProductFiltersProps> = ({ categories }) => {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((item) => item !== category)
        : [...prev, category]
    );
  };

  return (
    <div className="sticky top-4 bg-white p-6 rounded-lg shadow-md w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-xs">
      <h3 className="text-xl font-semibold mb-6 flex items-center">
        <Filter size={20} className="mr-2" />
        Filter Products
      </h3>

      {/* Category Filter */}
      <div className="mb-6">
        <h4 className="text-lg font-medium mb-2">Categories</h4>
        <ul className="space-y-2">
          {categories.map((category) => (
            <li key={category} className="flex items-center">
              <input
                type="checkbox"
                id={category}
                value={category}
                onChange={() => handleCategoryChange(category)}
                checked={selectedCategories.includes(category)}
                className="mr-2"
              />
              <label htmlFor={category} className="text-gray-700">
                {category}
              </label>
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-6">
        <h4 className="text-lg font-medium mb-2">Price Range</h4>
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-500">${priceRange[0]}</span>
          <span className="text-gray-500">${priceRange[1]}</span>
        </div>

        <ReactSlider
          min={0}
          max={1000}
          step={10}
          value={priceRange}
          onChange={(range: number[]) => setPriceRange([range[0], range[1]])} 
          className="w-full h-2 bg-gray-300 rounded-lg relative"
          thumbClassName="w-5 h-5 bg-[#029FAE] rounded-full cursor-pointer shadow-md"
          trackClassName="bg-[#029FAE] h-2 rounded-lg"
        />
      </div>

      <div className="flex justify-center">
        <button
          onClick={() => {
            setPriceRange([0, 1000]);
            setSelectedCategories([]);
          }}
          className="flex items-center gap-2 text-[#029FAE] hover:text-blue-800 text-sm font-medium"
        >
          <RotateCcw size={16} />
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default ProductFilters;
