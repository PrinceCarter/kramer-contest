import React from "react";

const Header: React.FC = () => {
  return (
    <div tw="flex items-center mb-4">
      <img
        src="https://www.kramerapp.com/kramer_pic.png"
        alt="Kramer Logo"
        tw="h-24 mr-4"
      />
      <h1 tw="text-6xl font-extrabold text-white">Kramer</h1>
    </div>
  );
};

export default Header;
