import React, { useState, useEffect } from 'react';
import "../css/Disponibilidade.css";
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import DatePicker from './DispCalendario';
import { parseJwt } from '../Components/jwtUtils';

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

    const daysOfWeek = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];

    const handleDateSelect = (date) => {
        if (date) {
            setSelectedDate(date);
        } else {
            alert("Por favor, selecione uma data válida.");
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = parseJwt(token);
            const id = decodedToken.psicologo_id || decodedToken.id;
            setPsicologoId(id);
        } else {
            console.log('Token não encontrado.');
        }
    }, []);

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
                        const data = date.toISOString().split('T')[0]; // Formata a data para 'YYYY-MM-DD'
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
                                        <span></span>
                                        {day}
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
                <Col md={6}>
                    <h1 className='mb-4 text-center textroxo'>Calendário</h1>
                    <DatePicker onDateSelect={handleDateSelect} updatedDays={updatedDays} />
                </Col>
                <Col md={6}>
                    {selectedDate ? (
                        <>
                            <h4 className='mt-4 text-center textroxo'>Eventos marcados para {selectedDate.toLocaleDateString()}</h4>
                            {events.length > 0 ? (
                                events.map((event, index) => (
                                    <Card key={index} style={{ width: '18rem', marginBottom: '10px' }}>
                                        <Card.Body>
                                            <Card.Title>Paciente : {event.nomePaciente}</Card.Title>
                                            <Card.Text>Horário: {event.time}</Card.Text>
                                            <Card.Text>Idade: {event.idadePaciente}</Card.Text>
                                            <Card.Text>Tipo de consulta: {event.tipoConsulta}</Card.Text>
                                            <Card.Text>Assuntos: {event.assuntos}</Card.Text>
                                            <Card.Text>Informações adicionais: {event.details || 'Nenhuma informação adicional fornecida.'}</Card.Text>
                                        </Card.Body>
                                    </Card>
                                ))
                            ) : (
                                <p className='avisoSemData'>Sem consultas marcadas para esse dia.</p>
                            )}
                        </>
                    ) : (
                        <p className='avisoSemData'>Por favor, selecione uma data para ver ou adicionar eventos.</p>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default Disponibilidade;