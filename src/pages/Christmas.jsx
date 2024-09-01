import React, { useState, useEffect, useRef } from "react";
import joseMariChan from "../assets/jose-mari-chan-bilyo.png";
import christmasMusic1 from "../assets/music/Jose Mari Chan Christmas Songs.mp3";

const Christmas = () => {
  const calculateTimeLeft = () => {
    const now = new Date();
    const year = now.getFullYear();
    const christmas = new Date(year, 11, 25); // December 25th

    if (now > christmas) {
      christmas.setFullYear(year + 1); // Set to next year if Christmas is already passed
    }

    const difference = christmas - now;

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [audioState, setAudioState] = useState("stopped"); // "playing", "paused", or "stopped"
  const audioRef = useRef(null);

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
    // Load audio settings from localStorage
    const savedAudioState = localStorage.getItem("audioState");
    if (savedAudioState) {
      setAudioState(savedAudioState);
    }
  }, []);

  useEffect(() => {
    // Save audio settings to localStorage
    localStorage.setItem("audioState", audioState);

    if (audioRef.current) {
      if (audioState === "playing") {
        audioRef.current.play();
      } else if (audioState === "paused") {
        audioRef.current.pause();
      } else if (audioState === "stopped") {
        audioRef.current.pause();
        audioRef.current.currentTime = 0; // Reset audio to start
      }
    }
  }, [audioState]);

  const handlePlayButtonClick = () => {
    setAudioState("playing");
  };

  const handlePauseButtonClick = () => {
    setAudioState("paused");
  };

  const handleStopButtonClick = () => {
    setAudioState("stopped");
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-100 text-gray-800">
      <img
        src={joseMariChan}
        alt="Christmas tree"
        className="absolute inset-0 object-fill w-full h-full "
      />
      <div className="relative z-10 text-center text-gray-800 ">
        <h1 className="text-4xl font-bold mb-4 max-sm:text-2xl">Merry Christmas!</h1>
        <h1 className="text-4xl font-bold mb-4 max-sm:text-2xl">Christmas Countdown</h1>
        <div className="flex justify-center space-x-8">
          <div className="flex flex-col items-center">
            <p className="text-4xl font-bold">{timeLeft.days}</p>
            <span className="text-lg">Days</span>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-4xl font-bold">{timeLeft.hours}</p>
            <span className="text-lg">Hours</span>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-4xl font-bold">{timeLeft.minutes}</p>
            <span className="text-lg">Minutes</span>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-4xl font-bold">{timeLeft.seconds}</p>
            <span className="text-lg">Seconds</span>
          </div>
        </div>
        <div className="mt-4">
          {audioState === "stopped" && (
            <button
              onClick={handlePlayButtonClick}
              className="px-4 py-2 bg-blue-500 text-white rounded mr-4"
            >
              Play Music
            </button>
          )}
          {audioState === "playing" && (
            <>
              <button
                onClick={handlePauseButtonClick}
                className="px-4 py-2 bg-yellow-500 text-white rounded mr-4"
              >
                Pause Music
              </button>
              <button
                onClick={handleStopButtonClick}
                className="px-4 py-2 bg-red-500 text-white rounded"
              >
                Stop Music
              </button>
            </>
          )}
          {audioState === "paused" && (
            <button
              onClick={handlePlayButtonClick}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Play Music
            </button>
          )}
        </div>
      </div>
      <audio
        ref={audioRef}
        src={christmasMusic1}
        loop
        className="hidden"
      />
    </div>
  );
};

export default Christmas;
