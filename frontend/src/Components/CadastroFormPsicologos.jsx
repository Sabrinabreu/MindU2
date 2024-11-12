import React, { useRef, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';

const CadastroFormPsi = () => {
    const inputFileRef = useRef(null);
    const [formData, setFormData] = useState({
        nome: '',
        dataNascimento: '',
        genero: '',
        telefone: '',
        email: '',
        CPF: '',
        endereco: '',
        crp: '',
        especialidade: '',
        preferenciaHorario: '',
        disponibilidade: '',
        localizacao: '',
        motivacao: '',
        objetivos: '',
        senha: '',
        senhaconfirma: '',
        certificados: null
    });

    const [error, setError] = useState('');
    const handleButtonClick = () => {
        inputFileRef.current.click(); // Aciona o input de arquivo ao clicar no botão
    };

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
    
        if (type === 'file') {
            setFormData({
                ...formData,
                [name]: files[0]
            });
        } else if (name === 'CPF') {
            let CPFNoMask = value.replace(/\D/g, ''); // Remove tudo que não for número
    
            if (CPFNoMask.length > 11) {
                CPFNoMask = CPFNoMask.slice(0, 11); 
            }
    
            // Formata o CPF para exibição
            let CPFFormatado = CPFNoMask;
            if (CPFNoMask.length > 9) {
                CPFFormatado = `${CPFNoMask.slice(0, 3)}.${CPFNoMask.slice(3, 6)}.${CPFNoMask.slice(6, 9)}-${CPFNoMask.slice(9, 11)}`;
            } else if (CPFNoMask.length > 6) {
                CPFFormatado = `${CPFNoMask.slice(0, 3)}.${CPFNoMask.slice(3, 6)}.${CPFNoMask.slice(6, 9)}`;
            } else if (CPFNoMask.length > 3) {
                CPFFormatado = `${CPFNoMask.slice(0, 3)}.${CPFNoMask.slice(3, 6)}`;
            }
    
            setFormData({
                ...formData,
                CPF: CPFFormatado, // Exibição formatada
                CPFNoMask // Valor sem máscara para envio
            });
        } else if (name === 'telefone') {
            let input = value.replace(/\D/g, ''); // Remove tudo que não for número
            if (input.length > 11) {
                input = input.slice(0, 11);
            }
    
            // Formata o telefone
            if (input.length > 6) {
                input = `(${input.slice(0, 2)}) ${input.slice(2, 7)}-${input.slice(7, 11)}`;
            } else if (input.length > 2) {
                input = `(${input.slice(0, 2)}) ${input.slice(2, 7)}`;
            }
    
            setFormData({
                ...formData,
                [name]: input
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };    

    const handleBlur = (e) => {
        const { name, value } = e.target;

        if (name === "dataNascimento") {
            const selectedDate = new Date(value);
            const selectedYear = selectedDate.getFullYear();
            const maxYear = 2024;

            // Verifica se o ano é maior que 2024
            if (selectedYear > maxYear) {
                setFormData((prev) => ({
                    ...prev,
                    [name]: "2024-12-31" // Corrige para a data máxima
                }));
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');  // Limpa o erro antes de enviar
    
        // Cria o FormData com os dados do formulário
        const data = new FormData();
        for (const key in formData) {
            if (formData[key] !== null && formData[key] !== undefined) {
                data.append(key, formData[key]);
            }
        }
    
        // Substitui CPF formatado pelo CPF sem máscara
        data.set('CPF', formData.CPFNoMask);
    
        // Verifica se as senhas coincidem
        if (formData.senha !== formData.senhaconfirma) {
            setError('As senhas não coincidem. Por favor, verifique e tente novamente.');
            return;
        }
    
        try {
            const response = await axios.post('http://localhost:3001/psicologos', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
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
                    CPF: '',
                    CPFNoMask: '',
                    endereco: '',
                    crp: '',
                    especialidade: '',
                    preferenciaHorario: '',
                    disponibilidade: '',
                    localizacao: '',
                    motivacao: '',
                    objetivos: '',
                    senha: '',
                    senhaconfirma: '',
                    certificados: null
                });
            } else {
                alert('Erro ao criar cadastro. Verifique a resposta do servidor.');
            }
        }
        catch (error) {
            console.error('Erro ao criar cadastro:', error);
    
            if (error.response) {
                if (error.response.status === 409) {
                    setError('E-mail ou CPF já está cadastrado. Por favor, use dados diferentes.');
                } else if (error.response.status === 400) {
                    setError(error.response.data.error);
                } else {
                    setError('Erro ao criar cadastro. Verifique se algum campo não foi preenchido corretamente.');
                }
            } else {
                setError('Erro ao criar cadastro. Verifique a conexão com o servidor.');
            }
        }
    };
    

    return (
        <form onSubmit={handleSubmit}>
            <Container className="justify-content-center g-4 p-3">
                <Row>
                    <Col md="6" sm="10">
                        <label className='labelForms'>Nome Completo</label>
                        <input className='inputform cadPsi' type="text" name="nome" placeholder="Digite seu nome aqui..." value={formData.nome} onChange={handleChange} />
                    </Col>
                    <Col md="6" sm="10">
                        <div>
                            <label className='labelForms'>Data de Nascimento</label>
                            <span className="datepicker-toggle">
                                <span className="datepicker-toggle-button"></span>
                                <input
                                    className='inputform cadPsi'
                                    aria-labelledby="date2"
                                    type='date'
                                    id="dataNascimento"
                                    name="dataNascimento"
                                    value={formData.dataNascimento}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    max="2024-12-31"
                                    dateFormat="dd/mm/yy"
                                />
                            </span>
                        </div>
                    </Col>

                    <Col md="6" sm="10">
                        <label className='labelForms'>Gênero</label>
                        <select className='inputform cadPsi' name="genero" value={formData.genero} onChange={handleChange}>
                            <option value="">Selecione seu gênero</option>
                            <option value="Masculino">Masculino</option>
                            <option value="Feminino">Feminino</option>
                            <option value="Outro">Outro</option>
                        </select>

                    </Col>
                    <Col md="6" sm="10">
                        <label className='labelForms'>Telefone de Contato</label>
                        <input className='inputform cadPsi' type="tel" maxLength="15" name="telefone" placeholder="Digite seu telefone aqui..." value={formData.telefone} onChange={handleChange} />

                    </Col>
                    <Col md="6" sm="10">
                        <label className='labelForms'>E-mail</label>
                        <input className='inputform cadPsi' type="email" name="email" placeholder="Digite seu e-mail aqui..." value={formData.email} onChange={handleChange} />

                    </Col>
                    <Col md="6" sm="10">
                        <label className='labelForms'>CPF</label>
                        <input className='inputform cadPsi' type="text" name="CPF" placeholder="Digite seu CPF aqui..." value={formData.CPF} onChange={handleChange} />

                    </Col>
                    <Col md="6" sm="10">
                        <label className='labelForms'>Endereço Completo (opcional)</label>
                        <input className='inputform cadPsi' type="text" name="endereco" placeholder="Digite seu endereço aqui..." value={formData.endereco} onChange={handleChange} />

                    </Col>
                    <Col md="6" sm="10">
                        <label className='labelForms'>CRP</label>
                        <input className='inputform cadPsi' type="text" name="crp" placeholder="Digite seu crp aqui..." value={formData.crp} onChange={handleChange} />

                    </Col>
                    <Col md="6" sm="10">
                        <label className='labelForms'>Especialidade</label>
                        <input className='inputform cadPsi' type="text" name="especialidade" placeholder="Digite suas área de especialização aqui..." value={formData.especialidade} onChange={handleChange} />

                    </Col>
                    <Col md="6" sm="10">
                        <label className='labelForms'>Regiões Preferidas para Atendimento</label>
                        <input className='inputform cadPsi' type="text" name="localizacao" placeholder="Digite suas regiões ou localidades preferidas aqui..." value={formData.localizacao} onChange={handleChange} />

                    </Col>
                    <Col md="6" sm="10">
                        <label className='labelForms'>Preferência de Horário de <br /> Trabalho</label>
                        <input className='inputform cadPsi' type="text" name="preferenciaHorario" placeholder="Digite sua preferência de horário aqui..." value={formData.preferenciaHorario} onChange={handleChange} />

                    </Col>
                    <Col md="6" sm="10">
                        <label className='labelForms'>Disponibilidade para Trabalho Online ou Presencial</label>
                        <select className='inputform cadPsi' name="disponibilidade" value={formData.disponibilidade} onChange={handleChange} >
                            <option value="">Selecione</option>
                            <option value="Remoto">Remoto</option>
                            <option value="Presencial">Presencial</option>
                            <option value="Híbrido">Híbrido</option>
                        </select>

                    </Col>
                    <Col md="6" sm="10">
                        <label className='labelForms'>Motivação para Trabalhar na MindU</label>
                        <textarea className='inputform cadPsi' name="motivacao" placeholder="Digite sua motivação para trabalhar conosco aqui..." value={formData.motivacao} onChange={handleChange} />

                    </Col>
                    <Col md="6" sm="10">
                        <label className='labelForms'>Objetivos Profissionais e Expectativas</label>
                        <textarea className='inputform cadPsi' name="objetivos" placeholder="Digite seus objetivos profissionais e expectativas aqui..." value={formData.objetivos} onChange={handleChange} />

                    </Col>
                    <Col md="6" sm="10">
                        <label className='labelForms'>Digite sua senha</label>
                        <input className='inputgeral cadEmp' type="password" name="senha" placeholder="Digite sua senha aqui..." value={formData.senha} onChange={handleChange} />

                    </Col>
                    <Col md="6" sm="10">
                        <label className='labelForms'>Confirme sua senha</label>
                        <input className='inputgeral cadEmp' type="password" name="senhaconfirma" placeholder="Digite sua senha novamente aqui..." value={formData.senhaconfirma} onChange={handleChange} />

                    </Col>
                    <Col md="12" sm="10">
                        <label className='labelForms'>Especializações e Certificações</label>
                        <div className='upload-container'>
                            <div>
                                <input
                                    ref={inputFileRef}
                                    className='upload-input'
                                    type="file"
                                    name="certificados"
                                    accept="image/*,application/pdf"
                                    style={{ display: 'none' }}
                                    onChange={handleChange}
                                />
                                <button type='button' className='cssbuttons-io-button' onClick={handleButtonClick}>
                                    <svg viewBox="0 0 640 512" fill="white" height="1em" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z"></path>
                                    </svg>Upload Certificado
                                </button>
                            </div>
                            <small className='form-text text-muted'>
                                Envie imagens ou PDFs dos seus certificados. Máx. 5MB.
                            </small>
                        </div>

                    </Col>
                </Row>
                {error && <p className="text-danger">{error}</p>}

                <button className='botaoBanner roxo' type="submit">Enviar</button>
            </Container>
        </form >
    );
};

export default CadastroFormPsi;