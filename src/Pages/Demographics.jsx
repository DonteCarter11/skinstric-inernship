import React from "react";
import Arrows from "../Components/UI/Arrows";

const Demographics = () => {
  
  return (
    <div>
      <div className="h-screen md:h-[90vh] flex flex-col md:mt-5">
        <div className="flex-1 w-full bg-white md:overflow-hidden overflow-auto">
          <div className="md:h-full max-w-full mx-5 px-4 md:px-auto flex flex-col">
            <div className="text-start ml-4 mb-4 md:mb-10 md:ml-0 ">
              <h2 className="text-base md:text-base font-semibold mb-1 leading-[24px] uppercase">
                A.I. Analysis
              </h2>
              <h3 className="text-4xl md:text-[72px] font-normal leading-[64px] tracking-tighter uppercase">
                Demographics
              </h3>
              <h4 className="text-sm mt-2 leading-[24px] uppercase">
                Predicted Race & Age
              </h4>
            </div>
            <div className="grid md:grid-cols-[1.5fr_8.5fr_3.15fr] gap-4 mt-10 mb-40 md:gap-4 pb-0 md:pb-0 md:mb-0">
              <div className="bg-white-100 space-y-3 md:flex md:flex-col h-[62%]">
                <div className="p-3 cursor-pointer  bg-[#1A1B1C] text-white hover:bg-black flex-1 flex flex-col justify-between hover:bg-[#E1E1E2] border-t">
                  <p className="text-base font-semibold">black</p>
                  <h4 className="text-base font-semibold mb-1">
                    RACE
                  </h4>
                </div>
                <div className="p-3 cursor-pointer  bg-[#F3F3F4] flex-1 flex flex-col justify-between hover:bg-[#E1E1E2] border-t">
                  <p className="text-base font-semibold">60-90</p>
                  <h4 className="text-base font-semibold mb-1">
                    AGE
                  </h4>
                </div>
                <div className="p-3 cursor-pointer  bg-[#F3F3F4] flex-1 flex flex-col justify-between hover:bg-[#E1E1E2] border-t">
                  <p className="text-base font-semibold">male</p>
                  <h4 className="text-base font-semibold mb-1">
                    SEX
                  </h4>
                </div>
              </div>
              <div className="relative bg-gray-100 p-4 flex flex-col items-center justify-center md:h-[57vh] md:border-t"></div>
            </div>
          </div>
        </div>
      <Arrows />
      </div>
    </div>
  );
};

export default Demographics;
