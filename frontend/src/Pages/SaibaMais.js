import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Importa useParams para acessar parâmetros da URL
import DispCalendario from "../Components/DispCalendario";

const SaibaMais = () => {
  const { psicologo_id } = useParams(); // Obtém o ID do psicólogo da URL
  const [psicologoId, setPsicologoId] = useState(null);

  useEffect(() => {
    if (psicologo_id) {
      setPsicologoId(psicologo_id);
    }
  }, [psicologo_id]);

  if (!psicologoId) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <h1>Calendário de Disponibilidade do Psicólogo</h1>
      <DispCalendario psicologoId={psicologoId} />
    </div>
  );
};

export default SaibaMais;



/*import { useState } from 'react';
import "../css/AgendarConsulta.css";
import "../css/SobrePsicologo.css";
import perfilPsicologo from '../img/perfilPsicologo.jfif';
import fundoPsico from '../img/fundoPsico.webp';
import { Container, Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import DatePicker from '../Components/Calendario';

// Nome do psicólogo
const nomePsico = 'Flávio Monteiro Lobato';

// Horários disponíveis
const availableTimes = {
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

// Componente principal de agendamento
const Agendar = () => {
    const [show, setShow] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [selectedTipo, setSelectedTipo] = useState(null);
    const [assunto, setAssunto] = useState('');
    const [userId] = useState('someUserId');

    const handleDateSelect = (data) => {
        setSelectedDate(data);
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

        // Primeiro, obtenha o ID do psicólogo
        fetch(`http://localhost:3001/api/psicologos/by-name?nome=${encodeURIComponent(nomePsico)}`)
            .then(response => response.json())
            .then(data => {
                if (data.id) {
                    const psicologoId = data.id;
                    const dataToSend = {
                        userId: userId,
                        psicologo_id: psicologoId,
                        data: selectedDate.toISOString().split('T')[0],
                        horario: selectedTime,
                        tipo: selectedTipo,
                        assunto: assunto
                    };

                    // Crie o agendamento com o ID do psicólogo obtido
                    fetch('http://localhost:3001/api/agendamento', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(dataToSend),
                    })
                        .then(response => response.json())
                        .then(data => {
                            if (data.message) {
                                alert('Agendamento realizado com sucesso!');
                            } else {
                                alert('Erro ao agendar consulta: ' + data.error);
                            }
                        })
                        .catch(err => {
                            console.error('Erro ao criar o agendamento:', err);
                            alert('Erro ao criar o agendamento.');
                        });
                } else {
                    alert('Erro ao buscar o ID do psicólogo.');
                }
            })
            .catch(err => {
                console.error('Erro ao buscar o ID do psicólogo:', err);
                alert('Erro ao buscar o ID do psicólogo.');
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
                <button key={time} className={`time-slot ${selectedTime === time ? 'active' : ''}`} onClick={() => handleTimeClick(time)}>
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
                        <img className="fundoPsico" src={fundoPsico} alt="Imagem de uma paisagem com um lago e muitas árvores" />
                        <img className="psicologo" src={perfilPsicologo} alt="Foto de um homem de cabelos pretos e raspados com uma barba curta e roupas sociais" />
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
                            disabled={!selectedDate} >
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
                                        <button className={`botTipo ${selectedTipo === 'Online' ? 'active' : ''}`} onClick={() => handleTipoClick('Online')}>Online</button>
                                        <button className={`botTipo ${selectedTipo === 'Presencial' ? 'active' : ''}`} onClick={() => handleTipoClick('Presencial')}>Presencial</button>
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
                        <p>Cornélio Procópio - PR</p>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default Agendar;*/