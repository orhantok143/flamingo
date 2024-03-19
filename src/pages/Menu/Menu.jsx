import React, { useState } from "react";
import "./menu.css";
import { GiFlamingo } from "react-icons/gi";
import { TiHome } from "react-icons/ti";
import { TbToolsKitchen2 } from "react-icons/tb";
import { FaCoffee } from "react-icons/fa";
import { GiCakeSlice } from "react-icons/gi";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Food from "./food/Food";
import Slick from "react-slick";
import { Swiper, SwiperSlide } from "swiper/react";
import { Grid } from "swiper/modules";
import { useDispatch, useSelector } from "react-redux";
// import { getCategories } from "../../redux/category/categorySlice";

// Import Swiper styles
import "swiper/css";
import "swiper/css/grid";
import {
  setCurrentCategory,
  setCurrentSubCategory,
} from "../../utilis/selector";
import {
  setCategory,
  setSubCategory,
} from "../../redux/category/categorySlice";

const Menu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  // const categories = useSelector(selectCategories);
  const categories = JSON.parse(localStorage.getItem("Categories"));

  // const products = useSelector(selectProducts);
  const products = JSON.parse(localStorage.getItem("Products"));
  console.log(products);
  console.log(categories);
  const currentCategory = useSelector(setCurrentCategory);
  const currentSubCategory = useSelector(setCurrentSubCategory);

  const handleOnChange = (e) => {
    setSearch(e.target.value);
  };

  const handleClick = (data) => {
    localStorage.setItem("myData", JSON.stringify(data));
    navigate("../detail");
  };

  let p =
    search !== ""
      ? products.product.filter((p) =>
          p.title.trim().toLowerCase().includes(search.trim().toLowerCase())
        )
      : products.product.filter((p) => p.subCategory === currentSubCategory);

  console.log("P:", p);

  const settings = {
    speed: 500,
    slidesToShow: 9,
    slidesToScroll: 5,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
        },
      },
    ],
  };

  return (
    <section className="menu">
      <div className="top__navbar">
        <Link to="/" className="home_link">
          <GiFlamingo className="icon flamingo" />
        </Link>
        <div className="search_item">
          <input
            className="_search"
            type="search"
            placeholder="Ara"
            onChange={(e) => handleOnChange(e)}
          />
          {/* <p>Masa No: B-7</p> */}
        </div>
      </div>

      <div className="food">
        <div className="category ">
          <Slick {...settings}>
            {categories.categories
              ?.filter((c) => c.title === currentCategory)[0]
              ?.subCategory.map((category, i) => (
                <Link
                  className={
                    currentSubCategory === category.subCategory
                      ? " active "
                      : ""
                  }
                  key={i}
                  to=""
                  onClick={() => dispatch(setSubCategory(category.subCategory))}
                >
                  {category.subCategory}
                </Link>
              ))}
          </Slick>
        </div>

        <Swiper
          slidesPerView={3}
          slidesPerGroupSkip={1}
          grid={{
            rows: 3,
            columns: 3,
            fill: "row",
          }}
          spaceBetween={3}
          pagination={{
            clickable: true,
          }}
          modules={[Grid]}
          className="products"
        >
          {p.map((product) => (
            <SwiperSlide key={product._id} onClick={() => handleClick(product)}>
              <Food data={product} />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="buttom__navbar">
          <NavLink to="/">
            <TiHome value="" className="icon" />
          </NavLink>
          <Link
            to="/food"
            className={currentCategory === "Yemek" ? " active " : ""}
          >
            <TbToolsKitchen2
              onClick={() => {
                dispatch(setCategory("Yemek"));
                dispatch(setSubCategory("Kahvaltı"));
              }}
              className="icon"
            />
          </Link>
          <Link
            to="/bar"
            className={currentCategory === "İçecek" ? " active " : ""}
          >
            <FaCoffee
              onClick={() => {
                dispatch(setCategory("İçecek"));
                dispatch(setSubCategory("Çaylar"));
              }}
              className="icon"
            />
          </Link>
          <Link
            to="/sweet"
            className={currentCategory === "Tatlı" ? " active " : ""}
          >
            <GiCakeSlice
              onClick={() => {
                dispatch(setCategory("Tatlı"));
                dispatch(setSubCategory("Sütlü"));
              }}
              className="icon"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Menu;
