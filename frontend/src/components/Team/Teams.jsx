import React from "react";
import SectionHeading from "../SectionHeading/SectionHeading";
import { MoreBtn } from "../Button/Button";
import TeamCard from "./TeamCard";

const membersData = [
  {
    id: 1,
    name: "Dave Mitchell",
    title: "Head Fabricator",
    image: "/assets/img/member/member_1.jpg",
    desp: "20+ years in stainless steel fabrication. Dave leads our shop floor operations and oversees quality control for all custom builds. His expertise in precision welding and metal forming ensures every part meets our exacting standards.",
    socialLinks: {
      linkedin: "https://www.linkedin.com/",
      facebook: "https://www.facebook.com/",
      twitter: "https://www.instagram.com/",
    },
    contact: {
      address: "Guelph, Ontario, Canada",
      email: "fabrication@12gacustoms.com",
      phone: "+1 (519) 766-0943",
      website: "www.12gacustoms.com",
    },
  },
  {
    id: 2,
    name: "Lisa Parker",
    title: "Design Engineer",
    image: "/assets/img/member/member_2.jpg",
    desp: "Mechanical engineer specializing in custom truck part design. Lisa transforms customer ideas into manufacturable designs using CAD software and ensures all parts meet structural and safety requirements.",
    socialLinks: {
      linkedin: "https://www.linkedin.com/",
      facebook: "https://www.facebook.com/",
      twitter: "https://www.instagram.com/",
    },
    contact: {
      address: "Guelph, Ontario, Canada",
      email: "design@12gacustoms.com",
      phone: "+1 (519) 766-0943",
      website: "www.12gacustoms.com",
    },
  },
  {
    id: 3,
    name: "Mark Stevens",
    title: "Quality Supervisor",
    image: "/assets/img/member/member_3.jpg",
    desp: "Former heavy-duty mechanic with deep understanding of truck applications. Mark inspects every finished part and coordinates with customers to ensure perfect fit and finish on all deliveries.",
    socialLinks: {
      linkedin: "https://www.linkedin.com/",
      facebook: "https://www.facebook.com/",
      twitter: "https://www.instagram.com/",
    },
    contact: {
      address: "Guelph, Ontario, Canada",
      email: "quality@12gacustoms.com",
      phone: "+1 (519) 766-0943",
      website: "www.12gacustoms.com",
    },
  },
];

const Teams = () => {
  return (
    <div className="container">
      <div className="ak-height-190 ak-height-lg-80"></div>
      <div className="team-contant">
        <div className="team-heading" data-aos="fade-right">
          <SectionHeading
            bgText={"Team"}
            title={"Our Expert Team"}
            desp={
              "Meet the skilled craftsmen and professionals behind Twelve GA Customs. Our team combines decades of fabrication experience with a passion for innovation, ensuring every part we create meets the highest standards of quality and precision."
            }
          />
          <div className="ak-height-50 ak-height-lg-10"></div>
          <MoreBtn to={"/team"}>VIEW MORE</MoreBtn>
        </div>
        <div
          className="teams"
          data-aos="fade-zoom-in"
          data-aos-easing="ease-in-back"
          data-aos-delay="100"
          data-aos-offset="0"
        >
          <div className="row row-cols-lg-3 row-cols-sm-2 row-cols-1 g-3 g-md-3">
            {membersData?.map((member, index) => (
              <TeamCard key={index} member={member} delay={index * 50} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Teams;