import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import Auth from "../../utils/auth";
import { useHandleNavLinkClick } from "../../utils/log-in-redirection";
// Import our custom hook.
import { useTheme } from "../../utils/ThemeContext";
import Sidebar from "../Sidebar";

export default function Header() {
  // Pluck values from our ThemeContext by invoking our useTheme hook
  const { pinkTheme, toggleTheme } = useTheme();

  // Object containing CSS gradient for pinkTheme and blueTheme
  const themeStyles = pinkTheme // if pinkTheme is set to true...
    ? "rounded-full border border-2 border-black bg-pink-100 px-2 py-1 hover:bg-blue-100 transition duration-300 ease-in-out" // this is the pinl theme styling
    : "rounded-full border border-2 border-black bg-blue-100 px-2 py-1 hover:bg-pink-100 transition duration-300 ease-in-out"; // else this is the blue theme styling

  // a function that logs out user (onClick - logout button)
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <>
      <header className="flex justify-center items-center flex-col">
        <div className="header-top flex flex-row justify-between items-center md:w-3/4 lg:ml-1">
          <div className="header-buttons-left md:flex justify-center items-center ml-5 hidden">
            <Button onClick={toggleTheme} className={themeStyles}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a15.996 15.996 0 0 0-4.649 4.763m3.42 3.42a6.776 6.776 0 0 0-3.42-3.42"
                />
              </svg>
            </Button>
          </div>
          <img
            src="/images/ns-logo.png"
            alt="nanny-stork-logo"
            className="w-56 lg:ml-12 "
          />
          <div className="header-buttons-right flex justify-center items-center">
            {Auth.loggedIn() ? (
              <>
                <div className="md:flex flex-row hidden">
                  <button>
                    <Link to="/me" className="mt-1">
                      profile
                    </Link>
                  </button>
                  <p className="text-xl mx-2 text-gray-500 ">|</p>
                  <button onClick={logout}>Logout</button>
                </div>
              </>
            ) : (
              <>
                <div className="md:flex flex-row hidden">
                  <Link to="/login" className="text-black hover:underline">
                    Login
                  </Link>
                  <p className="text-xl mx-2 text-gray-500">|</p>
                  <Link to="/signup" className="text-black hover:underline">
                    Signup
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
        <nav className="md:w-2/3">
          <div className="md:hidden">
            <Sidebar />
          </div>
          <ul className="navbar flex justify-between lg:ml-9">
            <li className="navLink text-lg font-thin hover:text-gray-700 md:block hidden">
              <Link to="/">HOME</Link>
            </li>
            <li className="navLink text-lg font-thin hover:text-gray-700 md:block hidden">
              <Link to="/posts">POSTS</Link>
            </li>

            {Auth.loggedIn() ? (
              <>
                <li className="navLink text-lg font-thin hover:text-gray-700 md:block hidden">
                  <Link to="/about">ABOUT US</Link>
                </li>
                <li className="navLink text-lg font-thin hover:text-gray-700 md:block hidden">
                  <Link to="/newPost">NEW POST</Link>
                </li>
              </>
            ) : null}
          </ul>
        </nav>
      </header>
    </>
  );
}
