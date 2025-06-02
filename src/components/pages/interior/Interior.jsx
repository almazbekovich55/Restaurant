import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { BodyContext } from "../../../context";
import leftLine from "../../../assets/Images/lineLeft.svg";
import rightLine from "../../../assets/Images/lineRight.svg";
import "./interior.scss";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

const Interior = () => {
  const [interior, setInterior] = useState([]);
  const { language } = useContext(BodyContext);
  async function getInterior() {
    let res = await axios(`http://16.171.195.17/${language}/interior/`);
    setInterior(res.data);
  }
  useEffect(() => {
    getInterior();
  }, [language]);
  return (
    <section id="interior">
      <div className="container">
        {interior.map((el) => (
          <div className="interior--top">
            <img src={leftLine} alt="left decoration" />
            <h3>{el.title}</h3>
            <img src={rightLine} alt="right decoration" />
          </div>
        ))}
        <div className="interior">
          {interior.map((el) => (
            <div className="interior--cards">
              <div className="interior--cards__wrapper">
                <Zoom>
                <img src={el.images[0].image} alt="img" />
                </Zoom>
                <div className="interior--cards__wrapper--shadow"></div>
              </div>
              <div className="interior--cards__card">
                <div className="interior--cards__card--wrapper">
                  <Zoom>
                  <img src={el.images[1].image} alt="img" />
                  </Zoom>
                  <div className="interior--cards__card--wrapper__shadow"></div>
                </div>
                <div className="interior--cards__card--block">
                  <div className="interior--cards__card--block__wrapper">
                    <Zoom>
                    <img src={el.images[2].image} alt="img" className="img1" />
                    </Zoom>
                    <div className="interior--cards__card--block__wrapper--shadow1"></div>
                  </div>
                  <div className="interior--cards__card--block__wrapper">
                    <Zoom>
                    <img src={el.images[3].image} alt="img" className="img2" />
                    </Zoom>
                    <div className="interior--cards__card--block__wrapper--shadow2"></div>
                  </div>
                </div>
              </div>
              <div className="interior--cards__wrapper">
                <Zoom>
                <img src={el.images[4].image} alt="img" />
                </Zoom>
                <div className="interior--cards__wrapper--shadow"></div>
              </div>
              <div className="interior--cards__card">
                <div className="interior--cards__card--wrapper">
                  <Zoom>
                  <img src={el.images[5].image} alt="img" />
                  </Zoom>
                  <div className="interior--cards__card--wrapper__shadow"></div>
                </div>
                <div className="interior--cards__card--block">
                  <div className="interior--cards__card--block__wrapper">
                    <Zoom>
                    <img src={el.images[6].image} alt="img" className="img1" />
                    </Zoom>
                    <div className="interior--cards__card--block__wrapper--shadow"></div>
                  </div>
                  <div className="interior--cards__card--block__wrapper">
                    <Zoom>
                    <img src={el.images[7].image} alt="img" className="img2" />
                    </Zoom>
                    <div className="interior--cards__card--block__wrapper--shadow2"></div>
                  </div>
                </div>
              </div>
              <div className="interior--cards__wrapper">
                <Zoom>
                <img src={el.images[8].image} alt="img" />
                </Zoom>
                <div className="interior--cards__wrapper--shadow"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Interior;
