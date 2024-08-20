import React, { useState, useEffect } from "react";
import axios from "axios";

const TabelaFuncionarios = () => {
  const [contasFuncionarios, setcontasFuncionarios] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("http://localhost:3001/contaPrvsFuncionarios");
        setcontasFuncionarios(data);
      } catch (error) {
        console.error("Erro ao buscar usuários:", error); // Adiciona este log de erro
      }
    };

    fetchData();
  }, []);

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
      <table border={2} cellPadding={5} cellSpacing={5}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Senha</th>
            <th>Ação</th>
            {/* Adicione mais colunas, se necessário */}
          </tr>
        </thead>
        <tbody>
          {contasFuncionarios.map((contaFuncionario) => (
            <tr key={contaFuncionario.login}>
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
              {/* Renderizar outras colunas, se necessário */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TabelaFuncionarios;