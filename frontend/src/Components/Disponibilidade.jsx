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
    const [updated, setUpdated] = useState(false);

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
    }

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
        const psicologo_id = 4; // Exemplo, deve ser dinâmico conforme seu sistema
        const dataDisponibilidade = [];
        let hasWorkingDays = false;
    
        // Log para ver o estado de workingHours
        console.log('Estado de workingHours:', workingHours);
    
        Object.keys(workingDays).forEach(day => {
            if (workingDays[day]) {
                hasWorkingDays = true;
                const { start, end } = workingHours[day];
    
                // Log dos horários
                console.log(`Horários para ${day}: Início: ${start}, Fim: ${end}`);
    
                // Verifique se ambos os horários estão preenchidos
                if (start && end) {
                    const today = new Date();
    
                    // Loop para os próximos 7 dias
                    for (let d = 0; d < 7; d++) {
                        const nextDate = new Date();
                        nextDate.setDate(today.getDate() + d);
                        const weekday = nextDate.toLocaleString('pt-BR', { weekday: 'long' }).toLowerCase();
    
                        console.log(`Dia processado: ${weekday}, dia selecionado: ${day}`); // Log de depuração
    
                        // Verifique se o dia da semana corresponde ao dia de trabalho
                        if (weekday === day) {
                            dataDisponibilidade.push({
                                psicologo_id,
                                data: nextDate.toISOString().split('T')[0],
                                horario: start // ou use `horario: end` se necessário
                            });
                        }
                    }
                } else {
                    console.log(`Horários não preenchidos para ${day}`); // Adicionando log para horários não preenchidos
                }
            }
        });
    
        // Validações finais
        if (!hasWorkingDays) {
            alert('Por favor, selecione pelo menos um dia de trabalho.');
            return;
        }
    
        // Verifique se dataDisponibilidade tem elementos
        if (dataDisponibilidade.length === 0) {
            alert('Por favor, preencha os horários de trabalho antes de atualizar.');
            return;
        }
    
        console.log('Dados a serem enviados:', dataDisponibilidade); // Adicione este log
    
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
                        <Button className='mt-3 btnAtualizar' onClick={handleUpdate}>
                            <span className="material-symbols-outlined iconsDisp">restart_alt</span>
                            Atualizar
                        </Button>
                    </div>
                </Form>
            </Col>
            <Row className='my-4'>
                <Col md={5}>
                    <h1 className='mb-4 text-center textroxo'>Calendário</h1>
                    <DatePicker onDateSelect={handleDateSelect} workingDays={workingDays} updated={updated} />
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