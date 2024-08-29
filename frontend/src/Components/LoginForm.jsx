import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Container, Row, Col, Form } from "react-bootstrap";
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from "../provider/AuthProvider";

const LoginForm = ({ cadastro, onDelete }) => {
  const { setToken } = useAuth();
  const navegacao = useNavigate();

  const [login, setLogin] = useState('')
  const [senha, setSenha] = useState('')

  const [data, setData] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();

      try {
        const response = await axios.post(`http://localhost:3001/login/${login}/${senha}`, {
              auth: {
                login: login,
                senha: senha
              }
            });
              
    
              if (Array.isArray(response.data) && response.data.length > 0) {
                const data = response.data[0].nome;
                
                console.log("Dados recebidos do servidor:", response);
    
                console.log("data :", data);
                setToken(`${data}`);
              } else {
                console.log("A resposta do servidor não contém os dados esperados.");
              }
                       
    
              alert('Login realizado com sucesso!')
            // Navega para a home page quando autenticado
            navegacao("/", {replace: true});
            
          } catch (error) {
            console.error('Erro ao autenticar:', error);
            alert('Erro ao entrar. Verifique o console para mais detalhes.');
          }
        
      };
    
      useEffect(() => {
        if (data) {
          console.log("resposta: ", data);
        }
      }, [data]);

    //   const autenticarUsuario = async (loginOuEmail, senha) => {
    //     // Primeiro, verificar se é um login temporário
    //     const usuarioTemp = await buscarUsuarioPorLogin(loginOuEmail);
    //     if (usuarioTemp && usuarioTemp.cadastrado === false && usuarioTemp.senha === senha) {
    //         // Autenticar com login temporário
    //         return usuarioTemp;
    //     }
    
    //     // Caso contrário, verificar se é um login por email
    //     const usuarioEmail = await buscarUsuarioPorEmail(loginOuEmail);
    //     if (usuarioEmail && usuarioEmail.senha === senha) {
    //         // Autenticar com email
    //         return usuarioEmail;
    //     }
    
    //     // Se não encontrou nenhum dos dois, retorna erro
    //     throw new Error('Credenciais inválidas');
    // };
    

  return (
    <Container>
        <Row>
            <Col>
                {/* <div>
                  <input type="text" placeholder="login"></input>
                  <input type="password" placeholder="senha"></input>
                  <button type="submit">Entrar</button>
                </div> */}

                <div className="loginContainer">
                  <div className="login">
                    <h2>Login</h2>
                    <div className="quadroForm">
                    <form onSubmit={handleLogin}>
                    <Row className="mb-3 d-block">
                      <Form.Group as={Col} controlId="formGridEmail">
                          <Form.Control type="text" name="login" placeholder="Login" value={login} onChange={(e) => setLogin(e.target.value)}  />
                      </Form.Group>
                      <Form.Group as={Col} controlId="formGridPassword">
                          <Form.Control  type="password" name="senha" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)}/>
                      </Form.Group>
                      <Col><button className='btnFormSistema' type="submit">Entrar</button></Col>
                    </Row>
                    </form>
                    </div>
                  </div>
                </div>
            </Col>
        </Row>
    </Container>
  );
};

export default LoginForm;

// //Login de funcionário
// import React, {useState, useEffect} from "react";
// import { useNavigate, Link } from 'react-router-dom';
// import { useAuth } from "../provider/AuthProvider";
// import axios from "axios";
// import "../css/login.css"

// import {Col, Form, Row} from 'react-bootstrap';

// const Login = () => {
//   const { setToken } = useAuth();
//   const navegacao = useNavigate();

//   const [cpf, setCpf] = useState('')
//   const [senha, setSenha] = useState('')

//   const [data, setData] = useState(null);

//   const handleLogin = async (e) => {
//     e.preventDefault();

//       try {

//         // const response = await fetch(`http://localhost:3001/login/${cpf}${senha}`, {
//         //   method: 'POST',
//         //   headers: {
//         //     'Content-Type': 'application/json',
//         //   },
//         //    body: JSON.stringify({ cpf, senha })
//         // });
//           // const data = await response.json();
//           // console.log("Data: ", data);


//         const response = await axios.post(`http://localhost:3001/login/${cpf}/${senha}`, {
//           auth: {
//             cpf: cpf,
//             senha: senha
//           }
//         });
          

//           if (Array.isArray(response.data) && response.data.length > 0) {
//             const data = response.data[0].nome;
            
//             console.log("Dados recebidos do servidor:", response);

//             console.log("data :", data);
//             setToken(`${data}`);
//           } else {
//             console.log("A resposta do servidor não contém os dados esperados.");
//           }
                   

//           alert('Login realizado com sucesso!')
//         // Navega para a home page quando autenticado
//         navegacao("/", {replace: true});
        
//       } catch (error) {
//         console.error('Erro ao autenticar:', error);
//         alert('Erro ao entrar. Verifique o console para mais detalhes.');
//       }
    
//   };

//   useEffect(() => {
//     if (data) {
//       console.log("resposta: ", data);
//     }
//   }, [data]);

//   return (
//     <div className="loginContainer">
//       <div className="login">
//         <h2>Login</h2>
//         <div className="quadroForm">
//         <form onSubmit={handleLogin}>
//         <Row className="mb-3 d-block">
//           <Form.Group as={Col} controlId="formGridEmail">
//               <Form.Control type="text" name="cpf" placeholder="CPF" value={cpf} onChange={(e) => setCpf(e.target.value)}  />
//           </Form.Group>
//           <Form.Group as={Col} controlId="formGridPassword">
//               <Form.Control  type="password" name="senha" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)}/>
//           </Form.Group>
//           <Col><button className='btnFormSistema' type="submit">Entrar</button></Col>
          
//         </Row>
          
//         <br/>Não possui uma conta? <Link className="link" to="/cadastro"> Cadastre-se</Link>
//         </form>
//         </div>
//       </div>
//     </div>
//   )

// };
  
  
//   export default Login;