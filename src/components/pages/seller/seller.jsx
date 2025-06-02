import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import lineLeft from "../../../assets/Images/lineLeft.svg";
import SellerCarousels from "./sellerCarousels";
import "./seller.scss";
import { BodyContext } from "../../../context";

const Seller1 = () => {
  const [sellers, setSellers] = useState([]);
  const [photoIndex, setPhotoIndex] = useState({});
  const { language } = useContext(BodyContext);

  async function getSeller() {
    let res = await axios(`http://16.171.195.17/${language}/best/`);
    let { data } = res;
    setSellers(data);
  }
  console.log(sellers, "hi");

  const handlePhotoIndexChange = (id, newIndex) => {
    setPhotoIndex((prev) => ({
      ...prev,
      [id]: newIndex,
    }));
  };

  useEffect(() => {
    getSeller();
    handlePhotoIndexChange();
  }, [language]);

  return (
    <div id="seller">
      <div className="container">
        <div className="seller">
          {sellers.map((el) => (
            <>
              <div className="seller--block">
                <div className="seller--block__content">
                  <img src={lineLeft} alt="img" />
                  <h2>{el.label}</h2>
                </div>
                <h1>{el.title}</h1>
                <p>{el.description}</p>
              </div>
              <div className="seller--card">
                <SellerCarousels
                  photos={el.best_photos}
                  photoIndex={photoIndex[el.best_photos[0].id] || 0}
                  setPhotoIndex={(newIndex) =>
                    handlePhotoIndexChange(el.id, newIndex)
                  }
                />

                <div></div>
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Seller1;
