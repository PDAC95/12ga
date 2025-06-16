import React, { useState } from "react";
import AccordionItem from "./AccordionItem";

const faqItems = [
  {
    title: "What truck makes and models do you specialize in?",
    content:
      "We specialize in custom parts for all major truck manufacturers including Peterbilt, Kenworth, Freightliner, Mack, Volvo, and International. Our parts are designed to fit models from 2015 onwards, with some compatibility extending to older models. Each product page shows specific fitment information.",
  },
  {
    title: "How long does it take to manufacture custom parts?",
    content:
      "Lead times vary depending on the complexity of the part and our current production schedule. Standard parts typically take 2-3 weeks, while custom or specialized parts may take 4-6 weeks. Rush orders are available for urgent needs with an additional fee.",
  },
  {
    title: "Do you offer installation services?",
    content:
      "Yes, we offer professional installation services at our Ontario facility. We also provide detailed installation instructions and support for customers who prefer to install parts themselves. For complex installations, we recommend professional installation to ensure proper fitment and warranty coverage.",
  },
  {
    title: "What materials do you use for your custom parts?",
    content:
      "We use only premium materials including high-grade steel, aluminum, and stainless steel. All our parts undergo rigorous quality control and are built to withstand harsh road conditions. We offer various finishes including chrome, powder coating, and polished aluminum.",
  },
  {
    title: "What warranty do you provide on your parts?",
    content:
      "We stand behind our craftsmanship with comprehensive warranties. Most parts come with a 2-year warranty against manufacturing defects, while chrome finishes have a lifetime warranty. Custom parts are covered for 1 year. Specific warranty details are provided with each purchase.",
  },
  {
    title: "Can you create completely custom parts from my design?",
    content:
      "Absolutely! We specialize in bringing your custom ideas to life. Send us your sketches, CAD files, or detailed descriptions, and our design team will work with you to create a unique part for your truck. We offer design consultation and 3D modeling to ensure the final product meets your exact specifications.",
  },
  {
    title: "How do I know if a part will fit my specific truck?",
    content:
      "Use our truck selector tool to filter parts by your exact year, make, and model. Each product page includes detailed fitment information and compatibility notes. If you're unsure, contact us with your VIN number and we'll verify compatibility before you order.",
  },
  {
    title: "Do you ship internationally?",
    content:
      "Yes, we ship worldwide from our Ontario, Canada location. Shipping costs and delivery times vary by destination. International orders may be subject to customs duties and taxes determined by the destination country. We provide tracking information for all shipments.",
  },
];

const Accordion = () => {
  const [openIndex, setOpenIndex] = useState(null); // Cambiado de 0 a null

  const handleToggle = (index) => {
    // Si el item clickeado ya está abierto, cerrarlo (setear a null)
    // Si está cerrado o es diferente, abrirlo
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="ak-accordion">
      {faqItems.map((item, index) => (
        <AccordionItem
          key={index}
          index={index}
          title={item.title}
          content={item.content}
          isOpen={openIndex === index}
          onToggle={handleToggle}
        />
      ))}
    </div>
  );
};

export default Accordion;
