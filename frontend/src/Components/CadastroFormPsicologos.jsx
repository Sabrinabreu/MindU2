import React, { useRef, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';

const CadastroFormPsi = () => {
    // Referência para o input de arquivo
    const inputFileRef = useRef(null);

    // Função para acionar o clique no input quando o botão for clicado
    const handleButtonClick = () => {
        inputFileRef.current.click();
    };

    const [formData, setFormData] = useState({
        nome: '',
        dataNascimento: '',
        genero: '',
        telefone: '',
        email: '',
        endereco: '',
        areasInteresse: '',
        preferenciaHorario: '',
        disponibilidade: '',
        localidades: '',
        motivacao: '',
        objetivos: '',
        senha: '',
        senhaconfirma: '',
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

        // Validação de senha
        if (formData.senha !== formData.senhaconfirma) {
            alert('As senhas não coincidem!');
            return;
        }

        const data = new FormData();

        // Adiciona todos os campos de texto ao FormData
        for (const key in formData) {
            if (formData[key] !== null && formData[key] !== undefined) {
                if (key === 'certificados' && formData[key]) {
                    // Adiciona o arquivo (se houver)
                    data.append(key, formData[key]);
                } else {
                    // Adiciona os campos de texto
                    data.append(key, formData[key]);
                }
            }
        }

        try {
            const response = await axios.post('http://localhost:3001/cadastropsicologos', data, {
                headers: {
                    'Content-Type': 'multipart/form-data' // Necessário para enviar arquivos
                }
            });

            if (response.status === 201) {
                alert('Cadastro criado com sucesso!');
                setFormData({
                    nome: '',
                    dataNascimento: '',
                    genero: '',
                    telefone: '',
                    email: '',
                    endereco: '',
                    areasInteresse: '',
                    preferenciaHorario: '',
                    disponibilidade: '',
                    localidades: '',
                    motivacao: '',
                    objetivos: '',
                    senha: '',
                    senhaconfirma: '',
                    certificados: null
                });
            } else {
                alert('Erro ao criar cadastro. Verifique a resposta do servidor.');
            }
        } catch (error) {
            console.error('Erro ao criar cadastro:', error.response ? error.response.data : error.message);
            alert('Erro ao criar cadastro. Verifique o console para mais detalhes.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Container className="justify-content-center g-4 p-3">
                <Row>
                    <Col md="6" sm="10">
                        <label className='labelForms'>Nome Completo</label>
                        <input className='inputform cadPsi' type="text" name="nome" placeholder="Digite seu nome aqui..." value={formData.nome} onChange={handleChange} required />
                    </Col>
                    <Col md="6" sm="10">
                        <label className='labelForms'>Data de Nascimento</label>
                        <input className='inputform cadPsi' type="date" name="dataNascimento" value={formData.dataNascimento} onChange={handleChange} required />
                    </Col>
                </Row>
                <Row>
                    <Col md="6" sm="10">
                        <label className='labelForms'>Gênero</label>
                        <select className='inputform cadPsi' name="genero" value={formData.genero} onChange={handleChange} required>
                            <option value="">Selecione seu gênero</option>
                            <option value="Masculino">Masculino</option>
                            <option value="Feminino">Feminino</option>
                            <option value="Outro">Outro</option>
                        </select>
                    </Col>
                    <Col md="6" sm="10">
                        <label className='labelForms'>Telefone de Contato</label>
                        <input className='inputform cadPsi' type="tel" maxLength="15" name="telefone" placeholder="Digite seu telefone aqui..." value={formData.telefone} onChange={handleChange} required />
                    </Col>
                </Row>
                <Row>
                    <Col md="6" sm="10">
                        <label className='labelForms'>E-mail</label>
                        <input className='inputform cadPsi' type="email" name="email" placeholder="Digite seu e-mail aqui..." value={formData.email} onChange={handleChange} required />
                    </Col>
                    <Col md="6" sm="10">
                        <label className='labelForms'>Endereço Completo (opcional)</label>
                        <input className='inputform cadPsi' type="text" name="endereco" placeholder="Digite seu endereço aqui..." value={formData.endereco} onChange={handleChange} />
                    </Col>
                </Row>
                <Row>
                    <Col md="6" sm="10">
                        <label className='labelForms'>Áreas de Interesse e Especialização</label>
                        <input className='inputform cadPsi' type="text" name="areasInteresse" placeholder="Digite suas áreas de interesse e especialização aqui..." value={formData.areasInteresse} onChange={handleChange} required />
                    </Col>
                    <Col md="6" sm="10">
                        <label className='labelForms'>Preferência de Horário de Trabalho</label>
                        <input className='inputform cadPsi' type="text" name="preferenciaHorario" placeholder="Digite sua preferência de horário aqui..." value={formData.preferenciaHorario} onChange={handleChange} required />
                    </Col>
                </Row>
                <Row>
                    <Col md="6" sm="10">
                        <label className='labelForms'>Disponibilidade para Trabalho Online ou Presencial</label>
                        <select className='inputform cadPsi' name="disponibilidade" value={formData.disponibilidade} onChange={handleChange} required>
                            <option value="">Selecione</option>
                            <option value="Remoto">Remoto</option>
                            <option value="Presencial">Presencial</option>
                            <option value="Híbrido">Híbrido</option>
                        </select>
                    </Col>
                    <Col md="6" sm="10">
                        <label className='labelForms'>Regiões ou Localidades Preferidas para Atendimento</label>
                        <input className='inputform cadPsi' type="text" name="localidades" placeholder="Digite suas regiões ou localidades preferidas aqui..." value={formData.localidades} onChange={handleChange} required />
                    </Col>
                </Row>
                <Row>
                    <Col md="6" sm="10">
                        <label className='labelForms'>Motivação para Trabalhar na MindU</label>
                        <textarea className='inputform cadPsi' name="motivacao" placeholder="Digite sua motivação para trabalhar conosco aqui..." value={formData.motivacao} onChange={handleChange} required />
                    </Col>
                    <Col md="6" sm="10">
                        <label className='labelForms'>Objetivos Profissionais e Expectativas</label>
                        <textarea className='inputform cadPsi' name="objetivos" placeholder="Digite seus objetivos profissionais e expectativas aqui..." value={formData.objetivos} onChange={handleChange} required />
                    </Col>
                </Row>
                <Row>
                    <Col md="6" sm="10">
                        <label className='labelForms'>Digite sua senha</label>
                        <input className='inputgeral cadEmp' type="password" name="senha" placeholder="Digite sua senha aqui..." value={formData.senha} onChange={handleChange} /></Col>
                    <Col>
                        <label className='labelForms'>Confirme sua senha</label>
                        <input className='inputgeral cadEmp' type="password" name="senhaconfirma" placeholder="Digite sua senha novamente aqui..." value={formData.senhaconfirma} onChange={handleChange} /></Col>
                </Row>
                <Row>
                    <Col md="12" sm="10">
                        <label className='labelForms'>Especializações e Certificações</label>

                        <div className='upload-container'>
                            <div>
                                {/* O input é escondido */}
                                <input
                                    ref={inputFileRef}
                                    className='upload-input '
                                    type="file"
                                    name="certificados"
                                    accept="image/*,application/pdf"
                                    style={{ display: 'none' }} // Ocultando o input
                                    onChange={handleChange}
                                />

                                {/* Botão que aciona o input */}
                                <button className='cssbuttons-io-button' onClick={handleButtonClick}>
                                    <svg viewBox="0 0 640 512" fill="white" height="1em" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z"></path>
                                    </svg>
                                    Upload Certificado
                                </button>
                            </div>

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

