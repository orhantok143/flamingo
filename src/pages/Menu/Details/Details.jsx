import React, { useState } from "react";
import "./details.css";
import { FaRegHeart } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Details = () => {
  const [filled, setFilled] = useState(false);
  const navigator = useNavigate();

  // const data = useSelector((state) => state.products.detailProduct);
  const data = JSON.parse(localStorage.getItem("myData"));
  const handleLike = () => {
    setFilled(!filled);
  };

  const handleBack = () => {
    navigator("");
  };

  return (
    <div className="_bg">
      <div className="_card">
        <div className="_card_img">
          <img src={data.image.secure_url} alt="pizza" />
          <span className="_like">
            {filled ? (
              <FaHeart className="bg" onClick={handleLike} />
            ) : (
              <FaRegHeart onClick={handleLike} />
            )}
          </span>
          <span className="_back">
            <IoIosArrowBack onClick={handleBack} />
          </span>
        </div>
        <div className="_card_text">
          <div className="_title_price">
            <h4 className="_title"> {data.title} </h4>
            <span className="_price"> {data.price} TL</span>
          </div>
          <div className="_rating">
            <div className="_desc">
              <p>{data.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
