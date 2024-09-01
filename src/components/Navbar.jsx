import React, { useState, useEffect } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import Logo from "../assets/clock.png"; 
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const location = useLocation(); // Get the current location

  const toggleNav = () => setNav(!nav);
  const closeNav = () => setNav(false);

  useEffect(() => {
    if (nav) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
    return () => document.body.classList.remove("no-scroll");
  }, [nav]);

  // Scroll to top whenever the location (route) changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  
  const navigate = useNavigate();
  // Navigate to specific sub-pages on click events
  const handleEnrollClick = () => {
    navigate ("/enroll-form")
  };

  return (
    <div className="sticky top-0 z-50 text-white max-w-full">
      <div className="glass-nav flex justify-between space-x-6 items-center p-4 max-w-full">
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-nowrap">
            <img src={Logo} alt="School Logo" className="w-[60px] h-[60px]" />
          </Link>

          <button onClick={toggleNav} className="lg:hidden text-gray-900">
            {nav ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
          </button>
        </div>

        {/* Desktop Menu */}
        <div
          className="hidden lg:flex flex-grow justify-center space-x-6 bg-gray-900 p-4 border-gray-700
          border-b-[4px] rounded hover:border-b-[6px]
          active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
        >
          <ul className="flex space-x-6 text-nowrap">
            {[
              "home",
              "christmas",
              "newyear",
              "countdowncal",
            ].map((item) => (
              <li
                key={item}
                className="relative group cursor-pointer hover:scale-110 transform transition duration-300"
              >
                <Link to={`/${item}`} onClick={closeNav}>
                  {item.replace(/-/g, " ").toUpperCase()}
                </Link>
                <span
                  className={`absolute left-0 bottom-0 w-full h-0.5 bg-blue-500 transform transition-transform duration-300 ease-in-out
                  ${
                    location.pathname === `/${item}`
                      ? "scale-x-100"
                      : "scale-x-0"
                  }`}
                ></span>
              </li>
            ))}
          </ul>
        </div>
        <button
          className="text-nowrap bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-7 border-blue-600
          border-b-[4px] rounded hover:border-b-[6px]
          active:border-b-[2px] active:brightness-90 active:translate-y-[2px]" onClick={handleEnrollClick}
        >
          Visit
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed left-0 w-full h-full overflow-y-auto bg-[#232323] text-white z-20 transition-transform duration-300 ${
          nav ? "translate-x-0" : "-translate-x-full"
        } lg:hidden`}
      >
        <div className="flex flex-col items-center mt-20 space-y-9">
          {[
            "home",
            "christmas",
            "newyear",
            "countdowncal",
          ].map((item) => (
            <Link key={item} to={`/${item}`} onClick={closeNav} className="text-xl">
              {item.replace(/-/g, " ").toUpperCase()}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
