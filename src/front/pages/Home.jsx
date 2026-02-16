import React, { useEffect, useState } from "react";
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import SkillBankBanner  from "../components/SkillBankBanner.jsx";
import SkillBankAbout from "../components/SkillBankAbout.jsx"
import SkillBankHowItWork from "../components/SkillBankHowItWork.jsx"



import InfoCard from "../components/InfoCard.jsx";

export const Home = () => {

  return (
    <div>
        <SkillBankBanner />
        <SkillBankAbout />
        <SkillBankHowItWork />
    </div>
  );
};
