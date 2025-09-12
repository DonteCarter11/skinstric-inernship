import React from "react";
import { Link } from "react-router-dom";
import intro__logo from "../Assets/Frame 39774.svg";

const Nav = () => {
  return (
    <nav>
      <div className="logo">
        <a href="" style={{
          width: "69px",
          height: "16px",
          top: "23px",
          left: "32px",
          fontWeight: "600",
          fontSize: "14px",
          lineHeight: "16px",
          textDecoration: "none",
          color: "#1a1b1c",
          padding: "16px 8px",
          

        }}>
          SKINSTRIC
          </a>
        <img src={intro__logo} alt="" className="nav__img"/>
      </div>
      <button className="nav__btn">ENTER CODE</button>
    </nav>
  );
};

export default Nav;
