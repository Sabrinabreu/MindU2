// CadastroFormEmpresa.jsx
import React, { useState } from 'react';
import axios from 'axios';
import {Container, Row, Col} from "react-bootstrap"

const CadastroForm = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    empresa: '',
    departamento: '',
    qtdfuncionarios: '',
    planosaude: '',
    contato: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/cadastroempresa', formData);
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
        contato: ''
      });
    } catch (error) {
      console.error('Erro ao criar cadastro:', error);
      alert('Erro ao criar cadastro. Verifique o console para mais detalhes.');
    }
  };

return (
          
    <form onSubmit={handleSubmit}>

      <Container className="justify-content-center g-4 p-3" >
      <label className='labelForms'>Nome</label>
      <input className='inputgeral cadEmp' type="text" name="nome" placeholder="Digite seu nome aqui..." value={formData.nome} onChange={handleChange} />

      <label className='labelForms'>Email corporativo</label>
      <input className='inputgeral cadEmp' type="email" name="email" placeholder="Digite o email corporativo aqui..." value={formData.email} onChange={handleChange} />


      <Row >
        <Col><label className='labelForms'>Telefone corporativo</label>
        <input className='inputgeral cadEmp' type="tel"  maxlength="15" name="telefone" placeholder="Digite o telefone da empresa aqui..." value={formData.telefone} onChange={handleChange} /></Col>
        <Col><label className='labelForms'>Empresa</label>
        <input className='inputgeral cadEmp' type="text" name="empresa" placeholder="Digite o nome da empresa aqui..." value={formData.empresa} onChange={handleChange} /></Col>
      </Row>
      
      <Row >
        <Col><label className='labelForms'>Departamento</label>
        <input className='inputgeral cadEmp' type="text" name="departamento" placeholder="Digite seu departamento aqui..." value={formData.departamento} onChange={handleChange} /></Col>
        <Col><label className='labelForms'>Quantidade de funcionários</label>
        <input className='inputgeral cadEmp' type="number" name="qtdfuncionarios" placeholder="Digite a quantidade de funcionários aqui..." value={formData.qtdfuncionarios} onChange={handleChange} /></Col>
      </Row>


      <Row >
        <Col><label className='labelForms'>Sua empresa já oferece algum plano de saúde?</label>
        <input className='inputgeral cadEmp' type="text" name="planosaude" placeholder="Digite o nome do plano de saúde aqui..." value={formData.planosaude} onChange={handleChange} /></Col>
        <Col><label className='labelForms'>Qual é o meio de contato de sua preferência?</label>
        <input className='inputgeral cadEmp' type="text" name="contato" placeholder="Ex. Email, Whatsapp, Ligação..." value={formData.contato} onChange={handleChange} /></Col>
      </Row>
      

      <button className='botaoBanner botaoBranco' type="submit">Enviar</button>
      
      </Container>
    </form>
  );
};

export default CadastroForm;
