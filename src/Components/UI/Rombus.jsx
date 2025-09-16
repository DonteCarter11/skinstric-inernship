import React from 'react'
import largeTri from "../../Assets/Rectangle 2780.svg";
import midTri from "../../Assets/Rectangle 2779.svg";
import smallTri from "../../Assets/Rectangle 2778.svg";

const Rombus = () => {
  return (
    <>
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
    </>
  )
}

export default Rombus
