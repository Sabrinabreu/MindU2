import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../css/Perfil.css";
import { Container, Row, Col, Card, ListGroup, Button, Form, Alert } from 'react-bootstrap';
import { Eye, EyeOff, LogOut, Pencil } from 'lucide-react';
import { parseJwt } from '../Components/jwtUtils';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider";
function formatarData(data) {
    return new Date(data).toLocaleDateString('pt-BR'); // Formato dd/mm/yyyy
}

function Perfil() {
    const [consultationDetails, setConsultationDetails] = useState([]);
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [isEditing, setIsEditing] = useState(false);
    const [perfil, setPerfil] = useState({});
    const [tipoUsuario, setTipoUsuario] = useState('');
    const [nomeEmpresa, setNomeEmpresa] = useState('');
    const [selectedQuestion, setSelectedQuestion] = useState('');
    const [securityAnswer, setSecurityAnswer] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const { setToken } = useAuth();
    const navegacao = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [setPsicologoNome] = useState('');
    const [isPsicologo, setIsPsicologo] = useState(false);
    const token = localStorage.getItem('token');
    const decodedToken = parseJwt(token); 
    console.log ("token decodadokk: ", decodedToken)

    useEffect(() => {

        if (token) {
            setPerfil(decodedToken.perfil); 
            setTipoUsuario(decodedToken.tipo_usuario); 
  
            // Se for um funcionário, buscar o nome da empresa pelo `empresa_id`
            if (decodedToken.tipo_usuario === 'funcionario') {
              buscarNomeEmpresa(decodedToken.perfil.empresa_id); 
            }
        }
      }, []);

    useEffect(() => {
        // Carrega os detalhes da consulta do localStorage
        const savedConsultationDetails = localStorage.getItem('consultationDetails');
        if (savedConsultationDetails) {
            setConsultationDetails([JSON.parse(savedConsultationDetails)]);
        } else {
            setConsultationDetails([]); 
        }

        // Fetch para obter o nome do psicólogo
        fetch('http://localhost:3001/api/psicologo')
            .then(response => response.json())
            .then(data => {
                setPsicologoNome(data.nomePsico);
            })
            .catch(error => {
                console.error('Erro ao obter nome do psicólogo:', error);
            });
    }, [setPsicologoNome]);

  
    const handleLogout = () => {
      localStorage.removeItem('token');
      setToken(null);
      navegacao("/", { replace: true });
    };

    const handleEditClick = () => {
        setIsEditing(true);
        setPerfil(prevData => ({ ...prevData, senha: '' }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPerfil(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSave = (e) => {
        e.preventDefault();
    
        // Verifica se a pergunta foi selecionada e se a resposta foi fornecida
        if (!selectedQuestion) {
            setErrorMessage('Por favor, selecione uma pergunta de segurança.');
            return;
        }
    
        if (!securityAnswer || securityAnswer.trim() === '') {
            setErrorMessage('Por favor, forneça uma resposta para a pergunta de segurança.');
            return;
        }
    
        // Limpa a mensagem de erro se tudo estiver certo
        setErrorMessage('');
    
        const updatedPerfil = {
            ...perfil,
            perguntaSeguranca: selectedQuestion,
            respostaSeguranca: securityAnswer,
        };
    
        setPerfil(updatedPerfil);
        localStorage.setItem('perfil', JSON.stringify(updatedPerfil));
        atualizarPerfilNoBackend(updatedPerfil);
        setIsEditing(false);
    };
    
    
    
    
    const handleQuestionChange = (e) => {
        setSelectedQuestion(e.target.value);
    };

    const handleCancel = () => {
        setIsEditing(false);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(prevState => !prevState);
    };

    const atualizarPerfilNoBackend = async (updatedPerfil) => {
        try {
            const response = await fetch('http://localhost:3001/api/atualizarPerfil', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedPerfil),
            });
    
            if (!response.ok) {
                throw new Error('Erro ao atualizar o perfil');
            }
    
            const responseData = await response.json();
            alert('Perfil atualizado com sucesso!');
        } catch (error) {
            console.error('Erro ao atualizar perfil:', error);
            alert('Erro ao atualizar o perfil.');
        }
    };
    


    const daysInMonth = (month, year) => {
        return new Date(year, month + 1, 0).getDate();
    };

    // Função para buscar o nome da empresa baseado no `empresa_id`
    const buscarNomeEmpresa = async (empresaId) => {
      try {
        const response = await axios.get(`http://localhost:3001/empresa/${empresaId}`);
        setNomeEmpresa(response.data.nome); 
      } catch (error) {
        console.error('Erro ao buscar o nome da empresa:', error);
      }
    };


    const generateCalendar = () => {
        const month = currentMonth.getMonth();
        const year = currentMonth.getFullYear();
        const days = daysInMonth(month, year);
        const startDay = new Date(year, month, 1).getDay();
        const calendarDays = [];

        const consultationDates = consultationDetails.map(detail => {
            const date = new Date(detail.date.split('/').reverse().join('-'));
            return date.getDate();
        });

        for (let i = 0; i < startDay; i++) {
            calendarDays.push(<div className="calendar-cell" key={`empty-${i}`}></div>);
        }

        for (let i = 1; i <= days; i++) {
            const isConsultationDate = consultationDates.includes(i);
            const consultationDetail = consultationDetails.find(detail => {
                const date = new Date(detail.date.split('/').reverse().join('-'));
                return date.getDate() === i;
            });

            calendarDays.push(
                <div
                    className={`calendar-cell ${isConsultationDate ? 'has-consultation' : ''}`}
                    key={i}
                >
                    {i}
                    {isConsultationDate && consultationDetail && (
                        <div className="dot">
                            <div className="consultation-details">
                                <p><strong>Nome:</strong> {consultationDetail.psicologo}</p>
                                <p><strong>Horário:</strong> {consultationDetail.time}</p>
                                <p><strong>Tipo:</strong> {consultationDetail.tipo}</p>
                            </div>
                        </div>
                    )}
                </div>
            );
        }

        return calendarDays;
    };

    const handlePrevMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
    };


    const getInitials = (name) => {
        if (!name) return '';

        const names = name.trim().split(' ').filter(Boolean);
        if (names.length === 0) return '';

        const initials = names.slice(0, 2).map(n => n[0].toUpperCase()).join('');
        return initials;
    };

    const getColorFromInitials = (initials) => {
        let hash = 0;
        for (let i = 0; i < initials.length; i++) {
            hash = initials.charCodeAt(i) + ((hash << 5) - hash);
        }
        const color = `#${((hash & 0x00FFFFFF) >> 0).toString(16).padStart(6, '0').toUpperCase()}`;
        return color;
    };

    const getContrastingColor = (backgroundColor) => {
        const r = parseInt(backgroundColor.substring(1, 3), 16);
        const g = parseInt(backgroundColor.substring(3, 5), 16);
        const b = parseInt(backgroundColor.substring(5, 7), 16);
        const luminosity = 0.2126 * r + 0.7152 * g + 0.0722 * b;
        return luminosity > 128 ? '#000000' : '#FFFFFF';
    };

    const backgroundColor = getColorFromInitials(getInitials(perfil.nome || ''));
    const textColor = getContrastingColor(backgroundColor);

    useEffect(() => {
        if (decodedToken.perfil.cadastrado === 0 || decodedToken.cadastrado === false) {
            setShowAlert(true); // Define o estado do alerta para ser exibido
        }
    }, [decodedToken]); // Executa o useEffect quando o decodedToken for alterado

    return (
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
                            <div className="d-flex flex-column align-items-center text-center">
                                <div
                                    className="profile-initials"
                                    style={{ backgroundColor: backgroundColor, color: textColor }}
                                >
                                    {getInitials(perfil.nome || '')}
                                </div>
                                <div className="mt-3">
                                    <h4>{perfil.nome}</h4>
                                    <p>{perfil.login}</p>
                                    <p className="text-muted font-size-sm">..</p>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                    <Card className="cardPerfil mt-3">
                        <ListGroup variant="flush">
                            {/* informações gerais */}
                            <ListGroup.Item className="d-flex justify-content-between align-items-center flex-wrap">
                                <h6 className="mb-0">Email</h6>
                                <span className="text-secondary">{perfil.email || "definir"}</span>
                            </ListGroup.Item>
                            <ListGroup.Item className="d-flex justify-content-between align-items-center flex-wrap">
                                <h6 className="mb-0">Telefone</h6>
                                <span className="text-secondary">{perfil.telefone || "definir"}</span>
                            </ListGroup.Item>
                            <ListGroup.Item className="d-flex justify-content-between align-items-center flex-wrap">
                                <h6 className="mb-0">CPF</h6>
                                <span className="text-secondary">{perfil.CPF || "definir"}</span>
                            </ListGroup.Item>
                            {/* informações exclusivas de funcionário */}
                            {tipoUsuario === 'funcionario' && (
                                <>
                                <ListGroup.Item className="d-flex justify-content-between align-items-center flex-wrap">
                                    <h6 className="mb-0">Empresa</h6>
                                    <span className="text-secondary">{nomeEmpresa}</span>
                                </ListGroup.Item>
                                <ListGroup.Item className="d-flex justify-content-between align-items-center flex-wrap">
                                    <h6 className="mb-0">Cargo</h6>
                                    <span className="text-secondary">{perfil.cargo || "definir"}</span>
                                </ListGroup.Item>
                                </>
                            )}
                            {/* informações exclusivas de psicologo */}
                            {tipoUsuario === 'psicologo' && (
                                <>
                                <ListGroup.Item className="d-flex justify-content-between align-items-center flex-wrap">
                                    <h6 className="mb-0">Data de Nascimento</h6>
                                    <span className="text-secondary">{formatarData(perfil.dataNascimento)}</span>
                                </ListGroup.Item>
                                </>
                            )}
                            <ListGroup.Item className="d-flex justify-content-between align-items-center flex-wrap">
                            <Button className="btnLog" onClick={handleLogout}><LogOut/> Sair da conta</Button>
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
                                        <Form.Label>Nome</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="nome"
                                            value={perfil.nome}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formEmail">
                                        <Form.Label>Login</Form.Label>
                                        <Form.Control
                                            type="email"
                                            name="login"
                                            value={perfil.email}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formPassword">
                                    <Form.Label>Senha</Form.Label>
                                    <div className="password-container">
                                        <Form.Control
                                            type={showPassword ? "text" : "password"}
                                            name="senha"
                                            value={perfil.senha || ''}
                                            onChange={handleChange}
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
                                <Form.Group controlId="formPergunta">
                                    <Form.Label>Pergunta de segurança</Form.Label>
                                    <Form.Control
                                        as="select"
                                        name="pergunta"
                                        value={selectedQuestion}
                                        onChange={(e) => setSelectedQuestion(e.target.value)}
                                    >
                                        <option value="">Selecione uma pergunta</option>
                                        <option value="animal">Qual era o nome do seu primeiro animal de estimação?</option>
                                        <option value="comida">Qual é a sua comida favorita?</option>
                                        <option value="trabalho">Qual o emprego dos seus sonhos?</option>
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group controlId="formResposta">
                                    <Form.Label>Resposta da pergunta de segurança</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="resposta"
                                        value={securityAnswer}
                                        onChange={(e) => setSecurityAnswer(e.target.value)}
                                        disabled={!selectedQuestion}
                                    />
                                    {errorMessage && <div className="error-message">{errorMessage}</div>}
                                </Form.Group>

                                    <Button className='salvarBot mt-3' type="submit">Salvar</Button>
                                    <Button className="cancelarBot  mt-3" onClick={handleCancel}>Cancelar</Button>
                                </Form>
                            ) : (
                                <>
                                    <Row>
                                        <Col sm={3}><h6 className="mb-0">Nome </h6></Col>
                                        <Col sm={9} className="text-secondary">{perfil.nome}</Col>
                                    </Row>
                                    <hr />
                                    <Row>
                                        <Col sm={3}><h6 className="mb-0">Login</h6></Col>
                                        <Col sm={9} className="text-secondary">{perfil.email}</Col>
                                    </Row>
                                    <hr />
                                    <Row>
                                        <Col sm={3}><h6 className="mb-0">Senha</h6></Col>
                                        <Col sm={9} className="text-secondary">
                                            {isEditing ? perfil.senha : '*****'}
                                        </Col>
                                    </Row>
                                    <hr />
                                    <Row>
                                        <Col sm={3}><h6 className="mb-0">Pergunta de segurança</h6></Col>
                                        <Col sm={9} className="text-secondary">{perfil.perguntaSeguranca}</Col>
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
                                            <Button className='editarBot' onClick={handleEditClick}><Pencil/> Editar</Button>
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
                            <div className="calendarioPerfil p-4 text-center">
                                <div className="calendario-topo">
                                    <button className="calendario-mes" onClick={handlePrevMonth}>◀</button>
                                    <h5 className="calendar-title">
                                        {currentMonth.toLocaleString('default', { month: 'long' })} {currentMonth.getFullYear()}
                                    </h5>
                                    <button className="calendario-mes" onClick={handleNextMonth}>▶</button>
                                </div>
                                <br />
                                <div className="calendar-dias">
                                    <div className="calendario-dia">Dom</div>
                                    <div className="calendario-dia">Seg</div>
                                    <div className="calendario-dia">Ter</div>
                                    <div className="calendario-dia">Qua</div>
                                    <div className="calendario-dia">Qui</div>
                                    <div className="calendario-dia">Sex</div>
                                    <div className="calendario-dia">Sab</div>
                                    {generateCalendar()}
                                </div>
                            </div>
                        </Col>
                    </Row>
                    )}
                </Col>
            </Row>

            {tipoUsuario === 'funcionario' && (
            <div className="calendar-container">
                <div className="calendar">
                    <h5>Detalhes da Consulta</h5>
                    {Array.isArray(consultationDetails) ? (
                        consultationDetails.length > 0 ? (
                            consultationDetails.map((detail, index) => (
                                <div key={index}>
                                    <p><strong>Data:</strong> {detail.date}</p>
                                    <p><strong>Horário:</strong> {detail.time}</p>
                                    <p><strong>Tipo de consulta:</strong> {detail.tipo}</p>
                                    <p><strong>Assuntos:</strong> {detail.assunto}</p>
                                    <hr />
                                </div>
                            ))
                        ) : (
                            <p className='avisoSemData'>Nenhum agendamento encontrado.</p>
                        )
                    ) : (
                        <p className='avisoSemData'>Erro ao carregar os detalhes da consulta.</p>
                    )}
                </div>
            </div>
            )}
        </Container>
    );
}

export default Perfil;
