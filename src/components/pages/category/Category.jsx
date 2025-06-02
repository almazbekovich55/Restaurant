import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { BodyContext } from "../../../context";
import { useNavigate } from "react-router-dom";
import "./Category.scss";
import left from "../../../assets/Images/lineLeft.svg";
import { CiSearch } from "react-icons/ci";

const Category = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [items, setItems] = useState([]);
  const { language } = useContext(BodyContext);
  const [categoriesList, setCategoriesList] = useState([]);
  const [menu, setMenu] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const nav = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios(`http://16.171.195.17/${language}/category/`);
        const menuRes = await axios(`http://16.171.195.17/en/menu/`);
        setCategoriesList(res.data);
        setMenu(menuRes.data);
        if (res.data.length > 0) {
          setActiveCategory(res.data[0].id);
        }
      } catch (error) {
        console.error("Error loading categories or menu", error);
      }
    };
    fetchCategories();
  }, [language]);

  useEffect(() => {
    if (!activeCategory) return;
    const fetchItems = async () => {
      try {
        const res = await axios(
          `http://16.171.195.17/${language}/category/${activeCategory}`
        );
        setItems(res.data.meals || []);
      } catch (error) {
        console.error("Error loading items", error);
        setItems([]);
      }
    };
    fetchItems();
  }, [activeCategory, language]);
  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <section id="category">
      <div className="container">
        <div className="category">
          {menu.map((el) => (
            <div className="category--title" key={el.id}>
              <div className="category--title__text">
                <img src={left} alt="img" />
                <h3>{el.label.slice(4)}</h3>
              </div>
              <div className="category--title__search">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="category--title__search-input"
                />
                <CiSearch className="category--title__search-icon" />
              </div>
            </div>
          ))}
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
              {filteredItems.length > 0 ? (
                <div className="category--items__grid">
                  {filteredItems.map((el) => (
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
                <p>Нет блюд в этой категории или по вашему запросу</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Category;