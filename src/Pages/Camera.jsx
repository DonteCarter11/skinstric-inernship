import React, { useRef, useState } from "react";
import Rombus from "../Components/UI/Rombus";
import cameraIcon from "../Assets/camera.svg";
import gallery from "../Assets/gallery.svg";
import scanLine from "../Assets/Group 39690.svg";
import Arrows from "../Components/UI/Arrows";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Webcam from "react-webcam";

const Camera = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showCamera, setShowCamera] = useState(false);

  const fileInputRef = useRef(null);

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleFileChange = async (e) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];

      setError(null);

      if (!selectedFile.type.startsWith("image/")) {
        setError("Please select a valid image file");
        return;
      }

      setSelectedFile(selectedFile);

      await analyzeImage(selectedFile);
    }
  };

  const handleGalleryClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const analyzeImage = async (file) => {
    setLoading(true);
    setError(null);

    try {
      const base64String = await convertToBase64(file);

      const { data } = await axios.post(
        `https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseTwo`,
        {
          image: base64String,
        }
      );

      navigate("/analysis", {
        state: {
          analysisData: data,
          imageFile: file,
          imagePreview: file,
        },
      });
    } catch (error) {
      setError(
        error.response?.data?.message ||
          error.message ||
          "Analysis failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[92vh] flex flex-col bg-white relative md:pt-[64px] justify-center">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />

      <div className="absolute top-2 left-9 md:left-8 text-left">
        <p className="uppercase font-semibold text-xs">
          {loading ? "Analyzing Image..." : "To start Analysis"}
        </p>
      </div>

      <div className="flex-[0.4] md:flex-1 flex flex-col md:flex-row items-center xl:justify-center relative mb-0 md:mb-30 space-y-[-20px] md:space-y-0">
        <div className="relative md:absolute md:left-[55%] lg:left-[50%] xl:left-[40%] md:-translate-y-[0%] -translate-y-[1%] md:-translate-x-full flex flex-col items-center justify-center">
          <div className="w-[270px] h-[270px] md:w-[482px] md:h-[482px]"></div>

          <div className="absolute inset-0 flex items-center justify-center">
            <Rombus />
          </div>

          <Link
            to="/capture"
            disabled={loading}
            className="absolute flex items-center justify-center"
            style={{
              width: "136px",
              height: "136px",
              pointerEvents: loading ? "none" : "auto",
            }}
          >
            <img
              src={cameraIcon}
              alt="Camera"
              className={`w-full h-full hover:scale-105 duration-700 ease-in-out ${
                loading ? "opacity-50" : "cursor-pointer"
              }`}
            />
          </Link>

          <div className="absolute bottom-[1%] right-[90px] md:top-[30.9%] md:right-[-12px] translate-y-[-20px]">
            <p className="text-xs md:text-sm font-normal mt-1 leading-[24px]">
              ALLOW A.I. <br />
              TO SCAN YOUR FACE
            </p>
            <img
              src={scanLine}
              alt="scan line"
              className="absolute hidden md:block md:right-[143px] md:top-[20px]"
            />
          </div>
        </div>

        <div className="relative md:absolute md:left-[45%] lg:left-[50%] xl:left-[55%] flex flex-col items-center mt-12 md:mt-0 justify-center md:-translate-y-[0%] -translate-y-[10%] transition-opacity duration-300 opacity-100">
          <div className="w-[270px] h-[270px] md:w-[482px] md:h-[482px]"></div>

          <div className="absolute inset-0 flex items-center justify-center">
            <Rombus />
          </div>

          <button
            onClick={handleGalleryClick}
            disabled={loading}
            className="absolute flex items-center justify-center"
            style={{
              width: "136px",
              height: "136px",
              pointerEvents: loading ? "none" : "auto",
            }}
          >
            <img
              src={gallery}
              alt="Gallery"
              className={`w-full h-full hover:scale-105 duration-700 ease-in-out ${
                loading ? "opacity-50" : "cursor-pointer"
              }`}
            />
          </button>

          <div className="absolute top-[75%] md:top-[70%] md:left-[17px] translate-y-[-10px]">
            <p className="text-[12px] md:text-[14px] font-normal mt-2 leading-[24px] text-right">
              ALLOW A.I. <br />
              ACCESS GALLERY
            </p>
            <img
              src={scanLine}
              alt="gallery-line"
              className="absolute hidden md:block md:left-[120px] md:bottom-[39px] scale-[-1]"
            />
          </div>
        </div>
      </div>

      <div className="absolute bottom-[8px] left-6 z-10">
        <button onClick={() => navigate('/')}>
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
    </div>
  );
};

export default Camera;
