import React from "react";
import { PiInstagramLogoFill } from "react-icons/pi";
import { RiTelegram2Fill } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import "./Footer.scss";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer id="footer">

      <div className="container">
        <div className="footer">
          <div className="footer--title">
            <h1>Restaurant</h1>
          </div>

          <div className="footer--nav">
            <NavLink to={"/interior"}>{t("interior")}</NavLink>
            <NavLink to={"/about-us"}>{t("about_us")}</NavLink>
            <NavLink to={"/menu"}>{t("menu")}</NavLink>
            <NavLink to={"/contacts"}>{t("contacts")}</NavLink>
          </div>

          <div className="footer--icons">
            <a href="#" className="icon1">
              <RiTelegram2Fill />
            </a>
            <a href="#" className="icon2">
              <PiInstagramLogoFill />
            </a>
          </div>
        </div>
        
        <div className="footer--bottom">
          <hr />
          <center>
            <p>c 2023 Motion Study LLC</p>
          </center>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
