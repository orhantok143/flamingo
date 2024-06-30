import React, { useState } from "react";
import "./food.css";
import { FaRegHeart, FaRegStar } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

const Food = ({ data }) => {
  const [filled, setFilled] = useState(false);

  const handleLike = () => {
    setFilled(!filled);
  };

  const handleClick = (data) => {
    localStorage.setItem("myData", JSON.stringify(data));
  };

  return (
    <div className="card">
      <div className="card_img">
        <img src={data.image.secure_url} alt="pizza" />
        <span className="like">
          {filled ? (
            <FaHeart className="bg" onClick={handleLike} />
          ) : (
            <FaRegHeart onClick={handleLike} />
          )}
        </span>
      </div>
      <div className="card_text">
        <div className="title_price">
          <h4 className="title"> {data.title} </h4>
          <span className="price"> {data.price} TL</span>
        </div>
        <div className="rating">
          <div className="desc">
            <p>{data.description.substring(0, 30)}</p>

            <Link
              className="btn"
              to={`../${data._id}`}
              onClick={() => handleClick(data)}
            >
              Devamı
            </Link>
          </div>

          <div className="__rating">
            <span className="star">
              <FaRegStar />
            </span>
            <span className="star">
              <FaRegStar />
            </span>
            <span className="star">
              <FaRegStar />
            </span>
            <span className="star">
              <FaRegStar />
            </span>
            <span className="star">
              <FaRegStar />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Food;
