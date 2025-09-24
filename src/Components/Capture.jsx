import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import cameraIcon from "../Assets/camera.svg";
import Rombus from "./UI/Rombus";

const Capture = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");

  useEffect(() => {
    requestCameraAccess();
  }, []);

  const requestCameraAccess = async () => {
    setStatus("loading");
    setError("");

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "user",
          width: { ideal: 1920 },
          height: { ideal: 1080 },
        },
      });

      const videoTrack = stream.getVideoTracks()[0];
      const settings = videoTrack.getSettings();

      stream.getTracks().forEach((track) => track.stop());

      setStatus("success");

      setTimeout(() => {
        navigate("/photo", {
          state: {
            cameraPermissionGranted: true,
            cameraSettings: settings,
          },
        });
      }, 1000);
    } catch (err) {
      setStatus("error");
    }
  };

  const handleRetry = () => {
    requestCameraAccess();
  };

  const handleBack = () => {
    navigate("/camera");
  };

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="flex flex-col items-center justify-center text-center p-8">
          <div className="relative mb-6">
            <img
              src={cameraIcon}
              alt="Camera icon"
              className="w-[100px] h-[100px] md:w-[136px] md:h-[136px] opacity-50"
            />
          </div>
          <p className="text-lg font-medium text-gray-700 mb-2">
            SETTING UP CAMERA...
          </p>
          <p className="text-sm text-black mb-4 top-[726px] mt-[100px]">
            TO GET BETTER RESULTS MAKE SURE TO HAVE
          </p>
          <ul className="flex items-center gap-6 text-sm">
            <li className="flex items-center">
              <span className="w-[8px] h-[8px] border border-black rotate-45 mr-2"></span>
              NEUTRAL EXPRESSION
            </li>
            <li className="flex items-center">
              <span className="w-[8px] h-[8px] border border-gray-600 rotate-45 mr-2"></span>
              FRONTAL POSE
            </li>
            <li className="flex items-center">
              <span className="w-[8px] h-[8px] border border-gray-600 rotate-45 mr-2"></span>
              ADEQUATE LIGHTING
            </li>
          </ul>
          <Rombus />
        </div>
      </div>
    );
  }
};

export default Capture;