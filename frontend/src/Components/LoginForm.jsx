import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { parseJwt } from './jwtUtils';
import {Container, Row, Col} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../provider/AuthProvider';
import MentalBalanceVid from '../img/mentalBalance.mp4'
// import { Eye, EyeOff } from 'lucide-react';

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

        //só pra ver as informações
        const decodedToken = parseJwt(token);
        console.log("Informações do token decodificado: ", decodedToken);

        navigate("/");
      } else {
        console.log("Erro ao realizar login.");
      }
    } catch (error) {
      console.error('Erro ao autenticar:', error);
      alert('Erro ao entrar. Verifique o console para mais detalhes.');
    }
  };

  return (
    <Container>
      <Row className='rowLogin'>
        <Col className='colEsqLogin' md={6} sm={12}>
          <video width="100%" height='auto' autoPlay muted playsInline preload="auto" loop  >
            <source src={MentalBalanceVid} type='video/mp4' />
          Seu navegador não suporta a tag de vídeo.
          </video>  
        </Col>
        <Col className='colDirLogin' md={6} sm={12}>
        <h2>Bem vindo de volta!</h2>
        <p>Cuide da sua saúde com a MindU</p>
          <form onSubmit={handleLogin} className='formLogin'>
            <input type="text" className='inputLogin' placeholder="Login" value={login} onChange={(e) => setLogin(e.target.value)} />
            <input type="password" className='inputLogin' placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} />
            <Link className='esqueceuSenha'>Esqueceu a senha?</Link>
            <button type="submit" className='inputLogin inputLoginbtn'>Entrar</button>
          </form>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginForm;
