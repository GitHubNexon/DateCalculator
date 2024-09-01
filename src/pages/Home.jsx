import React from 'react';
import "../styles/custom.css"

const Countdown = () => {
  return (
    <div className="container flex flex-col items-center justify-center h-screen text-white text-center">
      <h1 className="text-4xl font-bold mb-4">Exciting Countdown Coming Soon!</h1>
      <p className="text-lg text-center px-4 md:px-8">
        Stay tuned for our upcoming event. We’re working hard to bring you an amazing experience!
        Check back soon for more details.
      </p>
    </div>
  );
}

export default Countdown;
