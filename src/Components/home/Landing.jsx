import React from "react";
import rightArrow from "../../Assets/buttin-icon-shrunk.svg";
import leftArrow from "../../Assets/buttin-icon-shrunk.svg";
import { Link } from "react-router-dom";
import triangle from "../../Assets/Rectangle 2778.svg";

const landing = () => {
  return (
    <div>
      <div className="w-screen h-screen flex justify-center items-center px-2 py-4 overflow-hidden">
        <div>
          <h1
            className="text-center h-[240px] w-[680px] font-light text-black text-[128px] leading-[120px] tracking-[-7px] items-center"
            style={{ fontFamily: "Roobert" }}
          >
            Sophisticated <br />
            <span className="">skincare</span>
          </h1>
          <img src="" alt="" className="" />
        </div>
      </div>

      <p className="w-[316px] h-[72px] text-[14px] px-8">
        Skinstric developed an A.I. that creates a highly-personalized routine
        tailored to what your skin needs.
      </p>
      <div className="fixed right-4 top-1/2 -translate-y-1/2">
        <Link to={`/testing`}>
          <button className="border-none bg-transparent flex items-center gap-2 text-black font-semibold text-[10px] leading-4 tracking-tight ">
            TAKE TEST
            <img src={rightArrow} alt="" className="" />
          </button>
        </Link>
      </div>

      <div
        id="right-section"
        className="hidden lg:block fixed top-1/2 right-[calc(-53vw)] xl:right-[calc(-50vw)] -translate-y-1/2 w-[500px] h-[500px] transition-opacity duration-500 ease-in-out opacity-100"
      >
        <div className="relative w-full h-full">
          <div className="w-full h-full border border-dotted border-[#A0A4AB] rotate-45 absolute inset-0"></div>
        </div>
      </div>

      <div className="fixed left-4 top-1/2 -translate-y-1/2">
        <Link>
          <button className="border-none bg-transparent flex items-center gap-2 text-black font-semibold text-[10px] leading-4 tracking-tight ">
            <img src={leftArrow} alt="" className="scale-x-[-1]" />
            DISCOVER A.I
          </button>
        </Link>
      </div>
    </div>
  );
};

export default landing;
