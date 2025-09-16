import React from "react";
import rightArrow from "../../Assets/buttin-icon-shrunk.svg";
import leftArrow from "../../Assets/buttin-icon-shrunk.svg";

const landing = () => {
  return (
    <div>
      {/* Home Container */}
      <div className="w-screen h-screen flex justify-center items-center px-2 py-4 overflow-hidden">
        <div>
          <h1 className="text-center h-[240px] w-[680px] font-light text-black text-[128px] leading-[120px] tracking-[-7px] items-center" style={{fontFamily: 'Roobert'}}>
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
      {/* Right Section */}
      <div className="fixed right-4 top-1/2 -translate-y-1/2">
        <button className="border-none bg-transparent flex items-center gap-2 text-black font-semibold text-[10px] leading-4 tracking-tight ">
          TAKE TEST
          <img src={rightArrow} alt="" className="" />
        </button>
      </div>

      {/* Left Section */}
      <div className="fixed left-4 top-1/2 -translate-y-1/2">
        <button className="border-none bg-transparent flex items-center gap-2 text-black font-semibold text-[10px] leading-4 tracking-tight ">
          <img src={leftArrow} alt="" className="scale-x-[-1]" />
          DISCOVER A.I
        </button>
      </div>

    </div>
  );
};

export default landing;