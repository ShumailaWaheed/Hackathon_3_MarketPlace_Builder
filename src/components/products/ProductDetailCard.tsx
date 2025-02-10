"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/type/product";

const getBadgeColor = (badge: string) => {
  switch (badge?.toLowerCase()) {
    case "discount":
    case "out of stock":
      return "bg-red-600";
    case "sales":
      return "bg-orange-600";
    case "new":
      return "bg-green-600";
    default:
      return "bg-gray-500";
  }
};

const ProductDetailCard = ({ product }: { product: Product }) => {
  return (
    <div key={product._id} className="relative w-full max-w-sm mx-auto md:max-w-xs lg:max-w-sm xl:max-w-md">
      {product.badge && (
        <div
          className={`absolute top-2 left-2 text-white px-4 py-1 text-xs sm:text-sm font-semibold rounded-lg z-10 ${getBadgeColor(
            product.badge
          )}`}
        >
          {product.badge}
        </div>
      )}
      <Link href={`/products/${product._id}`}>
        <Image
          src={product.image?.asset?.url}
          alt={product.title}
          width={300}
          height={300}
          className="object-cover rounded-lg mb-4 w-full hover:scale-[1.03] transition-transform duration-300"
        />
      </Link>
      <div className="flex justify-between items-center">
        <Link href={`/products/${product._id}`} className="flex-1">
          <span className="text-base sm:text-lg font-medium text-[#272343] hover:underline">{product.title}</span>
        </Link>
        <span className="text-lg font-bold text-[#029FAE] ml-4">{`$${product.price}`}</span>
      </div>
    </div>
  );
};

export default ProductDetailCard;
