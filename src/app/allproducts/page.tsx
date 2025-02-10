import { client } from "@/sanity/lib/client";
import ProductCard from "@/components/products/ProductCard";
import { Product } from "@/type/product";
import Image from "next/image";

const AllProduct = async () => {
  const query = `*[_type == "products"] | order(_createdAt desc){
    _id,
    title,
    price,
    priceWithoutDiscount,
    badge,
    image {
      asset-> {
        _id,
        url
      }
    },
    category-> {
      title
    },
    description,
    inventory,
    tags
  }`;

  const AllProducts: Product[] = await client.fetch(query);

  const instagramImages = AllProducts.map(product => product.image.asset.url);
  const instagramImagesLimited = instagramImages.slice(0, 6);

  return (
    <section className="w-full max-w-[1920px] bg-white mx-auto py-10 px-4">
      <h2 className="lg:text-4xl md:text-3xl text-2xl font-bold text-[#272343] mb-8">
        All Products
      </h2>
      {AllProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
          {AllProducts.map((product) => (
            <div key={product._id} className="relative">
              {product.badge && (
                <div
                  className="absolute top-2 left-2 text-white px-4 py-1 text-sm font-semibold rounded-lg z-10 bg-green-500"
                >
                  {product.badge}
                </div>
              )}
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center">No All products available.</p>
      )}

      <div className="bg-gray-100 py-12 mt-20">
        <div className="text-center mb-12">
          <h2 className="lg:text-4xl md:text-3xl text-2xl font-bold text-[#272343] mb-2">
            Subscribe to the Newsletter
          </h2>
          <div className="flex items-center justify-center gap-4 max-w-[400px] mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="w-full px-4 py-2 border-b-2 border-gray-500 focus:ring-0 focus:border-[#029FAE] outline-none bg-transparent"
            />
            <button className="px-6 py-2 text-[#272343] rounded-lg border-b-2 border-gray-500 hover:text-[#029FAE] hover:border-[#029FAE] focus:ring-0 transition-all">
              Submit
            </button>
          </div>
        </div>
      </div>

      <div className="bg-gray-100 text-center mt-[-20px]">
        <h2 className="lg:text-4xl md:text-3xl text-2xl font-bold text-[#272343] mb-6">
          Follow Products and Discounts on Instagram
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {instagramImagesLimited.map((image, index) => (
            <div key={index} className="c">
              <Image
                src={image}
                alt={`Instagram ${index + 1}`}
                width={186}
                height={186}
                className="rounded-lg object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AllProduct;



