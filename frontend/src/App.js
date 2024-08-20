import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
//Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";

//Importar complementos aqui
import Rotas from "./Routes";

//Importar componentes aqui
import Navegacao from "./Components/Navegacao";

const App = () => {
  return (
    <>
      <Router>
        <Navegacao />
        <Rotas />
      </Router>
    </>
  );
};

export default App;
