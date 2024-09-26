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
        const psicologo_id = 1; // Defina o ID do psicólogo conforme necessário
        const dataDisponibilidade = [];
    
        let hasWorkingDays = false; // Variável para verificar se há dias de trabalho selecionados
    
        Object.keys(workingDays).forEach(day => {
            if (workingDays[day]) {
                hasWorkingDays = true; // Define como verdadeiro se algum dia estiver selecionado
                const startTime = workingHours[day].start;
                const endTime = workingHours[day].end;
    
                if (startTime && endTime) { // Verifica se os horários de início e término estão preenchidos
                    // Calcular as datas para o dia da semana selecionado
                    for (let d = 0; d < 7; d++) {
                        const currentDate = new Date();
                        currentDate.setDate(currentDate.getDate() + d);
                        if (currentDate.toLocaleString('pt-BR', { weekday: 'long' }).toLowerCase() === day) {
                            dataDisponibilidade.push({
                                psicologo_id,
                                data: currentDate.toISOString().split('T')[0],
                                horario: startTime // e término se necessário
                            });
                        }
                    }
                }
            }
        });
    
        if (!hasWorkingDays) {
            alert('Por favor, selecione pelo menos um dia de trabalho.');
            return; // Interrompe a função se não houver dias de trabalho selecionados
        }
    
        if (dataDisponibilidade.length === 0) {
            alert('Por favor, preencha os horários de trabalho antes de atualizar.');
            return; // Interrompe a função se não houver horários
        }
    
        fetch('http://localhost:3001/api/disponibilidade', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataDisponibilidade),
        })
        .then(response => {
            return response.text(); // Altere para text() para visualizar a resposta
        })
        .then(data => {
            console.log('Resposta do servidor:', data);
            // Tente fazer o parsing apenas se a resposta for JSON
            try {
                const jsonData = JSON.parse(data);
                if (jsonData.success) {
                    alert('Dias e horários de trabalho atualizados com sucesso!');
                } else {
                    alert('Erro ao atualizar dias e horários de trabalho.');
                }
            } catch (error) {
                console.error('Erro ao parsear JSON:', error);
                alert('Erro ao processar a resposta do servidor.');
            }
        })
        .catch(err => {
            console.error('Erro ao enviar dados:', err);
            alert('Erro ao enviar dados.');
        });        
    };    

    // Verifica se a data selecionada é anterior a atual
    const isPastDate = selectedDate && selectedDate < new Date().setHours(0, 0, 0, 0);

    // Determina se o dia da semana da data selecionada é um dia de trabalho
    const isWorkingDay = selectedDate && workingDays[selectedDate.toLocaleDateString('pt-BR', { weekday: 'long' }).toLowerCase()];

    // Importações e código anterior permanecem os mesmos...

return (
    <Container>
        <Col className='my-4' md={12}>
            <h1 className='mb-4 text-center textroxo'>Selecione seus dias e horários de trabalho</h1>
            <Form>
                <Row>
                    {Object.keys(workingDays).map(day => (
                        <Col key={day} md={3} className="mb-2"> {/* Ajuste a largura conforme necessário */}
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
                        </Col>
                    ))}
                </Row>
                <Button className='mt-3 btnAtualizar' onClick={handleUpdate}>
                    <span className="material-symbols-outlined iconsDisp">restart_alt</span>
                    Atualizar
                </Button>
            </Form>
        </Col>
        {/* Resto do seu código permanece o mesmo... */}
    </Container>
);

    
};

export default Disponibilidade;