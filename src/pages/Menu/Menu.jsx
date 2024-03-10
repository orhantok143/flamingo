import React, { useEffect, useState } from "react";
import "./menu.css";
import { GiFlamingo } from "react-icons/gi";
import { TiHome } from "react-icons/ti";
import { TbToolsKitchen2 } from "react-icons/tb";
import { FaCoffee } from "react-icons/fa";
import { GiCakeSlice } from "react-icons/gi";
import { Link, NavLink } from "react-router-dom";
import Food from "./food/Food";
import Slick from "react-slick";
import { Swiper, SwiperSlide } from "swiper/react";
import { Grid } from "swiper/modules";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../redux/category/categorySlice";
import { getProducts } from "../../redux/product/productSlice";
import img from "../../assets/images/bg.jpg";

// Import Swiper styles
import "swiper/css";
import "swiper/css/grid";

const Menu = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCategories());
  }, [dispatch]);
  const [currentCategory, setCurrentCategory] = useState("Yemek");
  const [currentSubCategory, setCurrentSubCategory] = useState("Kahvaltı");

  const products = useSelector((state) =>
    state.products.products.product?.filter(
      (p) => p.category === currentCategory
    )
  );
  const categories = useSelector((state) => state.categories.categories);

  let cat = categories.categories
    ?.filter((c) => c.title === currentCategory)[0]
    ?.subCategory.filter((d) => d.subCategory === currentSubCategory)[0];

  console.log("product::", products);

  const myStyle = {
    background: `url(${cat ? cat?.image.url : img})`,
  };

  console.log("myStyle::", myStyle);

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
          initialSlide: 1,
          // Infinity: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          // Infinity: false,
        },
      },
    ],
  };

  return (
    <section style={myStyle} className="menu">
      <div className="top__navbar">
        <Link to="/" className="home_link">
          <GiFlamingo className="icon flamingo" />
        </Link>
        <div className="search_item">
          <input type="search" placeholder="Ara" />
          <p>Masa No: B-7</p>
        </div>
      </div>

      <div className="food ">
        <div className="category ">
          <Slick {...settings}>
            {categories.categories
              ?.filter((c) => c.title === currentCategory)[0]
              ?.subCategory.map((category, i) => (
                <Link
                  key={i}
                  to=""
                  onClick={() => setCurrentSubCategory(category.subCategory)}
                >
                  {category.subCategory}
                </Link>
              ))}
          </Slick>
        </div>

        <Swiper
          slidesPerView={3}
          slidesPerGroupSkip={3}
          grid={{
            rows: 3,
            // culomns: 3,
            fill: "row",
          }}
          spaceBetween={3}
          pagination={{
            clickable: true,
          }}
          modules={[Grid]}
          className="products"
        >
          {products
            ?.filter((p) => p.subCategory === currentSubCategory)
            .map((product) => (
              <SwiperSlide key={product._id}>
                <Food data={product} />
              </SwiperSlide>
            ))}
        </Swiper>

        <div className="buttom__navbar">
          <NavLink to="/">
            <TiHome values="" className="icon" />
          </NavLink>
          <NavLink to="/food">
            <TbToolsKitchen2
              onClick={() => {
                setCurrentCategory("Yemek");
                setCurrentSubCategory("Kahvaltı");
              }}
              className="icon"
            />
          </NavLink>
          <NavLink to="/bar">
            <FaCoffee
              onClick={() => {
                setCurrentCategory("İçecek");
                setCurrentSubCategory("Çaylar");
              }}
              className="icon"
            />
          </NavLink>
          <NavLink to="/sweet">
            <GiCakeSlice
              onClick={() => {
                setCurrentCategory("Tatlı");
                setCurrentSubCategory("Sütlü");
              }}
              className="icon"
            />
          </NavLink>
        </div>
      </div>
    </section>
  );
};

export default Menu;
