import React from "react";
import { Link } from "react-router-dom";
import { CtaBtn } from "../Button/Button";

const ctaData = {
  title: "Ready to Transform Your Truck?",
  description:
    "Get in touch with our fabrication experts to discuss your custom stainless steel project. From flip bumpers to complete truck makeovers, we'll help bring your vision to life with award-winning quality and craftsmanship.",
};

const Cta = () => {
  const { title, description } = ctaData;

  return (
    <div className="container">
      <div className="ak-height-125 ak-height-lg-80"></div>
      <div className="cta" data-aos="fade-right">
        <span className="border-pr"></span>
        <span className="border-wh"></span>
        <div className="cta-info">
          <h2 className="cta-title" data-aos="fade-left" data-aos-delay="100">
            {title}
          </h2>
          <p className="cta-desp">{description}</p>
          <CtaBtn to="/contact">START YOUR PROJECT</CtaBtn>
        </div>
      </div>
    </div>
  );
};

export default Cta;