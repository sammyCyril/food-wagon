import CTASection from "@/components/feautures/home/CTASection";
import FeaturedRestaurants from "@/components/feautures/restaurant/FeaturedRestaurants";
import FoodGrid from "@/components/feautures/food/FoodGrid";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/feautures/home/Hero";
import HowItWorks from "@/components/feautures/home/HowItWorks";
import Navbar from "@/components/layout/Navbar";
import PopularItems from "@/components/feautures/food/PopularItems";
import PromoCard from "@/components/feautures/home/PromoCard";
import SearchByFood from "@/components/feautures/food/SearchByFood";

export default function Home() {

  return (
    <>
      {/* <Navbar /> */}
      <Hero />
      <FoodGrid />
      <HowItWorks />
      <PopularItems />
      <FeaturedRestaurants />
      <SearchByFood />
      <PromoCard />
      <CTASection />
      {/* <Footer /> */}
    </>


    // <>
    //   <Navbar />
    //   <Hero />
    //   <FoodGrid />
    //   <HowItWorks />
    //   <PopularItems />
    //   <FeaturedRestaurants />
    //   <SearchByFood />
    //   <PromoCard />
    //   <CTASection />
    //   <Footer />
    // </>


  );
}
