import React from "react";

import HeroSlider from "../components/Sliders/HeroSlider";
import SearchOptions from "../components/SearchOptions/SearchOptions";
import CategoriesPreview from "../components/CategoriesPreview/CategoriesPreview";
import Services from "../components/Services/ServicesSection";
import VideoSection from "../components/VideoPopUp/VideoSection";
import TrustedClient from "../components/TrustedClient/TrustedClient";
import Testimonial from "../components/Testimonial/Testimonial";
import PricingTable from "../components/Pricing/PricingTable";
import Blogs from "../components/Blog/Blogs";
import Teams from "../components/Team/Teams";
import AutoCounter from "../components/AutoCounter/AutoCounter";
import Cta from "../components/Cta/Cta";
import TruckGalleryPreview from "../components/TruckGalleryPreview/TruckGalleryPreview";

export default function Home() {
  return (
    <>
      <HeroSlider />
      <SearchOptions />
      <CategoriesPreview />
      <Cta />
      <TruckGalleryPreview />
      <VideoSection videoId={"SWB6-NBV8Qs"} />
    </>
  );
}
