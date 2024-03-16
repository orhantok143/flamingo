import React, { useEffect, useState } from "react";
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
import { getCategories } from "../../redux/category/categorySlice";
import {
  getProducts,
  setDetailProduct,
} from "../../redux/product/productSlice";

// Import Swiper styles
import "swiper/css";
import "swiper/css/grid";
import { selectCategories, selectProducts } from "../../utilis/selector";

const Menu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCategories());
  }, [dispatch]);

  const [currentCategory, setCurrentCategory] = useState("Yemek");
  const [currentSubCategory, setCurrentSubCategory] = useState("Kahvaltı");
  const [search, setSearch] = useState("");

  const products = useSelector(selectProducts);

  const categories = useSelector(selectCategories);

  const handleOnChange = (e) => {
    setSearch(e.target.value);
  };

  const handleClick = (data) => {
    dispatch(setDetailProduct(data));
    navigate("../detail");
  };

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
            type="search"
            placeholder="Ara"
            onChange={(e) => handleOnChange(e)}
          />
          <p>Masa No: B-7</p>
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
                  onClick={() => setCurrentSubCategory(category.subCategory)}
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
          {/* .filter((p) => p.subCategory === currentSubCategory) */}
          {products
            ?.filter((p) => p.subCategory === currentSubCategory)
            ?.filter((p) =>
              p.title.trim().toLowerCase().includes(search.trim().toLowerCase())
            )
            .map((product) => (
              <SwiperSlide
                key={product._id}
                onClick={() => handleClick(product)}
              >
                <Food data={product} />
              </SwiperSlide>
            ))}
        </Swiper>

        <div className="buttom__navbar">
          <NavLink to="/">
            <TiHome value="" className="icon" />
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
