import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./AboutUs.scss";
import lineLeft from "../../../assets/Images/LineLeft.svg";
import { BodyContext } from "../../../context";

const AboutUs = () => {
  const [about, setAbout] = useState([]);
  const { language } = useContext(BodyContext);

  async function getData() {
    const res = await axios(`http://16.171.195.17/${language}/about/`);
    setAbout(res.data);
  }

  useEffect(() => {
    getData();
  }, [language]);

  return (
    <section id="aboutUs">
      <div className="container">
        {about.map((el) => (
          <div key={el.id} className="aboutUs">
            <div className="aboutUs--top">
              <div className="aboutUs--top__decoration">
                <img src={lineLeft} alt="img" />
                <h4>{el.label}</h4>
              </div>
              <div className="aboutUs--top__text">
                <h1>{el.title}</h1>
                <p>{el.description}</p>
              </div>
            </div>
            <div className="aboutUs--bottom">
              <div className="aboutUs--bottom__left">
                <img src={el.image1} alt="chef" />
              </div>
              <div className="aboutUs--bottom__right">
                <img src={el.image2} alt="dishes" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AboutUs;
