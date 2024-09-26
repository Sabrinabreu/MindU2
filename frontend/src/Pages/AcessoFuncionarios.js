import React, { useState } from "react";
import axios from "axios";
import TabelaFuncionarios from "../Components/TabelaFuncionarios";

import "../css/AcessoFuncionarios.css";

const AcessoFuncionarios = () => {
  const [nContas, setNContas] = useState(1);
  const [resultados, setResultados] = useState([]);

  const handleChange = (e) => {
    setNContas(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const contasCriadas = [];
      
      for (let i = 0; i < nContas; i++) {
        const response = await axios.post('http://localhost:3001/contaFuncionarios', {
        });
        
        contasCriadas.push(response.data); 
      }

      setResultados(contasCriadas);
      alert('Contas criadas com sucesso!');
    } catch (error) {
      console.error('Erro ao criar contas:', error);
      alert('Erro ao criar contas. Verifique o console para mais detalhes.');
    }
  };

  return (
    <div className="divGeralAcesso">
      <form onSubmit={handleSubmit}>
        <label>Quantas contas deseja criar?</label><br/>
        <input
          className="opcaoNumero"
          type="number"
          placeholder="Digite um número"
          value={nContas}
          onChange={handleChange}
          min={1}
        />
        <button className="btnCriar" type="submit">Criar</button>
      </form>
      <div>
        <TabelaFuncionarios contas={resultados} />
      </div>
    </div>
  );
};

export default AcessoFuncionarios;