import { useState } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux"; // Import useSelector to access Redux state
import NavProfile from "../NavProfile";

export const Headers = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Get user data from Redux store
  const user = useSelector((state) => state.user.user); // Access user from Redux store
  const coach = useSelector((state) => state.coach.coach)
  const isLoggedIn = user !== null || coach!== null // Determine if user is logged in based on the user state

  return (
    <header className="bg-black">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div>
          <NavLink to="/" className="text-2xl font-bold text-white">
            HALFCOACH
          </NavLink>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="text-white md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "✖" : "☰"}
        </button>

        {/* Navigation Menu */}
        <nav
          className={`absolute top-16 left-0 w-full z-50 bg-black p-3 md:static md:w-auto md:flex transition-transform duration-300 ease-in-out ${
            isOpen ? "block" : "hidden"
          } md:block`}
        >
          <ul className="flex flex-col md:flex-row md:space-x-6 text-blue-50 items-center md:items-start">
          <li>
              <NavLink to="/" onClick={() => setIsOpen(false)}>
                <StyledWrapper>
                  <button id="btn">Home</button>
                </StyledWrapper>
              </NavLink>
            </li>
            <li>
              <NavLink to="/coaches" onClick={() => setIsOpen(false)}>
                <StyledWrapper>
                  <button id="btn">Coaches</button>
                </StyledWrapper>
              </NavLink>
            </li>
            <li>
              <NavLink to="/book" onClick={() => setIsOpen(false)}>
                <StyledWrapper>
                  <button id="btn">Books</button>
                </StyledWrapper>
              </NavLink>
            </li>
            <li>
              <NavLink to="/blog" onClick={() => setIsOpen(false)}>
                <StyledWrapper>
                  <button id="btn">Events</button>
                </StyledWrapper>
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" onClick={() => setIsOpen(false)}>
                <StyledWrapper>
                  <button id="btn">About</button>
                </StyledWrapper>
              </NavLink>
            </li>
           
            

            {/* Conditionally render based on login status */}
            {!isLoggedIn ? (
              <>
                <li>
                  <NavLink to="/login" onClick={() => setIsOpen(false)}>
                    <StyledWrapper>
                      <button id="btn">Login</button>
                    </StyledWrapper>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/register" onClick={() => setIsOpen(false)}>
                    <StyledWrapper>
                      <button id="btn">Register</button>
                    </StyledWrapper>
                  </NavLink>
                </li>
              </>
            ) : (
              <li className="pt-2">
                <NavProfile /> {/* Show NavProfile when logged in */}
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

const StyledWrapper = styled.div`
  button {
    padding: 8px 12px;
    text-transform: uppercase;
    border-radius: 8px;
    font-size: 17px;
    font-weight: 500;
    color: #ffffff80;
    background: transparent;
    cursor: pointer;
    transition: 0.5s ease;
    user-select: none;
  }

  #btn:hover,
  :focus {
    color: #ffffff;
    background: #008cff;
    text-shadow: 0 0 5px #ffffff, 0 0 10px #ffffff, 0 0 20px #ffffff;
    box-shadow: 0 0 5px #008cff, 0 0 20px #008cff, 0 0 50px #008cff,
      0 0 100px #008cff;
  }
`;