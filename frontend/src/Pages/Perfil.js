import React, { useEffect, useState } from 'react';
import "../css/Perfil.css";
import perfilPsicologo from '../img/imgPerfil.jpg';
import { Container, Row, Col, Card, ListGroup, Button, Form } from 'react-bootstrap';
import { Eye, EyeOff } from 'lucide-react';

function Perfil() {
    const [consultationDetails, setConsultationDetails] = useState([]);
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [isEditing, setIsEditing] = useState(false);
    const [profileData, setProfileData] = useState({
        login: 'user@login',
        nome: 'nomeuser',
        email: 'user@email',
        senha: 'senhaaa',
    });

    const [profileImage, setProfileImage] = useState(perfilPsicologo);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        // Função para buscar os detalhes das consultas
        const fetchConsultationDetails = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/consultations');
                if (!response.ok) {
                    throw new Error('Erro ao buscar detalhes da consulta');
                }
                const data = await response.json();
                if (Array.isArray(data)) {
                    setConsultationDetails(data);
                } else {
                    console.error('Dados recebidos não são um array', data);
                    setConsultationDetails([]);
                }
            } catch (error) {
                console.error('Erro ao buscar detalhes da consulta:', error);
                setConsultationDetails([]);
            }
        };

        fetchConsultationDetails();
    }, []);

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
            const date = new Date(detail.date);
            return date.getDate() + (date.getMonth() === month ? 0 : 1);
        });

        for (let i = 0; i < startDay; i++) {
            calendarDays.push(<div className="calendar-cell" key={`empty-${i}`}></div>);
        }

        for (let i = 1; i <= days; i++) {
            const isConsultationDate = consultationDates.includes(i);
            calendarDays.push(
                <div
                    className={`calendar-cell ${isConsultationDate ? 'has-consultation' : ''}`}
                    key={i}
                >
                    {i}
                    {isConsultationDate && <div className="dot"></div>}
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

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSave = (e) => {
        e.preventDefault();
        localStorage.setItem('profileData', JSON.stringify(profileData));
        atualizarPerfilNoBackend();
        setIsEditing(false);
    };

    const handleCancel = () => {
        setIsEditing(false);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(prevState => !prevState);
    };

    const atualizarPerfilNoBackend = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/atualizarPerfil', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(profileData),
            });

            if (!response.ok) {
                throw new Error('Erro ao atualizar o perfil');
            }

            const responseData = await response.json();
            console.log('Resposta do backend:', responseData);

            alert('Perfil atualizado com sucesso!');
        } catch (error) {
            console.error('Erro ao atualizar perfil:', error);
            alert('Erro ao atualizar o perfil.');
        }
    };

    const handleImageClick = () => {
        document.getElementById('fileInput').click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const imageUrl = reader.result;
                setProfileImage(imageUrl);

                // Salva a imagem do perfil no localStorage
                localStorage.setItem('profileImage', imageUrl);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <Container className='mt-4'>
            <Row>
                <Col md={4}>
                    <Card className='cardPerfil'>
                        <Card.Body>
                            <div className="d-flex flex-column align-items-center text-center">
                                <img
                                    src={profileImage}
                                    alt="Perfil Psicólogo"
                                    className="meuPerfil"
                                    width="150"
                                    onClick={handleImageClick}
                                />
                                <input
                                    type="file"
                                    id="fileInput"
                                    style={{ display: 'none' }}
                                    accept="image/*"
                                    onChange={handleFileChange}
                                />
                                <div className="mt-3">
                                    <h4>{profileData.nome}</h4>
                                    <p>{profileData.login}</p>
                                    <p className="text-muted font-size-sm">..</p>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                    <Card className="cardPerfil mt-3">
                        <ListGroup variant="flush">
                            <ListGroup.Item className="d-flex justify-content-between align-items-center flex-wrap">
                                <h6 className="mb-0">Email</h6>
                                <span className="text-secondary">user@gmail.com</span>
                            </ListGroup.Item>
                            <ListGroup.Item className="d-flex justify-content-between align-items-center flex-wrap">
                                <h6 className="mb-0">Telefone</h6>
                                <span className="text-secondary">(11) 96414-9914</span>
                            </ListGroup.Item>
                            <ListGroup.Item className="d-flex justify-content-between align-items-center flex-wrap">
                                <h6 className="mb-0">CPF</h6>
                                <span className="text-secondary">450.533.783-93</span>
                            </ListGroup.Item>
                            <ListGroup.Item className="d-flex justify-content-between align-items-center flex-wrap">
                                <h6 className="mb-0">Empresa</h6>
                                <span className="text-secondary">Scania</span>
                            </ListGroup.Item>
                            <ListGroup.Item className="d-flex justify-content-between align-items-center flex-wrap">
                                <h6 className="mb-0">Cargo</h6>
                                <span className="text-secondary">Peão</span>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
                <Col md={8}>
                    <Card className="cardPerfil mb-3">
                        <Card.Body>
                            {isEditing ? (
                                <Form onSubmit={handleSave}>
                                    <Form.Group controlId="formFullName">
                                        <Form.Label>Nome</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="nome"
                                            value={profileData.nome}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formEmail">
                                        <Form.Label>login</Form.Label>
                                        <Form.Control
                                            type="email"
                                            name="login"
                                            value={profileData.login}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formPassword">
                                        <Form.Label>Senha</Form.Label>
                                        <div className="password-container">
                                            <Form.Control
                                                type={showPassword ? "text" : "password"}
                                                name="senha"
                                                value={profileData.senha}
                                                onChange={handleChange}
                                                disabled={!isEditing}
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
                                    <Button className='salvarBot mt-3' type="submit">Salvar</Button>
                                    <Button className="cancelarBot  mt-3" onClick={handleCancel}>Cancelar</Button>
                                </Form>
                            ) : (
                                <>
                                    <Row>
                                        <Col sm={3}><h6 className="mb-0">Nome </h6></Col>
                                        <Col sm={9} className="text-secondary">{profileData.nome}</Col>
                                    </Row>
                                    <hr />
                                    <Row>
                                        <Col sm={3}><h6 className="mb-0">Login</h6></Col>
                                        <Col sm={9} className="text-secondary">{profileData.login}</Col>
                                    </Row>
                                    <hr />
                                    <Row>
                                        <Col sm={3}><h6 className="mb-0">Senha</h6></Col>
                                        <Col sm={9} className="text-secondary">
                                            {isEditing ? profileData.senha : '*****'}
                                        </Col>
                                    </Row>
                                    <hr />
                                    <Row>
                                        <Col sm={12}>
                                            <Button className='editarBot' onClick={handleEditClick}>Editar</Button>
                                        </Col>
                                    </Row>
                                </>
                            )}
                        </Card.Body>
                    </Card>

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
                </Col>
            </Row>

            <div className="calendar-container">
                <div className="calendar">
                    <h5>Detalhes da Consulta</h5>
                    {Array.isArray(consultationDetails) ? (
                        consultationDetails.length > 0 ? (
                            consultationDetails.map((detail, index) => (
                                <div key={index}>
                                    <p><strong>Data:</strong> {detail.data}</p>
                                    <p><strong>Horário:</strong> {detail.time}</p>
                                    <p><strong>Tipo:</strong> {detail.tipo}</p>
                                    <p><strong>Assunto:</strong> {detail.assunto}</p>
                                    <hr />
                                </div>
                            ))
                        ) : (
                            <p>Nenhum agendamento encontrado.</p>
                        )
                    ) : (
                        <p>Erro ao carregar os detalhes da consulta.</p>
                    )}
                </div>
            </div>
        </Container>
    );
}

export default Perfil;
