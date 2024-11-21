import React from "react";
import axios from "axios";
import '../css/ContasFuncionarios.css';

const CriarContasFuncionarios = ({ nContas, setResultados, planoSelecionado, empresaId, onHide }) => {
    const handleSubmit = async () => {
        try {
            const contasCriadas = [];
            for (let i = 0; i < nContas; i++) {
                const response = await axios.post('http://localhost:3001/contaFuncionarios', {
                    empresa_id: empresaId,
                    nomePlano: planoSelecionado.nome 
                });
                contasCriadas.push(response.data);
            }
            alert('Contas criadas com sucesso!');
            setResultados(contasCriadas);
            onHide();
        } catch (error) {
            console.error('Erro ao criar contas:', error);
            alert('Erro ao criar contas. Verifique o console para mais detalhes.');
        }
    };    

    return (
        <div className="divGeralAcesso">
            <form>
                <label>Criar contas?</label><br />
                <button className="btnCreate" type="button" onClick={handleSubmit}>
                    Criar
                </button>
            </form>
        </div>
    );
};
export default CriarContasFuncionarios;
