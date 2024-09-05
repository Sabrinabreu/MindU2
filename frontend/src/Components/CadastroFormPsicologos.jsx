import React, { useState } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';

const CadastroFormPsi = () => {
    const [formData, setFormData] = useState({
        nome: '',
        dataNascimento: '',
        genero: '',
        telefone: '',
        email: '',
        endereco: '',
        formacaoAcademica: '',
        areasInteresse: '',
        preferenciaHorario: '',
        disponibilidade: '',
        localidades: '',
        motivacao: '',
        objetivos: '',
        senha: '',
        certificados: null // Para armazenar o arquivo
    });

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === 'file') {
            setFormData({
                ...formData,
                [name]: files[0] // Acessa o arquivo selecionado
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();

        // Adiciona todos os campos de texto ao FormData
        for (const key in formData) {
            if (formData[key] !== null) {
                data.append(key, formData[key]);
            }
        }

        try {
            await axios.post('http://localhost:3001/cadastropsicologos', data, {
                headers: {
                    'Content-Type': 'multipart/form-data' // Necessário para enviar arquivos
                }
            });
            alert('Cadastro criado com sucesso!');
            // Limpar o formulário após o envio bem-sucedido
            setFormData({
                nome: '',
                dataNascimento: '',
                genero: '',
                telefone: '',
                email: '',
                endereco: '',
                formacaoAcademica: '',
                areasInteresse: '',
                preferenciaHorario: '',
                disponibilidade: '',
                localidades: '',
                motivacao: '',
                objetivos: '',
                senha: '',
                certificados: null
            });
        } catch (error) {
            console.error('Erro ao criar cadastro:', error);
            alert('Erro ao criar cadastro. Verifique o console para mais detalhes.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Container className="justify-content-center g-4 p-3">
                <Row>
                    <Col>
                        <label className='labelForms'>Nome Completo</label>
                        <input className='inputform cadPsi' type="text" name="nome" placeholder="Digite seu nome aqui..." value={formData.nome} onChange={handleChange} required />
                    </Col>
                    <Col>
                        <label className='labelForms'>Data de Nascimento</label>
                        <input className='inputform cadPsi' type="date" name="dataNascimento" value={formData.dataNascimento} onChange={handleChange} required />
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <label className='labelForms'>Gênero</label>
                        <select className='inputform cadPsi' name="genero" value={formData.genero} onChange={handleChange} required>
                            <option value="">Selecione seu gênero</option>
                            <option value="Masculino">Masculino</option>
                            <option value="Feminino">Feminino</option>
                            <option value="Outro">Outro</option>
                        </select>
                    </Col>
                    <Col>
                        <label className='labelForms'>Telefone de Contato</label>
                        <input className='inputform cadPsi' type="tel" maxLength="15" name="telefone" placeholder="Digite seu telefone aqui..." value={formData.telefone} onChange={handleChange} required />
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <label className='labelForms'>E-mail</label>
                        <input className='inputform cadPsi' type="email" name="email" placeholder="Digite seu e-mail aqui..." value={formData.email} onChange={handleChange} required />
                    </Col>
                    <Col>
                        <label className='labelForms'>Endereço Completo (opcional)</label>
                        <input className='inputform cadPsi' type="text" name="endereco" placeholder="Digite seu endereço aqui..." value={formData.endereco} onChange={handleChange} />
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <label className='labelForms'>Áreas de Interesse e Especialização</label>
                        <input className='inputform cadPsi' type="text" name="areasInteresse" placeholder="Digite suas áreas de interesse e especialização aqui..." value={formData.areasInteresse} onChange={handleChange} required />
                    </Col>
                    <Col>
                        <label className='labelForms'>Preferência de Horário de Trabalho</label>
                        <input className='inputform cadPsi' type="text" name="preferenciaHorario" placeholder="Digite sua preferência de horário aqui..." value={formData.preferenciaHorario} onChange={handleChange} required />
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <label className='labelForms'>Disponibilidade para Trabalho Online ou Presencial</label>
                        <select className='inputform cadPsi' name="disponibilidade" value={formData.disponibilidade} onChange={handleChange} required>
                            <option value="">Selecione</option>
                            <option value="Remoto">Remoto</option>
                            <option value="Presencial">Presencial</option>
                            <option value="Híbrido">Híbrido</option>
                        </select>
                    </Col>
                    <Col>
                        <label className='labelForms'>Regiões ou Localidades Preferidas para Atendimento</label>
                        <input className='inputform cadPsi' type="text" name="localidades" placeholder="Digite suas regiões ou localidades preferidas aqui..." value={formData.localidades} onChange={handleChange} required />
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <label className='labelForms'>Motivação para Trabalhar na MindU</label>
                        <textarea className='inputform cadPsi' name="motivacao" placeholder="Digite sua motivação para trabalhar conosco aqui..." value={formData.motivacao} onChange={handleChange} required />
                    </Col>
                    <Col>
                        <label className='labelForms'>Objetivos Profissionais e Expectativas</label>
                        <textarea className='inputform cadPsi' name="objetivos" placeholder="Digite seus objetivos profissionais e expectativas aqui..." value={formData.objetivos} onChange={handleChange} required />
                    </Col>
                </Row>
                <Row>
                    <Col md={6} sm={12}>
                        <label className='labelForms'>Digite sua senha</label>
                        <input className='inputgeral cadEmp' type="password" name="senha" placeholder="Digite sua senha aqui..." value={formData.senha} onChange={handleChange} /></Col>
                    <Col>
                        <label className='labelForms'>Confirme sua senha</label>
                        <input className='inputgeral cadEmp' type="password" name="senhaconfirma" placeholder="Digite sua senha novamente aqui..." value={formData.senhaconfirma} onChange={handleChange} /></Col>
                </Row>
                <Row>
                    <Col>
                        <label className='labelForms'>Especializações e Certificações</label>
                        <div className='upload-container'>
                            <input
                                className='upload-input'
                                type="file"
                                name="certificados"
                                accept="image/*,application/pdf"
                                onChange={handleChange}
                            />
                            <label className='upload-label' htmlFor="certificados">
                                <i className="upload-icon">⬆️</i> Selecione um arquivo
                            </label><br/>
                            <small className='form-text text-muted'>
                                Envie imagens ou PDFs dos seus certificados. Máx. 5MB.
                            </small>
                        </div>
                    </Col>
                </Row>
                <button className='botaoBanner' type="submit">Enviar</button>
            </Container>
        </form>
    );
};

export default CadastroFormPsi;
