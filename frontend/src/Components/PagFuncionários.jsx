import React, { useState } from "react";
import '../css/ContasFuncionarios.css'

const PagFuncionarios = ({ completeStep, setNContas, nContas }) => {

    const [error, setError] = useState(''); // Estado para mensagem de erro
    const maxContas = 100000; // Defina o número máximo de contas permitidas

    const handleChange = (e) => {
        let value = e.target.value;

        // Se o valor for vazio, permita que o usuário apague o campo
        if (value === '') {
            setNContas('');
            setError('');
            return;
        }

        // Converte o valor para número e verifica se está dentro dos limites
        value = Number(value);
        if (value > maxContas) {
            setError(`O número máximo de contas permitidas é ${maxContas}.`);
        } else if (value < 1) {
            setError('É necessário criar no mínimo uma conta.');
        } else {
            setNContas(value); // Atualiza o estado com o valor válido
            setError(''); // Limpa a mensagem de erro se o valor for válido
        }
    };

    const handleSubmit = () => {
        const numericValue = Number(nContas);

        // Se o número de contas for válido, permite avançar
        if (numericValue >= 1 && numericValue <= maxContas) {
            completeStep();
        } else if (numericValue > maxContas) {
            setError(`O número máximo de contas permitidas é ${maxContas}.`);
        } else {
            setError('Por favor, insira um número válido de contas.');
        }
    };

    return (
        <div className="divGeralAcesso">
            <form className="formPag">
                <label>Quantas contas deseja criar?</label><br />
                <input
                    className="opcaoNumber"
                    type="number"
                    placeholder="Digite um número"
                    value={nContas}
                    onChange={handleChange}
                    min="1"
                    max={maxContas}
                />
                {/* Exibe a mensagem de erro caso exista */}
                {error && <p className="text-danger">{error}</p>}
            </form>
            <button className="btnCreate" type="button" onClick={handleSubmit}>
                Prosseguir
            </button>
        </div>
    );
};

export default PagFuncionarios;


