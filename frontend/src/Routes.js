import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Cadastroempresa from "./Pages/CadastroEmpresa";
import CadastroPsicólogos from './Pages/CadastroPsicólogos'
import Cadastro from "./Pages/Cadastro";
import TabelaUsuarios from "./Pages/ListaUsuarios";
import Agendarconsulta from "./Pages/AgendarConsulta";
import SaibaMais from './Pages/SaibaMais';
import Perfil from './Pages/Perfil';
import AcessoFuncionarios from './Pages/AcessoFuncionarios';


const Rotas = () => {
  return (
    <>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/cadastroempresa" element={<Cadastroempresa />} />
        <Route path="/cadastropsicologos" element={<CadastroPsicólogos />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/listaUsuarios" element={<TabelaUsuarios />} />
        <Route path="/agendarconsulta" element={<Agendarconsulta />} />
        <Route path="/saibamais" element={<SaibaMais />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/acessoFuncionarios" element={<AcessoFuncionarios />} />
      </Routes>

    </>
  );
};

export default Rotas;
