import React from "react";
import { Link } from "react-router-dom";
import intro__logo from "../Assets/Frame 39774.svg";

const Nav = () => {
  return (
    <nav>
      <div className="flex flex-row pt-1 scale-75 justify-center items-center ">
        <Link
          to={`/`}
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md transition-colors h-9 px-4 py-2 font-semibold text-sm mr-2 line-clamp-4 leading-[16px] text-[#1A1B1C] z-1000"
        >
          SKINSTRIC
        </Link>
        <img
          src={intro__logo}
          alt=""
          className="w-[61px] h-[17px] top-[23px] left-[117px] opacity-60 "
        />
      </div>
      <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold  transition-colors  disabled:pointer-events-none text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 mx-4 scale-[0.8] text-[#FCFCFC] text-[10px] bg-[#1A1B1C] leading-[16px]">
        ENTER CODE
      </button>
    </nav>
    
  );
};

export default Nav;
