import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "../css/AgendarConsulta.css";
import "../css/SobrePsicologo.css";
import perfilPsicologa from '../img/perfilPsicologa.jfif';
import fundoPsico from '../img/fundoPsico.webp';
import { Container, Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

const availableTimes = {
    '2024-08-22': ['13:00', '14:00', '15:00'],
s};

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
        onDateSelect(newDate);
    };

    const generateDays = () => {
        const startDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
        const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
        const dates = [];
        const availableDates = Object.keys(availableTimes);

        for (let i = 0; i < startDay; i++) {
            dates.push(<button key={`empty-${i}`} className="date faded" disabled></button>);
        }

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

        const totalDays = startDay + daysInMonth;
        for (let i = totalDays; i < 42; i++) {
            dates.push(<button key={`empty-end-${i}`} className="date faded" disabled></button>);
        }

        return dates;
    };

    return (
        <div className="datepicker">
            <div className="datepicker-top">
                <div className="month-selector">
                    <button className="arrow" onClick={handlePrevMonth}>
                        <i className="material-icons">
                            <span className="material-symbols-outlined p-3">chevron_left</span>
                        </i>
                    </button>
                    <span className="month-name">{currentMonth.toLocaleString('default', { month: 'long' })} {currentMonth.getFullYear()}</span>
                    <button className="arrow" onClick={handleNextMonth}>
                        <i className="material-icons">
                            <span className="material-symbols-outlined p-3">chevron_right</span>
                        </i>
                    </button>
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

const SaibaMais = () => {
    const { id } = useParams();
    const [show, setShow] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [selectedTipo, setSelectedTipo] = useState(null);
    const [assunto, setAssunto] = useState('');
    const [psicologo, setPsicologo] = useState(null);

    useEffect(() => {
     
        fetch(`http://localhost:3001/api/psicologo/${id}`)
            .then(response => response.json())
            .then(data => setPsicologo(data))
            .catch(error => console.error('Erro ao buscar psicólogo:', error));
    }, [id]);

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
            nomePsico: psicologo?.nome 
        };

        fetch('http://localhost:3001/api/agendamento', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert('Erro ao salvar o agendamento: ' + data.error);
            } else {
                alert('Agendamento criado com sucesso!');
            }
        })
        .catch(error => {
            console.error('Erro ao processar a resposta do backend:', error);
            alert('Erro ao salvar o agendamento!');
        });
    };

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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

    if (!psicologo) {
        return <p>Carregando...</p>;
    }

    return (
        <Container>
            <Row>
                <Col md={6}>
                    <div className='perfilPsico'>
                        <img className="fundoPsico" src={fundoPsico} alt="Imagem de uma paisagem com um lago e muitas árvores" />
                        <img className="psicologo" src={perfilPsicologa} alt="Foto do psicólogo" />
                        <button className='valores'>
                            Duração da sessão <br />
                            <b>1 hora</b>
                        </button>
                        <h4 className='nomePsico container p-4'>{psicologo.nome}</h4>
                        <b className='infoPsico'>{psicologo.profissao}</b>
                        <h6 className='infoPsico'>{psicologo.local}</h6>
                        <h6 className='crp'>{psicologo.crp}</h6>
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
                                                <Form.Label>Assuntos que deseja tratar durante a sessão:</Form.Label>
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

                    <div className='biografia p-4'>
                        <h5 className='titulosSobre p-3'>Biografia</h5>
                        <p className='mb-4'>
                            Psicólogo, formado em 1990 pela Universidade Estadual do Paraná. Especialista em Terapia Cognitivo-Comportamental e Psicoterapia de Casal.
                            Atua na área clínica há mais de 30 anos, com experiência em atendimentos individuais e grupais.
                        </p>
                    </div>

                    <div className='contato p-4'>
                        <h5 className='titulosSobre p-3'>Contato</h5>
                        <p>
                            Telefone: (43) 1234-5678 <br />
                            Email: contato@psicologo.com.br
                        </p>
                    </div>

                    <div className='localizacao p-4'>
                        <h5 className='titulosSobre p-3'>Localização</h5>
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

export default SaibaMais;
