import "./welcome.css";
import { getCategories } from "../../redux/category/categorySlice";
import { getProducts } from "../../redux/product/productSlice";
import bg from "../../assets/images/bg_hero.jpg";
import bg1 from "../../assets/images/img/bg_breakfast.jpg";
import h3 from "../../assets/images/img/h3.png";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import Loading from "../Menu/Loading/Loading";
import {
  selectCategoryLoading,
  selectProductLoading,
  selectCategoryError,
  selectProductError,
} from "../../utilis/selector";

const Welcome = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCategories());
  }, [dispatch]);

  const isDesktopOrLaptop = useMediaQuery({
    query: "(max-width:900px)",
  });

  // Kategori yükleme durumu
  const categoryLoading = useSelector(selectCategoryLoading);

  // Ürün yükleme durumu
  const productLoading = useSelector(selectProductLoading);

  // Kategori hata durumu
  const categoryError = useSelector(selectCategoryError);

  // Ürün hata durumu
  const productError = useSelector(selectProductError);

  let loading =
    categoryLoading || productLoading || categoryError || productError;

  return loading ? (
    <Loading />
  ) : (
    <section className="container">
      <div className="bg">
        <div className="bg-trans"></div>
        {isDesktopOrLaptop ? (
          <img src={bg1} alt="bg" />
        ) : (
          <img src={bg} alt="bg" />
        )}
      </div>

      <div className="hero">
        <div className="title">
          <h1>Hoşgeldiniz</h1>
          <div className="start">
            <p>
              "Flamingo'nun eşsiz atmosferinde, lezzetli yemekler ve serinletici
              içeceklerle romantik bir buluşma için mükemmel bir mekan. Her bir
              tatlı dokunuş, aşkın en güzel melodisini çalar, siz ve
              sevdikleriniz için unutulmaz anlar sunar."
            </p>
            <Link className="btn" to="/food">
              Başla
            </Link>
          </div>
        </div>

        <img src={h3} alt="h3" />
      </div>
    </section>
  );
};
export default Welcome;
