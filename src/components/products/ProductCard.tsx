import Link from "next/link";
import Image from "next/image";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { Product } from "@/type/product";

type ProductCardProps = {
  product: Product;
};

const getBadgeColor = (badge: string) => {
  if (!badge) return "bg-gray-500";

  switch (badge.toLowerCase()) {
    case "discount":
    case "out of stock":
      return "bg-red-600";
    case "sales":
      return "bg-orange-600"; 
    case "new":
      return "bg-green-600";
    default:
      return "bg-gray-600"; 
  }
};

const ProductCard = ({ product }: ProductCardProps) => {
  const imageUrl = product.image?.asset?.url || "/fallback-image.jpg";

  return (
    <div className="relative bg-transparent group">
      {product.badge && (
        <div
          className={`absolute top-2 left-2 text-white px-4 py-1 text-sm font-semibold rounded-lg z-10 ${getBadgeColor(
            product.badge
          )}`}
        >
          {product.badge}
        </div>
      )}

      {/* Product Image */}
      <div className="w-full aspect-square relative">
        <Image
          src={imageUrl}
          alt={product.title}
          layout="fill"
          objectFit="cover"
          className="rounded-lg hover:scale-[1.03] transition-transform duration-300"
          priority={true}
        />
      </div>

      {/* Product Info */}
      <div className="flex items-center justify-between w-full mt-1">
        <div className="flex flex-col items-start">
          <Link href={`/products/${product._id}`} passHref>
            <h3
              className="text-base font-semibold text-[#272343] hover:text-[#029FAE] transition-colors duration-200 cursor-pointer"
              title={product.title}
            >
              {product.title}
            </h3>
          </Link>
          <div className="flex items-center space-x-2">
            <p className="text-lg font-bold text-[#272343]">${product.price}</p>
            {product.originalPrice && (
              <p className="text-sm text-gray-500 line-through">
                ${product.originalPrice}
              </p>
            )}
          </div>
        </div>
        <Link href={`/products/${product._id}`} passHref>
        <button
          className="w-[44px] h-[44px] bg-[#F0F2F3] rounded flex items-center justify-center group-hover:bg-[#029Fae] transition-all duration-300 focus:outline-none"
          aria-label="Add to Cart"
        >
          <ShoppingCartIcon className="w-[29px] h-[29px] text-black group-hover:text-black" />
        </button>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
