import React, { useEffect, useState } from "react";
import "./MainPage.scss";
import axios from "axios";
import leftLine from "../../../assets/Images/main-text-right.svg";
import rightLine from "../../../assets/Images/main-text-left.svg";

const MainPage = () => {
  const [data, setData] = useState([]);

  async function getData() {
    let res = await axios("http://13.49.230.234/en/main/");
    setData(res.data);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {data.map((el) => (
        <section
          id="mainPage"
          style={{
            backgroundImage: `url(${el.image})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover", 
            minHeight: "80vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div className="container">
            <div className="mainPage">
              <div className="mainPage--text">
                <div className="mainPage--text__decoration">
                  <img src={leftLine} alt="Left decoration line" />
                  <h1>{el.title}</h1>
                  <img src={rightLine} alt="Right decoration line" />
                </div>
                <button className="reserve-button">RESERVE YOUR TABLE</button>
                <div className="mainPage--footer">
                  <div className="footer-item">
                    <span>{el.title_address}</span>
                  </div>
                  <div className="footer-item">
                    <span>{el.title_phone}</span>
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
