import React, { useContext, useEffect, useState } from "react";
import "./Menu.scss";
import lineLeft from "../../../assets/Images/LineLeft.svg";
import lineRight from "../../../assets/Images/LineRight.svg";
import { FaArrowRight } from "react-icons/fa";
import axios from "axios";
import { BodyContext } from "../../../context";
import { useNavigate } from "react-router-dom";
import { t } from "i18next";

const categoriesList = [
  { id: 1, name: "Desserts" },
  { id: 2, name: "Hot Drinks" },
  { id: 3, name: "Cold Drinks" },
  { id: 4, name: "National Foods" },
  { id: 5, name: "Eastern cuisine" },
  { id: 6, name: "Fast foods" },
];

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState(1);
  const [items, setItems] = useState([]);
  const [menu, setMenu] = useState([]);
  const { language } = useContext(BodyContext);
  const [category, setCategory] = useState([])
  const nav = useNavigate()

  const getCategoryData = async (id) => {
    const res = await axios(`http://16.171.195.17/${language}/category/${id}`);
    const res2 = await axios(`http://16.171.195.17/${language}/menu/`);
    const res3 = await axios(`http://16.171.195.17/${language}/category/`)

    setItems(res.data.meals);
    setMenu(res2.data);
    setCategory(res3.data)
    
  };

  useEffect(() => {
    getCategoryData(activeCategory);
  }, [activeCategory, language]);

  return (
    <section id="menu">
      <div className="container">
        <div className="menu">
          {menu.map((el) => (
            <div key={el.id} className="menu--title">
              <div className="menu--title__top">
                <img src={lineLeft} alt="line left" />
                <h1>{el.label}</h1>
                <img src={lineRight} alt="line right" />
              </div>
              <h2>{el.title}</h2>
            </div>
          ))}

          <div className="menu--content">
            <div className="menu--content__sidebar">
              {category.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`menu--content__sidebar--btn ${
                    activeCategory === category.id ? "active" : ""
                  }`}
                >
                  {category.category_name}
                </button>
              ))}
            </div>

            <div className="menu--items">
              {items.map((item) => (
                <div key={item.id} className="menu--items__item">
                  <div className="menu--items__item--header">
                    <h3>{item.title}</h3>
                    <h4>
                      .....................................................................................
                    </h4>
                    <span>${item.price.replace(/\.00$/, "")}</span>
                  </div>
                  <div className="menu--items__item--order">
                    <p>{item.description}</p>
                    <a href="#">Order Now</a>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="menu--items__footer">
            <hr />
            <button onClick={() => nav("/products")}>
              {t("full")} <FaArrowRight />
            </button>
            <hr />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Menu;
