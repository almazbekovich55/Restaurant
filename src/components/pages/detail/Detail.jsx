import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BodyContext } from "../../../context";
import "./Detail.scss";

const Detail = () => {
  const { id } = useParams();
  const { language } = useContext(BodyContext);
  const [meal, setMeal] = useState(null);
  const [similarMeals, setSimilarMeals] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios(`http://16.171.195.17/${language}/category/1`);
        const meals = res.data.meals;
        const foundMeal = meals.find((item) => item.id === parseInt(id));
        setMeal(foundMeal);
        // Окшош десерттерди алуу (мисалы, ошол эле категориядагы башка десерттер)
        const similar = meals.filter((item) => item.id !== parseInt(id)).slice(0, 4);
        setSimilarMeals(similar);
      } catch (error) {
        console.error("Meal not found:", error);
      }
    };
    getData();
  }, [id, language]);

  if (!meal) return <div>Loading...</div>;

  const categories = [
    "Desserts",
    "Hot Drinks",
    "Cold Drinks",
    "National Foods",
    "Eastern cuisine",
    "Fast foods",
  ];

  const extras = [
    { name: "Cherry", price: "$0.90" },
    { name: "Coca Cola", price: "$0.90" },
  ];

  return (
    <section id="detail">
      <div className="container">
        <div className="detail">
          <div className="detail__sidebar">
            {categories.map((category, index) => (
              <button
                key={index}
                className={category === "Desserts" ? "active" : ""}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="detail__main">
            <div className="detail__main-content">
              <img
                src={meal.meal_images?.[0]?.image || "/default.jpg"}
                alt={meal.title}
              />
              <div className="detail__main-info">
                <h1>
                  {meal.title}
                  <span>${meal.price.replace(/\.00$/, "")}</span>
                </h1>
                <p>{meal.ingredient}</p>
                 <div className="detail__extras">
              <h2>Extras</h2>
              <div className="detail__extras-list">
                {extras.map((extra, index) => (
                  <div key={index} className="extra-item">
                    <p>{extra.name}</p>
                    <span>{extra.price}</span>
                  </div>
                ))}
              </div>
            </div>
              </div>
            </div>

            {/* Similar Queries */}
            <div className="detail__similar">
              <h2>Similar queries</h2>
              <div className="detail__similar-list">
                {similarMeals.map((similar) => (
                  <div key={similar.id} className="similar-item">
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