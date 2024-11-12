//Contato
import React, { useState } from "react";
import "../css/Quiz.css";
import axios from 'axios';
import { Row, Col, Card, Button } from "react-bootstrap";

const Contato = () => {

    const perguntas = [
        { texto: "Costumo me sentir excessivamente preocupado com o futuro ou situações que ainda não aconteceram.", categoria: "ansiedade" },
        { texto: "Tenho dificuldades para relaxar ou sinto tensão muscular sem motivo aparente.", categoria: "ansiedade" },
        { texto: "Evito situações ou lugares por medo de interagir com as pessoas.", categoria: "ansiedade" },

        { texto: "Frequentemente me sinto triste ou desanimado por longos períodos de tempo.", categoria: "depressao" },
        { texto: "Tenho notado uma falta de interesse em atividades que antes gostava.", categoria: "depressao" },
        { texto: "É comum me sentir cansado ou com falta de energia mesmo sem ter feito esforço físico.", categoria: "depressao" },

        { texto: "Tenho dificuldades em me comunicar ou resolver desentendimentos com outras pessoas.", categoria: "conflitos" },
        { texto: "Frequentemente me sinto incompreendido ou magoado em discussões", categoria: "conflitos" },
        { texto: "Muitas vezes evito confrontos/discussões por medo de piorar a situação.", categoria: "conflitos" },

        { texto: "Frequentemente me sinto sobrecarregado ou com falta de tempo para realizar minhas tarefas de trabalho", categoria: "estresseTrabalho" },
        { texto: "Tenho dificuldade em separar problemas de trabalho da vida pessoal.", categoria: "estresseTrabalho" },
        { texto: "Sinto que meu trabalho tem impactado negativamente na minha saúde mental.", categoria: "estresseTrabalho" },

        { texto: "Recentemente perdi alguém importante e se sinto incapaz de lidar com a perda.", categoria: "luto" },
        { texto: "Evito pensar ou falar sobre a perda por medo de reações emocionais fortes.", categoria: "luto" },
        { texto: "Sinto que a perda afeta seu humor e dificulta as atividades diárias.", categoria: "luto" },

        { texto: "Sinto que minhas emoções mudam rapidamente, sem motivo aparente.", categoria: "transtornoPersonalidade" },
        { texto: "As pessoas já comentaram que tenho reações intensas a situações que outros consideram neutras.", categoria: "transtornoPersonalidade" },
        { texto: "Há um padrão em meus relacionamentos: intensos e instáveis.", categoria: "transtornoPersonalidade" },
    ];

    const [mostrarIntroducao, setMostrarIntroducao] = useState(true);
    const [perguntaAtual, setPerguntaAtual] = useState(0);
    const [respostas, setRespostas] = useState(Array(perguntas.length).fill(null));
    const [resultadoFinal, setResultadoFinal] = useState(null);

    const iniciarQuiz = () => {
        setMostrarIntroducao(false);
    };

    const categoriasDisplay = {
        ansiedade: "Ansiedade",
        depressao: "Depressão",
        conflitos: "Resolução de conflitos",
        estresseTrabalho: "Estresse no trabalho",
        luto: "problemas com luto",
        transtornoPersonalidade: "Transtorno de personalidade",
    };

    const handleAnswer = (resposta) => {
        const novasRespostas = [...respostas];
        novasRespostas[perguntaAtual] = resposta;
        setRespostas(novasRespostas);
    };

    const handleNext = () => {
        if (perguntaAtual < perguntas.length - 1) {
            setPerguntaAtual(perguntaAtual + 1);
        }
    };

    const handleBack = () => {
        if (perguntaAtual > 0) {
            setPerguntaAtual(perguntaAtual - 1);
        }
    };

    const handleSubmit = () => {
        const pontuacoes = {};
        let todasDiscordam = true;

        perguntas.forEach((pergunta, index) => {
            const categoria = pergunta.categoria;
            const resposta = respostas[index];
            if (resposta !== null) {
                if (resposta !== 1) todasDiscordam = false; // Se a resposta não é 1, nem todas discordam
                if (!pontuacoes[categoria]) pontuacoes[categoria] = 0;
                pontuacoes[categoria] += resposta;
            }
        });

        if (todasDiscordam) {
            setResultadoFinal({
                mensagem: "Parece que você não identifica problemas significativos nas áreas avaliadas."
            });
            return;
        }

        const porcentagens = {};
        const totalRespostas = perguntas.length * 4;
        for (const categoria in pontuacoes) {
            porcentagens[categoria] = ((pontuacoes[categoria] / totalRespostas) * 100).toFixed(1);
        }

        // Encontrar a(s) categoria(s) com a maior porcentagem
        const maxPorcentagem = Math.max(...Object.values(porcentagens));
        const categoriasEmpatadas = Object.keys(porcentagens).filter(categoria => porcentagens[categoria] == maxPorcentagem);

        // Verifica se há mais de uma categoria com a porcentagem máxima
        if (categoriasEmpatadas.length > 1) {
            const categoriasNomes = categoriasEmpatadas.map(categoria => categoriasDisplay[categoria]).join(" e ");
            setResultadoFinal({
                mensagem: `De acordo com suas respostas, você tem  ${maxPorcentagem} % de probabilidade de apresentar características relacionadas a ${categoriasNomes}.`
            });
        } else {
            // Apenas uma categoria tem a maior porcentagem
            const resultado = categoriasEmpatadas[0];
            setResultadoFinal({
                categoria: categoriasDisplay[resultado],
                porcentagem: porcentagens[resultado],
            });

          
        }
    };


    return (
        <>
            {mostrarIntroducao ? (
                <div className="introducaoQuiz">
                    <h2 className="m-2 começaperguntaquiz">Quer descobrir o psicólogo ideal pra você? Faça o quiz e descubra!</h2>
                    <Button className="m-2 começaquiz" onClick={iniciarQuiz}>Começar</Button>
                </div>
            ) : (
                <Card className="cardQuiz">
                    <Card.Body>
                        {!resultadoFinal ? (
                            <>
                                <Card.Title>{perguntas[perguntaAtual].texto}</Card.Title>
                                <Card.Text>
                                    {["Discordo totalmente", "Discordo", "Concordo", "Concordo totalmente"].map((opcao, i) => (
                                        <div
                                            key={i}
                                            className={`opcao ${respostas[perguntaAtual] === i + 1 ? "selecionado" : ""}`}
                                            onClick={() => handleAnswer(i + 1)}
                                        >
                                            {opcao}
                                        </div>
                                    ))}
                                </Card.Text>

                            </>
                        ) : (
                            <div>
                                {resultadoFinal.mensagem ? (
                                    <p className="resultadoMensagem">{resultadoFinal.mensagem}</p>
                                ) : (
                                    <div className="resultadoFinal">
                                        <h4 className="resultadoTitulo">Resultado:</h4>

                                        <p className="resultadoTexto">
                                            De acordo com suas respostas, você tem{" "}
                                            <span className="resultadoPorcentagem">{resultadoFinal.porcentagem}%</span> de probabilidade de{" "}
                                            <span className="resultadoCategoria">{resultadoFinal.categoria}</span>.
                                        </p>
                                    </div>
                                )}
                            </div>

                        )}
                    </Card.Body>
                    {!resultadoFinal && (
                        <Card.Body>
                            <div>
                                <Button onClick={handleBack} disabled={perguntaAtual === 0}>Voltar</Button>
                                {perguntaAtual < perguntas.length - 1 ? (
                                    <Button onClick={handleNext} disabled={respostas[perguntaAtual] === null}>Próximo</Button>
                                ) : (
                                    <Button onClick={handleSubmit}>Enviar</Button>
                                )}
                            </div>
                        </Card.Body>
                    )}
                    {!resultadoFinal && (
                        <div className="progressoQuiz">
                            <div
                                className="progress"
                                style={{ width: `${((perguntaAtual + 1) / perguntas.length) * 100}%` }}
                            />
                        </div>
                    )}
                </Card>
            )}
        </>
    );
};

export default Contato;
