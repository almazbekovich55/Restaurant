import React, { useContext, useEffect, useState } from "react";
import "./Visit.scss";
import leftLine from "../../../assets/Images/lineLeft.svg";
import axios from "axios";
import { FaArrowRight } from "react-icons/fa";
import { TfiEmail } from "react-icons/tfi";
import { TbPhoneCalling } from "react-icons/tb";
import { AiFillInstagram } from "react-icons/ai";
import { IoIosPaperPlane } from "react-icons/io";
import { BodyContext } from "../../../context";
import { t } from "i18next";

const Visit = () => {
  const [visit, setVisit] = useState([]);
  const { language } = useContext(BodyContext);

  async function Visit() {
    let res = await axios(`http://16.171.195.17/${language}/info/`);
    setVisit(res.data);
  }
  useEffect(() => {
    Visit();
  }, [language]);
  console.log(visit, "visit");

  return (
    <section id="visit">
      <div className="container">
        <div className="visit">
          {visit.map((el) => (
            <div className="visit--block">
              <div className="visit--block__left">
                <h3>
                  <img src={leftLine} alt="img" />
                  {el.label}
                </h3>
                <h1>{el.title}</h1>
                <p>
                  {el.title_region} <br />
                </p>
                <span>{el.region}</span>
                <p>
                  {el.title_schedule}
                  <br />
                </p>
                <span className="span">
                  {el.schedule[0].start_day.day}-{el.schedule[0].end_day.day}:{" "}
                  {el.schedule[0].start_time} am - {el.schedule[0].end_time} am
                </span>

                <br />
                <span className="span">
                  {el.schedule[1].start_day.day}-{el.schedule[1].end_day.day}:{" "}
                  {el.schedule[1].start_time} am - {el.schedule[1].end_time} am
                </span>
                <br />
                <div className="visit--block__left--btn">
                  <hr />
                  <button>
                    {" "}
                    {t("gift")} <FaArrowRight />
                  </button>
                  <hr />
                </div>
              </div>
              <div className="visit--block__rigth">
                <h2>{el.title_contact}</h2>
                <h3>
                  <a href="#">
                    <TbPhoneCalling />
                  </a>{" "}
                  <span>{el.phone}</span>
                </h3>
                <h3>
                  <a href="#">
                    <TfiEmail />
                  </a>
                  {el.email}
                </h3>
                <h1>
                  <a href="#">
                    <IoIosPaperPlane />
                  </a>
                  <a href="#">
                    <AiFillInstagram />
                  </a>
                </h1>

                <div className="visit--block__rigth--maps">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=YOUR_EMBED_CODE"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Visit;
