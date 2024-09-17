import React, { useState } from 'react';
import "../css/AgendarConsulta.css";
import "../css/Disponibilidade.css";
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import DatePicker from './Calendario';

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
        // Aqui você pode buscar eventos para essa data
        setEvents([{
            nomePaciente: 'João Silva',
            idadePaciente: 32,
            tipoConsulta: 'Online',
            assuntos: 'Ansiedade, estresse no trabalho',
            time: '10:00',
            details: '' // Se nenhum detalhe adicional for fornecido
        }]);
    };

    const handleDayChange = (day) => {
        setWorkingDays(prevDays => ({
            ...prevDays,
            [day]: !prevDays[day]
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
        // const dataToSend = {
        //     workingDays,
        //     workingHours
        // };

        // fetch('http://localhost:3001/api/disponibilidade', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(dataToSend),
        // })
        // .then(response => response.json())
        // .then(data => {
        //     if (data.success) {
        //         alert('Dias e horários de trabalho atualizados com sucesso!');
        //     } else {
        //         alert('Erro ao atualizar dias e horários de trabalho.');
        //     }
        // })
        // .catch(err => {
        //     console.error('Erro ao enviar dados:', err);
        //     alert('Erro ao enviar dados.');
        // });
    };

    // verifica se a data selecionada é anterior a atual
    const isPastDate = selectedDate && selectedDate < new Date().setHours(0, 0, 0, 0);

    // Determina se o dia da semana da data selecionada é um dia de trabalho
    const isWorkingDay = selectedDate && workingDays.includes(selectedDate.toLocaleDateString('pt-BR', { weekday: 'long' }).toLowerCase());

    return (
        <Container>
                <Col className='my-4' md={12}>
                <h1 className='mb-4 text-center textroxo'>Selecione seus dias e horários de trabalho</h1>
                <Form>
                        {Object.keys(workingDays).map(day => (
                            <div key={day}>
                                <Form.Check
                                    type="checkbox"
                                    label={day.charAt(0).toUpperCase() + day.slice(1)}
                                    checked={workingDays[day]}
                                    onChange={() => handleDayChange(day)}
                                />
                                {workingDays[day] && (
                                    <div className="time-inputs">
                                        <Form.Group>
                                            <Form.Label>Horário de início para {day}:</Form.Label>
                                            <Form.Control
                                                type="time"
                                                value={workingHours[day]?.start || ''}
                                                onChange={(e) => handleTimeChange(day, 'start', e.target.value)}
                                            />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>Horário de término para {day}:</Form.Label>
                                            <Form.Control
                                                type="time"
                                                value={workingHours[day]?.end || ''}
                                                onChange={(e) => handleTimeChange(day, 'end', e.target.value)}
                                            />
                                        </Form.Group>
                                    </div>
                                )}
                            </div>
                        ))}
                        <Button className='mt-3' onClick={handleUpdate}><span class="material-symbols-outlined iconsDisp">restart_alt</span>Atualizar</Button>
                    </Form>
                    </Col>
                    <Row className='my-4'>
                    <Col md={5}>
                    <h1 className='mb-4 text-center textroxo'>Calendário</h1>
                    <DatePicker onDateSelect={handleDateSelect}/>
                </Col>
                <Col md={7}>
                {selectedDate ? (
                        <>
                            <h1 className='mb-4 text-center textroxo'>Eventos marcados para {selectedDate.toLocaleDateString()}</h1>
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
                                        <p className='avisoSemData'>Nenhum evento adicionado para esta data.</p>
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
