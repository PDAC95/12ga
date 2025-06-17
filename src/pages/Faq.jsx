import React from "react";

import Videos from "../components/VideoPopUp/Videos";
import CommonPageHero from "../components/CommonPageHero/CommonPageHero";
import FrequentlyQuestions from "../components/FrequentlyQuestions/FrequentlyQuestions";

const Faq = () => {
  return (
    <>
      <CommonPageHero title={"Faq"} />
      <FrequentlyQuestions />
    </>
  );
};

export default Faq;
