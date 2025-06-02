import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom"; 
import "./Search.scss";

const Search = () => {
  const { ProductsName } = useParams();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchAllAndFilter() {
      try {
        const res = await axios.get("http://16.171.195.17/en/meal/");
        const filtered = res.data.filter((item) =>
          item.title.toLowerCase().includes(ProductsName.toLowerCase()) 
        );
        setProducts(filtered);
      } catch (err) {
        console.error(err);
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    }
    fetchAllAndFilter();
  }, [ProductsName]);

  if (isLoading) return <p>Loading...</p>;
  if (products.length === 0)
    return (
      <center>
        <p style={{ color: "white" }}>No results found for “{ProductsName}”</p>
      </center>
    );

  return (
    <div id="Search">
      <div className="container">
        <div className="Search">
          {products.map((el) => (
            <Link to={`/detail/${el.id}`} key={el.id} className="Search--card">
              <img
                src={el.meal_images?.[0]?.image || "/default.jpg"} 
                alt={el.title}
                width="100px"
              />
              <div className="Search--card__text">
                <h2>{el.title}</h2>
                <p>{el.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Search;