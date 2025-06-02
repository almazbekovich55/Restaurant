import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { BodyContext } from "../../../context";
import "./Detail.scss";
import { IoIosCloseCircleOutline } from "react-icons/io";

const Detail = () => {
  const { id } = useParams();
  const { language } = useContext(BodyContext);
  const [meal, setMeal] = useState(null);
  const [similarMeals, setSimilarMeals] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);

  const nav = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        const categoriesRes = await axios.get(
          `http://16.171.195.17/${language}/category/`
        );
        setCategories(categoriesRes.data);

        // Бүткүл категорияларды текшеребиз, таап чыкканча
        let foundMeal = null;
        let categoryId = null;

        for (const category of categoriesRes.data) {
          const mealsRes = await axios.get(
            `http://16.171.195.17/${language}/category/${category.id}`
          );

          const meals = mealsRes.data.meals;

          const match = meals.find((meal) => meal.id === parseInt(id));
          if (match) {
            foundMeal = match;
            categoryId = category.id;

            // "Похожие блюда"
            const similar = meals
              .filter((meal) => meal.id !== parseInt(id))
              .slice(0, 4);
            setSimilarMeals(similar);
            break;
          }
        }

        setMeal(foundMeal);
        setActiveCategory(categoryId);
      } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
      }
    };

    getData();
  }, [id, language]);

  const handleCategoryClick = async (categoryId) => {
    setActiveCategory(categoryId);
    try {
      const res = await axios.get(
        `http://16.171.195.17/${language}/category/${categoryId}`
      );
      setSimilarMeals(res.data.meals.slice(0, 4));
    } catch (err) {
      console.error("Ошибка при загрузке категории:", err);
    }
  };

  return (
    <section id="detail">
      <div className="container">
        <div className="detail">
          <h5>
            <IoIosCloseCircleOutline className="close" onClick={() => nav("/products")} />
          </h5>
          <div className="detail--content__sidebar">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className={`btn ${
                  activeCategory === category.id ? "active" : ""
                }`}
              >
                {category.category_name}
              </button>
            ))}
          </div>

          <div className="detail__main">
            <div className="detail__main-content">
              <div className="detail__main-content--lastContent">
                <img
                  src={meal?.meal_images?.[0]?.image || "/default.jpg"}
                  alt={meal?.title}
                />
                <div className="detail__main--info">
                  <h1>
                    {meal?.title}
                    <span>${meal?.price?.replace(/\.00$/, "")}</span>
                  </h1>
                  <p>{meal?.ingredient}</p>
                </div>
              </div>

              <div className="justDiv">
                {meal?.supplements?.map((supplement) => (
                  <div
                    className="detail--extras__listItems"
                    key={supplement.id}
                  >
                    <h2>{supplement.supplement_name}</h2>
                    <div className="detail--extras__listItems--list">
                      {supplement.items.map((item) => (
                        <div
                          key={item.id}
                          className="detail--extras__listItems--list__extraItem"
                        >
                          <p>{item.item}</p>
                          <span>${item.price.replace(/\.00$/, "")}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="detail__similar">
              <h2>Similar queries</h2>
              <div className="detail__similar-list">
                {similarMeals.map((similar) => (
                  <div
                    key={similar.id}
                    className="similar-item"
                    onClick={() => nav(`/detail/${similar.id}`)}
                    style={{ cursor: "pointer" }}
                  >
                    <img
                      src={similar.meal_images?.[0]?.image || "/default.jpg"}
                      alt={similar.title}
                    />
                    <div className="similar-item__info">
                      <h3>
                        {similar.title}{" "}
                        <span>${similar.price.replace(/\.00$/, "")}</span>
                      </h3>
                      <p>{similar.ingredient}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Detail;
