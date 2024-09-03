import { useState } from 'react';
import "../css/AgendarConsulta.css";
import "../css/SobrePsicologo.css";
import perfilPsicologo from '../img/perfilPsicologo.jfif';
import fundoPsico from '../img/fundoPsico.webp';
import { Container, Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

const nomePsico = 'Flávio Monteiro Lobato';

// Horários disponíveis
const availableTimes = {
    '2024-08-22': ['13:00', '14:00', '15:00'],
    '2024-08-29': ['16:00', '17:00'],
    '2024-08-30': ['16:00', '17:00'],
    '2024-09-01': ['10:00', '16:00', '17:00'],
    '2024-09-02': ['07:00', '12:00', '19:00'],
    '2024-09-10': ['10:00', '20:00'],
    '2024-09-12': ['09:00', '14:00', '15:00'],
    '2024-09-15': ['11:00', '13:00'],
    '2024-09-17': ['08:00', '15:00', '18:00'],
    '2024-09-20': ['10:00', '11:00', '16:00'],
    '2024-09-25': ['14:00', '15:00', '17:00'],
    '2024-09-28': ['09:00', '13:00', '18:00'],
    '2024-10-01': ['08:00', '12:00'],
    '2024-10-05': ['11:00', '14:00'],
    '2024-10-07': ['09:00', '16:00'],
    '2024-10-10': ['07:00', '10:00', '13:00'],
    '2024-10-15': ['08:00', '14:00', '19:00'],
    '2024-10-20': ['09:00', '15:00'],
    '2024-10-25': ['10:00', '11:00', '17:00'],
};

// DatePicker
const DatePicker = ({ onDateSelect }) => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);

    const handlePrevMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
    };

    const handleNextMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
    };

    const handleDateClick = (day) => {
        const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
        setSelectedDate(newDate);
        onDateSelect(newDate); // Notifica o componente pai sobre a data selecionada
    };

    const generateDays = () => {
        const startDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
        const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();

        const dates = [];
        const availableDates = Object.keys(availableTimes);

        // Dias
        for (let i = 0; i < (startDay - 1 + 7) % 7; i++) {
            dates.push(<button key={`empty-${i}`} className="date faded" disabled></button>);
        }

        // Dias e mês
        for (let i = 1; i <= daysInMonth; i++) {
            const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i);
            const formattedDate = date.toISOString().split('T')[0];
            const isAvailable = availableDates.includes(formattedDate);
            const isToday = i === new Date().getDate() && currentMonth.getMonth() === new Date().getMonth() && currentMonth.getFullYear() === new Date().getFullYear();
            const isSelected = selectedDate && i === selectedDate.getDate() && currentMonth.getMonth() === selectedDate.getMonth() && currentMonth.getFullYear() === selectedDate.getFullYear();

            dates.push(
                <button
                    key={`date-${i}`}
                    className={`date ${isAvailable ? (isToday ? 'current-day' : (isSelected ? 'selected-day' : '')) : 'inactive'}`}
                    onClick={isAvailable ? () => handleDateClick(i) : undefined}
                >
                    {i}
                </button>
            );
        }

        const totalDays = (startDay - 1 + 7) % 7 + daysInMonth;
        for (let i = totalDays; i < 42; i++) {
            dates.push(<button key={`empty-end-${i}`} className="date faded" disabled></button>);
        }

        return dates;
    };

    return (
        <div className="datepicker">
            <div className="datepicker-top">
                <div className="month-selector">
                    <button className="arrow" onClick={handlePrevMonth}><i className="material-icons"><span className="material-symbols-outlined p-3">
                        chevron_left
                    </span></i></button>
                    <span className="month-name">{currentMonth.toLocaleString('default', { month: 'long' })} {currentMonth.getFullYear()}</span>
                    <button className="arrow" onClick={handleNextMonth}><i className="material-icons"><span className="material-symbols-outlined p-3">
                        chevron_right
                    </span></i></button>
                </div>
            </div>
            <div className="datepicker-calendar">
                {['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'].map((day, i) => (
                    <span key={`day-${i}`} className="day">{day}</span>
                ))}
                {generateDays()}
            </div>
        </div>
    );
};

const Agendar = () => {
    const [show, setShow] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [selectedTipo, setSelectedTipo] = useState(null);
    const [assunto, setAssunto] = useState('');


    const handleDateSelect = (date) => {
        setSelectedDate(date);
    };

    const handleTimeClick = (time) => {
        setSelectedTime(time);
    };

    const handleTipoClick = (tipo) => {
        setSelectedTipo(tipo);
    };

    const handleAssuntoChange = (e) => {
        setAssunto(e.target.value);
    };

    const handleSave = () => {
        if (!selectedDate || !selectedTime || !selectedTipo || !assunto) {
            alert('Por favor, preencha todos os campos antes de salvar.');
            return;
        }

        const data = {
            userId: 'someUserId',
            data: selectedDate.toISOString().split('T')[0],
            tipo: selectedTipo,
            time: selectedTime,
            assunto: assunto,
        };

        console.log('Dados enviados:', data); 

        fetch('http://localhost:3001/api/agendamento', { 
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else if (response.status === 404) {
                throw new Error('Erro ao salvar: 404 - Endpoint não encontrado');
            } else {
                throw new Error(`Erro ao salvar: ${response.status}`);
            }
        })
        .then(data => {
            console.log('Dados recebidos:', data);
            if (data.error) {
                console.error('Erro ao salvar:', data.error);
                alert('Erro ao salvar o agendamento.');
            } else {
                console.log('Sucesso:', data);
                alert('Agendamento criado com sucesso.');

                localStorage.setItem('consultationDetails', JSON.stringify({
                    date: selectedDate.toLocaleDateString('pt-BR'),
                    time: selectedTime,
                    tipo: selectedTipo,
                    assunto: assunto,
                }));

                handleClose();
            }
        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Erro ao salvar o agendamento.');
        });
    };

    const handleClose = () => {
        setShow(false);
    };

    const handleShow = () => {
        setShow(true);
    };

    const renderAvailableTimes = () => {
        if (!selectedDate) return null;

        const formattedDate = selectedDate.toISOString().split('T')[0];
        const times = availableTimes[formattedDate] || [];

        return times.length > 0 ? (
            times.map(time => (
                <button key={time} className="time-slot" onClick={() => handleTimeClick(time)}>
                    {time}
                </button>
            ))
        ) : (
            <p>Não há horários disponíveis para esta data.</p>
        );
    };

    return (
        <Container>
            <Row>
                <Col md={6}>
                    <div className='perfilPsico'>
                        <img className="fundoPsico" src={fundoPsico} alt="Fundo Psicólogo" />
                        <img className="psicologo" src={perfilPsicologo} alt="Perfil Psicólogo" />
                        <button className='valores'>
                            Duração da sessão <br />
                            <b>1 hora</b>
                        </button>
                        <h4 className='nomePsico container p-4'>{nomePsico}</h4>
                        <b className='infoPsico'>Psicólogo Cognitivo</b>
                        <h6 className='infoPsico'>Cornélio Procópio - PR</h6>
                        <h6 className='crp'>214579 / CRP - 4ª Região</h6>
                    </div>
                </Col>
                <Col md={6}>
                    <div className='agenda'>
                        <h5 className='titulosSobre p-3 mb-2'>Agende sua consulta...</h5>
                        <div className='displayCalendario'>
                            <DatePicker onDateSelect={handleDateSelect} />
                        </div>
                        <button
                            className='agendaConsulta'
                            onClick={handleShow}
                            disabled={!selectedDate}
                        >
                            Agendar consulta
                        </button>

                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title className='agendando'>Agendar Consulta</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {selectedDate ? (
                                    <>
                                        <h6>Data selecionada: {selectedDate.toLocaleDateString('pt-BR')}</h6>
                                        <p className='tipoConsulta mb-1'>Tipo de consulta:</p>
                                        <button className='botTipo' onClick={() => handleTipoClick('Online')}>Online</button>
                                        <button className='botTipo' onClick={() => handleTipoClick('Presencial')}>Presencial</button>
                                        <Form>
                                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                                <Form.Label className=''>Assuntos que deseja tratar durante a sessão:</Form.Label>
                                                <Form.Control as="textarea" rows={3} value={assunto} onChange={handleAssuntoChange} />
                                            </Form.Group>
                                        </Form>
                                        <h6>Horários disponíveis:</h6>
                                        <div className='time-slots'>
                                            {renderAvailableTimes()}
                                        </div>
                                    </>
                                ) : (
                                    <p>Por favor, selecione uma data para agendar a consulta.</p>
                                )}
                            </Modal.Body>

                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Fechar
                                </Button>
                                <Button className='salvar' onClick={handleSave}>
                                    Salvar
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                </Col>
                <Col md={6}>
                    <div className='biografia p-4'>
                        <h5 className='titulosSobre p-3 '>Biografia</h5>
                        <p className='mb-4'>
                            Psicólogo, formado em 1990 pela Universidade Estadual do Paraná. Especialista em Terapia Cognitivo-Comportamental e Psicoterapia de Casal.
                            Atua na área clínica há mais de 30 anos, com experiência em atendimentos individuais e grupais.
                        </p>
                    </div>
                </Col>
                <Col md={12}>
                    <div className='contato p-4'>
                        <h5 className='titulosSobre p-3'>Contato</h5>
                        <p>
                            Telefone: (43) 1234-5678 <br />
                            Email: contato@psicologo.com.br
                        </p>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default Agendar;
