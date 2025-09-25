import React, { useState } from "react";
import Rombus from "../Components/UI/Rombus";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Arrows from "../Components/UI/Arrows";

const TestingPage = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const isValidInput = (text) => {
    return /^[A-Za-z\s\-']+$/.test(text);
  };
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!name.trim() || !location.trim()) {
      setError("Please fill in both fields");
      return;
    }
    if (!isValidInput(name) || !isValidInput(location)) {
      setError("Please use only letters");
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

      navigate("/camera", {
        state: {
          userData: data,
          name: name,
          location: location,
        },
      });
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
        if (!isValidInput(name)) {
          setError(
            "Please use only letters and spaces (no numbers or symbols)"
          );
          setName("");
          return;
        }
        setCurrentStep(2);
        setError(null);
      } else if (currentStep === 2 && location.trim()) {
        if (!isValidInput(location)) {
          setError(
            "Please use only letters and spaces (no numbers or symbols)"
          );
          setLocation("");
          return;
        }
        handleSubmit();
      } else {
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
          {error && (
            <div className="  text-red-500 py-3 px-4 z-50 text-center">
              <span className="font-semibold text-sm">{error}</span>
            </div>
          )}
          <div className="relative z-10">
            {currentStep === 1 && (
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Introduce Yourself"
                className="text-5xl sm:text-6xl font-normal text-center bg-transparent border-b border-black focus:outline-none appearance-none w-[372px] sm:w-[432px] pt-1 tracking-[-0.07em] leading-[64px] text-[#1A1B1C]"
                onKeyDown={handleKeyDown}
                disabled={loading}
                autoFocus
              />
            )}

            {currentStep === 2 && (
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Your Location"
                className="text-5xl sm:text-6xl font-normal text-center bg-transparent border-b border-black focus:outline-none appearance-none w-[372px] sm:w-[432px] pt-1 tracking-[-0.07em] leading-[64px] text-[#1A1B1C]"
                onKeyDown={handleKeyDown}
                disabled={loading}
                autoFocus
              />
            )}
          </div>

          <Rombus />
        </div>

        {loading && <div className="text-gray-500 text-sm mt-4"></div>}
      </div>
      <Arrows />
    </div>
  );
};

export default TestingPage;
