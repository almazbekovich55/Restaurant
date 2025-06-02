import React, { useContext, useEffect, useState } from "react";
import "./Header.scss";
import { Link, useNavigate } from "react-router-dom"; // Add useNavigate
import { CiSearch } from "react-icons/ci";
import { BodyContext } from "../../../context";
import { useTranslation } from "react-i18next";
import i18n from "../../../i18n";
import { TbMenu2 } from "react-icons/tb";
import { IoCloseOutline } from "react-icons/io5";
import { Link as ScrollLink } from "react-scroll";

const Header = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const { setLanguage } = useContext(BodyContext);
  const { t } = useTranslation();
  const navigate = useNavigate(); // For navigation to Search page

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

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle search form submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search/${encodeURIComponent(searchQuery)}`); // Navigate to Search page with query
      setSearchQuery(""); // Clear the input after submission
    }
  };

  return (
    <header id="header">
      <div className="container">
        <div className="header">
          <Link to={"/"}>Restaurant</Link>
          <div className="header--nav">
            <ScrollLink
              to="interior"
              smooth={true}
              duration={1500}
              offset={-100}
            >
              {t("interior")}
            </ScrollLink>

            <ScrollLink to="aboutUs" smooth={true} duration={1500} offset={-60}>
              {t("about_us")}
            </ScrollLink>

            <ScrollLink to="menu" smooth={true} duration={1500} offset={-100}>
              {t("menu")}
            </ScrollLink>

            <ScrollLink to="visit" smooth={true} duration={1500} offset={-120}>
              {t("contacts")}
            </ScrollLink>

            <form className="header--nav__search" onSubmit={handleSearchSubmit}>
              <CiSearch className="ion-icon" />
              <input
                type="text"
                placeholder={t("search")}
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </form>

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
            <a href="#" onClick={Menu}>
              {isMenuOpen ? <IoCloseOutline /> : <TbMenu2 />}
            </a>
            <nav className={`header--menu__items ${isMenuOpen ? "open" : ""}`}>
              <ul>
                <li>
                  <ScrollLink
                    to="interior"
                    smooth={true}
                    duration={1500}
                    offset={-100}
                  >
                    {t("interior")}
                  </ScrollLink>
                </li>
                <li>
                  <ScrollLink
                    to="aboutUs"
                    smooth={true}
                    duration={1500}
                    offset={-60}
                  >
                    {t("about_us")}
                  </ScrollLink>
                </li>
                <li>
                  <ScrollLink
                    to="menu"
                    smooth={true}
                    duration={1500}
                    offset={-100}
                  >
                    {t("menu")}
                  </ScrollLink>
                </li>
                <li>
                  <ScrollLink
                    to="visit"
                    smooth={true}
                    duration={1500}
                    offset={-120}
                  >
                    {t("contacts")}
                  </ScrollLink>
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