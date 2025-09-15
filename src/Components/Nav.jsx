import React from "react";
import { Link } from "react-router-dom";
import intro__logo from "../Assets/Frame 39774.svg";

const Nav = () => {
  return (
    <nav >
      <div className="logo">
        <a
          href=""
          style={{
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
          }}
        >
          SKINSTRIC
        </a>
        <img
          src={intro__logo}
          alt=""
          className="w-[61px] h-[17px] top-[23px] left-[117px] opacity-60 "
        />
      </div>
      <button className="w-[92px] h-8 mt-[15px] px-2 py-4 gap-2 text-white font-semibold text-[10px] leading-4 tracking-tight flex justify-center items-center bg-[#1a1b1c] m-4">
        ENTER CODE
      </button>
    </nav>
  );
};

export default Nav;
