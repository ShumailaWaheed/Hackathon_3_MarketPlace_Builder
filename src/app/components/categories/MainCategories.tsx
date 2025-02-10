import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { Product } from "@/type/product";

const CategoriesPage = async () => {
  const query = `*[_type == "products" && "gallery" in tags] | order(title)[1..5]{
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

  const products: Product[] = await client.fetch(query);

  return (
    <section className="relative w-full max-w-[1920px] bg-white mx-auto px-4 py-5">
      <div className="absolute bottom-20 transform -rotate-90 origin-left text-[#272343] font-bold lg:text-3xl md:text-xl text-xl ml-5 whitespace-nowrap">
        EXPLORE NEW AND POPULAR STYLES
      </div>

      <div className="grid grid-cols-1 bg-gray-50 lg:grid-cols-2 gap-6 ml-[50px] lg:ml-[60px]">
        <div className="relative h-[300px] md:h-[400px] lg:h-[648px] group">
          <div className="absolute left-4 top-4 text-white bg-black bg-opacity-50 px-3 py-1 rounded-md">
            <h3 className="text-lg font-semibold">{products[0].title}</h3>
          </div>
          <Image
            src={products[0].image.asset.url}
            alt={products[0].title}
            layout="fill"
            objectFit="cover"
            className="hover:scale-[1.03] transition-transform duration-300"
          />
        </div>

        <div className="grid grid-cols-2 gap-4 md:gap-6">
          {products.slice(1).map((category) => (
            <div
              key={category._id}
              className="relative w-full h-[150px] md:h-[200px] lg:h-[312px] group"
            >
              <div className="absolute left-4 top-4 text-white bg-black bg-opacity-50 px-3 py-1 rounded-md">
                <h3 className="text-sm md:text-base font-medium">
                  {category.title}
                </h3>
              </div>
              <Image
                src={category.image.asset.url}
                alt={category.title}
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesPage;

