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

import TruckSidebar from "../components/TruckSidebar/TruckSidebar";
import { useTruckSidebar } from "../helper/useTruckSidebar";

export default function Home() {
  // IMPORTANTE: Este hook DEBE llamarse SIEMPRE en el mismo lugar
  const { isSidebarOpen, openSidebar, closeSidebar } = useTruckSidebar();

  return (
    <>
      <HeroSlider openSidebar={openSidebar} />
      <SearchOptions openSidebar={openSidebar} />
      <CategoriesPreview />
      <Cta />
      <TruckGalleryPreview />
      <VideoSection videoId={"SWB6-NBV8Qs"} />

      {/* Sidebar SIEMPRE debe renderizarse */}
      <TruckSidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
    </>
  );
}
