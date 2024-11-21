import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "../css/SobrePsicologo.css";
import fundoPsico from '../img/fundoPsico.webp';
import { Container, Row, Col, Button, Form, Modal } from 'react-bootstrap';
import DatePicker from "../Components/Calendario";
import axios from 'axios';
import padraoPerfil from '../img/padraoPerfil.png';
import { parseJwt } from '../Components/jwtUtils';

const Agendar = () => {
    const { psicologo_id } = useParams();
    console.log("Psicólogo ID:", psicologo_id);
    const [perfil, setPerfil] = useState('');
    const [show, setShow] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [selectedTipo, setSelectedTipo] = useState(null);
    const [assunto, setAssunto] = useState('');
    const [availableTimes, setAvailableTimes] = useState([]);
    const [diasDisponiveis, setDiasDisponiveis] = useState(new Set());

    // informações pessoais
    const [nomePsico, setNomePsico] = useState('');
    const [telefone, setTelefone] = useState('');
    const [email, setEmail] = useState('');
    const [crp, setCrp] = useState('');
    const [localizacao, setLocalizacao] = useState('');
    const [especialidade, setEspecialidade] = useState('');
    const [biografia, setBiografia] = useState('');
    const [nomePaciente, setNomePaciente] = useState('');

    // modal agendamento
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log("Token:", token);

        const decodedToken = parseJwt(token);
        console.log("Token Decodificado:", decodedToken);

        if (psicologo_id) {
            fetchPsicologoData(psicologo_id);
            fetchDisponibilidades(psicologo_id);
        }
    }, [psicologo_id]);

    const fetchPsicologoData = async (psicologo_id) => {
        try {
            const token = localStorage.getItem('token');
            console.log("Token:", token);

            const response = await axios.get(`http://localhost:3001/api/psicologos/${psicologo_id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log("Resposta da API:", response.data);

            if (response.data) {
                setNomePsico(response.data.nome);
                setTelefone(response.data.telefone);
                setEmail(response.data.email);
                setCrp(response.data.crp);
                setLocalizacao(response.data.localizacao);
                setEspecialidade(response.data.especialidade);
                setBiografia(response.data.biografia);
                setPerfil(response.data.foto_perfil);
            }
        } catch (error) {
            console.error('Erro ao buscar dados do psicólogo:', error);
            if (error.response) {
                console.error('Dados de erro da resposta:', error.response.data);
            }
        }
    };

    const fetchDisponibilidades = async (psicologo_id) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:3001/api/disponibilidades/${psicologo_id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log("Dados do Psicólogo:", response.data);
            const availableTimes = response.data.map(item => ({
                data: item.data,
                horario_inicio: item.horario_inicio.substring(0, 5) // (HH:mm)
            }));
            setAvailableTimes(availableTimes);
            const dias = new Set(availableTimes.map(item => new Date(item.data).toDateString()));
            setDiasDisponiveis(dias);
        } catch (error) {
            console.error('Erro ao buscar disponibilidades:', error);
        }
    };

    const handleShow = () => {
        setShow(true);
        setSelectedTime(null);
        setSelectedTipo(null);
        setAssunto('');
    };

    const handleClose = () => {
        setShow(false);
        resetForm();
    };

    const resetForm = () => {
        setSelectedDate(null);
        setSelectedTime(null);
        setSelectedTipo(null);
        setAssunto('');
    };

    const handleDateSelect = (date) => {
        setSelectedDate(new Date(date));
    };

    const handleTimeClick = (time) => setSelectedTime(time);
    const handleTipoClick = (tipo) => setSelectedTipo(tipo);
    const handleAssuntoChange = (e) => setAssunto(e.target.value);

    const handleSave = async () => {
        if (!selectedDate || !selectedTime || !selectedTipo || !assunto || !nomePaciente) {
            alert('Por favor, preencha todos os campos antes de salvar.');
            return;
        }

        const token = localStorage.getItem('token');
        const decodedToken = parseJwt(token);

        if (!decodedToken || !decodedToken.id) {
            alert('Usuário não autenticado');
            return;
        }

        const agendamentoData = {
            usuario_id: decodedToken.id,
            psicologo_id,
            data: selectedDate.toISOString().split('T')[0],
            horario_inicio: selectedTime,
            tipo: selectedTipo,
            assunto,
            nome_paciente: nomePaciente,
        };

        console.log("Dados do agendamento:", agendamentoData);

        try {
            await axios.post('http://localhost:3001/api/agendamentos', agendamentoData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            handleClose();

            setTimeout(() => {
                setShowConfirmationModal(true);
            }, 100);  // intervalo de tempo antes de abrir o modal
        } catch (error) {
            console.error('Erro ao agendar consulta:', error);
            if (error.response) {
                alert(`Erro: ${error.response.data.error}`);
            } else {
                alert('Erro ao agendar consulta. Tente novamente.');
            }
        }
    };


    return (
        <Container className='p-4'>
            <Row>
                <Col md={6}>
                    <div className='perfilPsico'>
                        <img className="fundoPsico" src={fundoPsico} alt="Imagem de fundo" />
                        <img className="psicologo"
                            src={perfil ? `http://localhost:3001/uploads/${perfil}` : padraoPerfil}
                        />
                        <h4 className='nomePsico container p-4'>{nomePsico || 'Nome não disponível'}</h4>
                        <div className='infoPsico'>
                            <b>{especialidade || 'Especialidade não disponível'}</b>
                            <h6>{localizacao || 'Localização não disponível'}</h6>
                            <h6 className='crp'>{crp || 'CRP não disponível'}</h6>
                        </div>
                    </div>
                </Col>
                <Col md={6}>
                    <div className='agenda'>
                        <h5 className='titulosSobre py-3 pl-2 mb-2'>
                            <span className="material-symbols-outlined iconsSaibaMais">calendar_month</span> Agende sua consulta...
                        </h5>
                        <div className='displayCalendario'>
                            <DatePicker onDateSelect={handleDateSelect} diasDisponiveis={diasDisponiveis} />
                        </div>
                        <button className='agendaConsulta' onClick={handleShow} disabled={!selectedDate}>
                            Agendar consulta
                        </button>

                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title className='agendando'>Agendar Consulta</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {selectedDate ? (
                                    <>
                                        <b className='dataSelecionada'>Data selecionada:</b>
                                        {selectedDate.toLocaleDateString()}
                                        <Form.Group className="mb-3">
                                            <Form.Label>Como gostaria de ser chamado durante a consulta:</Form.Label>
                                            <Form.Control
                                                type="text"
                                                value={nomePaciente}
                                                onChange={(e) => setNomePaciente(e.target.value)}
                                                required
                                            />
                                        </Form.Group>
                                        <p className='tipoConsulta mb-1'>Tipo de consulta:</p>
                                        <button className={`botTipo ${selectedTipo === 'Online' ? 'active' : ''}`} onClick={() => handleTipoClick('Online')}>Online</button>
                                        <button className={`botTipo ${selectedTipo === 'Presencial' ? 'active' : ''}`} onClick={() => handleTipoClick('Presencial')}>Presencial</button>

                                        <Form>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Assuntos que deseja tratar durante a sessão:</Form.Label>
                                                <Form.Control
                                                    as="textarea"
                                                    rows={3}
                                                    value={assunto}
                                                    onChange={handleAssuntoChange}
                                                />
                                            </Form.Group>
                                        </Form>

                                        <h6>Horários disponíveis:</h6>
                                        {availableTimes.filter(({ data }) => new Date(data).toDateString() === selectedDate.toDateString()).length > 0 ? (
                                            <ul>
                                                {availableTimes.filter(({ data }) => new Date(data).toDateString() === selectedDate.toDateString()).map(({ data, horario_inicio }) => (
                                                    <button
                                                        key={horario_inicio}
                                                        className={`horarioBotao ${selectedTime === horario_inicio ? 'active' : ''}`}
                                                        onClick={() => handleTimeClick(horario_inicio)}
                                                    >
                                                        {horario_inicio}
                                                    </button>
                                                ))}
                                            </ul>
                                        ) : (
                                            <p>Sem horários disponíveis.</p>
                                        )}
                                    </>
                                ) : (
                                    <p>Selecione uma data primeiro.</p>
                                )}
                            </Modal.Body>

                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>Fechar</Button>
                                <Button className='salvar' onClick={handleSave}>Salvar</Button>
                            </Modal.Footer>
                        </Modal>

                        <Modal show={showConfirmationModal} onHide={() => setShowConfirmationModal(false)}>
                            <Modal.Header closeButton>
                                <Modal.Title>Consulta Agendada com sucesso 🎉</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <p>Mais informações sobre sua consulta foram enviadas para o seu email!
                                </p>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button className='fecharSaibaMaisAgendada' variant="secondary" onClick={() => setShowConfirmationModal(false)}>
                                    Fechar
                                </Button>
                            </Modal.Footer>
                        </Modal>

                    </div>
                    <div className='biografia p-4'>
                        <h5 className='titulosSobre py-3'>
                            <span className="material-symbols-outlined iconsSaibaMais">person_book</span> Biografia
                        </h5>
                        <p className='mb-4'>
                            {biografia || 'Biografia não disponível.'}
                        </p>
                    </div>
                    <div className='contato p-4'>
                        <h5 className='titulosSobre py-3'>
                            <span className="material-symbols-outlined iconsSaibaMais">send</span> Contato
                        </h5>
                        <p>Telefone: {telefone || 'Telefone não disponível'}</p>
                        <p>Email: {email || 'Email não disponível'}</p>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Agendar;