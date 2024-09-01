// CountdownCal.jsx
import React, { useState } from 'react';
import CountdownCard from '../components/CountdownCard';

const CountdownCal = () => {
  const [date, setDate] = useState('');
  const [showCountdown, setShowCountdown] = useState(false);

  const handleChange = (e) => {
    setDate(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowCountdown(true);
  };

  return (
    <div className="p-6 flex items-center justify-center flex-col">
      <h1 className='text-gray-600 text-center'></h1>
      <form onSubmit={handleSubmit} className="mb-6">
        <input
          type="date"
          value={date}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <button type="submit" className="ml-2 bg-blue-500 text-white p-2 rounded">
          Set Countdown
        </button>
      </form>
      {showCountdown && <CountdownCard targetDate={date} />}
    </div>
  );
};

export default CountdownCal;
