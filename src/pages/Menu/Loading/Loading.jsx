import React from "react";
import bg from "../../../assets/images/bg_hero.jpg";
import "./Loading.css";

const Loading = () => {
  return (
    <>
      <div class="background-container">
        <img src={bg} alt="Background" class="background-image" />
        <div class="glassmorphism"></div>
        <div class="loader-wrapper">
          <div class="loader"></div>
        </div>
      </div>
    </>
  );
};

export default Loading;
