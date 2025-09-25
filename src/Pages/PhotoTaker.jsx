import axios from "axios";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import takepic from "../Assets/Group 40037.svg";

const PhotoTaker = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const webcamRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [facingMode, setFacingMode] = useState("user");
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    if (!location.state?.cameraPermissionGranted) {
      navigate("/camera");
      return;
    }
    setHasPermission(true);
  }, [location.state, navigate]);

  const capturePhoto = useCallback(async () => {
    if (!webcamRef.current) return;

    setLoading(true);
    setError("");

    try {
      const base64Image = webcamRef.current.getScreenshot();

      if (!base64Image) {
        throw new Error("Failed to capture image");
      }

      const base64Data = base64Image.split(",")[1];

      await analyzeImage(base64Data, base64Image);
    } catch (err) {
      setError("Failed to capture photo. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  const analyzeImage = async (base64Data, fullBase64Image) => {
    setLoading(true);

    try {
      const { data } = await axios.post(
        `https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseTwo`,
        {
          image: base64Data,
        }
      );

      navigate("/analysis", {
        state: {
          ...location.state,
          analysisData: data,
          base64Image: fullBase64Image,
          base64Data: base64Data,
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

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const switchCamera = () => {
    setFacingMode((prev) => (prev === "user" ? "environment" : "user"));
  };

  const goBack = () => {
    navigate("/camera");
  };

  if (!hasPermission) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Checking camera permissions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen bg-black ">
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={{
          facingMode: facingMode,
          width: { ideal: 1920 },
          height: { ideal: 1080 },
        }}
        className="absolute inset-0 w-full h-full object-cover"
        mirrored={facingMode === "user"}
      />

      <div className="absolute inset-0 flex flex-col">
        <div className="flex justify-between items-center p-4 bg-gradient-to-b from-black/50 to-transparent"></div>

        <div className="flex-1 flex items-center justify-end mr-4">
          <p className="uppercase text-white mr-4">Take Picture</p>
          <button
            onClick={capturePhoto}
            disabled={loading}
            className="relative w-16 h-16 bg-white rounded-full border-4 border-gray-300 hover:scale-110 transition-transform disabled:opacity-50"
          >
            <img src={takepic} alt="" />
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              </div>
            )}
          </button>
        </div>
        <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center justify-center text-center mb-[80px] text-white ">
          <p className="text-sm text-white mb-10 top-[726px] mt-[100px]">
            TO GET BETTER RESULTS MAKE SURE TO HAVE
          </p>
          <ul className="flex items-center gap-6 text-sm">
            <li className="flex items-center">
              <span className="w-[8px] h-[8px] border border-white rotate-45 mr-2"></span>
              NEUTRAL EXPRESSION
            </li>
            <li className="flex items-center">
              <span className="w-[8px] h-[8px] border border-white rotate-45 mr-2"></span>
              FRONTAL POSE
            </li>
            <li className="flex items-center">
              <span className="w-[8px] h-[8px] border border-white rotate-45 mr-2"></span>
              ADEQUATE LIGHTING
            </li>
          </ul>
          <div className="absolute bottom-[8px] left-6 z-10">
            <button onClick={() => navigate('/camera')}>
              <div className="group hidden sm:flex flex-row relative justify-center items-center">
                <div className="w-12 h-12 hidden sm:flex justify-center border border-white rotate-45 scale-[0.85] group-hover:scale-[0.92] ease duration-300">
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

        {error && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-600 text-white px-6 py-3 rounded-lg max-w-md text-center">
            {error}
            <button
              onClick={() => setError("")}
              className="ml-2 underline"
            ></button>
          </div>
        )}
      </div>
    </div>
  );
};
export default PhotoTaker;
