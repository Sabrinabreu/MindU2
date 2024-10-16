import React, { useState, useEffect } from "react";
import axios from "axios";
import { Trash } from 'lucide-react';
import DataTable from "react-data-table-component";
import BAPO from "../Components/WidgetBAPO";
import "../css/WidgetBAPO.css";
import "../css/AcessoFuncionarios.css";


const TabelaFuncionarios = ({ contas }) => {
  const [contasFuncionarios, setContasFuncionarios] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [toggleCleared, setToggleCleared] = useState(false);

  // Função para buscar os funcionários
  const fetchFuncionariosNaoCadastrados = async () => {
  try {
    const response = await axios.get('http://localhost:3001/contaFuncionarios', {
      params: { loginMethod: 'login_temporario' }
    });
    setContasFuncionarios(response.data);
  } catch (error) {
    console.error('Erro ao buscar funcionários não cadastrados:', error);
  }
};

  // Chama a função de busca ao carregar a página ou quando "contas" mudar
  useEffect(() => {
    fetchFuncionariosNaoCadastrados();
  }, [contas]);
  const handleRowSelected = React.useCallback(state => {
    setSelectedRows(state.selectedRows);
  }, []);
  // Exclusão individual e remoção do item do estado local
  const handleExcluirUsuario = async (login) => {
    try {
      await axios.delete(`http://localhost:3001/contaFuncionarios/${login}`);
      // Atualiza o estado local removendo o item excluído
      setContasFuncionarios(prevContas => prevContas.filter(conta => conta.login !== login));
      console.log("Usuário excluído com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir usuário:", error);
    }
  };
  const handleExcluirSelecionados = async () => {
    if (selectedRows.length === 0) {
      alert("Nenhuma linha selecionada.");
      return;
    }
    try {
      await Promise.all(
        selectedRows.map(async (row) => {
          await axios.delete(`http://localhost:3001/contaFuncionarios/${row.login}`);
        })
      );
      setContasFuncionarios(prevContas =>
        prevContas.filter(conta => !selectedRows.some(row => row.login === conta.login))
      );
      setSelectedRows([]); 
      setToggleCleared(!toggleCleared); // Reseta a seleção
      console.log("Usuários excluídos com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir usuários:", error);
    }
  };

  const colunas = [
    {
      name: "Login",
      selector: contaFuncionario => contaFuncionario.login,
      sortable: true,
    },
    {
      name: "Senha",
      selector: contaFuncionario => contaFuncionario.senha
    },
    {
      cell: contaFuncionario => (
        <Trash style={{ color: "red", padding: "1.5px" }} onClick={() => handleExcluirUsuario(contaFuncionario.login)} />
      )
    }
  ];

  const contextActions = React.useMemo(() => {
    return (
      <Trash style={{ color: "red", padding: "1.5px" }} onClick={handleExcluirSelecionados} />
    );
  }, [selectedRows]);
  
  return (
    <>
    <BAPO/>
    <div className="container my-5">
      <DataTable
        title="Tabela conta de funcionários criadas"
        columns={colunas}
        fixedHeader
        pagination
        selectableRows
        onSelectedRowsChange={handleRowSelected}
        data={contasFuncionarios}
        contextActions={contextActions}
        noDataComponent="Não há registros para exibir"
        clearSelectedRows={toggleCleared} // Passa o estado para resetar a seleção
      />
    </div></>
  );
};

export default TabelaFuncionarios;