import React from "react";
import SectionHeading from "../SectionHeading/SectionHeading";

const contactData = [
  {
    label: "Mail",
    icon: "/assets/img/icon/email.svg",
    info: ["sales@12gacustoms.com", "accounting@12gacustoms.com"],
  },
  {
    label: "Location",
    icon: "/assets/img/icon/location.svg",
    info: ["45 Massey Road", "Guelph, On Canada"],
  },
  {
    label: "Phone",
    icon: "/assets/img/icon/phone.svg",
    info: ["519-766-0943"],
  },
  {
    label: "Open Hour",
    icon: "/assets/img/icon/date-icon.svg",
    info: ["Mon - Fri 7AM – 5PM"],
  },
];

const ContactInfo = () => {
  return (
    <div className="container">
      <div className="ak-height-125 ak-height-lg-80"></div>
      <div className="contact-info">
        <div className="left-info" data-aos="fade-right">
          <div className="content">
            <SectionHeading
              bgText={"Contact"}
              title={"Contact"}
              desp={
                "We create custom truck parts that combine style, durability, and performance. Our skilled craftsmen use premium materials to manufacture everything from chrome grilles to custom sleeper panels, ensuring your truck stands out on the road."
              }
            />
          </div>
        </div>

        <div className="right-info">
          {contactData.map((item, index) => (
            <div className="info-card" key={index} data-aos="fade-left">
              <p>{item.label} :</p>
              <div className="d-flex gap-2 align-items-center">
                <div>
                  <img src={item.icon} alt={item.label} />
                </div>
                <div>
                  {item.info.map((info, idx) => (
                    <p key={idx}>{info}</p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
