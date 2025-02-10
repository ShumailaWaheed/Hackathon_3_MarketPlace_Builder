import { fetchProduct } from "../fetchproduct";
import ProductPageClient from "../productClient";
import { notFound } from "next/navigation";
import { Product } from "@/type/product";
import { client } from "@/sanity/lib/client";

interface ProductPageProps {
  params: {
    id: string;
  };
}

const ProductPage = async ({ params }: ProductPageProps) => {
  const product = await fetchProduct(params.id);

  if (!product) {
    notFound(); 
  }

  
  const query = `*[_type == "products" ] | order(_createdAt desc){
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

  const featuredProducts: Product[] = await client.fetch(query);

  return (
    <div>
      <ProductPageClient product={product} featuredProducts={featuredProducts} />
    </div>
  );
};

export default ProductPage;
