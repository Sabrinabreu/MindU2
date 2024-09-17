import React, { useState } from 'react';
import "../css/AgendarConsulta.css";
import "../css/Disponibilidade.css";
import DatePicker from './Calendario';
import { Container, Row, Col, Card, Button } from "react-bootstrap";

const Disponibilidade = () => {
    // Estado para armazenar a data selecionada e eventos
    const [selectedDate, setSelectedDate] = useState(null);
    const [events, setEvents] = useState([]);

    // Função chamada ao selecionar uma data no DatePicker
    const handleDateSelect = (date) => {
        setSelectedDate(date);
        console.log('Data selecionada:', date);
    };

    // Função para adicionar um novo evento para a data selecionada
    const handleAddEvent = () => {
        if (selectedDate) {
            const newEvent = {
                time: 'Horário a definir', // Aqui você pode permitir o usuário escolher um horário
                details: 'Informações adicionais do evento',
            };
            setEvents([...events, newEvent]);
        } else {
            alert("Por favor, selecione uma data antes de adicionar um evento.");
        }
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
                            <h1>Eventos marcados para {selectedDate.toLocaleDateString()}</h1>
                            {events.length > 0 ? (
                                events.map((event, index) => (
                                    <Card key={index} style={{ width: '18rem', marginBottom: '10px' }}>
                                        <Card.Body>
                                            <Card.Title>{selectedDate.toLocaleDateString()}</Card.Title>
                                            <Card.Subtitle className="mb-2">{event.time}</Card.Subtitle>
                                            <Card.Text>{event.details}</Card.Text>
                                        </Card.Body>
                                    </Card>
                                ))
                            ) : (
                                <p>Nenhum evento adicionado para esta data.</p>
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
