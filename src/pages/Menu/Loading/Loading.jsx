import React from "react";
import bg from "../../../assets/images/bg_hero.jpg";
import "./Loading.css";

const Loading = () => {
  return (
    <>
      <div className="background-container">
        <img src={bg} alt="Background" className="background-image" />
        <div className="glassmorphism"></div>
        <div className="loader-wrapper">
          <div className="loader"></div>
        </div>
      </div>
    </>
  );
};

export default Loading;
