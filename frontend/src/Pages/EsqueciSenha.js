import React, { useState } from "react";
import BAPO from "../Components/WidgetBAPO";
import "../css/WidgetBAPO.css";
import "../css/EsqueciSenha.css";
import axios from 'axios'; 
import { Container, Row, Col } from "react-bootstrap";

const EsqueciSenha = () => {
  const [email, setEmail] = useState("");
  const [emailEnviado, setEmailEnviado] = useState(false);
  const [respostaSeguranca, setRespostaSeguranca] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmacaoSenha, setConfirmacaoSenha] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
  // Função para verificar o email
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/verificar-email', { email });
      if (response.data.success) {
        setEmailEnviado(true);
      } else {
        setError("Email não encontrado.");
      }
    } catch (error) {
      setError("Ocorreu um erro. Tente novamente.");
    }
  };

  // Função para verificar a resposta da pergunta de segurança
  const handleRespostaSegurancaSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/verificar-resposta', { email, respostaSeguranca });
      if (response.data.success) {
        setSuccess("Resposta correta! Defina uma nova senha.");
      } else {
        setError("Resposta incorreta.");
      }
    } catch (error) {
      setError("Ocorreu um erro. Tente novamente.");
    }
  };

  // Função para redefinir a senha
  const handleRedefinirSenha = async (e) => {
    e.preventDefault();
    if (novaSenha !== confirmacaoSenha) {
      setError("As senhas não coincidem.");
      return;
    }
    try {
      const response = await axios.post('/api/redefinir-senha', { email, novaSenha });
      if (response.data.success) {
        setSuccess("Senha redefinida com sucesso!");
      } else {
        setError("Ocorreu um erro ao redefinir a senha.");
      }
    } catch (error) {
      setError("Ocorreu um erro. Tente novamente.");
    }
  };

  return (
    <>
      <BAPO />
      <div>
        <h2>Para recuperar sua conta, siga os passos abaixo.</h2>
        <h4>Se você não configurou uma pergunta de segurança previamente, não será possível recuperar sua conta por este método.</h4>

        {!emailEnviado ? (
          <form onSubmit={handleEmailSubmit}>
            <Container className="justify-content-center g-4 p-3">
              <Row>
                <Col md={6} sm={12}>
                  <label className="labelForms">Email</label>
                  <input
                    className="inputgeral cadEmp"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Digite seu email aqui..."
                    required
                  />
                </Col>
              </Row>
              {error && <p className="text-danger">{error}</p>}
              <button className="botaoBanner roxo botaoBranco" type="submit">Enviar</button>
            </Container>
          </form>
        ) : (
          <form onSubmit={handleRespostaSegurancaSubmit}>
            <Container className="justify-content-center g-4 p-3">
              <Row>
                <Col md={6} sm={12}>
                  <input
                    className="inputgeral cadEmp"
                    type="text"
                    value={respostaSeguranca}
                    onChange={(e) => setRespostaSeguranca(e.target.value)}
                    placeholder="Digite sua resposta..."
                    required
                  />
                </Col>
              </Row>
              {error && <p className="text-danger">{error}</p>}
              <button className="botaoBanner roxo botaoBranco" type="submit">Verificar Resposta</button>
            </Container>
          </form>
        )}

        {success && (
          <form onSubmit={handleRedefinirSenha}>
            <Container className="justify-content-center g-4 p-3">
              <Row>
                <Col md={6} sm={12}>
                  <label className="labelForms">Nova Senha</label>
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
                  <label className="labelForms">Confirmação de Senha</label>
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
      </div>
    </>
  );
};

export default EsqueciSenha;
