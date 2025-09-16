import React from "react";
import Rombus from "../Components/UI/Rombus";
import camera from "../Assets/camera.svg";
import gallery from "../Assets/gallery.svg";
import scanLine from "../Assets/Group 39690.svg"
import Arrows from "../Components/UI/Arrows";

const Camera = () => {
  return (
    <div className="min-h-[92vh] flex flex-col bg-white relative md:pt-[64px] justify-center">
      <div className="absolute top-2 left-9 md:left-8 text-left">
        <p className="uppercase font-semibold text-xs">To start Analysis</p>
      </div>
      <div className="flex-[0.4] md:flex-1 flex flex-col md:flex-row items-center xl:justify-center relative mb-0 md:mb-30 space-y-[-20px] md:space-y-0">
        <div className="relative md:absolute md:left-[55%] lg:left-[50%] xl:left-[40%] md:-translate-y-[0%] -translate-y-[1%] md:-translate-x-full flex flex-col items-center justify-center">
          <div className="w-[270px] h-[270px] md:w-[482px] md:h-[482px]"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <img
              src={camera}
              alt=""
              className="absolute w-[100px] h-[100px] md:w-[136px] md:h-[136px] hover:scale-108 duration-700 ease-in-out cursor-pointer"
            />
            <div className="absolute bottom-[1%] right-[90px] md:top-[30.9%] md:right-[-12px] translate-y-[-20px]">
              <p className="text-xs md:text-sm font-normal mt-1 leading-[24px]">
                 ALLOW A.I. <br />
                TO SCAN YOUR FACE
              </p>
              <img src={scanLine} alt="scan line" className="absolute hidden md:block md:right-[143px] md:top-[20px]" />
            </div>

            <div className="">
              <Rombus />
            </div>
          </div>
        </div>
        <div className="relative md:absolute md:left-[45%] lg:left-[50%] xl:left-[55%] flex flex-col items-center mt-12 md:mt-0 justify-center md:-translate-y-[0%] -translate-y-[10%] transition-opacity duration-300 opacity-100">
          <div className="w-[270px] h-[270px] md:w-[482px] md:h-[482px]"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <img
              src={gallery}
              alt=""
              className="absolute w-[100px] h-[100px] md:w-[136px] md:h-[136px] hover:scale-108 duration-700 ease-in-out cursor-pointer"
            />
            <div className="absolute top-[75%] md:top-[70%] md:left-[17px] translate-y-[-10px]">
              <p className="text-[12px] md:text-[14px] font-normal mt-2 leading-[24px] text-right">
                ALLOW A.I. <br />
                ACCESS GALLERY
              </p>
              <img src={scanLine} alt="gallery-line" className="absolute hidden md:block md:left-[120px] md:bottom-[39px] scale-[-1]" />
            </div>
            <Rombus />
          </div>
        </div>
      </div>
      <Arrows />
    </div>
  );
};

export default Camera;
