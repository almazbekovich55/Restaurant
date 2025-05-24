import React from "react";
import "./Header.scss";
import { NavLink } from "react-router-dom";
import { CiSearch } from "react-icons/ci";

const Header = () => {
  return (
    <header id="header">
      <div className="container">
        <div className="header">
          <h1>Restaurant</h1>
          <div className="header--nav">
            <NavLink to={"/interior"}>Interior</NavLink>
            <NavLink to={"/about-us"}>About Us</NavLink>
            <NavLink to={"/menu"}>Menu</NavLink>
            <NavLink to={"/contacts"}>Contacts</NavLink>
            <div className="header--nav__search">
              <CiSearch className="ion-icon" />
              <input type="text" placeholder="Search" />
            </div>
            <select>
              <option value="en">En</option>
              <option value="ru">Ru</option>
              <option value="kg">Kg</option>
            </select>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
