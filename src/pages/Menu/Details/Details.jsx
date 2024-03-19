import React, { useState } from "react";
import "./details.css";
import { FaRegHeart } from "react-icons/fa";
// import { FaRegStar } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
// import { useSelector } from "react-redux";

const Details = () => {
  const [filled, setFilled] = useState(false);

  // const data = useSelector((state) => state.products.detailProduct);
  const data = JSON.parse(localStorage.getItem("myData"));
  const handleLike = () => {
    setFilled(!filled);
  };

  return (
    <div className="_bg">
      <div className="_card">
        <div className="_card_img">
          <img src={data.image.secure_url} alt="pizza" />
          <span className="_like">
            {filled ? (
              <FaHeart className="_bg" onClick={handleLike} />
            ) : (
              <FaRegHeart onClick={handleLike} />
            )}
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

            {/* <div className="_rating">
            <span className="_star">
              <FaRegStar />
            </span>
            <span className="_star">
              <FaRegStar />
            </span>
            <span className="_star">
              <FaRegStar />
            </span>
            <span className="_star">
              <FaRegStar />
            </span>
            <span className="_star">
              <FaRegStar />
            </span>
          </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
