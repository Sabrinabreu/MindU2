//Acesso da empresa a conta dos funcionários (parece um carrinho que tem um X para remover o funcionário do plano)
//talvez uma opção de imprimir os cards dos funcionários selecionados (com select)
// AcessoFuncionarios.js
import React, { useState } from "react";
import axios from "axios";
import TabelaFuncionarios from "../Components/TabelaFuncionarios";

const AcessoFuncionarios = () => {
  const [nContas, setNContas] = useState(1);
  const [resultados, setResultados] = useState([]);

  const handleChange = (e) => {
    setNContas(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/contaPrvsFuncionarios", { nContas });
      console.log("Resposta da API: ", response.data); // Verifica a resposta da API
      setResultados(response.data); // Atualiza o estado com as novas contas
      alert("Contas criadas com sucesso!");
    } catch (error) {
      console.error("Erro ao criar contas:", error);
      alert("Erro ao criar contas. Verifique o console para mais detalhes.");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2>Página Acesso Funcionários</h2>
        <label>Quantas contas deseja criar?</label>
        <input
          type="number"
          placeholder="Digite um número de contas"
          value={nContas}
          onChange={handleChange}
        />
        <button type="submit">Criar</button>
      </form>
      <div>
        {/* Passa os resultados para a TabelaFuncionarios como prop */}
        <TabelaFuncionarios contas={resultados} />
      </div>
    </>
  );
};

export default AcessoFuncionarios;
