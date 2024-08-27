// TabelaFuncionarios.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Trash } from 'lucide-react';
import DataTable from "react-data-table-component";

const TabelaFuncionarios = ({contas}) => {

  const [contasFuncionarios, setcontasFuncionarios] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
    
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

  const handleRowSelected = React.useCallback(state => {
    setSelectedRows(state.selectedRows);
  }, []);

  const handleExcluirUsuario = async (login) => {
    try {
      await axios.delete(`http://localhost:3001/contaPrvsFuncionarios/${login}`);
      const { data } = await axios.get("http://localhost:3001/contaPrvsFuncionarios");
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
          await axios.delete(`http://localhost:3001/contaPrvsFuncionarios/${row.login}`);
        })
      );

      const { data } = await axios.get("http://localhost:3001/contaPrvsFuncionarios");
      setcontasFuncionarios(data);
      console.log("Usuários excluídos com sucesso!");
      setSelectedRows([]); 
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
      // name:<Trash style={{color: "red", padding: "1.5px"}} onClick={handleExcluirSelecionados} />,
      cell: contaFuncionario => (
        <Trash style={{color: "red", padding: "1.5px"}} onClick={() => handleExcluirUsuario(contaFuncionario.login)} />
      )
    }
  ];

  const contextActions = React.useMemo(() => {
		return (
			<Trash style={{color: "red", padding: "1.5px"}} onClick={handleExcluirSelecionados} />
		);
	}, [contasFuncionarios]);

  return (
    <>
      <div className="container my-5">
        <div className="divAcaoTabela">
        <Trash style={{color: "red", padding: "1.5px"}} onClick={handleExcluirSelecionados} />
        </div>
        <DataTable
          title="Acesso Conta de Funcionários Provisória"
          columns={colunas}
          fixedHeader
          pagination
          selectableRows
          onSelectedRowsChange={handleRowSelected}
          data={contasFuncionarios}
          contextActions={contextActions}
          noDataComponent="Não há registros para exibir"
        />
      </div>
      {console.log(selectedRows)}
    </>
  );
}

export default TabelaFuncionarios;