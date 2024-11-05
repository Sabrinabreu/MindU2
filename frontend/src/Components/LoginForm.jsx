import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { parseJwt } from './jwtUtils';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../provider/AuthProvider';
import MentalBalanceVid from '../img/mentalBalance.mp4'
import Stack from 'react-bootstrap/Stack';
import iconPsicologo from '../img/psychologist.png'
import iconEmpresa from '../img/office-building.png'

const LoginForm = () => {
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const { setToken } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/login', { login, senha });
      const { token } = response.data;

      if (token) {
        localStorage.setItem('token', token);
        setToken(token);

        const decodedToken = parseJwt(token);
        console.log("Informações do token decodificado: ", decodedToken);

        navigate("/");
      } else {
        console.log("Erro ao realizar login.");
      }
    } catch (error) {
      console.error('Erro ao autenticar:', error);
      alert('Usuário ou senha incorretos');
    }
  };

  return (
    <Container>
      <Row className='rowLogin'>
        <Col className='colEsqLogin' md={6} sm={12}>
          <video className='loginVideo'
            autoPlay muted playsInline preload="auto" loop  >
            <source src={MentalBalanceVid} type='video/mp4' alt="imagem de mulher boiando na água para ilustrar login" />
            Seu navegador não suporta a tag de vídeo.
          </video>
        </Col>
        <Col className='colDirLogin' md={6} sm={12}>
          <h2>Bem vindo de volta!</h2>
          <p>Cuide da sua saúde com a MindU</p>
          <form onSubmit={handleLogin} className='formLogin'>
            <input type="text" className='inputLogin' placeholder="Login" value={login} onChange={(e) => setLogin(e.target.value)} />
            <input type="password" className='inputLogin' placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} />
            <Link to="/esquecisenha" className='esqueceuSenha'>Esqueceu a senha?</Link>
            <button type="submit" className='inputLogin inputLoginbtn'>Entrar</button>
          </form>
          <div className='semContadiv'>
            <p>Não possui conta? Escolha uma das opções de cadastro:</p>
            <Stack direction="horizontal" gap={3}>
              <Col as={Link} className='opcaoCadastroCard' to="/cadastroPsicologos"><img src={iconPsicologo} alt="icone para ilustrar empresa" /><spam>Psicólogo</spam></Col>
              <Col as={Link} className='opcaoCadastroCard' to="/cadastroEmpresa"><img src={iconEmpresa} alt="icone para ilustrar psicologo" /><spam>Empresa</spam></Col>
            </Stack>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginForm;