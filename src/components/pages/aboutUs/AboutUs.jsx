import React from "react";
import aboutUs1 from "../../../assets/Images/svg.svg";
import aboutUs2 from "../../../assets/Images/svg2.svg";
import "./AboutUs.scss";

const AboutUs = () => {
  return (
    <section id="aboutUs">
      <div className="container">
        <div className="aboutUs">
          <div className="aboutUs--title">
            <h1>
              A Journey Throught <br />
              Cafesio Flavors
            </h1>
            <img src={aboutUs1} alt="" />
          </div>

          <div className="aboutUs--title">
            <p>
              Try dishes that will open up new tastes for you and delight your <br />
              eyes with their appearance. Here you will find a cozy atmosphere, <br />
              excellent service and attention to each guest. Book a table now <br />
              and enjoy a unique experience of taste discovery! <br />
            </p>
            <img src={aboutUs2} alt="img" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
