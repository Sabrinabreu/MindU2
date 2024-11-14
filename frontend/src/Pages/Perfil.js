import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import "../css/Perfil.css";
import { Container, Row, Col, Card, ListGroup, Button, Form, Alert } from 'react-bootstrap';
import { Eye, EyeOff, LogOut, Pencil, CircleX } from 'lucide-react';
import { parseJwt } from '../Components/jwtUtils';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider";
import BAPO from "../Components/WidgetBAPO";
import "../css/WidgetBAPO.css";
import Calendario from "../Components/CalendarioPerfil";
import FotoPerfil from "../Components/FotoPerfil";
function formatarData(data) {
    return new Date(data).toLocaleDateString('pt-BR'); // Formato dd/mm/yyyy
}

function Perfil() {
    const [isEditing, setIsEditing] = useState(false);
    const [perfil, setPerfil] = useState({ nome: '', login: '', foto_perfil: '' });
    const [tipoUsuario, setTipoUsuario] = useState('');
    const [nomeEmpresa, setNomeEmpresa] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [feedbackMessage, setFeedbackMessage] = useState(null);
    const [error, setError] = useState(false);
    const { setToken } = useAuth();
    const navegacao = useNavigate();
    const [consultasAgendadas, setConsultasAgendadas] = useState([]);
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [showPassword, setShowPassword] = useState(false);
    const [isPsicologo] = useState(false);
    const token = localStorage.getItem('token');
    const decodedToken = parseJwt(token);
    const fileInputRef = useRef(null);


    useEffect(() => {

        if (token) {
            const decodedToken = parseJwt(token);
            setPerfil(decodedToken.perfil);
            setTipoUsuario(decodedToken.tipo_usuario);

            // Se for um funcionário, buscar o nome da empresa pelo empresa id
            if (decodedToken.tipo_usuario === 'funcionario') {
                buscarNomeEmpresa(decodedToken.perfil.empresa_id);
            }
        }
    }, [token]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setToken(null);
        navegacao("/", { replace: true });
    };

    const handleDeleteAccount = () => {
        setShowConfirmation(true);
    };

    const confirmDelete = async () => {
        try {
            let deleteUrl = '';

            // Verifica se é psicólogo ou funcionário
            if (perfil.psicologo_id) {
                deleteUrl = `http://localhost:3001/psicologos/delete/${perfil.psicologo_id}`;
            } else if (perfil.id) {
                deleteUrl = `http://localhost:3001/funcionarios/delete/${perfil.id}`;
            }

            await axios.delete(deleteUrl);

            setError(false);
            navegacao('/');
            localStorage.removeItem('token');
            setToken(null);
            console.log("conta excluída com sucesso!");
            setFeedbackMessage("Conta excluída com sucesso!");
        } catch (error) {
            setError(true);
            console.error("Erro ao excluir conta:", error);
            setFeedbackMessage("Erro ao excluir conta.");
        } finally {
            setShowConfirmation(false);
        }
    };

    // A mensagem desaparece após 3 segundos
    useEffect(() => {
        if (feedbackMessage) {
            const timer = setTimeout(() => {
                setFeedbackMessage(null);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [feedbackMessage]);


    const cancelDelete = () => {
        setShowConfirmation(false);
    };


    const validateForm = () => {
        const camposComuns = [
            'nome', 'telefone', 'pergunta_seguranca',
            'resposta_seguranca', 'cpf'
        ];

        const camposPsicologo = [
            ...camposComuns, 'email', 'endereco', 'crp', 'preferenciaHorario',
            'disponibilidade', 'localizacao', 'motivacao', 'objetivos'
        ];

        const camposFuncionario = [
            ...camposComuns, 'login', 'cargo'
        ];

        const camposObrigatorios =
            tipoUsuario === 'psicologo' ? camposPsicologo : camposFuncionario;

        const algumCampoVazio = camposObrigatorios.some(campo => !perfil[campo]);

        if (algumCampoVazio) {
            setErrorMessage('Preencha todos os campos obrigatórios.');
            return false;
        }

        return true;
    };

    const handleSave = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setErrorMessage('');
        const updatedPerfil = {
            ...perfil,
            cpf: perfil.cpf.replace(/\D/g, ''), // Aqui você garante que está salvando o CPF sem máscara
            loginMethod: 'email',
            tipoUsuario,
        };

        // Remove senha do payload se não fornecida
        if (!perfil.senha) delete updatedPerfil.senha;

        try {
            const response = await axios.put(
                'http://localhost:3001/api/atualizarPerfil',
                updatedPerfil,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status >= 200 && response.status < 300) {
                const novoToken = response.data.token;

                setToken(novoToken);
                localStorage.setItem('token', novoToken);

                const decodedNovoToken = parseJwt(novoToken);
                setPerfil(decodedNovoToken.perfil);
                setIsEditing(false);
                alert('Perfil atualizado com sucesso!');
            } else {
                setErrorMessage('Erro ao atualizar o perfil.');
            }
        } catch (error) {
            setErrorMessage('Erro ao atualizar o perfil.');
            console.error('Erro ao atualizar perfil:', error.response ? error.response.data : error.message);
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        setPerfil(decodedToken.perfil);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(prevState => !prevState);
    };

    const buscarNomeEmpresa = async (empresaId) => {
        try {
            const response = await axios.get(`http://localhost:3001/empresa/${empresaId}`);
            setNomeEmpresa(response.data.nome);
        } catch (error) {
            console.error('Erro ao buscar o nome da empresa:', error);
        }

    };

    useEffect(() => {
        if (token) {
            const decodedToken = parseJwt(token);
            setPerfil(decodedToken.perfil);
            setTipoUsuario(decodedToken.tipo_usuario);

            if (decodedToken.tipo_usuario === 'funcionario') {
                buscarNomeEmpresa(decodedToken.perfil.empresa_id);
            }

            fetchConsultasAgendadas(decodedToken.perfil.id);
        }
    }, [token]);

    //////////////////////////////////////////////////////////////////////////////////////////////////////////

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            handleUpload(file); // Chama a função de upload passando o arquivo
        }
    };

    const handleEditClick = () => {
        setIsEditing(true);
        setPerfil(prevData => ({ ...prevData, senha: '' }));
        setIsEditing(!isEditing); // Alterna o modo de edição
    };

    const handleUploadClick = () => {
        fileInputRef.current.click(); // Abre o seletor de arquivo
    };

    useEffect(() => {
        async function fetchProfileData() {
            const usuarioID = tipoUsuario === 'psicologo' ? 'psicologo_id' : 'id';

            if (!usuarioID || !tipoUsuario) {
                try {
                    const response = await axios.get('http://localhost:3001/api/atualizarPerfil/dados-perfil', {
                        params: {
                            tipoUsuario,
                            id: usuarioID
                        }
                    });
                    console.log("Dados do perfil carregados:", response.data);
                    setPerfil(response.data); // Atualiza o estado do perfil com os dados recebidos
                } catch (error) {
                    console.error('Erro ao carregar dados do perfil:', error);
                }
            }
        }
        fetchProfileData();
    }, [perfil, tipoUsuario]);

    const handleUpload = async (file) => {
        if ((!perfil.psicologo_id || !perfil.id) && !tipoUsuario) {
            console.error('Dados do perfil incompletos. ID ou tipo de usuário não definidos.');
            return;
        }

        const formData = new FormData();
        formData.append('fotoPerfil', file);
        formData.append('tipoUsuario', tipoUsuario);
        formData.append('id', perfil.id);
        if (tipoUsuario === 'psicologo') {
            formData.append('psicologo_id', perfil.psicologo_id);
        }

        console.log("Enviando dados:", { tipoUsuario: tipoUsuario, id: perfil.id, psicologo_id: perfil.psicologo_id });

        try {
            const response = await axios.post('http://localhost:3001/api/atualizarPerfil/upload-foto', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            // Atualiza o estado do perfil com todos os dados retornados, incluindo a nova URL da foto
            setPerfil((prevPerfil) => ({
                ...prevPerfil,
                ...response.data, // Atualiza todos os dados retornados do perfil
            }));

            console.log('Foto enviada com sucesso:', response.data);
        } catch (error) {
            console.error('Erro ao fazer upload da foto:', error);
        }
    };

    useEffect(() => {
        const storedConsultas = localStorage.getItem('consultasAgendadas');
        if (storedConsultas) {
            setConsultasAgendadas(JSON.parse(storedConsultas));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('consultasAgendadas', JSON.stringify(consultasAgendadas));
    }, [consultasAgendadas]);

    const fetchConsultasAgendadas = async (usuarioId) => {
        try {
            const response = await axios.get(`http://localhost:3001/api/agendamentos`);
            console.log("Consultas Agendadas:", response.data);
            setConsultasAgendadas(response.data);
            localStorage.setItem('consultasAgendadas', JSON.stringify(response.data));
        } catch (error) {
            console.error('Erro ao buscar consultas agendadas:', error);
        }
    };

    console.log("metodologin: ", perfil.loginMethod);

    useEffect(() => {
        if (perfil.loginMethod === 'login_temporario') {
            setShowAlert(true);
        } else {
            setShowAlert(false);
        }
    }, [perfil.loginMethod]);

    return (
        <>
            <BAPO />
            {feedbackMessage && (
                <div className={`confirmation-modal feedback-message ${error ? 'error' : 'success'}`}>
                    {feedbackMessage}
                </div>
            )}
            <Container className='mt-4'>
                {showAlert && (
                    <Alert variant="danger" dismissible onClose={() => setShowAlert(false)}>
                        <Alert.Heading>Atualização de dados cadastrais necessária!</Alert.Heading>
                        <p>
                            É necessário atualizar seus dados para usar as funções do site.
                        </p>
                    </Alert>
                )}
                <Row>
                    <Col md={4}>
                        <Card className='cardPerfil'>
                            <Card.Body>
                                <div>
                                    <div className="d-flex flex-column align-items-center text-center">
                                        <div onClick={isEditing ? handleUploadClick : null} style={{ cursor: isEditing ? 'pointer' : 'default' }}>
                                            <FotoPerfil
                                                name={perfil.nome || ''}
                                                src={perfil.foto_perfil ? `http://localhost:3001/uploads/${perfil.foto_perfil}` : null}

                                            />
                                        </div>

                                        <input type="file" ref={fileInputRef} onChange={handleFileChange} style={{ display: 'none' }} />

                                        <div className="mt-3">
                                            <h4>{perfil.nome}</h4>
                                            <p>{perfil.login}</p>

                                        </div>
                                    </div>



                                    {/* Botão "Editar Foto" visível somente no modo de edição */}
                                    {isEditing && (
                                        <Row>
                                            <Col sm={12}>
                                                <Button className='editarFoto' onClick={isEditing ? handleUploadClick : null} >
                                                    <Pencil /> Editar Foto
                                                </Button>
                                            </Col>
                                        </Row>
                                    )}
                                </div>
                            </Card.Body>
                        </Card>
                        <Card className="cardPerfil mt-3">
                            <ListGroup variant="flush">
                                {/* informações gerais */}
                                <ListGroup.Item className="d-flex justify-content-between align-items-center flex-wrap">
                                    <h6 className="mb-0 px-1">Telefone</h6>
                                    <span className="text-secondary text-reticencias">{perfil.telefone || "definir"}</span>
                                </ListGroup.Item>
                                <ListGroup.Item className="d-flex justify-content-between align-items-center flex-wrap">
                                    <h6 className="mb-0 px-1">CPF</h6>
                                    <span className="text-secondary text-reticencias">{perfil.cpf || "definir"}</span>
                                </ListGroup.Item>
                                {/* informações exclusivas de funcionário */}
                                {tipoUsuario === 'funcionario' && (
                                    <>
                                        <ListGroup.Item className="d-flex justify-content-between align-items-center flex-wrap">
                                            <h6 className="mb-0 px-1">Login</h6>
                                            <span className="text-secondary text-reticencias">{perfil.login || "definir"}</span>
                                        </ListGroup.Item>
                                        <ListGroup.Item className="d-flex justify-content-between align-items-center flex-wrap">
                                            <h6 className="mb-0 px-1">Empresa</h6>
                                            <span className="text-secondary text-reticencias">{nomeEmpresa}</span>
                                        </ListGroup.Item>
                                        <ListGroup.Item className="d-flex justify-content-between align-items-center flex-wrap">
                                            <h6 className="mb-0 px-1">Cargo</h6>
                                            <span className="text-secondary text-reticencias">{perfil.cargo || "definir"}</span>
                                        </ListGroup.Item>
                                        <ListGroup.Item className="d-flex justify-content-between align-items-center flex-wrap">
                                            <h6 className="mb-0 px-1">Plano</h6>
                                            <span className="text-secondary text-reticencias">{perfil.nomePlano || "definir"}</span>
                                        </ListGroup.Item>
                                    </>
                                )}
                                {/* informações exclusivas de psicologo */}
                                {tipoUsuario === 'psicologo' && (
                                    <>
                                        <ListGroup.Item className="d-flex justify-content-between align-items-center flex-wrap">
                                            <h6 className="mb-0 px-1">Email</h6>
                                            <span className="text-secondary text-reticencias">{perfil.email || "definir"}</span>
                                        </ListGroup.Item>
                                        <ListGroup.Item className="d-flex justify-content-between align-items-center flex-wrap">
                                            <h6 className="mb-0 px-1">Data de Nascimento</h6>
                                            <span className="text-secondary text-reticencias">{formatarData(perfil.dataNascimento)}</span>
                                        </ListGroup.Item>
                                    </>
                                )}
                                <ListGroup.Item className="d-flex justify-content-between align-items-center flex-wrap">
                                    <Button className="editarBot mb-2" onClick={handleLogout}><LogOut /> Sair da conta</Button>
                                    <Button className="editarBot mb-2" onClick={handleDeleteAccount}> Deletar conta <CircleX className="logsvg" /> </Button>

                                    {showConfirmation && (
                                        <>
                                            <div className="overlay"></div>
                                            <div className="confirmation-modal">
                                                <p>Tem certeza de que deseja deletar sua conta? Essa ação é permanente e não pode ser desfeita.</p>
                                                <button onClick={confirmDelete} className="btn btn-danger confirm-button">Sim, deletar</button>
                                                <button onClick={cancelDelete} className="btn btn-secondary">Cancelar</button>
                                            </div>
                                        </>
                                    )}
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>
                    <Col md={8}>
                        <Card className="cardPerfil mb-3 colPerfil">
                            {perfil && (
                                <Card.Body>
                                    {isEditing ? (
                                        <Form onSubmit={handleSave}>
                                            <Form.Group controlId="formFullName">
                                                <Form.Label>Nome</Form.Label>
                                                <Form.Control
                                                    className='mb-2'
                                                    type="text"
                                                    name="nome"
                                                    value={perfil.nome}
                                                    onChange={(e) => setPerfil({ ...perfil, nome: e.target.value })}
                                                />
                                            </Form.Group>
                                            <Form.Group>
                                                <Form.Label>CPF</Form.Label>
                                                <Form.Control
                                                    className='mb-2'
                                                    type="text"
                                                    name="cpf"
                                                    value={perfil.cpf} // Exibe o valor formatado no input
                                                    onChange={(e) => {
                                                        // Remove caracteres não numéricos para o CPF sem máscara
                                                        let cpfSemMascara = e.target.value.replace(/\D/g, '');
                                                        // Limita o CPF a 11 caracteres
                                                        if (cpfSemMascara.length > 11) {
                                                            cpfSemMascara = cpfSemMascara.slice(0, 11);
                                                        }
                                                        // Formata o CPF para exibição
                                                        let cpfFormatado = cpfSemMascara;
                                                        if (cpfSemMascara.length > 9) {
                                                            cpfFormatado = `${cpfSemMascara.slice(0, 3)}.${cpfSemMascara.slice(3, 6)}.${cpfSemMascara.slice(6, 9)}-${cpfSemMascara.slice(9, 11)}`;
                                                        } else if (cpfSemMascara.length > 6) {
                                                            cpfFormatado = `${cpfSemMascara.slice(0, 3)}.${cpfSemMascara.slice(3, 6)}.${cpfSemMascara.slice(6, 9)}`;
                                                        } else if (cpfSemMascara.length > 3) {
                                                            cpfFormatado = `${cpfSemMascara.slice(0, 3)}.${cpfSemMascara.slice(3, 6)}`;
                                                        }
                                                        // Atualiza o estado com CPF sem máscara e formatado
                                                        setPerfil({ ...perfil, cpf: cpfFormatado, cpfSemMascara }); // Armazene cpfSemMascara se necessário
                                                    }}
                                                />
                                            </Form.Group>
                                            <Form.Group>
                                                <Form.Label>Telefone</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="telefone"
                                                    value={perfil.telefone}
                                                    onChange={(e) => {
                                                        let input = e.target.value.replace(/\D/g, ''); // Remove caracteres não numéricos

                                                        if (input.length > 6) {
                                                            input = `(${input.slice(0, 2)}) ${input.slice(2, 7)}-${input.slice(7, 11)}`;
                                                        } else if (input.length > 2) {
                                                            input = `(${input.slice(0, 2)}) ${input.slice(2, 7)}`;
                                                        }

                                                        setPerfil({ ...perfil, telefone: input });
                                                    }}
                                                />
                                            </Form.Group>
                                            {/* informações exclusivas de funcionario */}
                                            {tipoUsuario === 'funcionario' && (
                                                <>
                                                    <Form.Group controlId="formEmail">
                                                        <Form.Label>Email</Form.Label>
                                                        <Form.Control
                                                            className='mb-2'
                                                            type="email"
                                                            name="login"
                                                            value={perfil.login}
                                                            onChange={(e) => setPerfil({ ...perfil, login: e.target.value })}
                                                        />
                                                    </Form.Group>
                                                    <Form.Group>
                                                        <Form.Label>Cargo</Form.Label>
                                                        <Form.Control
                                                            className='mb-2'
                                                            type="text"
                                                            name="cargo"
                                                            value={perfil.cargo}
                                                            onChange={(e) => setPerfil({ ...perfil, cargo: e.target.value })}
                                                        />
                                                    </Form.Group>
                                                </>
                                            )}
                                            {/* informações exclusivas de psicologo */}
                                            {tipoUsuario === 'psicologo' && (
                                                <>
                                                    <Form.Group controlId="formEmail">
                                                        <Form.Label>Email</Form.Label>
                                                        <Form.Control
                                                            className='mb-2'
                                                            type="email"
                                                            name="login"
                                                            value={perfil.email}
                                                            onChange={(e) => setPerfil({ ...perfil, email: e.target.value })}
                                                        />
                                                    </Form.Group>
                                                    <Form.Group>
                                                        <Form.Label>Gênero</Form.Label>
                                                        <Form.Control
                                                            className='mb-2'
                                                            type="text"
                                                            name="genero"
                                                            value={perfil.genero}
                                                            onChange={(e) => setPerfil({ ...perfil, genero: e.target.value })}
                                                        />
                                                    </Form.Group>
                                                    <Form.Group>
                                                        <Form.Label>Endereço</Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            name="endereco"
                                                            value={perfil.endereco}
                                                            onChange={(e) => setPerfil({ ...perfil, endereco: e.target.value })}
                                                        />
                                                    </Form.Group>
                                                    <Form.Group>
                                                        <Form.Label>CRP</Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            name="crp"
                                                            value={perfil.crp}
                                                            onChange={(e) => setPerfil({ ...perfil, crp: e.target.value })}
                                                        />
                                                    </Form.Group>
                                                    <Form.Group>
                                                        <Form.Label>Preferência de Horário</Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            name="preferenciaHorario"
                                                            value={perfil.preferenciaHorario}
                                                            onChange={(e) => setPerfil({ ...perfil, preferenciaHorario: e.target.value })}
                                                        />
                                                    </Form.Group>
                                                    <Form.Group>
                                                        <Form.Label>Disponibilidade</Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            name="disponibilidade"
                                                            value={perfil.disponibilidade}
                                                            onChange={(e) => setPerfil({ ...perfil, disponibilidade: e.target.value })}
                                                        />
                                                    </Form.Group>
                                                    <Form.Group>
                                                        <Form.Label>Localização</Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            name="localizacao"
                                                            value={perfil.localizacao}
                                                            onChange={(e) => setPerfil({ ...perfil, localizacao: e.target.value })}
                                                        />
                                                    </Form.Group>
                                                    <Form.Group>
                                                        <Form.Label>Motivação</Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            name="motivacao"
                                                            value={perfil.motivacao}
                                                            onChange={(e) => setPerfil({ ...perfil, motivacao: e.target.value })}
                                                        />
                                                    </Form.Group>
                                                    <Form.Group>
                                                        <Form.Label>Objetivos</Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            name="objetivos"
                                                            value={perfil.objetivos}
                                                            onChange={(e) => setPerfil({ ...perfil, objetivos: e.target.value })}
                                                        />
                                                    </Form.Group>
                                                </>
                                            )}
                                            <Form.Group controlId="formPassword">
                                                <Form.Label>Senha</Form.Label>
                                                <div className="password-container">
                                                    <Form.Control
                                                        className='mb-2'
                                                        type={showPassword ? "text" : "password"}
                                                        name="senha"
                                                        value={perfil.senha || ''}
                                                        onChange={(e) => setPerfil({ ...perfil, senha: e.target.value })}
                                                        placeholder="Digite uma nova senha"
                                                    />
                                                    {isEditing && (
                                                        <div
                                                            className='olho'
                                                            onClick={togglePasswordVisibility}
                                                        >
                                                            {showPassword ? <EyeOff /> : <Eye />}
                                                        </div>
                                                    )}
                                                </div>
                                            </Form.Group>
                                            <Form.Group controlId="formSecurityQuestion">
                                                <Form.Label>Pergunta de Segurança</Form.Label>
                                                <Form.Control
                                                    className='mb-2'
                                                    as="select"
                                                    value={perfil.pergunta_seguranca}
                                                    onChange={(e) => setPerfil({ ...perfil, pergunta_seguranca: e.target.value })}
                                                >
                                                    <option value="">Selecione uma pergunta</option>
                                                    <option value="Nome da sua primeira escola">Nome da sua primeira escola</option>
                                                    <option value="Nome do seu primeiro animal de estimação">Nome do seu primeiro animal de estimação</option>
                                                    <option value="Nome da sua comida favorita">Nome da sua comida favorita</option>
                                                </Form.Control>
                                            </Form.Group>
                                            <Form.Group controlId="formSecurityAnswer">
                                                <Form.Label>Resposta de Segurança</Form.Label>
                                                <Form.Control
                                                    className='mb-2'
                                                    type={showPassword ? "text" : "password"}
                                                    value={perfil.resposta_seguranca}
                                                    onChange={(e) => setPerfil({ ...perfil, resposta_seguranca: e.target.value })}
                                                />
                                            </Form.Group>
                                            <Button className="editarBot mt-2" variant="primary" type="submit">Salvar</Button>
                                            <Button className="cancelarBot mt-2" variant="secondary" onClick={handleCancel}>Cancelar</Button>
                                            {errorMessage && <p className="text-danger">{errorMessage}</p>}
                                        </Form>

                                    ) : (
                                        <>
                                            <Row>
                                                <Col sm={3}><h6 className="mb-0">Nome </h6></Col>
                                                <Col sm={9} className="text-secondary">{perfil.nome}</Col>
                                            </Row>
                                            <hr />
                                            <Row>
                                                <Col sm={3}><h6 className="mb-0">CPF</h6></Col>
                                                <Col sm={9} className="text-secondary">{perfil.cpf}</Col>
                                            </Row>
                                            <hr />
                                            <Row>
                                                <Col sm={3}><h6 className="mb-0">Telefone</h6></Col>
                                                <Col sm={9} className="text-secondary">{perfil.telefone}</Col>
                                            </Row>
                                            <hr />
                                            {/* informações exclusivas de funcionario */}
                                            {tipoUsuario === 'funcionario' && (
                                                <>
                                                    <Row>
                                                        <Col sm={3}><h6 className="mb-0">Cargo</h6></Col>
                                                        <Col sm={9} className="text-secondary">{perfil.cargo}</Col>
                                                    </Row>
                                                    <hr />
                                                    <Row>
                                                        <Col sm={3}><h6 className="mb-0">login</h6></Col>
                                                        <Col sm={9} className="text-secondary">{perfil.login}</Col>
                                                    </Row>
                                                    <hr />
                                                </>
                                            )}
                                            {/* informações exclusivas de psicologo */}
                                            {tipoUsuario === 'psicologo' && (
                                                <>
                                                    <Row>
                                                        <Col sm={3}><h6 className="mb-0">Email</h6></Col>
                                                        <Col sm={9} className="text-secondary">{perfil.email}</Col>
                                                    </Row>
                                                    <hr />
                                                    <Row>
                                                        <Col sm={3}><h6 className="mb-0">Gênero</h6></Col>
                                                        <Col sm={9} className="text-secondary">{perfil.genero}</Col>
                                                    </Row>
                                                    <hr />
                                                    <Row>
                                                        <Col sm={3}><h6 className="mb-0">Endereço</h6></Col>
                                                        <Col sm={9} className="text-secondary">{perfil.endereco}</Col>
                                                    </Row>
                                                    <hr />
                                                    <Row>
                                                        <Col sm={3}><h6 className="mb-0">CRP</h6></Col>
                                                        <Col sm={9} className="text-secondary">{perfil.crp}</Col>
                                                    </Row>
                                                    <hr />
                                                    <Row>
                                                        <Col sm={3}><h6 className="mb-0">Preferência de Horário</h6></Col>
                                                        <Col sm={9} className="text-secondary">{perfil.preferenciaHorario}</Col>
                                                    </Row>
                                                    <hr />
                                                    <Row>
                                                        <Col sm={3}><h6 className="mb-0">Disponibilidade</h6></Col>
                                                        <Col sm={9} className="text-secondary">{perfil.disponibilidade}</Col>
                                                    </Row>
                                                    <hr />
                                                    <Row>
                                                        <Col sm={3}><h6 className="mb-0">Localização</h6></Col>
                                                        <Col sm={9} className="text-secondary">{perfil.localizacao}</Col>
                                                    </Row>
                                                    <hr />
                                                    <Row>
                                                        <Col sm={3}><h6 className="mb-0">Motivação</h6></Col>
                                                        <Col sm={9} className="text-secondary">{perfil.motivacao}</Col>
                                                    </Row>
                                                    <hr />
                                                    <Row>
                                                        <Col sm={3}><h6 className="mb-0">Objetivos</h6></Col>
                                                        <Col sm={9} className="text-secondary">{perfil.objetivos}</Col>
                                                    </Row>
                                                    <hr />
                                                </>
                                            )}
                                            <Row>
                                                <Col sm={3}><h6 className="mb-0">Senha</h6></Col>
                                                <Col sm={9} className="text-secondary">
                                                    {isEditing ? perfil.senha : '*****'}
                                                </Col>
                                            </Row>
                                            <hr />
                                            <Row>
                                                <Col sm={3}><h6 className="mb-0">Pergunta de segurança</h6></Col>
                                                <Col sm={9} className="text-secondary">{perfil.pergunta_seguranca}</Col>
                                            </Row>
                                            <hr />
                                            {isPsicologo && (
                                                <>
                                                    <Row>
                                                        <Col sm={3}><h6 className="mb-0">Biografia</h6></Col>
                                                        <Col sm={9} className="text-secondary">{perfil.biografia}</Col>
                                                    </Row>
                                                    <hr />
                                                    <Row>
                                                        <Col sm={3}><h6 className="mb-0">Localização</h6></Col>
                                                        <Col sm={9} className="text-secondary">{perfil.localizacao}</Col>
                                                    </Row>
                                                    <hr />
                                                    <Row>
                                                        <Col sm={3}><h6 className="mb-0">Telefone</h6></Col>
                                                        <Col sm={9} className="text-secondary">{perfil.telefone}</Col>
                                                    </Row>
                                                    <hr />
                                                </>
                                            )}
                                            <Row>

                                                <Col sm={12}>
                                                    <Button className='editarBot' onClick={handleEditClick}>
                                                        <Pencil /> {isEditing ? 'Salvar' : 'Editar Perfil'}
                                                    </Button>
                                                </Col>


                                            </Row>
                                        </>
                                    )}
                                </Card.Body>
                            )}

                        </Card>

                        {tipoUsuario === 'funcionario' && (
                            <Row>
                                <Col>
                                    <Calendario
                                        currentMonth={currentMonth}
                                        setCurrentMonth={setCurrentMonth}
                                        tipoUsuario={tipoUsuario}
                                        consultationDetails={consultasAgendadas}
                                    />
                                </Col>
                            </Row>
                        )}
                    </Col>
                </Row>

            </Container ></>
    );
}

export default Perfil;