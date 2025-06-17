import React from "react";
import CommonPageHero from "../components/CommonPageHero/CommonPageHero";

const TermsAndConditions = () => {
  return (
    <>
      <CommonPageHero title={"Terms and Conditions"} />

      <div className="ak-height-125 ak-height-lg-80"></div>

      <div className="terms-conditions-page">
        <div className="container">
          <div className="terms-content">
            {/* Introduction */}
            <section className="terms-section" data-aos="fade-up">
              <h2 className="section-title">Introduction</h2>
              <p className="section-text">
                Welcome to 12GA Customs. These Terms and Conditions ("Terms")
                govern your use of our website and services. By accessing or
                using our services, you agree to be bound by these Terms.
              </p>
            </section>

            <div className="ak-height-60 ak-height-lg-40"></div>

            {/* Services */}
            <section
              className="terms-section"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <h2 className="section-title">Our Services</h2>
              <p className="section-text">
                12GA Customs provides custom truck modification services, parts
                sales, and related automotive customization services. All
                services are subject to availability and our professional
                assessment.
              </p>
              <ul className="terms-list">
                <li>Custom truck modifications and upgrades</li>
                <li>Performance enhancement services</li>
                <li>Interior and exterior customization</li>
                <li>Parts sales and installation</li>
                <li>Consultation and design services</li>
              </ul>
            </section>

            <div className="ak-height-60 ak-height-lg-40"></div>

            {/* Payment Terms */}
            <section
              className="terms-section"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <h2 className="section-title">Payment Terms</h2>
              <p className="section-text">
                Payment terms vary by project scope and are agreed upon before
                work begins:
              </p>
              <ul className="terms-list">
                <li>Deposits may be required for custom work</li>
                <li>Final payment due upon project completion</li>
                <li>Additional charges may apply for scope changes</li>
                <li>All prices are subject to applicable taxes</li>
              </ul>
            </section>

            <div className="ak-height-60 ak-height-lg-40"></div>

            {/* Warranty */}
            <section
              className="terms-section"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <h2 className="section-title">Warranty and Liability</h2>
              <p className="section-text">
                We stand behind our work with appropriate warranties on our
                services and parts:
              </p>
              <ul className="terms-list">
                <li>
                  Workmanship warranty as specified in individual contracts
                </li>
                <li>Parts warranty as provided by manufacturers</li>
                <li>Limitation of liability to the extent permitted by law</li>
                <li>Customer responsibility for proper vehicle maintenance</li>
              </ul>
            </section>

            <div className="ak-height-60 ak-height-lg-40"></div>

            {/* Intellectual Property */}
            <section
              className="terms-section"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <h2 className="section-title">Intellectual Property</h2>
              <p className="section-text">
                All content on this website, including designs, logos, and
                custom work examples, are the property of 12GA Customs and
                protected by applicable intellectual property laws.
              </p>
            </section>

            <div className="ak-height-60 ak-height-lg-40"></div>

            {/* Privacy */}
            <section
              className="terms-section"
              data-aos="fade-up"
              data-aos-delay="500"
            >
              <h2 className="section-title">Privacy</h2>
              <p className="section-text">
                Your privacy is important to us. We collect and use personal
                information only as necessary to provide our services and
                communicate with you about your projects.
              </p>
            </section>

            <div className="ak-height-60 ak-height-lg-40"></div>

            {/* Changes to Terms */}
            <section
              className="terms-section"
              data-aos="fade-up"
              data-aos-delay="600"
            >
              <h2 className="section-title">Changes to Terms</h2>
              <p className="section-text">
                We reserve the right to modify these Terms at any time. Changes
                will be effective immediately upon posting to our website.
                Continued use of our services constitutes acceptance of modified
                Terms.
              </p>
            </section>

            <div className="ak-height-60 ak-height-lg-40"></div>

            {/* Contact Information */}
            <section
              className="terms-section"
              data-aos="fade-up"
              data-aos-delay="700"
            >
              <h2 className="section-title">Contact Information</h2>
              <p className="section-text">
                If you have questions about these Terms and Conditions, please
                contact us:
              </p>
              <div className="contact-info">
                <p>
                  <strong>12GA Customs</strong>
                </p>
                <p>45 Massey Rd, Guelph ON N1H 7M6 Canada</p>
                <p>Phone: (519) 766-0943</p>
                <p>Email: hello@12gacustoms.com</p>
              </div>
            </section>

            <div className="ak-height-80 ak-height-lg-60"></div>

            {/* Last Updated */}
            <section
              className="terms-footer"
              data-aos="fade-up"
              data-aos-delay="800"
            >
              <p className="last-updated">
                <em>Last updated: January 2025</em>
              </p>
            </section>
          </div>
        </div>
      </div>

      <div className="ak-height-125 ak-height-lg-80"></div>
    </>
  );
};

export default TermsAndConditions;
