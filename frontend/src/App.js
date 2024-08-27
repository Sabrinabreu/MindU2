import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
//Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";

//Importar complementos aqui
import Rotas from "./Routes";

//Importar componentes aqui
import Navegacao from "./Components/Navegacao";
import Rodape from './Components/Rodape';

const App = () => {
  return (
    <>
      <Router>
        <Navegacao/>
        <Rotas />
        <Rodape />
      </Router>
    </>
  );
};

export default App;
