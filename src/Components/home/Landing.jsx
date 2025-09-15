import React from "react";

const landing = () => {
  return (
    <div>
      <div className="home__container">
        <div>
          <h1 className="text-center">
            Sophisticated <br />
            <span className="">skincare</span>
          </h1>
          <p className="z-10 block lg:hidden w-[30ch] mt-4 text-[16px] font-semibold text-center text-muted-foreground text-[#1a1b1c83]">
            Skinstric developed an A.I. that creates a highly-personalized
            routine tailored to what your skin needs.
          </p>
        </div>
        <div
          id="left-section"
          className="hidden lg:block fixed left-[calc(-53vw)] xl:left-[calc(-50vw)] top-1/2 -translate-y-1/2 w-[500px] h-[500px] transition-opacity duration-500 ease-in-out opacity-100"
        >
          <div className="relative w-full h-full">

          </div>
        </div>
      </div>
    </div>
  );
};

export default landing;
