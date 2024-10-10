import React, { useState } from "react";
import BAPO from "../Components/WidgetBAPO";
import "../css/WidgetBAPO.css";
import "../css/EsqueciSenha.css";
import axios from 'axios'; 
import { Container, Row, Col } from "react-bootstrap";

const EsqueciSenha = () => {
  const [email, setEmail] = useState("");
  const [emailEnviado, setEmailEnviado] = useState(false);
  const [respostaVerificada, setRespostaVerificada] = useState(false);
  const [respostaSeguranca, setRespostaSeguranca] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmacaoSenha, setConfirmacaoSenha] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
// Função para verificar o email
const handleEmailSubmit = async (e) => {
  e.preventDefault();
  setError("");

  try {
    const response = await axios.post('http://localhost:3001/api/verificar-email', { email });
    if (response.data.success) {
      setEmailEnviado(true);
      console.log("Email encontrado, passando para a próxima etapa.");
    } else {
      setError("Email não encontrado.");
    }
  } catch (error) {
    console.error("Erro ao verificar o email:", error.response ? error.response.data : error.message);
    setError("Ocorreu um erro. Tente novamente.");
  }
};
  
  // Função para verificar a resposta da pergunta de segurança
  const handleRespostaSegurancaSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post('http://localhost:3001/api/verificar-resposta', { email, respostaSeguranca });
      if (response.data.success) {
        setRespostaVerificada(true); 
      } else {
        setError(response.data.message || "Resposta incorreta.");
      }
    } catch (error) {
      console.error("Erro ao verificar resposta:", error.response ? error.response.data : error.message);
      setError("Ocorreu um erro. Tente novamente.");
    }
  };


// Função para redefinir a senha
const handleRedefinirSenha = async (e) => {
  e.preventDefault();
  setError(""); 

  if (novaSenha !== confirmacaoSenha) {
    setError("As senhas não coincidem.");
    return;
  }

  try {
    const response = await axios.post('http://localhost:3001/api/redefinir-senha', { email, novaSenha });
    if (response.data.success) {
      setSuccess("Senha redefinida com sucesso!");
    } else {
      setError("Ocorreu um erro ao redefinir a senha.");
    }
  } catch (error) {
    console.error("Erro ao redefinir senha:", error.response ? error.response.data : error.message);
    setError("Ocorreu um erro. Tente novamente.");
  }
};


  return (
    <>
      <BAPO />
      <Container>
      <h2 className="textroxo textclaro centralizar mt-5">Para recuperar sua conta, siga os passos abaixo.</h2>
        <Row>
          <Col md={5}>     
        {!emailEnviado ? (
          <form onSubmit={handleEmailSubmit}>
            <Container className="justify-content-center g-4 p-3">
                  <label className="labelForms labelesqueci">Email</label>
                  <input
                    className="inputgeral cadEmp"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Digite seu email aqui..."
                    required
                  />
              {error && <p className="text-danger">{error}</p>}
              <button className="botaoBanner roxo botaoBranco" type="submit">Enviar</button>
            </Container>
          </form>
       ) : !respostaVerificada ? (
        <form onSubmit={handleRespostaSegurancaSubmit}>
          <Container className="justify-content-center g-4 p-3">
            <label className="labelForms labelesqueci">Resposta da pergunta de segurança</label>
            <input
              className="inputgeral cadEmp"
              type="text"
              value={respostaSeguranca}
              onChange={(e) => setRespostaSeguranca(e.target.value)}
              placeholder="Digite sua resposta..."
              required
            />
            {error && <p className="text-danger">{error}</p>}
            <button className="botaoBanner roxo botaoBranco" type="submit">Verificar Resposta</button>
          </Container>
        </form>
      ) : (
        <form onSubmit={handleRedefinirSenha}>
          <Container className="justify-content-center g-4 p-3">
            <Row>
              <Col md={6} sm={12}>
                <label className="labelForms labelesqueci">Nova Senha</label>
                <input
                  className="inputgeral cadEmp"
                  type="password"
                  value={novaSenha}
                  onChange={(e) => setNovaSenha(e.target.value)}
                  placeholder="Digite sua nova senha..."
                  required
                />
              </Col>
            </Row>
            <Row>
              <Col md={6} sm={12}>
                <label className="labelForms labelesqueci">Confirmação de Senha</label>
                <input
                  className="inputgeral cadEmp"
                  type="password"
                  value={confirmacaoSenha}
                  onChange={(e) => setConfirmacaoSenha(e.target.value)}
                  placeholder="Confirme sua nova senha..."
                  required
                />
              </Col>
            </Row>
            {error && <p className="text-danger">{error}</p>}
            {success && <p className="text-success">{success}</p>}
            <button className="botaoBanner roxo botaoBranco" type="submit">Redefinir Senha</button>
          </Container>
        </form>
      )}
        </Col>

        <Col>
            <div className="bloco-aviso">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-triangle-alert iconWarning"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
              <h5><b>Aviso: </b>Se você não configurou uma pergunta de segurança previamente, não será possível recuperar sua conta por este método.</h5>
            </div>
        </Col>
      </Row>
    </Container>
  </>
);
};

export default EsqueciSenha;
