'use client';

import { useEffect, useState } from 'react';

export default function SurveillanceEffects() {
  const [showRecording, setShowRecording] = useState(false);
  const [showWebcam, setShowWebcam] = useState(false);

  useEffect(() => {
    // Random recording indicator flash
    const recordingInterval = setInterval(() => {
      if (Math.random() > 0.85) {
        setShowRecording(true);
        setTimeout(() => setShowRecording(false), 2000);
      }
    }, 30000);

    // Random webcam "activation"
    const webcamInterval = setInterval(() => {
      if (Math.random() > 0.9) {
        setShowWebcam(true);
        setTimeout(() => setShowWebcam(false), 500);
      }
    }, 45000);

    // Initial delay before first possible trigger
    const initialDelay = setTimeout(() => {
      if (Math.random() > 0.5) {
        setShowRecording(true);
        setTimeout(() => setShowRecording(false), 2000);
      }
    }, 60000);

    return () => {
      clearInterval(recordingInterval);
      clearInterval(webcamInterval);
      clearTimeout(initialDelay);
    };
  }, []);

  return (
    <>
      {showRecording && (
        <div className="recording-indicator">
          REC
        </div>
      )}
      {showWebcam && (
        <div className="webcam-indicator" />
      )}
    </>
  );
}

