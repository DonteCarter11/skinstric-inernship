import React, { useState } from "react";
import rightArrow from "../../Assets/buttin-icon-shrunk.svg";
import leftArrow from "../../Assets/buttin-icon-shrunk.svg";
import { Link } from "react-router-dom";
import triangle from "../../Assets/Rectangle 2778.svg";

const Landing = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="overflow-hidden h-screen">
      <div className="lg:hidden absolute inset-0 flex justify-center items-center">
        <div className="w-[400px] h-[400px] max-w-[600px] max-h-[600px] border border-gray-300 rotate-45 absolute"></div>
        <div className="w-[450px] h-[450px] max-w-[450px] max-h-[450px] border border-gray-300 rotate-45 absolute"></div>
      </div>

      <div
        className={`w-full h-full flex justify-center items-center px-2 py-4 transition-all duration-1000 ease-out ${
          isHovered ? " lg:ml-[-500px]" : ""
        } lg:flex-row flex-col relative z-10`}
      >
        <div className={`transition-all duration-500`}>
          <h1
            className={`font-light text-black transition-all duration-500 lg:h-[240px] lg:w-[680px] lg:text-[128px] lg:leading-[120px] lg:tracking-[-7px] lg:text-left text-center mb-6 text-[48px] leading-[44px] tracking-[-2px] sm:text-[64px] sm:leading-[60px] sm:tracking-[-3px] md:text-[80px] md:leading-[76px] md:tracking-[-4px]`}
            style={{ fontFamily: "Roobert" }}
          >
            Sophisticated <br />
            <span className="">skincare</span>
          </h1>
          <img src="" alt="" className="" />
        </div>
        
        <div className="lg:hidden text-center">
          <p className="text-center max-w-[316px] mx-auto text-[16px] mb-8 text-gray-600 font-semibold">
            Skinstric developed an A.I. that creates a highly-personalized routine
            tailored to what your skin needs.
          </p>

          <Link to={`/testing`}>
            <button className=" border-black bg-transparent text-black px-6 py-2 font-semibold text-m tracking-tight hover:scale-105 transition-transform duration-300 flex items-center gap-2 mx-auto">
              ENTER EXPERIENCE
              <img src={rightArrow} alt="" className="w-[25px] h-[25px]" />
            </button>
          </Link>
        </div>
      </div>

      <p className="hidden lg:block fixed bottom-4 left-4 w-[316px] h-[72px] text-[14px]">
        Skinstric developed an A.I. that creates a highly-personalized routine
        tailored to what your skin needs.
      </p>

      <div
        className="hidden lg:block fixed right-4 top-1/2 -translate-y-1/2 z-50"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Link to={`/testing`}>
          <div className="relative group">
            <div className="absolute w-[502px] h-[502px] border border-dashed border-black rotate-45 -right-[301px] top-1/2 -translate-y-1/2 transition-all duration-300"></div>
            <div className="absolute w-[550px] h-[550px] border border-dashed border-black rotate-45 -right-[325px] top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-50 transition-all duration-300"></div>
            <div className="absolute w-[600px] h-[600px] border border-dashed border-black rotate-45 -right-[350px] top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-25 transition-all duration-500"></div>
            <button className="relative z-10 bg-transparent flex items-center gap-2 text-black font-semibold text-[10px] leading-4 tracking-tight p-2">
              TAKE TEST
              <img src={rightArrow} alt="" className="" />
            </button>
          </div>
        </Link>
      </div>

      <div
        id="right-section"
        className="hidden lg:block fixed top-1/2 right-[calc(-53vw)] xl:right-[calc(-50vw)] -translate-y-1/2 w-[500px] h-[500px] transition-opacity duration-500 ease-in-out opacity-100"
      >
        <div className="relative w-full h-full">
          <div className="w-full h-full border border-dashed border-[#A0A4AB] rotate-45 absolute inset-0"></div>
        </div>
      </div>

      <div
        className={`hidden lg:block fixed left-4 top-1/2 -translate-y-1/2 transition-all duration-500 ${
          isHovered ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <Link>
          <div className="relative">
            <div className="absolute w-[502px] h-[502px] border border-dashed border-black rotate-45 -left-[301px] top-1/2 -translate-y-1/2"></div>
            <button className="relative z-10 bg-transparent flex items-center gap-2 text-black font-semibold text-[10px] leading-4 tracking-tight p-2">
              <img src={leftArrow} alt="" className="scale-x-[-1]" />
              DISCOVER A.I
            </button>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Landing;