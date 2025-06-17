import React from "react";
import CommonPageHero from "../components/CommonPageHero/CommonPageHero";

const PrivacyPolicy = () => {
  return (
    <>
      <CommonPageHero title={"Privacy Policy"} />

      <div className="ak-height-125 ak-height-lg-80"></div>

      <div className="privacy-policy-page">
        <div className="container">
          <div className="privacy-content">
            {/* Introduction */}
            <section className="privacy-section" data-aos="fade-up">
              <h2 className="section-title">Introduction</h2>
              <p className="section-text">
                At 12GA Customs, we respect your privacy and are committed to
                protecting your personal information. This Privacy Policy
                explains how we collect, use, and safeguard your information
                when you visit our website or use our services.
              </p>
            </section>

            <div className="ak-height-60 ak-height-lg-40"></div>

            {/* Information We Collect */}
            <section
              className="privacy-section"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <h2 className="section-title">Information We Collect</h2>
              <p className="section-text">
                We may collect the following types of information:
              </p>
              <h3 className="subsection-title">Personal Information</h3>
              <ul className="privacy-list">
                <li>Name and contact information (email, phone, address)</li>
                <li>Vehicle information for customization projects</li>
                <li>Payment and billing information</li>
                <li>Project preferences and specifications</li>
              </ul>

              <h3 className="subsection-title">
                Automatically Collected Information
              </h3>
              <ul className="privacy-list">
                <li>Website usage data and analytics</li>
                <li>IP address and browser information</li>
                <li>Cookies and similar tracking technologies</li>
                <li>Pages visited and time spent on our website</li>
              </ul>
            </section>

            <div className="ak-height-60 ak-height-lg-40"></div>

            {/* How We Use Information */}
            <section
              className="privacy-section"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <h2 className="section-title">How We Use Your Information</h2>
              <p className="section-text">
                We use collected information for the following purposes:
              </p>
              <ul className="privacy-list">
                <li>Provide and improve our customization services</li>
                <li>Communicate about projects and appointments</li>
                <li>Process payments and manage billing</li>
                <li>
                  Send newsletters and promotional materials (with consent)
                </li>
                <li>Analyze website usage to improve user experience</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <div className="ak-height-60 ak-height-lg-40"></div>

            {/* Information Sharing */}
            <section
              className="privacy-section"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <h2 className="section-title">Information Sharing</h2>
              <p className="section-text">
                We do not sell, trade, or rent your personal information to
                third parties. We may share information only in the following
                circumstances:
              </p>
              <ul className="privacy-list">
                <li>With service providers who assist in our operations</li>
                <li>When required by law or legal processes</li>
                <li>To protect our rights and safety</li>
                <li>With your explicit consent</li>
              </ul>
            </section>

            <div className="ak-height-60 ak-height-lg-40"></div>

            {/* Data Security */}
            <section
              className="privacy-section"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <h2 className="section-title">Data Security</h2>
              <p className="section-text">
                We implement appropriate technical and organizational measures
                to protect your personal information against unauthorized
                access, alteration, disclosure, or destruction:
              </p>
              <ul className="privacy-list">
                <li>Secure data transmission and storage</li>
                <li>Regular security assessments</li>
                <li>Limited access to personal information</li>
                <li>Employee training on data protection</li>
              </ul>
            </section>

            <div className="ak-height-60 ak-height-lg-40"></div>

            {/* Cookies */}
            <section
              className="privacy-section"
              data-aos="fade-up"
              data-aos-delay="500"
            >
              <h2 className="section-title">Cookies and Tracking</h2>
              <p className="section-text">
                Our website uses cookies to enhance your browsing experience:
              </p>
              <ul className="privacy-list">
                <li>Essential cookies for website functionality</li>
                <li>Analytics cookies to understand usage patterns</li>
                <li>Marketing cookies for personalized content</li>
                <li>You can control cookie preferences in your browser</li>
              </ul>
            </section>

            <div className="ak-height-60 ak-height-lg-40"></div>

            {/* Your Rights */}
            <section
              className="privacy-section"
              data-aos="fade-up"
              data-aos-delay="600"
            >
              <h2 className="section-title">Your Rights</h2>
              <p className="section-text">
                You have the following rights regarding your personal
                information:
              </p>
              <ul className="privacy-list">
                <li>Access to your personal information</li>
                <li>Correction of inaccurate information</li>
                <li>Deletion of your personal information</li>
                <li>Opt-out of marketing communications</li>
                <li>Data portability where applicable</li>
              </ul>
            </section>

            <div className="ak-height-60 ak-height-lg-40"></div>

            {/* Contact Information */}
            <section
              className="privacy-section"
              data-aos="fade-up"
              data-aos-delay="700"
            >
              <h2 className="section-title">Contact Us</h2>
              <p className="section-text">
                If you have questions about this Privacy Policy or our data
                practices, please contact us:
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
              className="privacy-footer"
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

export default PrivacyPolicy;
