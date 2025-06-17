import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Main from "./layout/Main";
import AOS from "aos";
import ErrorPages from "./pages/ErrorPages";
import Home from "./pages/Home";
import About from "./pages/About";
import Service from "./pages/Service";
import ServicesTwo from "./pages/ServicesTwo";
import Blog from "./pages/Blog";
import SingleBlog from "./pages/SingleBlog";
import Team from "./pages/Team";
import TeamMemberDetails from "./pages/TeamMemberDetails";
import Testimonials from "./pages/Testimonial";
import Gallery from "./pages/Gallery";
import Appointment from "./pages/Appointment";
import Pricing from "./pages/Pricing";
import CommingSoon from "./pages/CommingSoon";
import Faq from "./pages/Faq";
import Contact from "./pages/Contact";
import SingleService from "./pages/SingleService";
import TruckGallery from "./pages/TruckGallery";
import SingleTruck from "./pages/SingleTruck";
import VideoGallery from "./pages/VideoGallery";
import SingleVideo from "./pages/SingleVideo";
import Parts from "./pages/Parts";
import CategoryPage from "./pages/CategoryPage";
import CategoryPageEcommerce from "./pages/CategoryPageEcommerce";
import ProductPage from "./pages/ProductPage";
import TermsAndConditions from "./pages/TermsAndConditions";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import SiteMap from "./pages/SiteMap";

export default function App() {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  return (
    <Routes>
      <Route path="/" element={<Main />}>
        <Route index element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/faq" element={<Faq />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/truck-gallery" element={<TruckGallery />} />
        <Route path="/truck/:id" element={<SingleTruck />} />
        <Route path="/video-gallery" element={<VideoGallery />} />
        <Route path="/video/:id" element={<SingleVideo />} />
        <Route path="/parts" element={<Parts />} />
        <Route path="/parts/:slug" element={<CategoryPage />} />
        <Route path="/product/:slug" element={<ProductPage />} />
        <Route path="/terms" element={<TermsAndConditions />}></Route>
        <Route
          path="/parts-ecommerce/:slug"
          element={<CategoryPageEcommerce />}
        />
        <Route path="/privacy" element={<PrivacyPolicy />}></Route>
        <Route path="/sitemap" element={<SiteMap />}></Route>
        <Route path="/*" element={<ErrorPages />}></Route>
      </Route>
    </Routes>
  );
}
