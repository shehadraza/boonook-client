import type { Metadata } from "next";
import HeroSlider from "@/components/home/HeroSlider";
import NewArrivals from "@/components/home/NewArrivals";
import AwardBooks from "@/components/home/AwardBooks";
import HowItWorks from "@/components/home/HowItWorks";
import TopCategories from "@/components/home/TopCategories";

export const metadata: Metadata = { title: "BookNook | Home" };

export default function Home() {
  return (
    <>
      <HeroSlider />
      <NewArrivals />
      <AwardBooks />
      <HowItWorks />
      <TopCategories />
    </>
  );
}