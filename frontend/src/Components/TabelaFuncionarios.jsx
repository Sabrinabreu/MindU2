// TabelaFuncionarios.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/TabelaFuncionarios.css";

const TabelaFuncionarios = ({ contas }) => {
  const [contasFuncionarios, setcontasFuncionarios] = useState([]);

  useEffect(() => {
    if (contas.length > 0) {
      setcontasFuncionarios(contas);
    } else {
      async function fetchData() {
        const result = await fetch(`http://localhost:3001/contaPrvsFuncionarios`);
        const body = await result.json();
        setcontasFuncionarios(body);
      }
      fetchData();
    }
  }, [contas]);

  const handleExcluirUsuario = async (login) => {
    try {
      await axios.delete(`http://localhost:3001/contaPrvsFuncionarios/${login}`);
      // Atualiza a lista de contas de Funcionarios após a exclusão
      const { data } = await axios.get("http://localhost:3001/contaPrvsFuncionarios");
      setcontasFuncionarios(data);
      console.log("Usuário excluído com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir usuário:", error);
    }
  };

  return (
    <div>
      <table className="tabelaF" cellPadding={5} cellSpacing={5}>
        <div className="tabelaDiv">
        <thead>
          <tr>
            <th>Login</th>
            <th>Senha</th>
            <th>Ação</th>
          </tr>
        </thead>
        <tbody>
          {contasFuncionarios.map((contaFuncionario, index) => (
            <tr key={index}>
              <td>{contaFuncionario.login}</td>
              <td>{contaFuncionario.senha}</td>
              <td>
                <button
                  variant="danger"
                  onClick={() => handleExcluirUsuario(contaFuncionario.login)}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody></div>
      </table>
    </div>
  );
};

export default TabelaFuncionarios;