import { useState } from "react";

const tabContents = [
  {
    title: "Mission",
    description:
      "Our mission is to craft premium stainless steel truck parts that elevate the look, functionality, and durability of heavy-duty trucks. We're committed to delivering award-winning custom solutions that exceed expectations and help truck owners express their unique style while maintaining professional standards.",
  },
  {
    title: "Vision",
    description:
      "To be the leading manufacturer of custom stainless steel truck parts globally, recognized for exceptional craftsmanship, innovative design, and uncompromising quality. We envision a future where every truck on the road can showcase the perfect blend of style and functionality through our products.",
  },
  {
    title: "History",
    description:
      "Founded in Ontario, Canada, Twelve GA Customs has grown from a small fabrication shop to an award-winning manufacturer of premium truck parts. Our journey began with a passion for precision craftsmanship and a vision to create the highest quality stainless steel accessories for the trucking industry.",
  },
];

const CompanyTab = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <div className="container">
      <div className="ak-height-125 ak-height-lg-80"></div>
      <div className="company-tab">
        <ul className="tabs">
          {tabContents?.map((tab, index) => (
            <li
              key={index}
              className={activeTab === index ? "active-tab" : ""}
              onClick={() => handleTabClick(index)}
            >
              {tab.title}
            </li>
          ))}
        </ul>

        <div className="tabs-content">
          <div className="list">
            <div className="ak-section-heading ak-style-1">
              <div className="background-text">About</div>
              <h3 className="desp">{tabContents[activeTab].description}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyTab;
