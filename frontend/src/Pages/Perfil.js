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
    // console.log ("token decodadokk: ", decodedToken)

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

    const validateForm = () => {
        if (!perfil.nome || !perfil.email || !perfil.cpf || !perfil.telefone || !perfil.senha || !selectedQuestion || !securityAnswer) {
            setErrorMessage('Todos os campos são obrigatórios.');
            return false;
        }
        return true;
    };    

    const handleSave = async (e) => {
        e.preventDefault();
    
        // Verifica se a pergunta de segurança e a resposta estão preenchidas
        if (!selectedQuestion || !securityAnswer.trim()) {
            setErrorMessage('Selecione uma pergunta de segurança e forneça uma resposta.');
            return;
        }
    
        console.log("perfil atualizado:", perfil);
        console.log("Pergunta de segurança selecionada:", selectedQuestion);
        console.log("Resposta de segurança:", securityAnswer);


        // Verifica se o formulário está válido antes de prosseguir
        if (!validateForm()) {
            setErrorMessage('Preencha todos os campos obrigatórios.');
            return;
        }
    
        // Limpa mensagens de erro antes de continuar
        setErrorMessage('');
    
        const updatedPerfil = {
            ...perfil,
            perguntaSeguranca: selectedQuestion,
            respostaSeguranca: securityAnswer,
            loginMethod: 'email',
            senha: perfil.senha
        };
    
        try {
            const response = await axios.put('http://localhost:3001/api/atualizarPerfil', updatedPerfil, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
        
            console.log('Resposta do backend:', response);
        
            if (response.status >= 200 && response.status < 300) {
                // Atualiza o estado do perfil com os dados retornados do backend
                setPerfil(response.data.perfilAtualizado); 
                alert('Perfil atualizado com sucesso!');
                setIsEditing(false);
            } else {
                setErrorMessage('Erro ao atualizar o perfil.');
            }
        } catch (error) {
            setErrorMessage('Erro ao atualizar o perfil.');
            console.error('Erro ao atualizar perfil:', error.response ? error.response.data : error.message);
        }      
             
    };    

    const handleQuestionChange = (e) => {
        setSelectedQuestion(e.target.value);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setPerfil(decodedToken.perfil); // Restaura o estado original do perfil
    }; 

    const togglePasswordVisibility = () => {
        setShowPassword(prevState => !prevState);
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

    useEffect(() => {
        const fetchEmpresa = async () => {
            if (token) {
                setPerfil(decodedToken.perfil); 
                setTipoUsuario(decodedToken.tipo_usuario);
    
                if (decodedToken.tipo_usuario === 'funcionario') {
                    await buscarNomeEmpresa(decodedToken.perfil.empresa_id);
                }
            }
        };
        fetchEmpresa();
    }, [token]);
    

    const daysInMonth = (month, year) => {
        return new Date(year, month + 1, 0).getDate();
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
        if (decodedToken.perfil && decodedToken.perfil.loginMethod === 'login_temporario') {
            setShowAlert(true);
        }
    }, [decodedToken]); 

    return (
        <Container className='mt-4'>
            {showAlert && (
                <Alert variant="danger" dismissible onClose={() => setShowAlert(false)}>
                    <Alert.Heading>Atualização de dados cadastrais necessária!</Alert.Heading>
                    <p>
                        É necessário atualizar seus dados para usar as funções do sistema.
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
                                            onChange={(e) => setPerfil({ ...perfil, nome: e.target.value })}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formEmail">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            type="email"
                                            name="login"
                                            value={perfil.email}
                                            onChange={(e) => setPerfil({ ...perfil, email: e.target.value })}
                                        />
                                    </Form.Group>
                                    <Form.Group 
                                    // controlId="formEmail"
                                    >
                                        <Form.Label>CPF</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="cpf"
                                            value={perfil.cpf}
                                            onChange={(e) => setPerfil({ ...perfil, cpf: e.target.value })}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formEmail">
                                        {/* //mudar esses ids depois */}
                                        <Form.Label>Cargo</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="cargo"
                                            value={perfil.cargo}
                                            onChange={(e) => setPerfil({ ...perfil, cargo: e.target.value })}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formEmail">
                                        <Form.Label>Telefone</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="telefone"
                                            value={perfil.telefone}
                                            onChange={(e) => setPerfil({ ...perfil, telefone: e.target.value })}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formPassword">
                                    <Form.Label>Senha</Form.Label>
                                    <div className="password-container">
                                    <Form.Control
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
                                        <Col sm={3}><h6 className="mb-0">Email</h6></Col>
                                        <Col sm={9} className="text-secondary">{perfil.email}</Col>
                                    </Row>
                                    <hr />
                                    <Row>
                                        <Col sm={3}><h6 className="mb-0">CPF</h6></Col>
                                        <Col sm={9} className="text-secondary">{perfil.cpf}</Col>
                                    </Row>
                                    <hr />
                                    <Row>
                                        <Col sm={3}><h6 className="mb-0">Cargo</h6></Col>
                                        <Col sm={9} className="text-secondary">{perfil.cargo}</Col>
                                    </Row>
                                    <hr />
                                    <Row>
                                        <Col sm={3}><h6 className="mb-0">Telefone</h6></Col>
                                        <Col sm={9} className="text-secondary">{perfil.telefone}</Col>
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
