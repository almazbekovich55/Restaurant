import React, { useContext, useEffect, useState } from "react";
import "./Header.scss";
import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { BodyContext } from "../../../context";
import { useTranslation } from "react-i18next";
import i18n from "../../../i18n";
import { TbMenu2 } from "react-icons/tb";

const Header = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const { setLanguage } = useContext(BodyContext);
  const { t } = useTranslation();

  useEffect(() => {
    if (selectedLanguage) {
      setLanguage(selectedLanguage);
      i18n.changeLanguage(selectedLanguage);
    }
  }, [selectedLanguage, setLanguage, i18n]);

  return (
    <header id="header">
      <div className="container">
        <div className="header">
          <h1>Restaurant</h1>
          <div className="header--nav">
            <Link to={"/interior"}>{t("interior")}</Link>
            <Link to={"/about-us"}>{t("about_us")}</Link>
            <Link to={"/menu"}>{t("menu")}</Link>
            <Link to={"/contacts"}>{t("contacts")}</Link>
            <div className="header--nav__search">
              <CiSearch className="ion-icon" />
              <input type="text" placeholder={t("search")} />
            </div>
            <select
              onChange={(e) => setSelectedLanguage(e.target.value)}
              value={selectedLanguage}
            >
              <option value="en">En</option>
              <option value="ru">Ru</option>
              <option value="ky">Kg</option>
            </select>
          </div>
          <div className="header--menu">
            <a href="#">
              <TbMenu2 />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
