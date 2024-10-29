import React, { useState } from "react";
import '../css/ContasFuncionarios.css'

const PagFuncionarios = ({ completeStep, setNContas, nContas }) => {

    const [error, setError] = useState(''); 
    const maxContas = 100000; //número máximo de contas permitidas

    const handleChange = (e) => {
        let value = e.target.value;
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
            setNContas(value); 
            setError(''); 
        }
    };

    const handleSubmit = () => {
        const numericValue = Number(nContas);
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
                {error && <p className="text-danger">{error}</p>}
            </form>
            <button className="btnCreate" type="button" onClick={handleSubmit}>
                Prosseguir
            </button>
        </div>
    );
};

export default PagFuncionarios;


