import React from "react";

import HeroSlider from "../components/Sliders/HeroSlider";
import SearchOptions from "../components/SearchOptions/SearchOptions";
import CategoriesPreview from "../components/CategoriesPreview/CategoriesPreview";
import Services from "../components/Services/ServicesSection";
import Videos from "../components/VideoPopUp/Videos";
import TrustedClient from "../components/TrustedClient/TrustedClient";
import Testimonial from "../components/Testimonial/Testimonial";
import PricingTable from "../components/Pricing/PricingTable";
import Blogs from "../components/Blog/Blogs";
import Teams from "../components/Team/Teams";
import AutoCounter from "../components/AutoCounter/AutoCounter";

export default function Home() {
  return (
    <>
      <HeroSlider />
      <SearchOptions />
      <CategoriesPreview />
      <Services styleTypeTwo={true} />
      <Videos videoId={"VcaAVWtP48A"} />
      <AutoCounter />
      <TrustedClient />
      <Testimonial />
      <Teams />
      <PricingTable />
      <Blogs styleTypeTwo={true} />
    </>
  );
}
