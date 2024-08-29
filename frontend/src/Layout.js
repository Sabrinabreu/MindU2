import React from "react";
import { Outlet } from "react-router-dom";
import Navegacao from "./Components/Navegacao";
import Rodape from "./Components/Rodape";

const Layout = ({ isDarkMode, toggleTheme }) => {
  return (
    <>
      <Navegacao isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <Outlet />
      <Rodape />
    </>
  );
};

export default Layout;
