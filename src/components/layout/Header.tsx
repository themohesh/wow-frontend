import React from "react";
import Navbar from "../common/Navbar";

interface HeaderProps {
  title?: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header>
      <Navbar />
      {title && (
        <div className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
