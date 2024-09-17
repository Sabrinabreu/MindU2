import React, { useState } from 'react';
import "../css/AgendarConsulta.css";
import "../css/Disponibilidade.css";
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import DatePicker from './Calendario';

const Disponibilidade = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [events, setEvents] = useState([]);

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

    const handleAddEvent = () => {
        // Lógica para adicionar um novo evento
        const newEvent = {
            nomePaciente: 'Novo Paciente',
            idadePaciente: 28,
            tipoConsulta: 'Presencial',
            assuntos: 'Depressão, insônia',
            time: '14:00',
            details: 'Nenhuma informação adicional fornecida.'
        };
        setEvents([...events, newEvent]);
    };

    return (
        <Container>
            <Row className='my-4'>
                <Col md={5}>
                    <h1 className='mb-4 text-center textroxo'>Selecione uma data</h1>
                    <DatePicker onDateSelect={handleDateSelect} />
                </Col>
                <Col md={7}>
                    {selectedDate ? (
                        <>
                            <h1 className='mb-4 text-center textroxo'>Eventos marcados para {selectedDate.toLocaleDateString()}</h1>
                            {events.length > 0 ? (
                                events.map((event, index) => (
                                    <Card key={index} style={{ width: '18rem', marginBottom: '10px' }}>
                                        <Card.Body>
                                            <Card.Title>Paciente: {event.nomePaciente}</Card.Title>
                                            <Card.Subtitle className="mb-2">Horário: {event.time}</Card.Subtitle>
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
                            <Button onClick={handleAddEvent}>Adicionar Evento</Button>
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
