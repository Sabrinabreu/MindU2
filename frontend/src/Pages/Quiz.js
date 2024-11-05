//Contato
import React, { useState } from "react";
import "../css/Quiz.css";
import axios from 'axios';
import { Row, Col, Card } from "react-bootstrap";

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

    const [perguntaAtual, setPerguntaAtual] = useState(0);
    const [respostas, setRespostas] = useState(Array(perguntas.length).fill(null));

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

  const handleSubmit = async () => {
    // Calcula a pontuação total por categoria
    const categorias = {
        ansiedade: 0,
        depressao: 0,
        conflitos: 0,
        estresseTrabalho: 0,
        luto: 0,
        transtornoPersonalidade: 0,
    };

    respostas.forEach((resposta, index) => {
        const categoria = perguntas[index].categoria;
        if (resposta) {
            categorias[categoria] += resposta;
        }
    });
     // Calcula o total de pontos e a porcentagem por categoria
     const totalPontuacao = Object.values(categorias).reduce((acc, valor) => acc + valor, 0);
     const resultadoPorcentagens = Object.keys(categorias).map(categoria => ({
         categoria,
         porcentagem: (categorias[categoria] / totalPontuacao) * 100,
     }));

     // Encontra a categoria com maior porcentagem
     const resultadoFinal = resultadoPorcentagens.reduce((max, categoriaAtual) =>
         categoriaAtual.porcentagem > max.porcentagem ? categoriaAtual : max
     );

     console.log("Resultado final:", resultadoFinal);

     // Envia o resultado para o backend ou exibe na página
     try {
         await axios.post('/api/quiz', { resultadoFinal });
         alert(`O resultado é: ${resultadoFinal.categoria} com ${resultadoFinal.porcentagem.toFixed(2)}% de probabilidade.`);
     } catch (error) {
         console.error("Erro ao enviar o resultado:", error);
     }
 };


  return (
    <>
      <Card className="cardQuiz">
      <Card.Body>
        <Card.Title>{perguntas[perguntaAtual].texto}</Card.Title>
        <Card.Text>
        {["Discordo totalmente", "Discordo", "Concordo", "Concordo totalmente"].map((opcao, i) => (
                <label key={i}>
                    <input
                    className="m-2"
                        type="radio"
                        name={`pergunta-${perguntaAtual}`}
                        checked={respostas[perguntaAtual] === i + 1}
                        onChange={() => handleAnswer(i + 1)}
                    />
                    {opcao}
                </label>
            ))}
        </Card.Text>
      </Card.Body>
      <Card.Body>
            <div>
                <button onClick={handleBack} disabled={perguntaAtual === 0}>Voltar</button>
                {perguntaAtual < perguntas.length - 1 ? (
                    <button onClick={handleNext} disabled={respostas[perguntaAtual] === null}>Próximo</button>
                ) : (
                    <button onClick={handleSubmit}>Enviar</button>
                )}
            </div>
            </Card.Body>
        </Card>
    </>
  );
};

export default Contato;
