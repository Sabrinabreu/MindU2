import React, { useState, useEffect } from "react";
import axios from "axios";
import { Printer, Trash } from 'lucide-react';
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


  const handleExcluirUsuario = async (login) => {
    try {
      await axios.delete(`http://localhost:3001/contaFuncionarios/${login}`);
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
      setToggleCleared(!toggleCleared);
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
    },{
      name: "Senha",
      selector: contaFuncionario => contaFuncionario.senha
    },{
      name: "Plano",
      selector: contaFuncionario => contaFuncionario.nomePlano,
      sortable: true,
    },{
      cell: contaFuncionario => (
        <Trash style={{ color: "red", padding: "1.5px" }} onClick={() => handleExcluirUsuario(contaFuncionario.login)} />
      )
    }
  ];

  const contextActions = React.useMemo(() => {
    return (
      <>
        <Trash style={{ color: "red", padding: "1.5px" }} onClick={handleExcluirSelecionados} />

      </>

    );
  }, [selectedRows]);

  const handlePrint = () => {
    const printWindow = window.open('', '', 'height=400,width=600');
    printWindow.document.write('<html><head><title>Imprimir Logins e Senhas</title>');

    // estilos para a impressão
    printWindow.document.write(`
    <style>
      body { font-family: Arial, sans-serif; }
      h2 { text-align: center; }
      .container { margin: 20px; }
      .login-senha { margin-bottom: 15px; border: 1px solid #000; padding: 10px; }
      .login-senha span { font-weight: bold; }
    </style>
  `);

    printWindow.document.write('</head><body>');
    printWindow.document.write('<h2>Logins e Senhas dos Funcionários</h2>');

    contasFuncionarios.forEach(conta => {
      printWindow.document.write(`
      <div class="login-senha">
        <span>Login:</span> ${conta.login}<br>
        <span>Senha:</span> ${conta.senha}<br>
        <span>Plano:</span> ${conta.nomePlano}
      </div>
    `);
    });

    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
  };
  return (
    <>
      <BAPO />

      <div className="container my-5">
        <div className="divprint">
          <button className="btnprint" onClick={handlePrint}> <Printer className="printicon" /> Imprimir</button>
        </div>
        <DataTable
          className="tablefuncionarios"
          title="Tabela conta de funcionários criadas"
          columns={colunas}
          fixedHeader
          pagination
          selectableRows
          onSelectedRowsChange={handleRowSelected}
          data={contasFuncionarios}
          contextActions={contextActions}
          noDataComponent="Não há registros para exibir"
          clearSelectedRows={toggleCleared} 
        />

      </div></>
  );
};

export default TabelaFuncionarios;