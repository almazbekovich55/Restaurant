import React, { useContext, useEffect, useState } from "react";
import "./Header.scss";
import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { BodyContext } from "../../../context";
import { useTranslation } from "react-i18next";
import i18n from "../../../i18n";
import { TbMenu2 } from "react-icons/tb";
import { IoCloseOutline } from "react-icons/io5";

const Header = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { setLanguage } = useContext(BodyContext);
  const { t } = useTranslation();

  useEffect(() => {
    if (selectedLanguage) {
      setLanguage(selectedLanguage);
      i18n.changeLanguage(selectedLanguage);
    }
  }, [selectedLanguage, setLanguage, i18n]);

   useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  const Menu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

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
            {
              <a href="#" onClick={Menu}>
                {isMenuOpen ? <IoCloseOutline /> : <TbMenu2 />}
              </a>
            }
            <nav className={`header--menu__items ${isMenuOpen ? "open" : ""}`}>
              <ul>
                <li>
                  <Link to={"/interior"} onClick={Menu}>
                    {t("interior")}
                  </Link>
                </li>
                <li>
                  <Link to={"/about-us"} onClick={Menu}>
                    {t("about_us")}
                  </Link>
                </li>
                <li>
                  <Link to={"/menu"} onClick={Menu}>
                    {t("menu")}
                  </Link>
                </li>
                <li>
                  <Link to={"/contacts"} onClick={Menu}>
                    {t("contacts")}
                  </Link>
                </li>
              </ul>
              <div className="header--menu__items--options">
                <Link
                  onClick={() => {
                    setSelectedLanguage("en");
                    Menu();
                  }}
                >
                  EN
                </Link>
                <Link
                  onClick={() => {
                    setSelectedLanguage("ru");
                    Menu();
                  }}
                >
                  RU
                </Link>
                <Link
                  onClick={() => {
                    setSelectedLanguage("ky");
                    Menu();
                  }}
                >
                  KG
                </Link>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
