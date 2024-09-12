import AuthProvider from "./provider/AuthProvider";
import "bootstrap/dist/css/bootstrap.min.css";
import Rotas from "./Routes";
import Navegacao from "./Components/Navegacao";
import Rodape from './Components/Rodape';
import { BrowserRouter as Router } from 'react-router-dom';
import { React, useEffect, useState } from "react";

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('dark-mode');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'true');
    }
  }, []);

  window.onerror = function(message, source, lineno, colno, error) {
    console.log('Error Details:', {
      message: message,
      source: source,
      lineno: lineno,
      colno: colno,
      error: error
    });
  };


  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
    localStorage.setItem('dark-mode', isDarkMode);
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  return (
    <Router>
      <AuthProvider>
        <Navegacao isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
        <Rotas />
        <Rodape />
      </AuthProvider>
    </Router>
  );
};

export default App;
