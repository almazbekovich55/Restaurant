import React from "react";
import { PiInstagramLogoFill } from "react-icons/pi";
import { RiTelegram2Fill } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import "./Footer.scss";

const Footer = () => {
  return (
    <footer id="footer">
      <div className="container">
        <div className="footer">
          <div className="footer--title">
            <h1>Restaurant</h1>
          </div>

          <div className="footer--nav">
            <NavLink to={"/interior"}>Interior</NavLink>
            <NavLink to={"/about-us"}>About Us</NavLink>
            <NavLink to={"/menu"}>Menu</NavLink>
            <NavLink to={"/contacts"}>Contacts</NavLink>
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
