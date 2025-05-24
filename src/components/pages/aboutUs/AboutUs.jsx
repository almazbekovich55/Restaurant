import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AboutUs.scss";
import lineLeft from "../../../assets/Images/LineLeft.svg";

const AboutUs = () => {
  const [about, setAbout] = useState([]);

  async function getData() {
    const res = await axios(`http://13.49.230.234/en/about/`);
    setAbout(res.data);
  }

  useEffect(() => {
    getData();
  }, []);

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
