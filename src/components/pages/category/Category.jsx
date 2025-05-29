import React, { useContext, useEffect, useState } from "react";
import lineLeft from "../../../assets/Images/LineLeft.svg";
import lineRight from "../../../assets/Images/LineRight.svg";
import { FaArrowRight } from "react-icons/fa";
import axios from "axios";
import { BodyContext } from "../../../context";
import { useNavigate } from "react-router-dom";
import "./Category.scss";

const categoriesList = [
  { id: 1, name: "Desserts" },
  { id: 2, name: "Hot Drinks" },
  { id: 3, name: "Cold Drinks" },
  { id: 4, name: "National Foods" },
  { id: 5, name: "Eastern cuisine" },
  { id: 6, name: "Fast foods" },
];

const Category = () => {
  const [activeCategory, setActiveCategory] = useState(1);
  const [items, setItems] = useState([]);
  const [menu, setMenu] = useState([]);
  const { language } = useContext(BodyContext);
  const nav = useNavigate();

  const getCategoryData = async (id) => {
    const res = await axios(`http://16.171.195.17/${language}/category/${id}`);
    const res2 = await axios(`http://16.171.195.17/${language}/menu/`);
    setItems(res.data.meals);
    setMenu(res2.data);
  };

  useEffect(() => {
    getCategoryData(activeCategory);
  }, [activeCategory, language]);

  return (
    <section id="menu">
      <div className="container">
        <div className="menu">
          <div className="menu--content">
            <div className="menu--content__sidebar">
              {categoriesList.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`menu--content__sidebar--btn ${
                    activeCategory === category.id ? "active" : ""
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
            <div className="category--block">
              {items.map((el) => (
                <div key={el.id} className="category--block__card">
                  <img
                    src={el.meal_images?.[0]?.image || "/default.jpg"}
                    alt="img"
                    style={{ cursor: "pointer" }}
                    onClick={() => nav(`/detail/${el.id}`)}
                  />
                  <div className="category--block__card--title">
                    <div className="category--block__card--title__text">
                      <h1>
                        {el.title} <span>${el.price.replace(/\.00$/, "")}</span>
                      </h1>
                      <p>{el.ingredient.slice(0, 35)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Category;
