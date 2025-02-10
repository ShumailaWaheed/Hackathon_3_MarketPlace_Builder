import { Product } from "@/type/product";
import { client } from "@/sanity/lib/client";
import ProductCard from "@/components/products/ProductDetailCard";
import ProductFilters from "./PriceFilter";
import PaginationControls from "./pagination/PaginationControl";

const PRODUCTS_PER_PAGE = 8;

const fetchProducts = async () => {
  const query = `*[_type == "products"] | order(_createdAt desc) {
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

  return await client.fetch(query);
};

export default async function ShopProducts({ searchParams }: { searchParams: { page?: string } }) {
  const allProducts: Product[] = await fetchProducts();
  const totalPages = Math.ceil(allProducts.length / PRODUCTS_PER_PAGE);
  const currentPage = Math.max(1, Math.min(totalPages, Number(searchParams.page) || 1));
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const displayedProducts = allProducts.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);

  const categories = Array.from(
    new Set(allProducts.map((p) => p.category?.title).filter(Boolean))
  ) as string[];

  const filtered = displayedProducts.filter(product => (product.inventory ?? 0) > 0);

  return (
    <section className="w-full max-w-[1920px] bg-white mx-auto py-10 px-4">
      <div className="flex flex-col sm:flex-row gap-6">
        <div className="w-full sm:w-1/4 mb-6 sm:mb-0 sm:sticky sm:top-20">
          <ProductFilters categories={categories} />
        </div>
          
        <div className="w-full sm:w-3/4">
          {filtered.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filtered.map((product) => (
                  <div key={product._id} className="relative">
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
              <PaginationControls currentPage={currentPage} totalPages={totalPages} />
            </>
          ) : (
            <p className="text-center">No products available.</p>
          )}
        </div>
      </div>
    </section>
  );
}
