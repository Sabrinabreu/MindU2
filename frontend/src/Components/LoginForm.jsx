import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../provider/AuthProvider";

const LoginForm = () => {
  const { setToken } = useAuth(); // Função para armazenar o token
  const navigate = useNavigate();

  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:3001/login', { login, senha });
      const { token, tipo_usuario, id_referencia } = response.data;

      if (token) {
        console.log("Login realizado com sucesso:", response.data);
        setToken(token); // Armazena o token
        localStorage.setItem('token', token); // Armazena o token no localStorage

        // Salva o tipo de usuário e id_referencia (empresa_id, psicologo_id ou funcionario_id)
        localStorage.setItem('tipo_usuario', tipo_usuario);
        localStorage.setItem('id_referencia', id_referencia);

        navigate("/", { replace: true }); // Redireciona para a página inicial
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
