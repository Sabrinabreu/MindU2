import React from "react";
import axios from "axios";
import '../css/ContasFuncionarios.css';

const CriarContasFuncionarios = ({ nContas, setResultados, resultados }) => {
    const handleSubmit = async () => {
        try {
            const contasCriadas = [];
            for (let i = 0; i < nContas; i++) {
                const response = await axios.post('http://localhost:3001/contaFuncionarios', {
                    // Aqui pode enviar outros dados se necessário
                });
                contasCriadas.push(response.data);
            }
            setResultados(contasCriadas);  // Armazena as contas criadas
            alert('Contas criadas com sucesso!');
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

