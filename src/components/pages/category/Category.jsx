import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { BodyContext } from "../../../context";
import { useNavigate } from "react-router-dom";
import "./Category.scss";

const Category = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [items, setItems] = useState([]);
  const { language } = useContext(BodyContext);
  const [categoriesList, setCategoriesList] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios(`http://16.171.195.17/${language}/category/`);
        setCategoriesList(res.data);
        if (res.data.length > 0) {
          setActiveCategory(res.data[0].id);
        }
      } catch (error) {
        console.error("Error loading categories", error);
      }
    };
    fetchCategories();
  }, [language]);

  useEffect(() => {
    if (!activeCategory) return;
    const fetchItems = async () => {
      try {
        const res = await axios(`http://16.171.195.17/${language}/category/${activeCategory}`);
        setItems(res.data.meals || []);
      } catch (error) {
        console.error("Error loading items", error);
      }
    };
    fetchItems();
  }, [activeCategory, language]);

  return (
    <section id="category">
      <div className="container">
        <div className="category">
          <div className="category--content">
            <div className="category--content__sidebar">
              {categoriesList.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`category--content__sidebar--btn ${
                    activeCategory === category.id ? "active" : ""
                  }`}
                >
                  {category.category_name}
                </button>
              ))}
            </div>
            <div className="category--items">
              {items.length > 0 ? (
                <div className="category--items__grid">
                  {items.map((el) => (
                    <div key={el.id} className="category--items__card">
                      <img
                        src={el.meal_images?.[0]?.image || "/default.jpg"}
                        alt={el.title}
                        onClick={() => nav(`/detail/${el.id}`)}
                      />
                      <div className="category--items__card--content">
                        <div className="category--items__card--content__title">
                        <h3>{el.title}</h3>
                        <span>${el.price.replace(/\.00$/, "")}</span>
                          </div> 
                        
                        <p>{el.ingredient.slice(0, 35)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p>Нет блюд в этой категории</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Category;