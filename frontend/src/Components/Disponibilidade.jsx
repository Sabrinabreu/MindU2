import React, { useState, useEffect } from 'react';
import "../css/AgendarConsulta.css";
import "../css/Disponibilidade.css";
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import DatePicker from './DispCalendario';
import { parseJwt } from '../Components/jwtUtils';
import axios from 'axios';

const Disponibilidade = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [events, setEvents] = useState([]);
    const [workingHours, setWorkingHours] = useState({
        Segunda: { start: '', end: '' },
        Terça: { start: '', end: '' },
        Quarta: { start: '', end: '' },
        Quinta: { start: '', end: '' },
        Sexta: { start: '', end: '' },
        Sábado: { start: '', end: '' },
        Domingo: { start: '', end: '' },
    });
    const [selectedDays, setSelectedDays] = useState({});
    const [updatedDays, setUpdatedDays] = useState({});
    const [psicologoId, setPsicologoId] = useState(null);

    const daysOfWeek = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

    const handleDateSelect = (date) => {
        setSelectedDate(date);
        console.log('Data selecionada:', date);
    };

    const fetchAgendamentos = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/agendamentos');
            console.log('Eventos recebidos:', response.data);
    
            const filteredEvents = response.data.filter(event => {
                const eventDate = new Date(event.data);
                return event.psicologo_id === psicologoId && eventDate >= new Date();
            });
    
            setEvents(filteredEvents);
            console.log('Eventos filtrados:', filteredEvents);
        } catch (error) {
            console.error('Erro ao buscar agendamentos:', error);
        }
    };
    

    const getEventsForSelectedDate = () => {
        if (!selectedDate) return [];
        const selectedDateString = selectedDate.toISOString().split('T')[0];
        return events.filter(event => {
            const eventDate = new Date(event.data).toISOString().split('T')[0]; 
            return eventDate === selectedDateString;
        });
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = parseJwt(token);
            console.log('Token decodificado:', decodedToken);

            const id = decodedToken.perfil.psicologo_id || decodedToken.id;
            if (id) {
                setPsicologoId(id);
                console.log('ID do psicólogo extraído do token:', id);
            } else {
                console.log('ID do psicólogo não encontrado no token.');
            }
        } else {
            console.log('Token não encontrado.');
        }
    }, []);

    useEffect(() => {
        if (psicologoId) {
            console.log('ID do psicólogo antes de buscar agendamentos:', psicologoId);
            fetchAgendamentos();
        }
    }, [psicologoId]);

    const handleTimeChange = (day, type, value) => {
        setWorkingHours(prevHours => ({
            ...prevHours,
            [day]: {
                ...prevHours[day],
                [type]: value
            }
        }));
    };

    const handleDayChange = (day) => {
        setSelectedDays(prev => ({
            ...prev,
            [day]: !prev[day]
        }));
    };

    const handleUpdate = () => {
        if (!psicologoId) {
            alert('ID do psicólogo não encontrado.');
            return;
        }

        const dataDisponibilidade = [];

        for (const day of daysOfWeek) {
            if (selectedDays[day]) {
                const today = new Date();
                const year = today.getFullYear();
                const month = today.getMonth();

                for (let i = 1; i <= 31; i++) {
                    const date = new Date(year, month, i);
                    if (date.getMonth() !== month) break;

                    if (date.getDay() === daysOfWeek.indexOf(day)) {
                        const data = date.toISOString().split('T')[0];
                        dataDisponibilidade.push({
                            psicologo_id: psicologoId,
                            data: data,
                            horario_inicio: workingHours[day].start,
                            horario_fim: workingHours[day].end
                        });

                        setUpdatedDays(prev => ({
                            ...prev,
                            [data]: true
                        }));
                    }
                }
            }
        }

        console.log('Dados a serem enviados:', dataDisponibilidade);

        fetch('http://localhost:3001/api/disponibilidade/psicologo', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dataDisponibilidade),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao atualizar dias e horários de trabalho.');
                }
                return response.json();
            })
            .then(data => {
                alert('Dias e horários de trabalho atualizados com sucesso!');
            })
            .catch(err => {
                alert('Erro ao enviar dados: ' + err.message);
            });
    };

    return (
        <Container>
            <Col className='my-4' md={12}>
                <h1 className='mb-4 text-center textroxo'>Selecione seus horários de trabalho</h1>
                <Form>
                    <div className="dias-container p-3 mb-4" style={{ backgroundColor: '#fff', borderRadius: '10px' }}>
                        <Row className="mb-3 g-3">
                            {daysOfWeek.map((day, index) => (
                                <Col key={index} md={2}>
                                    <label className="cl-checkbox">
                                        <input
                                            type="checkbox"
                                            checked={selectedDays[day] || false}
                                            onChange={() => handleDayChange(day)}
                                        />
                                        <span>{day}</span>
                                    </label>
                                    {selectedDays[day] && (
                                        <>
                                            <Form.Group controlId={`formBasicStart${day}`}>
                                                <Form.Label>Hora de Início</Form.Label>
                                                <Form.Control
                                                    type="time"
                                                    value={workingHours[day].start}
                                                    onChange={(e) => handleTimeChange(day, 'start', e.target.value)}
                                                />
                                            </Form.Group>
                                            <Form.Group controlId={`formBasicEnd${day}`}>
                                                <Form.Label>Hora de Fim</Form.Label>
                                                <Form.Control
                                                    type="time"
                                                    value={workingHours[day].end}
                                                    onChange={(e) => handleTimeChange(day, 'end', e.target.value)}
                                                />
                                            </Form.Group>
                                        </>
                                    )}
                                </Col>
                            ))}
                        </Row>
                        <Button className='mt-3 btnAtualizar' onClick={handleUpdate}>
                            <span className="material-symbols-outlined iconsDisp">restart_alt</span>
                            Atualizar
                        </Button>
                    </div>
                </Form>
            </Col>
            <Row className='my-4'>
                <Col md={6} className='disponibilidade'>
                    <h1 className='mb-4 text-center textroxo'>Calendário</h1>
                    <DatePicker
                        onDateSelect={handleDateSelect}
                        events={events} 
                    />
                </Col>
                <Col md={6}>
                    {selectedDate ? (
                        <div>
                            <h4 className='mt-4 p-4 text-center textroxo'>Eventos marcados para {selectedDate.toLocaleDateString()}</h4>
                            {getEventsForSelectedDate().length > 0 ? (
                                getEventsForSelectedDate().map((event, index) => (
                                    <Card className="evento-card" key={index} style={{ width: '100%', borderRadius: '10px', border: '1px solid #ddd' }}>
                                        <Card.Body>
                                            <Card.Title className="evento-title">Paciente: {event.nome_paciente}</Card.Title> 
                                            <Card.Text className="evento-details">
                                                <strong>Horário:</strong> {event.horario_inicio}
                                            </Card.Text>
                                            <Card.Text className="evento-details">
                                                <strong>Tipo de consulta:</strong> {event.tipo}
                                            </Card.Text>
                                            <Card.Text className="evento-details">
                                                <strong>Assuntos:</strong> {event.assunto}
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                ))
                            ) : (
                                <p className='avisoSemData dispon'>Sem consultas marcadas para esse dia.</p>
                            )}
                        </div>
                    ) : (
                        <p className='avisoSemData dispon'>Por favor, selecione uma data para ver ou adicionar eventos.</p>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default Disponibilidade;