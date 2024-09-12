import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { parseJwt } from './jwtUtils';

const LoginForm = () => {
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/login', { login, senha });
      const { token, perfil } = response.data;

      if (token) {
        localStorage.setItem('token', token); // Armazena o token no localStorage

        // Decodifica o token manualmente
        const decodedToken = parseJwt(token);
        console.log("Informações do token decodificado: ", decodedToken);

        // Armazena as informações do perfil
        // setPerfil(decodedToken.perfil);

        navigate("/"); // Redireciona para a página de perfil
      } else {
        console.log("Erro ao realizar login.");
      }
    } catch (error) {
      console.error('Erro ao autenticar:', error);
      alert('Erro ao entrar. Verifique o console para mais detalhes.');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input type="text" placeholder="Login" value={login} onChange={(e) => setLogin(e.target.value)} />
      <input type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} />
      <button type="submit">Entrar</button>
    </form>
  );
};

export default LoginForm;
