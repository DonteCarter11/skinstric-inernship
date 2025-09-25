import React, { useEffect, useState } from "react";
import Arrows from "../Components/UI/Arrows";
import { useLocation, useNavigate } from "react-router-dom";
import Rombus from "../Components/UI/Rombus";

const Demographics = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [predictions, setPredictions] = useState(null);
  const [sortedData, setSortedData] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("race");
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);
  const [savedSelections, setSavedSelections] = useState({
    race: 0,
    age: 0,
    gender: 0,
  });

  useEffect(() => {
    try {
      const apiData = location.state?.analysisData?.data;

      if (!apiData) {
        console.log("No API data found, redirecting...");
        setHasError(true);
        setTimeout(() => navigate("/camera"), 2000);
        return;
      }

      const topRace = findHighest(apiData.race);
      const topAge = findHighest(apiData.age);
      const topGender = findHighest(apiData.gender);

      const sorted = {
        race: sortCategoryData(apiData.race),
        age: sortCategoryData(apiData.age),
        gender: sortCategoryData(apiData.gender),
      };

      setPredictions({
        topRace: topRace.name,
        topAge: topAge.name,
        topGender: topGender.name,
        raceConfidence: topRace.confidence,
        ageConfidence: topAge.confidence,
        genderConfidence: topGender.confidence,
        allData: {
          race: sorted.race,
          age: sorted.age,
          gender: sorted.gender,
        },
      });

      setSortedData(sorted);
      setIsLoading(false);
    } catch (error) {
      setHasError(true);
      setIsLoading(false);
    }
  }, [location.state, navigate]);

  useEffect(() => {
    setSelectedItemIndex(savedSelections[selectedCategory]);
  }, [selectedCategory, savedSelections]);

  const findHighest = (categoryData) => {
    if (!categoryData) return { name: "Unknown", confidence: 0 };

    let bestName = "";
    let bestScore = 0;

    for (const [name, score] of Object.entries(categoryData)) {
      if (score > bestScore) {
        bestScore = score;
        bestName = name;
      }
    }

    return {
      name: bestName,
      confidence: Math.round(bestScore * 100),
    };
  };

  const sortCategoryData = (categoryData) => {
    if (!categoryData) return [];

    return Object.entries(categoryData)
      .map(([name, score]) => ({
        name: name,
        percentage: Math.round(score * 100),
        rawScore: score,
      }))
      .sort((a, b) => b.rawScore - a.rawScore);
  };

  const getCurrentCategoryData = () => {
    if (!sortedData) return [];
    return sortedData[selectedCategory] || [];
  };

  const getSelectedItem = () => {
    const currentData = getCurrentCategoryData();
    return currentData[selectedItemIndex] || { name: "Loading", percentage: 0 };
  };

  const getCategoryDisplayName = () => {
    const names = {
      race: "RACE",
      age: "AGE",
      gender: "GENDER",
    };
    return names[selectedCategory] || "CATEGORY";
  };

  const handleItemSelect = (index) => {
    setSelectedItemIndex(index);
    setSavedSelections((prev) => ({
      ...prev,
      [selectedCategory]: index,
    }));
  };

  const getDisplayDataForCategory = (category) => {
    if (!predictions?.allData) return { name: "Loading", percentage: 0 };

    const categoryData = predictions.allData[category];
    if (!categoryData || categoryData.length === 0)
      return { name: "Unknown", percentage: 0 };

    const savedIndex = savedSelections[category];
    return categoryData[savedIndex] || categoryData[0];
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center mt-[275px]">
        <div className="text-center">
          <div className=" "></div>
          <p className=" text-base uppercase font-semibold">
            Processing analysis...
          </p>
          <Rombus />
        </div>
      </div>
    );
  }

  const currentData = getCurrentCategoryData();
  const selectedItem = getSelectedItem();

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
            <div className="grid md:grid-cols-[1.5fr_8.5fr_3.15fr] gap-4  mb-40 md:gap-4 pb-0 md:pb-0 md:mb-0">
              <div className="bg-white-100  space-y-3 md:flex md:flex-col h-[62%]">
                <div
                  className={`p-3 cursor-pointer border-black flex-1 flex flex-col justify-between border-t capitalize ${
                    selectedCategory === "race"
                      ? "bg-[#1A1B1C] text-white"
                      : "bg-[#F3F3F4] hover:bg-[#E1E1E2]"
                  }`}
                  onClick={() => setSelectedCategory("race")}
                >
                  <p className="text-base font-semibold">
                    {getDisplayDataForCategory("race").name}
                  </p>
                  <h4 className="text-base font-semibold mb-1">RACE</h4>
                </div>

                <div
                  className={`p-3 cursor-pointer border-black flex-1 flex flex-col justify-between border-t ${
                    selectedCategory === "age"
                      ? "bg-[#1A1B1C] text-white"
                      : "bg-[#F3F3F4] hover:bg-[#E1E1E2]"
                  }`}
                  onClick={() => setSelectedCategory("age")}
                >
                  <p className="text-base font-semibold">
                    {getDisplayDataForCategory("age").name}
                  </p>
                  <h4 className="text-base font-semibold mb-1">AGE</h4>
                </div>

                <div
                  className={`p-3 cursor-pointer flex-1 border-black flex flex-col justify-between border-t uppercase ${
                    selectedCategory === "gender"
                      ? "bg-[#1A1B1C] text-white"
                      : "bg-[#F3F3F4] hover:bg-[#E1E1E2]"
                  }`}
                  onClick={() => setSelectedCategory("gender")}
                >
                  <p className="text-base font-semibold">
                    {getDisplayDataForCategory("gender").name}
                  </p>
                  <h4 className="text-base font-semibold mb-1">GENDER</h4>
                </div>
              </div>

              <div className="relative bg-gray-100 p-4 flex flex-col items-center justify-center md:h-[57vh] border-black md:border-t md:border-black ">
                <p className="hidden md:block md:absolute text-[40px] mb-2 left-5 top-2 capitalize">
                  {selectedCategory === "age"
                    ? `${selectedItem.name} y.o`
                    : selectedItem.name}
                </p>
                <div className="relative md:absolute w-full max-w-[384px] aspect-square mb-4 md:right-5 md:bottom-2">
                  <div className="width: 100%; height: 100%; max-height: 384px; position: relative; transform: scale(1); transform-origin: center center;">
                    <svg
                      className="w-full h-full transform -rotate-90 "
                      viewBox="0 0 256 256"
                    >
                      <circle
                        cx="128"
                        cy="128"
                        r="112"
                        stroke="#E5E7EB"
                        strokeWidth="3"
                        fill="none"
                      />
                      <circle
                        cx="128"
                        cy="128"
                        r="112"
                        stroke="#1A1B1C"
                        strokeWidth="3"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 112}`}
                        strokeDashoffset={`${
                          2 *
                          Math.PI *
                          112 *
                          (1 - selectedItem.percentage / 100)
                        }`}
                        strokeLinecap="round"
                        className="transition-all duration-1000 ease-in-out"
                      />
                    </svg>
                  </div>

                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center ">
                    <div className="text-xl text-[#1A1B1C] mb-2">
                      {selectedItem.percentage}%
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-100 pt-4 pb-4 border-black md:border-t capitalize">
                <div className="space-y-0">
                  <div className="flex justify-between px-4">
                    <h4 className="text-base leading-[24px] tracking-tight font-medium mb-2">
                      {getCategoryDisplayName()}
                    </h4>
                    <h4 className="text-base leading-[24px] tracking-tight font-medium mb-2">
                      A.I. CONFIDENCE
                    </h4>
                  </div>

                  {currentData.map((item, index) => (
                    <div
                      key={item.name}
                      className={`flex items-center justify-between h-[48px] px-4 cursor-pointer gap-1 ${
                        index === selectedItemIndex
                          ? "bg-[#1A1B1C] text-white hover:bg-black"
                          : "hover:bg-[#E1E1E2]"
                      }`}
                      onClick={() => handleItemSelect(index)}
                    >
                      <input
                        src=""
                        id={`diamond-${index}`}
                        alt=""
                        className="peer rounded-none appearance-none"
                        type="radio"
                        checked={index === selectedItemIndex}
                        readOnly
                      />
                      <label
                        htmlFor={`diamond-${index}`}
                        className="relative flex "
                      >
                        <span className="relative w-[12px] h-[12px] mr-2 border border-slate-400 peer-checked:bg-white duration-100 ease-in-out rotate-45">
                          <span className="absolute block w-10/12 h-10/12 transform rotate-45 top-0 left-0 peer-checked:bg-white scale-0 peer-checked:scale-100 duration-150 ease-in-out"></span>
                        </span>
                      </label>
                      <span className="font-normal text-base leading-6 tracking-tight">
                        {item.name}
                      </span>
                      <span className="font-normal text-base leading-6 tracking-tight ml-auto">
                        {item.percentage}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-[8px] left-6 z-10">
          <button onClick={() => navigate("/analysis")}>
            <div className="group hidden sm:flex flex-row relative justify-center items-center">
              <div className="w-12 h-12 hidden sm:flex justify-center border border-black rotate-45 scale-[0.85] group-hover:scale-[0.92] ease duration-300">
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-[0.9] rotate-12 hidden sm:block group-hover:scale-[0.92] ease duration-300">
                  ▶
                </span>
              </div>
              <span className="text-sm font-semibold hidden sm:block ml-6 uppercase">
                back
              </span>
            </div>
          </button>
        </div>

        <div className="absolute bottom-2 right-2 z-10 flex gap-4">
          <button className="px-4 py-2 bg-white text-black border border-black uppercase text-sm font-semibold hover:bg-gray-100 transition-colors">
            reset
          </button>
          <button className="px-4 py-2 bg-black text-white border border-white uppercase text-sm font-semibold hover:bg-gray-800 transition-colors">
            confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Demographics;
