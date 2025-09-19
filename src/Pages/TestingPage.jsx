import React, { useState } from "react";
import Rombus from "../Components/UI/Rombus";
import axios from "axios";

const TestingPage = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [currentStep, setCurrentStep] = useState(1); // New state to track which input to show
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    if (!name.trim() || !location.trim()) {
      setError("Please fill in both fields");
      return;
    }

    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const { data } = await axios.post(
        `https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseOne`,
        {
          name: name,
          location: location,
        }
      );
      setResponse(data);
      console.log("API Response:", data);
    } catch (error) {
      setError(
        error.response?.data?.message || error.message || "Something went wrong"
      );
      console.error("API Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      if (currentStep === 1 && name.trim()) {
        // If on first step and name is filled, go to next step
        setCurrentStep(2);
        setError(null); // Clear any previous errors
      } else if (currentStep === 2 && location.trim()) {
        // If on second step and location is filled, submit
        handleSubmit();
      } else {
        // Show error if current field is empty
        setError(
          `Please fill in the ${currentStep === 1 ? "name" : "location"} field`
        );
      }
    }
  };


  return (
    <div>
      <div className="absolute top-16 left-9 text-left">
        <p className="uppercase font-semibold text-xs">To start Analysis</p>
      </div>
      <div className="min-h-[90vh] flex flex-col items-center justify-center bg-white text-center">
        <div
          className="relative flex flex-col items-center justify-center mb-20 w-full h-full"
          style={{
            width: "420px",
            height: "64px",
          }}
        >
          <p className="text-sm text-gray-400 tracking-wider uppercase mb-4">
            {currentStep === 1 ? "click to type" : "now enter your location"}
          </p>

          <div className="relative z-10">
            {/* Step 1: Name Input */}
            {currentStep === 1 && (
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Introduce Yourself"
                className="text-5xl sm:text-6xl font-normal text-center bg-transparent border-b border-black focus:outline-none appearance-none w-[372px] sm:w-[432px] pt-1 tracking-[-0.07em] leading-[64px] text-[#1A1B1C]"
                onKeyDown={handleKeyDown}
                disabled={loading}
                autoFocus // Automatically focus this input
              />
            )}

            {/* Step 2: Location Input */}
            {currentStep === 2 && (
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Your Location"
                className="text-5xl sm:text-6xl font-normal text-center bg-transparent border-b border-black focus:outline-none appearance-none w-[372px] sm:w-[432px] pt-1 tracking-[-0.07em] leading-[64px] text-[#1A1B1C]"
                onKeyDown={handleKeyDown}
                disabled={loading}
                autoFocus // Automatically focus this input
              />
            )}
          </div>

          <Rombus />
        </div>
      </div>
    </div>
  );
};

export default TestingPage;
