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
import FotoPerfil from "../Components/FotoPerfil";
import Sidebar from '../Components/SideBar';

function Perfil() {
    const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
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
    const [showPassword, setShowPassword] = useState(false);
    const token = localStorage.getItem('token');
    const decodedToken = parseJwt(token);
    const fileInputRef = useRef(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            handleUpload(file);
        }
    };

    const toggleSidebar = () => {
        setSidebarCollapsed((prevState) => !prevState);
    };

    // Função para carregar os dados do perfil
    const fetchProfileData = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/atualizarPerfil/dados-perfil');
            setPerfil(response.data);
        } catch (error) {
            console.error('Erro ao carregar dados do perfil:', error);
        }
    };

    useEffect(() => {
        fetchProfileData();
    }, []);

    const handleEditClick = () => {
        setIsEditing(true);
        setPerfil(prevData => ({ ...prevData, senha: '' }));
        setIsEditing(!isEditing);
    };

    const handleUploadClick = () => {
        fileInputRef.current.click();
    };

    const handleUpload = async (file) => {
        const formData = new FormData();
        formData.append('fotoPerfil', file);
        formData.append('tipoUsuario', 'empresa');
        formData.append('ID', perfil.ID);

        try {
            const response = await axios.post('http://localhost:3001/api/atualizarPerfil/upload-foto', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            // Atualiza o perfil com a nova foto de perfil
            setPerfil((prevPerfil) => ({
                ...prevPerfil,
                foto_perfil: response.data.url,
            }));
            console.log('Foto enviada com sucesso:', response.data);
        } catch (error) {
            console.error('Erro ao fazer upload da foto:', error);
        }
    };

    useEffect(() => {

        if (token) {
            const decodedToken = parseJwt(token);
            setPerfil(decodedToken.perfil);
            setTipoUsuario(decodedToken.tipo_usuario);

            // Se for um funcionário, buscar o nome da empresa pelo `empresa_id`
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
            'resposta_seguranca'
        ];

        const camposEmpresa = [
            ...camposComuns, 'nome', 'telefone', 'planosaude',
            'departamento', 'qtdfuncionarios'
        ];


        const camposObrigatorios =
            tipoUsuario === 'empresa' ? camposEmpresa : camposComuns;

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
            loginMethod: 'email',
            tipoUsuario,
        };

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

    return (
        <>
            <BAPO />
            <Sidebar
                isCollapsed={isSidebarCollapsed}
                toggleSidebar={toggleSidebar}
                perfil={perfil}
                handleLogout={handleLogout}
            />
            {feedbackMessage && (
                <div className={`confirmation-modal feedback-message ${error ? 'error' : 'success'}`}>
                    {feedbackMessage}
                </div>
            )}
            <Container className={`perfilempresa mb-3 mt-4 ${isSidebarCollapsed ? 'collapsed' : 'expanded'}`}>
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

                                <div key={perfil.psicologo_id}>
                                    <div className="d-flex flex-column align-items-center text-center">
                                        <div onClick={isEditing ? handleUploadClick : null} style={{ cursor: isEditing ? 'pointer' : 'default' }}>
                                            <FotoPerfil
                                                src={perfil.foto_perfil ? `http://localhost:3001/uploads/${perfil.foto_perfil}` : null}
                                                name={perfil.empresa || ''}
                                            />
                                        </div>

                                        <input type="file" ref={fileInputRef} onChange={handleFileChange} style={{ display: 'none' }} />

                                        <div className="mt-3">
                                            <h4>{perfil.empresa}</h4>
                                            <p>{perfil.nome}</p>
                                            <p>{perfil.login}</p>
                                            
                                        </div>
                                    </div>



                                    {/* Botão "Editar Foto" visível somente no modo de edição */}
                                    {isEditing && (
                                        <Row>
                                            <Col sm={12}>
                                                <Button className='editarBot' onClick={handleUploadClick}>
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
                                    <h6 className="mb-0">Telefone:</h6>
                                    <span className="text-secondary">{perfil.telefone || "definir"}</span>
                                </ListGroup.Item>
                                <ListGroup.Item className="d-flex justify-content-between align-items-center flex-wrap">
                                    <h6 className="mb-0">Email:</h6>
                                    <span className="text-secondary">{perfil.email || "definir"}</span>
                                </ListGroup.Item>
                                <ListGroup.Item className="d-flex justify-content-between align-items-center flex-wrap">
                                    <h6 className="mb-0">Nome da empresa:</h6>
                                    <span className="text-secondary">{perfil.empresa || "definir"}</span>
                                </ListGroup.Item>
                                <ListGroup.Item className="d-flex justify-content-between align-items-center flex-wrap">
                                    <h6 className="mb-0">Plano de saúde da empresa:</h6>
                                    <span className="text-secondary">{perfil.planosaude || "definir"}</span>
                                </ListGroup.Item>
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
                        <Card className="cardPerfil mb-3">
                            {perfil && (
                                <Card.Body>
                                    {isEditing ? (
                                        <Form onSubmit={handleSave}>

                                            <Form.Group controlId="formFullName">
                                                <Form.Label>Nome representante:</Form.Label>
                                                <Form.Control
                                                    className='mb-2'
                                                    type="text"
                                                    name="nome"
                                                    value={perfil.nome}
                                                    onChange={(e) => setPerfil({ ...perfil, nome: e.target.value })}
                                                />
                                            </Form.Group>

                                            <Form.Group
                                            >
                                                <Form.Label>Email da empresa:</Form.Label>
                                                <Form.Control
                                                    className='mb-2'
                                                    type="text"
                                                    name="cpf"
                                                    value={perfil.email}
                                                    onChange={(e) => setPerfil({ ...perfil, email: e.target.value })}
                                                />
                                            </Form.Group>
                                            <Form.Group>
                                            <Form.Label>Telefone:</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="telefone"
                                                value={perfil.telefone}
                                                onChange={(e) => {
                                                    let input = e.target.value.replace(/\D/g, ''); 
                                                    
                                                    if (input.length > 6) {
                                                        input = `(${input.slice(0, 2)}) ${input.slice(2, 7)}-${input.slice(7, 11)}`;
                                                    } else if (input.length > 2) {
                                                        input = `(${input.slice(0, 2)}) ${input.slice(2, 7)}`;
                                                    }

                                                    setPerfil({ ...perfil, telefone: input });
                                                }}
                                            />
                                        </Form.Group>
                                            <Form.Group>
                                                <Form.Label>Nome da empresa: </Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="empresa"
                                                    value={perfil.empresa}
                                                    onChange={(e) => setPerfil({ ...perfil, empresa: e.target.value })}
                                                />
                                                <Form.Label>Setor: </Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="departamento"
                                                    value={perfil.departamento}
                                                    onChange={(e) => setPerfil({ ...perfil, departamento: e.target.value })}
                                                />
                                                <Form.Label>Quantidade de funcionários: </Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="qtdfuncionarios"
                                                    value={perfil.qtdfuncionarios}
                                                    onChange={(e) => setPerfil({ ...perfil, qtdfuncionarios: e.target.value })}
                                                />
                                                <Form.Label>Plano de saúde: </Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="departamento"
                                                    value={perfil.planosaude}
                                                    onChange={(e) => setPerfil({ ...perfil, planosaude: e.target.value })}
                                                />


                                            </Form.Group>
                                            <Form.Group controlId="formPassword">
                                                <Form.Label>Senha:</Form.Label>
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
                                                <Form.Label>Pergunta de Segurança:</Form.Label>
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
                                                <Form.Label>Resposta de Segurança:</Form.Label>
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
                                                <Col sm={3}><h6 className="mb-0">Nome representante:</h6></Col>
                                                <Col sm={9} className="text-secondary">{perfil.nome}</Col>
                                            </Row>
                                            <hr />

                                            <Row>
                                                <Col sm={3}><h6 className="mb-0">Nome da empresa:</h6></Col>
                                                <Col sm={9} className="text-secondary">{perfil.empresa}</Col>
                                            </Row>
                                            <hr />

                                            <Row>
                                                <Col sm={3}><h6 className="mb-0">Setor:</h6></Col>
                                                <Col sm={9} className="text-secondary">{perfil.departamento}</Col>
                                            </Row>
                                            <hr />

                                            <Row>
                                                <Col sm={3}><h6 className="mb-0">Plano de saúde:</h6></Col>
                                                <Col sm={9} className="text-secondary">{perfil.planosaude}</Col>
                                            </Row>
                                            <hr />
                                            <Row>
                                                <Col sm={3}><h6 className="mb-0">Telefone:</h6></Col>
                                                <Col sm={9} className="text-secondary">{perfil.telefone}</Col>
                                            </Row>
                                            <hr />
                                            <Row>
                                                <Col sm={3}><h6 className="mb-0">Senha:</h6></Col>
                                                <Col sm={9} className="text-secondary">
                                                    {isEditing ? perfil.senha : '*****'}
                                                </Col>
                                            </Row>
                                            <hr />
                                            <Row>
                                                <Col sm={3}><h6 className="mb-0">Pergunta de segurança:</h6></Col>
                                                <Col sm={9} className="text-secondary">{perfil.pergunta_seguranca}</Col>
                                            </Row>
                                            <hr />

                                            {/* Botão para alternar o modo de edição */}
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
                    </Col>
                </Row>

            </Container></>
    );
}

export default Perfil;