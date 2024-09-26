// CadastroFormEmpresa.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { Container, Row, Col } from "react-bootstrap"

const CadastroForm = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    empresa: '',
    departamento: '',
    qtdfuncionarios: '',
    planosaude: '',
    contato: '',
    senha: '',
    senhaconfirma: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    if (name === 'telefone') {
      let input = value.replace(/\D/g, ''); // Remove tudo que não é número
      if (input.length > 11) {
        input = input.slice(0, 11);
      }

      // mascara 
      if (input.length > 6) {
        input = `(${input.slice(0, 2)}) ${input.slice(2, 7)}-${input.slice(7, 11)}`;
      } else if (input.length > 2) {
        input = `(${input.slice(0, 2)}) ${input.slice(2, 7)}`;
      }

      setFormData({
        ...formData,
        [name]: input
      });
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.senha !== formData.senhaconfirma) {
      setError('As senhas não coincidem. Por favor, verifique e tente novamente.');
      return;
    }

    setError('');
    try {
      const response = await axios.post('http://localhost:3001/cadastroempresa', formData);
      alert('Cadastro criado com sucesso!');
      // Limpar o formulário após o envio bem-sucedido
      setFormData({
        nome: '',
        email: '',
        telefone: '',
        empresa: '',
        departamento: '',
        qtdfuncionarios: '',
        planosaude: '',
        contato: '',
        senha: '',
        senhaconfirma: '',
      });
    } catch (error) {
      console.error('Erro ao criar cadastro:', error);
      if (error.response && error.response.status === 400) {
        setError(error.response.data.error); //erro do email
      } else {
        setError('Erro ao criar cadastro. Verifique se algum campo não foi preenchido corretamente.');
      }
    }
  };

  return (

    <form onSubmit={handleSubmit}>

      <Container className="justify-content-center g-4 p-3" >
        <label className='labelForms'>Nome da empresa</label>
        <input className='inputgeral cadEmp' type="text" name="empresa" placeholder="Digite o nome da empresa aqui..." value={formData.empresa} onChange={handleChange} />

        <label className='labelForms'>Email corporativo</label>
        <input className='inputgeral cadEmp' type="email" name="email" placeholder="Digite o email corporativo aqui..." value={formData.email} onChange={handleChange} />


        <Row>
          <Col md={6} sm={12}><label className='labelForms'>Telefone corporativo</label>
            <input className='inputgeral cadEmp' type="tel" maxlength="15" name="telefone" placeholder="Digite o telefone da empresa aqui..." value={formData.telefone} onChange={handleChange} /></Col>
          <Col><label className='labelForms'>Representante</label>
            <input className='inputgeral cadEmp' type="text" name="nome" placeholder="Digite o nome do representante aqui..." value={formData.nome} onChange={handleChange} /></Col>
        </Row>

        <Row >
          <Col md={6} sm={12}><label className='labelForms'>Departamento</label>
            <input className='inputgeral cadEmp' type="text" name="departamento" placeholder="Digite seu departamento aqui..." value={formData.departamento} onChange={handleChange} /></Col>
          <Col><label className='labelForms'>Quantidade de funcionários</label>
            <input className='inputgeral cadEmp' type="number" name="qtdfuncionarios" placeholder="Digite a quantidade de funcionários aqui..." value={formData.qtdfuncionarios} onChange={handleChange} /></Col>
        </Row>


        <Row >
          <Col md={6} sm={12}><label className='labelForms'>Sua empresa já oferece algum plano de saúde?</label>
            <input className='inputgeral cadEmp' type="text" name="planosaude" placeholder="Digite o nome do plano de saúde aqui..." value={formData.planosaude} onChange={handleChange} /></Col>
          <Col><label className='labelForms'>Qual é o meio de contato de sua preferência?</label>
            <input className='inputgeral cadEmp' type="text" name="contato" placeholder="Ex. Email, Whatsapp, Ligação..." value={formData.contato} onChange={handleChange} /></Col>
        </Row>
        <Row>
          <Col md={6} sm={12}><label className='labelForms'>Digite sua senha</label>
            <input className='inputgeral cadEmp' type="password" name="senha" placeholder="Digite sua senha aqui..." value={formData.senha} onChange={handleChange} /></Col>
          <Col><label className='labelForms'>Confirme sua senha</label>
            <input className='inputgeral cadEmp' type="password" name="senhaconfirma" placeholder="Digite sua senha novamente aqui..." value={formData.senhaconfirma} onChange={handleChange} /></Col>
        </Row>

        {error && <p className="text-danger">{error}</p>}

        <button className='botaoBanner roxo botaoBranco' type="submit">Enviar</button>

      </Container>
    </form>
  );
};

export default CadastroForm;
