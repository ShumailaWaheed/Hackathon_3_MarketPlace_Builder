
import HeroSection from "@/components/HeroSection/Hero";
import Logos from "@/components/HeroSection/ComponyLogos";
import FeaturedProducts from "./components/ProductListing/FeaturedProducts";
import CategoriesPage from "./components/categories/TopCategories";
import Mainacategories from "./components/categories/MainCategories";
import OurProducts from "./components/ProductListing/OurProducts";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <Logos />
      <FeaturedProducts />
      <CategoriesPage />
      <Mainacategories />
      <OurProducts />
    </div>
  );
};

export default Home;
