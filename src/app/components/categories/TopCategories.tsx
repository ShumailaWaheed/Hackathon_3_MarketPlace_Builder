import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { Product } from "@/type/product";

const TopCategoriesPage = async () => {
  const query = `*[_type == "categories"]{
    _id,
    title,
    image {
      asset -> {
        _id,
        url
      }
    },
    products
  }`;

  const categories:Product[] = await client.fetch(query);

  return (
    <section className="w-full max-w-[1920px] bg-white mx-auto py-20 px-4">
      <h2 className="lg:text-4xl md:text-3xl text-2xl font-bold text-[#272343] mb-6 text-center sm:text-left">
        Top Categories
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div
            key={category._id}
            className="relative w-full h-[300px] sm:h-[350px] lg:h-[424px] bg-gray-100 rounded-lg overflow-hidden group"
          >
            <Image
              src={category.image.asset.url}
              alt={category.title}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white px-4 py-2 rounded w-full h-[85px]">
              <h3 className="text-lg font-semibold">{category.title}</h3>
              <p className="text-sm">{category.products}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopCategoriesPage;

