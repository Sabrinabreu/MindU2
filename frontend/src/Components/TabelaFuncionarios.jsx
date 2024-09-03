import React, { useState, useEffect } from "react";
import axios from "axios";
import { Trash } from 'lucide-react';
import DataTable from "react-data-table-component";

const TabelaFuncionarios = ({ contas }) => {
  const [contasFuncionarios, setcontasFuncionarios] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [toggleCleared, setToggleCleared] = useState(false); // Novo estado

  useEffect(() => {
    if (contas.length > 0) {
      setcontasFuncionarios(contas);
    } else {
      async function fetchData() {
        const result = await fetch(`http://localhost:3001/contaFuncionarios`);
        const body = await result.json();
        setcontasFuncionarios(body);
      }
      fetchData();
    }
  }, [contas]);

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
        <Trash style={{color: "red", padding: "1.5px"}} onClick={() => handleExcluirUsuario(contaFuncionario.login)} />
      )
    }
  ];

  const contextActions = React.useMemo(() => {
    return (
      <Trash style={{color: "red", padding: "1.5px"}} onClick={handleExcluirSelecionados} />
    );
  }, [selectedRows]);

  return (
    <>
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
      {console.log(selectedRows)}
    </>
  );
}

export default TabelaFuncionarios;
