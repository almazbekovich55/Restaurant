import React, { useContext, useState } from "react";
import "./Contacts.scss";
import userName from "../../../assets/Images/userName.svg";
import userPhone from "../../../assets/Images/userPhone.svg";
import axios from "axios";
import { data } from "react-router-dom";
import { IoCloseOutline } from "react-icons/io5";
import { BodyContext } from "../../../context";

const Contacts = () => {
  const [Name, setName] = useState("");
  const [Phone, setPhone] = useState("");
  const { setModal } = useContext(BodyContext);

  const token = `7933082400:AAFNdOFwRq3Gxf1-jyCo8SGfQ3qXO1oG-f4`;
  const myId = `5546164532`;
  const apiKey = `https://api.telegram.org/bot${token}/sendMessage`;

  function Message() {
    if (Name.trim() === "" || Phone.trim() === "") {
      alert("Please fill in all fields.");
    } else {
      alert(`Thank you ${Name}, we will contact you at ${Phone} soon!`);
      setName("");
      setPhone("");
    }

    axios.post(apiKey, data);
  }

  return (
    <section id="contacts">
      <div className="container">
        <div className="contacts--form">
          <IoCloseOutline className="icon" onClick={() => setModal(false)} />
          <div className="contacts--form__group">
            <div className="contacts--form__group--icon">
              <img src={userName} alt="User" />
            </div>
            <div className="contacts--form__group--inputField">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                placeholder="Enter your name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

          <div className="contacts--form__group">
            <div className="contacts--form__group--icon">
              <img src={userPhone} alt="Phone" />
            </div>
            <div className="contacts--form__group--inputField">
              <label htmlFor="phone">Phone</label>
              <input
                type="text"
                id="phone"
                placeholder="Enter your phone"
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>

          <button className="contacts--form__btn" onClick={() => Message()}>
            Contact
          </button>
        </div>
      </div>
    </section>
  );
};

export default Contacts;
