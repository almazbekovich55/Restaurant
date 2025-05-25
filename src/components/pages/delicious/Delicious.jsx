import React, { useContext, useEffect, useState } from "react";
import "./Delicious.scss";
import axios from "axios";
import leftLine from "../../../assets/Images/LineLeft.svg";
import rightLine from "../../../assets/Images/LineRight.svg";
import { BsGeoAltFill } from "react-icons/bs";
import { ImPhone } from "react-icons/im";
import { FaArrowRight } from "react-icons/fa";
import { BodyContext } from "../../../context";
import { t } from "i18next";

const MainPage = () => {
  const [data, setData] = useState([]);
  const { language } = useContext(BodyContext);

  async function getData() {
    const res = await axios(`http://16.171.195.17/${language}/main/`);
    setData(res.data);
  }

  useEffect(() => {
    getData();
  }, [language]);

  return (
    <>
      {data.map((el) => (
        <section
          key={el.id}
          id="delicious"
          style={{
            minHeight: "80vh",
            backgroundImage: `
              linear-gradient(
              180deg,
              rgba(27, 32, 38, 0.4) 46.81%,
              rgba(27, 32, 38, 0.8) 100.67% ),
              url(${el.image})
            `,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            display: "flex",
            alignItems: "center",
          }}
        >
          <div className="container">
            <div className="delicious">
              <div className="delicious--content">
                <div className="delicious--content__center">
                  <div className="delicious--content__center--name">
                    <img src={leftLine} alt="left decoration" />
                    <h3>{el.title}</h3>
                    <img src={rightLine} alt="right decoration" />
                  </div>
                  <h1>{el.restaurant_name}</h1>
                  <p>{el.description}</p>
                  <div className="delicious--content__center--btn">
                    <hr />
                    <button>
                      {t("reserve_table")} <FaArrowRight />
                    </button>
                    <hr />
                  </div>
                </div>
                <div className="delicious--content__bottom">
                  <div className="delicious--content__bottom--text">
                    <h4>{el.title_address}</h4>
                    <hr />
                    <a
                      href="https://go.2gis.com/ny2jd"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <BsGeoAltFill />
                    </a>
                    <a
                      className="span"
                      href="https://go.2gis.com/ny2jd"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {el.address}
                    </a>
                  </div>
                  <div className="delicious--content__bottom--text">
                    <h4>{el.title_phone}</h4>
                    <hr />
                    <a href={`tel:${el.phone}`}>
                      <ImPhone />
                    </a>
                    <a className="span"
                      href={`tel:${el.phone}`}
                      target="_blank"
                      rel="noopener noreferrer">{el.phone}</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}
    </>
  );
};

export default MainPage;
