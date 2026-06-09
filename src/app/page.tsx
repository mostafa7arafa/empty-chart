import { Hero } from "@/components/home/Hero";
import { TrustIndicators } from "@/components/home/TrustIndicators";
import { SmartSearch } from "@/components/home/SmartSearch";
import { FeaturedCategories } from "@/components/home/FeaturedCategories";
import { BestSellers } from "@/components/home/BestSellers";
import { ShopByBrand } from "@/components/home/ShopByBrand";
import { AIRecommendations } from "@/components/home/AIRecommendations";
import { Promotions } from "@/components/home/Promotions";
import { LifestyleInspiration } from "@/components/home/LifestyleInspiration";
import { CustomerReviews } from "@/components/home/CustomerReviews";
import { MobileAppPromo } from "@/components/home/MobileAppPromo";
import { Newsletter } from "@/components/home/Newsletter";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustIndicators />
      <SmartSearch />
      <FeaturedCategories />
      <BestSellers />
      <ShopByBrand />
      <AIRecommendations />
      <Promotions />
      <LifestyleInspiration />
      <CustomerReviews />
      <MobileAppPromo />
      <Newsletter />
    </>
  );
}
