import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const CountdownCard = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const now = new Date();
    const target = new Date(targetDate);
    target.setHours(0, 0, 0, 0); // Set to start of the day
    const timeDifference = target - now;

    if (timeDifference <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="p-4 text-center">
      <h2 className="text-xl font-bold mb-2">Countdown to {new Date(targetDate).toDateString()}</h2>
      <div className="flex justify-center space-x-8">
        <div className="flex flex-col items-center">
          <p className="text-6xl font-bold">{timeLeft.days}</p>
          <span>Days</span>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-6xl font-bold">{timeLeft.hours}</p>
          <span>Hours</span>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-6xl font-bold">{timeLeft.minutes}</p>
          <span>Minutes</span>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-6xl font-bold">{timeLeft.seconds}</p>
          <span>Seconds</span>
        </div>
      </div>
    </div>
  );
};

CountdownCard.propTypes = {
  targetDate: PropTypes.string.isRequired,
};

export default CountdownCard;
