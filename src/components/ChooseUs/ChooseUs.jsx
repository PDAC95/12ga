import React from "react";
import SectionHeading from "../SectionHeading/SectionHeading";
import { ButtonCommon } from "../Button/Button";

const chooseUsData = {
  bgText: "Excellence",
  title: "Why Choose Twelve GA Customs",
  desp: "When it comes to premium stainless steel truck parts, Twelve GA Customs stands apart from the competition. Our commitment to quality, innovation, and customer satisfaction has made us the trusted choice for truck owners worldwide who demand nothing but the best.",
  img: "/assets/img/chooseus/choose-us.png",
  list: [
    { title: "Award-Winning Quality" },
    { title: "Premium Stainless Steel" },
    { title: "Custom Fabrication" },
    { title: "Worldwide Shipping" },
  ],
};

const ChooseUs = () => {
  const { bgText, title, desp, list, img } = chooseUsData;

  return (
    <section className="container">
      <div className="ak-height-125 ak-height-lg-80"></div>
      <div className="choose-us-container-extents">
        <div className="choose-us-contain">
          <div className="choose-us-info" data-aos="fade-up">
            <SectionHeading bgText={bgText} title={title} desp={desp} />
            <div className="ak-height-60 ak-height-lg-30"></div>
            <div className="stroke-heading-text">
              {list.map((item) => (
                <h3
                  key={item.title}
                  className="ak-stroke-text hover-color-changes"
                >
                  {item.title}
                </h3>
              ))}
            </div>
            <div className="ak-height-60 ak-height-lg-30"></div>
            <ButtonCommon to="/about"> View More</ButtonCommon>
          </div>
          <div
            className="choose-us-img"
            data-aos="fade-up"
            data-aos-delay="150"
          >
            <img src={img} alt="..." />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChooseUs;
