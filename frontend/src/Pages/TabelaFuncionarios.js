import React, { useState, useEffect } from "react";
import axios from "axios";
import { Trash } from 'lucide-react';
import DataTable from "react-data-table-component";

const TabelaFuncionarios = ({ contas }) => {
  const [contasFuncionarios, setcontasFuncionarios] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [toggleCleared, setToggleCleared] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:3001/contaFuncionarios'); // Axios inclui o token automaticamente no cabeçalho
        setcontasFuncionarios(response.data);  // Atualiza a tabela com os dados dos funcionários
      } catch (error) {
        console.error('Erro ao buscar os funcionários:', error);
      }
    }

    fetchData(); // Carrega os dados na primeira renderização ou quando "contas" mudar
  }, [contas]);


  useEffect(() => {
    const fetchFuncionarios = async () => {
      try {
        const response = await axios.get('http://localhost:3001/contaFuncionarios');
        setcontasFuncionarios(response.data);
      } catch (error) {
        console.error('Erro ao buscar os funcionários:', error);
      }
    };

    fetchFuncionarios();
  }, []);


  const handleRowSelected = React.useCallback(state => {
    setSelectedRows(state.selectedRows);
  }, []);

  const handleExcluirUsuario = async (login) => {
    try {
      await axios.delete(`http://localhost:3001/contaFuncionarios/${login}`);
      const { data } = await axios.get("http://localhost:3001/contaFuncionarios");
      setcontasFuncionarios(data);
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

      // Atualiza a lista de funcionários após excluir os selecionados
      const { data } = await axios.get("http://localhost:3001/contaFuncionarios");
      setcontasFuncionarios(data);
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
    </div>
  );
}

export default TabelaFuncionarios;