import React, { useState } from 'react';
import "../css/AgendarConsulta.css";
import "../css/Disponibilidade.css";
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import DatePicker from './DispCalendario';

const Disponibilidade = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [events, setEvents] = useState([]);
    const [workingDays, setWorkingDays] = useState({
        segunda: false,
        terça: false,
        quarta: false,
        quinta: false,
        sexta: false,
        sábado: false,
        domingo: false,
    });
    const [workingHours, setWorkingHours] = useState({
        segunda: { start: '', end: '' },
        terça: { start: '', end: '' },
        quarta: { start: '', end: '' },
        quinta: { start: '', end: '' },
        sexta: { start: '', end: '' },
        sábado: { start: '', end: '' },
        domingo: { start: '', end: '' },
    });

    const handleDateSelect = (date) => {
        setSelectedDate(date);
        setEvents([{
            nomePaciente: 'João Silva',
            idadePaciente: 32,
            tipoConsulta: 'Online',
            assuntos: 'Ansiedade, estresse no trabalho',
            time: '10:00',
            details: ''
        }]);
    };

    const handleDayChange = (day) => {
        setWorkingDays(prevDays => ({
            ...prevDays,
            [day]: !prevDays[day],
        }));
    };

    const handleTimeChange = (day, type, value) => {
        setWorkingHours(prevHours => ({
            ...prevHours,
            [day]: {
                ...prevHours[day],
                [type]: value
            }
        }));
    };

    const handleUpdate = () => {
        const psicologo_id = 1;
        const dataDisponibilidade = [];
        let hasWorkingDays = false;
    
        Object.keys(workingDays).forEach(day => {
            if (workingDays[day]) {
                hasWorkingDays = true;
                const startTime = workingHours[day].start;
                const endTime = workingHours[day].end;
    
                if (startTime && endTime) {
                    for (let d = 0; d < 7; d++) {
                        const currentDate = new Date();
                        currentDate.setDate(currentDate.getDate() + d);
                        if (currentDate.toLocaleString('pt-BR', { weekday: 'long' }).toLowerCase() === day) {
                            dataDisponibilidade.push({
                                psicologo_id,
                                data: currentDate.toISOString().split('T')[0],
                                horario: startTime
                            });
                        }
                    }
                }
            }
        });
    
        if (!hasWorkingDays) {
            alert('Por favor, selecione pelo menos um dia de trabalho.');
            return;
        }
    
        if (dataDisponibilidade.length === 0) {
            alert('Por favor, preencha os horários de trabalho antes de atualizar.');
            return;
        }
    
        fetch('http://localhost:3001/disponibilidade/psicologo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataDisponibilidade),
        })
        .then(response => response.json())
        .then(data => {
            console.log(data); // Adicione este log para verificar a resposta
            if (data.success) {
                alert('Dias e horários de trabalho atualizados com sucesso!');
            } else {
                alert('Erro ao atualizar dias e horários de trabalho.');
            }
        })
        .catch(err => {
            alert('Erro ao enviar dados: ' + err.message);
        });
    };
    

    const isPastDate = selectedDate && selectedDate < new Date().setHours(0, 0, 0, 0);
    const isWorkingDay = selectedDate && workingDays[selectedDate.toLocaleDateString('pt-BR', { weekday: 'long' }).toLowerCase()];

    return (
        <Container>
            <Col className='my-4' md={12}>
                <h1 className='mb-4 text-center textroxo'>Selecione seus dias e horários de trabalho</h1>
                <Form>
                    <div className="dias-container p-3 mb-4" style={{ backgroundColor: '#fff', borderRadius: '10px' }}>
                        <Row className="mb-3 g-3">
                            {Object.keys(workingDays).map(day => (
                                <Col key={day} md={3}>
                                    <div className="day-checkbox">
                                        <label>
                                            <input
                                                className="inputSemana"
                                                type="checkbox"
                                                checked={workingDays[day]}
                                                onChange={() => handleDayChange(day)}
                                            />
                                            <span className="custom-checkbox"></span>
                                            {day.charAt(0).toUpperCase() + day.slice(1)}
                                        </label>
                                    </div>
                                    {workingDays[day] && (
                                        <div className="mb-2 time-inputs d-flex">
                                            <Form.Group className="mr-2">
                                                <Form.Label>Início:</Form.Label>
                                                <Form.Control
                                                    type="time"
                                                    value={workingHours[day]?.start || ''}
                                                    onChange={(e) => handleTimeChange(day, 'start', e.target.value)}
                                                />
                                            </Form.Group>

                                            <Form.Group>
                                                <Form.Label>Fim:</Form.Label>
                                                <Form.Control
                                                    type="time"
                                                    value={workingHours[day]?.end || ''}
                                                    onChange={(e) => handleTimeChange(day, 'end', e.target.value)}
                                                />
                                            </Form.Group>
                                        </div>
                                    )}
                                </Col>
                            ))}
                        </Row>
                    </div>

                    <Button className='mt-3 btnAtualizar' onClick={handleUpdate}>
                        <span className="material-symbols-outlined iconsDisp">restart_alt</span>
                        Atualizar
                    </Button>
                </Form>
            </Col>
            <Row className='my-4'>
                <Col md={5}>
                    <h1 className='mb-4 text-center textroxo'>Calendário</h1>
                    <DatePicker onDateSelect={handleDateSelect} workingDays={workingDays} />
                </Col>
                <Col md={7}>
                    {selectedDate ? (
                        <>
                            <h4 className='mt-4 text-center textroxo'>Eventos marcados para {selectedDate.toLocaleDateString()}</h4>
                            {isWorkingDay ? (
                                <>
                                    {events.length > 0 ? (
                                        events.map((event, index) => (
                                            <Card key={index} style={{ width: '18rem', marginBottom: '10px' }}>
                                                <Card.Body>
                                                    <Card.Title>Paciente: {event.nomePaciente}</Card.Title>
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
                                <p className='avisoSemData'>Este dia não é um dia de trabalho.</p>
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
