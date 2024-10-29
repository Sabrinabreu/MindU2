import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "../css/AgendarConsulta.css";
import "../css/SobrePsicologo.css";
import fundoPsico from '../img/fundoPsico.webp';
import { Container, Row, Col, Button, Form, Modal } from 'react-bootstrap';
import DatePicker from "../Components/Calendario";
import axios from 'axios';

const Agendar = () => {
    const { psicologo_id } = useParams();

    const [show, setShow] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [selectedTipo, setSelectedTipo] = useState(null);
    const [assunto, setAssunto] = useState('');
    const [availableTimes, setAvailableTimes] = useState([]);
    const [diasDisponiveis, setDiasDisponiveis] = useState(new Set());

    // Estados para armazenar os dados do psicólogo
    const [nomePsico, setNomePsico] = useState('');
    const [telefone, setTelefone] = useState('');
    const [email, setEmail] = useState('');
    const [crp, setCrp] = useState('');
    const [localizacao, setLocalizacao] = useState('');
    const [especialidade, setEspecialidade] = useState('');
    const [biografia, setBiografia] = useState('');
    const [fotoPsico, setFotoPsico] = useState('');

    useEffect(() => {
        if (psicologo_id) {
            fetchPsicologoData(psicologo_id);
            fetchDisponibilidades(psicologo_id);
        }
    }, [psicologo_id]);

    // Função para buscar os dados do psicólogo
    const fetchPsicologoData = async (psicologo_id) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:3001/api/psicologos/${psicologo_id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.data) {
                setNomePsico(response.data.nome);
                setTelefone(response.data.telefone);
                setEmail(response.data.email);
                setCrp(response.data.crp);
                setLocalizacao(response.data.localizacao);
                setEspecialidade(response.data.especialidade);
                setBiografia(response.data.biografia);

                setFotoPsico(response.data.foto);
            }
        } catch (error) {
            console.error('Erro ao buscar dados do psicólogo:', error);
            if (error.response) {
                console.error('Dados de erro da resposta:', error.response.data);
            }
        }
    };

    // Função para buscar as disponibilidades do psicólogo
    const fetchDisponibilidades = async (psicologo_id) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:3001/api/disponibilidades/${psicologo_id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response.data); // Adicione este log
            const availableTimes = response.data.map(item => ({
                data: item.data,
                horario_inicio: item.horario_inicio.substring(0, 5) // (HH:mm)
            }));
            setAvailableTimes(availableTimes);
            const dias = new Set(availableTimes.map(item => new Date(item.data).toDateString()));
            setDiasDisponiveis(dias);
            console.log('Dias Disponíveis:', dias); // Adicione este log
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
        if (!selectedDate || !selectedTime || !selectedTipo || !assunto) {
            alert('Por favor, preencha todos os campos antes de salvar.');
            return;
        }

        const agendamentoData = {
            psicologo_id,
            data: selectedDate.toISOString().split('T')[0],
            horario_inicio: selectedTime,
            tipo: selectedTipo,
            assunto,
        };

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('http://localhost:3001/api/agendamentos', agendamentoData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            alert(response.data.message);
            handleClose();
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
                        <img className="psicologo" src={fotoPsico} alt="Perfil do psicólogo" /> {/* Exibe a foto do psicólogo */}
                        <h4 className='nomePsico container p-4'>{nomePsico}</h4>
                        <div className='infoPsico'>
                            <b>{especialidade}</b>
                            <h6>{localizacao}</h6>
                            <h6 className='crp'>{crp}</h6>
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
                                        <p className='tipoConsulta mb-1'>Tipo de consulta:</p>
                                        <button className={`botTipo ${selectedTipo === 'Online' ? 'active' : ''}`} onClick={() => handleTipoClick('Online')}>Online</button>
                                        <button className={`botTipo ${selectedTipo === 'Presencial' ? 'active' : ''}`} onClick={() => handleTipoClick('Presencial')}>Presencial</button>
                                        <Form>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Assuntos que deseja tratar durante a sessão:</Form.Label>
                                                <Form.Control as="textarea" rows={3} value={assunto} onChange={handleAssuntoChange} />
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
                    </div>
                    <div className='biografia p-4'>
                        <h5 className='titulosSobre py-3'>
                            <span className="material-symbols-outlined iconsSaibaMais">person_book</span> Biografia
                        </h5>
                        <p className='mb-4'>
                            {biografia || 'Biografia não disponível.'} {/* Exibe a biografia ou uma mensagem padrão */}
                        </p>
                    </div>
                    <div className='contato p-4'>
                        <h5 className='titulosSobre py-3'>
                            <span className="material-symbols-outlined iconsSaibaMais">send</span> Contato
                        </h5>
                        <p>Telefone: {telefone}</p>
                        <p>Email: {email}</p>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Agendar;