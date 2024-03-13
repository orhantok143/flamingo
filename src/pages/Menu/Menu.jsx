import React, { useState } from "react";
import "./menu.css";
import { GiFlamingo } from "react-icons/gi";
import { TiHome } from "react-icons/ti";
import { TbToolsKitchen2 } from "react-icons/tb";
import { FaCoffee } from "react-icons/fa";
import { GiCakeSlice } from "react-icons/gi";
import { Link, NavLink } from "react-router-dom";
import Food from "./food/Food";
import { useSelector } from "react-redux";

const Menu = () => {
  const [currentCategory, setCurrentCategory] = useState("Yemek");
  const [currentSubCategory, setCurrentSubCategory] = useState("Kahvaltı");

  const products = useSelector((state) =>
    state.products.products.product?.filter(
      (p) => p.category === currentCategory
    )
  );
  const categories = useSelector((state) => state.categories.categories);

  ///////////////////////////////////////////////////////////////////////////////

  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 9;

  const handleTouchStart = (e) => {
    // Dokunma başlangıcında x koordinatını kaydedin
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    // Dokunma sonunda x koordinatını alın
    const touchEndX = e.changedTouches[0].clientX;
    // Dokunma sonundaki ve başlangıçtaki farkı hesaplayın
    const deltaX = touchEndX - touchStartX;
    // Farkın büyüklüğüne göre sayfayı değiştirin
    if (deltaX > 50 && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else if (
      deltaX < -50 &&
      currentPage < Math.ceil(products.length / productsPerPage)
    ) {
      setCurrentPage(currentPage + 1);
    }
  };

  const [touchStartX, setTouchStartX] = useState(0);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products
    ?.filter((p) => p.subCategory === currentSubCategory)
    .slice(indexOfFirstProduct, indexOfLastProduct);

  /////////////////////////////////////////////////////////

  const [currentCategoryPage, setCategoryCurrentPage] = useState(1);

  const CategoriesPerPage = 3;

  const handleTouchStartCategory = (e) => {
    // Dokunma başlangıcında x koordinatını kaydedin
    setTouchStartX1(e.touches[0].clientX);
  };

  const handleTouchEndCategory = (e) => {
    // Dokunma sonunda x koordinatını alın
    const touchEndX1 = e.changedTouches[0].clientX;
    // Dokunma sonundaki ve başlangıçtaki farkı hesaplayın
    const deltaX = touchEndX1 - touchStartX1;
    // Farkın büyüklüğüne göre sayfayı değiştirin
    if (deltaX > 50 && currentCategoryPage > 1) {
      setCategoryCurrentPage(currentCategoryPage - 1);
    } else if (
      deltaX < -50 &&
      currentCategoryPage <
        Math.ceil(
          categories.categories?.filter((c) => c.title === currentCategory)[0]
            .subCategory.length / CategoriesPerPage
        )
    ) {
      setCategoryCurrentPage(currentCategoryPage + 1);
    }
  };

  const [touchStartX1, setTouchStartX1] = useState(0);

  console.log(touchStartX1);

  const indexOfLastCategory = currentCategoryPage * CategoriesPerPage;
  const indexOfFirstCategory = indexOfLastCategory - CategoriesPerPage;

  const currentCategories = categories.categories
    ?.filter((c) => c.title === currentCategory)[0]
    .subCategory.slice(indexOfFirstCategory, indexOfLastCategory);

  console.log(
    "cate::",
    categories.categories?.filter((c) => c.title === currentCategory)[0]
      .subCategory
  );

  // const settings = {
  //   speed: 500,
  //   slidesToShow: 9,
  //   slidesToScroll: 5,
  //   responsive: [
  //     {
  //       breakpoint: 1024,
  //       settings: {
  //         slidesToShow: 4,
  //         slidesToScroll: 2,
  //       },
  //     },
  //     {
  //       breakpoint: 600,
  //       settings: {
  //         slidesToShow: 4,
  //         slidesToScroll: 2,
  //         initialSlide: 1,
  //         // Infinity: false,
  //       },
  //     },
  //     {
  //       breakpoint: 480,
  //       settings: {
  //         slidesToShow: 3,
  //         slidesToScroll: 2,
  //         // Infinity: false,
  //       },
  //     },
  //     {
  //       breakpoint: 380,
  //       settings: {
  //         slidesToShow: 2,
  //         slidesToScroll: 2,
  //         // Infinity: false,
  //       },
  //     },
  //   ],
  // };

  return (
    <section className="menu">
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
        <div
          className="category"
          onTouchStart={(e) => handleTouchStartCategory(e)}
          onTouchEnd={handleTouchEndCategory}
        >
          {currentCategories.map((category, i) => (
            <Link
              className={
                category.subCategory === currentSubCategory ? "active" : ""
              }
              key={i}
              to=""
              onClick={() => setCurrentSubCategory(category.subCategory)}
            >
              {category.subCategory}
            </Link>
          ))}
        </div>

        <div
          className="product_grid"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {currentProducts.map((product, i) => (
            <Food data={product} key={i} className="pro" />
          ))}
        </div>

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
