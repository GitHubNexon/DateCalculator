import React, { useState, useEffect, useRef } from "react";
import newYearVideo from "../assets/video/Manny Pacquiao new year 2016.mp4"; // Update with the path to your New Year video file

const NewYear = () => {
  const calculateTimeLeft = () => {
    const now = new Date();
    const year = now.getFullYear();
    const newYear = new Date(year + 1, 0, 1); // January 1st

    const difference = newYear - now;

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  useEffect(() => {
    const updateTimeLeft = () => {
      setTimeLeft(calculateTimeLeft());
    };

    // Set up the interval to update the countdown every second
    const interval = setInterval(updateTimeLeft, 1000);

    // Update immediately to avoid initial delay
    updateTimeLeft();

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play(); // Start the video automatically when the component mounts
    }
  }, []);

  const handleMuteToggle = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-100 text-gray-800">
      <video
        ref={videoRef}
        src={newYearVideo} // Update with the path to your New Year video file
        autoPlay
        loop
        playsInline
        muted={isMuted} // Control mute state
        className="absolute inset-0 object-fill w-full h-full"
      />
      <div className="relative z-10 text-center text-white p-4">
        <h1 className="text-4xl font-bold mb-4 max-sm:text-2xl">Happy New Year!</h1>
        <h1 className="text-4xl font-bold mb-4 max-sm:text-2xl">New Year Countdown</h1>
        <div className="flex justify-center space-x-4">
          <div className="text-2xl font-semibold max-sm:text-2xl">
            <p className="text-4xl">{timeLeft.days}</p>
            <p>Days</p>
          </div>
          <div className="text-2xl font-semibold max-sm:text-2xl">
            <p className="text-4xl">{timeLeft.hours}</p>
            <p>Hours</p>
          </div>
          <div className="text-2xl font-semibold max-sm:text-2xl">
            <p className="text-4xl">{timeLeft.minutes}</p>
            <p>Minutes</p>
          </div>
          <div className="text-2xl font-semibold max-sm:text-2xl">
            <p className="text-4xl">{timeLeft.seconds}</p>
            <p>Seconds</p>
          </div>
        </div>
        <button
          onClick={handleMuteToggle}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          {isMuted ? "Unmute" : "Mute"}
        </button>
      </div>
    </div>
  );
};

export default NewYear;
