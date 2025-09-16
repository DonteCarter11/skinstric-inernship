import React, { useState } from "react";
import Rombus from "../Components/UI/Rombus";

const Testing = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
    }
  };

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
              onKeyDown={handleKeyDown}
            />
          </form>
          <Rombus />
        </div>
      </div>
    </div>
  );
};

export default Testing;
