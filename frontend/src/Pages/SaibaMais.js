import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "../css/AgendarConsulta.css";
import "../css/SobrePsicologo.css";
import perfilPsicologo from '../img/perfilPsicologo.jfif';
import fundoPsico from '../img/fundoPsico.webp';
import { Container, Row, Col, Button, Form, Modal } from 'react-bootstrap';
import DatePicker from "../Components/Calendario";
import axios from 'axios';

const nomePsico = 'Flávio Monteiro Lobato';

const Agendar = () => {
    const { psicologo_id } = useParams();
    const [show, setShow] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [selectedTipo, setSelectedTipo] = useState(null);
    const [assunto, setAssunto] = useState('');
    const [availableTimes, setAvailableTimes] = useState([]);
    const [diasDisponiveis, setDiasDisponiveis] = useState(new Set());

    useEffect(() => {
        if (psicologo_id) {
            fetchDisponibilidades(psicologo_id);
        }
    }, [psicologo_id]);

    const fetchDisponibilidades = async (psicologo_id) => {
        try {
            const response = await axios.get(`http://localhost:3001/api/disponibilidades/${psicologo_id}`);
            setAvailableTimes(response.data);
            const dias = new Set(response.data.map(item => new Date(item.data).toDateString()));
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
        if (!selectedDate || !selectedTime || !selectedTipo || !assunto) {
            alert('Por favor, preencha todos os campos antes de salvar.');
            return;
        }

        const agendamentoData = {
            psicologo_id,
            data: selectedDate.toISOString().split('T')[0],
            horario: selectedTime,
            tipo: selectedTipo,
            assunto,
        };

        try {
            const response = await axios.post('http://localhost:3001/api/agendamentos', agendamentoData);
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
        <Container className='-4'>
            <h6>Horários disponíveis:</h6>
            {availableTimes.length > 0 ? (
                <ul>
                    {availableTimes.map(({ data, horario }) => (
                        <li key={`${data}-${horario}`}>
                            {`${data} - ${horario}`}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Sem horários disponíveis.</p>
            )}
            <Row>
                <Col md={6}>
                    <div className='perfilPsico'>
                        <img className="fundoPsico" src={fundoPsico} alt="Imagem de fundo" />
                        <img className="psicologo" src={perfilPsicologo} alt="Perfil do psicólogo" />
                        <button className='valores'>Duração da sessão <br /><b>1 hora</b></button>
                        <h4 className='nomePsico container p-4'>{nomePsico}</h4>
                        <b className='infoPsico'>Psicólogo Cognitivo</b>
                        <h6 className='infoPsico'>Cornélio Procópio - PR</h6>
                        <h6 className='crp'>214579 / CRP - 4ª Região</h6>
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
                                                {availableTimes.filter(({ data }) => new Date(data).toDateString() === selectedDate.toDateString()).map(({ data, horario }) => (
                                                    <button 
                                                        key={horario} 
                                                        className={`horarioBotao ${selectedTime === horario ? 'active' : ''}`} 
                                                        onClick={() => handleTimeClick(horario)}
                                                    >
                                                        {horario}
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
                            Psicólogo, formado em 1990 pela Universidade Estadual do Paraná. Especialista em Terapia Cognitivo-Comportamental e Psicoterapia de Casal. Atua na área clínica há mais de 30 anos, com experiência em atendimentos individuais e grupais.
                        </p>
                    </div>
                    <div className='contato p-4'>
                        <h5 className='titulosSobre py-3'>
                            <span className="material-symbols-outlined iconsSaibaMais">send</span> Contato
                        </h5>
                        <p>Telefone: (43) 1234-5678 <br /> Email: contato@psicologo.com.br</p>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Agendar;