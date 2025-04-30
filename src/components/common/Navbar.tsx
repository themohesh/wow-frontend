import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const Navbar: React.FC = () => {
  const { state, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="bg-gray shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-xl font-bold text-primary-600">
                JobMatch
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                to="/"
                className="border-transparent text-gray-500 hover:border-primary-500 hover:text-primary-600 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Home
              </Link>
              {state.isAuthenticated &&
                state.user?.userType === "candidate" && (
                  <>
                    <Link
                      to="/candidate/dashboard"
                      className="border-transparent text-gray-500 hover:border-primary-500 hover:text-primary-600 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/candidate/matches"
                      className="border-transparent text-gray-500 hover:border-primary-500 hover:text-primary-600 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                    >
                      Job Matches
                    </Link>
                  </>
                )}
              {state.isAuthenticated && state.user?.userType === "employer" && (
                <>
                  <Link
                    to="/employer/dashboard"
                    className="border-transparent text-gray-500 hover:border-primary-500 hover:text-primary-600 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/employer/jobs"
                    className="border-transparent text-gray-500 hover:border-primary-500 hover:text-primary-600 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                  >
                    My Jobs
                  </Link>
                </>
              )}
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {state.isAuthenticated ? (
              <div className="ml-3 relative flex items-center space-x-4">
                <span className="text-sm text-gray-500">
                  {state.user?.email}
                </span>
                <button
                  onClick={logout}
                  className="text-gray-500 hover:text-primary-600"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="space-x-4">
                <Link
                  to="/login"
                  className="text-gray-500 hover:text-primary-600 px-3 py-2 text-sm font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-primary-600 text-white hover:bg-primary-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {/* Icon when menu is closed */}
              <svg
                className={`${isMenuOpen ? "hidden" : "block"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              {/* Icon when menu is open */}
              <svg
                className={`${isMenuOpen ? "block" : "hidden"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <div className={`${isMenuOpen ? "block" : "hidden"} sm:hidden`}>
        <div className="pt-2 pb-3 space-y-1">
          <Link
            to="/"
            className="text-gray-500 hover:bg-gray-50 hover:text-primary-600 block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>

          {state.isAuthenticated && state.user?.userType === "candidate" && (
            <>
              <Link
                to="/candidate/dashboard"
                className="text-gray-500 hover:bg-gray-50 hover:text-primary-600 block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                to="/candidate/matches"
                className="text-gray-500 hover:bg-gray-50 hover:text-primary-600 block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Job Matches
              </Link>
            </>
          )}

          {state.isAuthenticated && state.user?.userType === "employer" && (
            <>
              <Link
                to="/employer/dashboard"
                className="text-gray-500 hover:bg-gray-50 hover:text-primary-600 block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                to="/employer/jobs"
                className="text-gray-500 hover:bg-gray-50 hover:text-primary-600 block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                My Jobs
              </Link>
            </>
          )}

          {state.isAuthenticated ? (
            <button
              onClick={() => {
                logout();
                setIsMenuOpen(false);
              }}
              className="text-gray-500 hover:bg-gray-50 hover:text-primary-600 block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium w-full text-left"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="text-gray-500 hover:bg-gray-50 hover:text-primary-600 block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="text-gray-500 hover:bg-gray-50 hover:text-primary-600 block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
