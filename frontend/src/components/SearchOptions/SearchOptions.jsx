import React from "react";

const searchOptionsData = [
  {
    id: 1,
    number: "01",
    icon: "/assets/img/icon/speedome.svg",
    title: "SELECT YEAR",
    desp: "Choose the year your truck was manufactured. This helps us filter only the parts that truly fit your build.",
  },
  {
    id: 2,
    number: "02",
    icon: "/assets/img//icon/car-repair.svg",
    title: "SELECT MAKE",
    desp: "After selecting the year, choose the manufacturer of your truck to narrow down compatible parts and configurations.",
  },
  {
    id: 3,
    number: "03",
    icon: "/assets/img//icon/car.svg",
    title: "SELECT MODEL",
    desp: "Once you've selected the year and brand, pick your exact model to see all available parts, upgrades, and customization options.",
  },
];

const SearchOptions = ({ openSidebar }) => {
  const handleOpenSidebar = (e) => {
    e.preventDefault();
    if (openSidebar) {
      openSidebar();
    } else {
      console.log("openSidebar function not provided");
    }
  };

  return (
    <>
      <div className="ak-height-75 ak-height-lg-50"></div>
      <div className="center-section-heading" data-aos="fade-up">
        <div className="ak-section-heading ak-style-1">
          <div className="background-text" data-aos="fade-left">
            SEARCH
          </div>
          <div className="text-md-center">
            <a href="#" onClick={handleOpenSidebar}>
              <h2 className="ak-section-title">SEARCH</h2>
            </a>
            <p className="ak-section-subtitle">
              Start your search by selecting your truck's year, brand, and
              model. Once selected, you'll unlock the full
              <br />
              list of compatible parts and customization options tailored just
              for your build.
            </p>
          </div>
        </div>
      </div>
      <div className="ak-height-75 ak-height-lg-50"></div>

      <section className="container">
        <div className="row row-cols-1 row-cols-xl-3 g-4">
          {searchOptionsData?.map((item, index) => (
            <div
              className="service-progress-card"
              key={item.id}
              data-aos="fade-up"
              data-aos-delay={index === 0 ? "" : index === 1 ? "100" : "150"}
            >
              <div className="progress-item">
                <h4 className="ak-stroke-number color-white">{item.number}</h4>
                <div className="ak-border-width"></div>
              </div>
              <div className="service-item">
                <div className="heartbeat-icon">
                  <a href="#" onClick={handleOpenSidebar}>
                    <span className="ak-heartbeat-btn">
                      <img src={item.icon} alt="..." />
                    </span>
                  </a>
                </div>
                <div className="service-info">
                  <a href="#" onClick={handleOpenSidebar}>
                    <h4 className="title">{item.title}</h4>
                    <p className="desp">{item.desp}</p>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default SearchOptions;
