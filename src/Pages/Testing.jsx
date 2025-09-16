import React from "react";
import largeTri from "../Assets/Rectangle 2780.svg";
import midTri from "../Assets/Rectangle 2779.svg";
import smallTri from "../Assets/Rectangle 2778.svg";

const Testing = () => {
  return (
    <div>
      <div className="absolute top-16 left-9 text-left">
        <p className="uppercase font-semibold text-xs">To start Analysis</p>
      </div>
      <div className="min-h-[90vh] flex flex-col items-center justify-center bg-white text-center">
        <div
          className="relative flex flex-col items-center justify-center mb-40 w-full h-full"
          style={{
            width: "420px",
            height: "64px",
          }}
        >
          <p className="text-sm text-gray-400 tracking-wider uppercase mb-1">
            click to type
          </p>
          <form action="" className="relative z-10">
            <input
              type="text"
              placeholder="Introduce Yourself"
              className="text-5xl sm:text-6xl font-normal text-center bg-transparent border-b border-black focus:outline-none appearance-none w-[372px] sm:w-[432px] pt-1 tracking-[-0.07em] leading-[64px] text-[#1A1B1C] z-10l"
            />
          </form>
          <img
            src={largeTri}
            alt="Large Diamond"
            className="absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-1/2 w-[480px] h-[480px] md:w-[762px] md:h-[762px] spin-fast"
          />
          <img
            src={midTri}
            alt="Medium Diamond"
            className="absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-1/2 w-[400px] h-[400px] md:w-[682px] md:h-[682px] spin-medium"
          />
          <img
            src={smallTri}
            alt="Small Diamond"
            className="absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-1/2 w-[320px] h-[320px] md:w-[602px] md:h-[602px] spin-slow"
          />
        </div>
      </div>
    </div>
  );
};

export default Testing;
