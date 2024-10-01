/*import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DispCalendario from "../Components/DispCalendario";
import { Container } from 'react-bootstrap';

const SobrePsicologo = () => {
    const { psicologo_id } = useParams();
    const [psicologo, setPsicologo] = useState(null); // Estado para armazenar os dados completos do psicólogo
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (psicologo_id) {
            // Função para buscar o psicólogo
            const fetchPsicologo = async () => {
                try {
                    console.log(`Buscando psicólogo com ID: ${psicologo_id}`); // Debug
                    const response = await fetch(`http://localhost:3000/api/psicologos/${psicologo_id}`);
                    console.log(await response.text()); // Isso mostrará o que está sendo retornado


                    // Verifique se a resposta é bem-sucedida
                    if (!response.ok) {
                        throw new Error(`Erro ao buscar dados do psicólogo: ${response.statusText}`);
                    }

                    const data = await response.json();
                    console.log('Dados do psicólogo:', data); // Debug para verificar os dados recebidos

                    if (data) {
                        setPsicologo(data); // Armazena os dados completos do psicólogo
                    } else {
                        console.error('Dados do psicólogo não encontrados');
                    }
                } catch (error) {
                    console.error('Erro ao buscar dados do psicólogo:', error);
                } finally {
                    setLoading(false);
                }
            };

            fetchPsicologo();
        }
    }, [psicologo_id]);

    if (loading) {
        return <div>Carregando...</div>;
    }

    if (!psicologo) {
        return <div>Psicólogo não encontrado.</div>;
    }


    return (
        <div>
            <Container>
                <h1 className='mt-4'>Informações do Psicólogo</h1>
                <p><strong>Nome:</strong> {psicologo.nome}</p>
                <p><strong>Especialidade:</strong> {psicologo.especialidade}</p>
                <p><strong>Localização:</strong> {psicologo.localizacao}</p>
                <p><strong>CRP:</strong> {psicologo.crp}</p>

                <h2 className='mt-4'>Calendário de Disponibilidade</h2>
                <DispCalendario psicologoId={psicologo_id} />
            </Container>
        </div>
    );
};

export default SobrePsicologo;*/

/*
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DispCalendario from "../Components/DispCalendario";
import { Container } from 'react-bootstrap';

const SobrePsicologo = () => {
    const { psicologo_id } = useParams();
    const [psicologo, setPsicologo] = useState(null); // Estado para armazenar os dados completos do psicólogo
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (psicologo_id) {
            // Função para buscar o psicólogo
            const fetchPsicologo = async () => {
                try {
                    console.log(`Buscando psicólogo com ID: ${psicologo_id}`); // Debug
                    const response = await fetch(`http://localhost:3000/api/psicologos/${psicologo_id}`);
                    console.log(await response.text()); // Isso mostrará o que está sendo retornado


                    // Verifique se a resposta é bem-sucedida
                    if (!response.ok) {
                        throw new Error(`Erro ao buscar dados do psicólogo: ${response.statusText}`);
                    }

                    const data = await response.json();
                    console.log('Dados do psicólogo:', data); // Debug para verificar os dados recebidos

                    if (data) {
                        setPsicologo(data); // Armazena os dados completos do psicólogo
                    } else {
                        console.error('Dados do psicólogo não encontrados');
                    }
                } catch (error) {
                    console.error('Erro ao buscar dados do psicólogo:', error);
                } finally {
                    setLoading(false);
                }
            };

            fetchPsicologo();
        }
    }, [psicologo_id]);

    if (loading) {
        return <div>Carregando...</div>;
    }

    if (!psicologo) {
        return <div>Psicólogo não encontrado.</div>;
    }


    return (
        <div>
            <Container>
                <h1 className='mt-4'>Informações do Psicólogo</h1>
                <p><strong>Nome:</strong> {psicologo.nome}</p>
                <p><strong>Especialidade:</strong> {psicologo.especialidade}</p>
                <p><strong>Localização:</strong> {psicologo.localizacao}</p>
                <p><strong>CRP:</strong> {psicologo.crp}</p>

                <h2 className='mt-4'>Calendário de Disponibilidade</h2>
                <DispCalendario psicologoId={psicologo_id} />
            </Container>
        </div>
    );
};

export default SobrePsicologo;*/


/* CERTINHO 
import { useState } from 'react';
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

// Componente principal de agendamento
const Agendar = () => {
    const [show, setShow] = useState(false);
    edDate] = useState(null);const [selectedDate, setSelect
    const [selectedTime, setSelectedTime] = useState(null);
    const [selectedTipo, setSelectedTipo] = useState(null);
    const [assunto, setAssunto] = useState('');
    const [userId] = useState('someUserId');
    const [availableTimes, setAvailableTimes] = useState([]);

    const handleDateSelect = (data) => {
        setSelectedDate(data);
        fetchAvailableTimes(data); // Busque os horários disponíveis ao selecionar uma data
    };

    const fetchAvailableTimes = (date) => {
        const formattedDate = date.toISOString().split('T')[0];
        fetch(`http://localhost:3001/api/horarios?data=${formattedDate}`) // Ajuste a URL conforme necessário
            .then(response => response.json())
            .then(data => setAvailableTimes(data.horarios || []))
            .catch(err => {
                console.error('Erro ao buscar horários disponíveis:', err);
                alert('Erro ao buscar horários disponíveis.');
            });
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
        setAvailableTimes([]); // Limpa os horários disponíveis ao fechar
    };

    const handleShow = () => {
        setShow(true);
    };

    const renderAvailableTimes = () => {
        return availableTimes.length > 0 ? (
            availableTimes.map(time => (
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
                        <h5 className='titulosSobre py-3 pl-2 mb-2'> <span className="material-symbols-outlined iconsSaibaMais">calendar_month</span>Agende sua consulta...</h5>
                        <div className='displayCalendario'>
                            <DatePicker onDateSelect={handleDateSelect} />
                        </div>
                        <button
                            className='agendaConsulta'
                            onClick={handleShow}
                            disabled={!selectedDate}>
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
                        <h5 className='titulosSobre py-3'><span className="material-symbols-outlined iconsSaibaMais">person_book</span>Biografia</h5>
                        <p className='mb-4'>
                            Psicólogo, formado em 1990 pela Universidade Estadual do Paraná. Especialista em Terapia Cognitivo-Comportamental e Psicoterapia de Casal.
                            Atua na área clínica há mais de 30 anos, com experiência em atendimentos individuais e grupais.
                        </p>
                    </div>

                    <div className='contato p-4'>
                        <h5 className='titulosSobre py-3'><span className="material-symbols-outlined iconsSaibaMais">send</span>Contato</h5>
                        <p>
                            Telefone: (43) 1234-5678 <br />
                            Email: contato@psicologo.com.br
                        </p>
                    </div>

                    <div className='localizacao p-4'>
                        <h5 className='titulosSobre py-3'><span className="material-symbols-outlined iconsSaibaMais">location_on</span>Localização</h5>
                        <p>Cornélio Procópio - PR</p>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default Agendar;*/

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "../css/AgendarConsulta.css";
import "../css/SobrePsicologo.css";
import perfilPsicologo from '../img/perfilPsicologo.jfif';
import fundoPsico from '../img/fundoPsico.webp';
import { Container, Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import DatePicker from "../Components/Calendario";

// Nome do psicólogo
const nomePsico = 'Flávio Monteiro Lobato';

// Componente principal de agendamento
const Agendar = () => {
    const { psicologoId } = useParams();
    const [show, setShow] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [selectedTipo, setSelectedTipo] = useState(null);
    const [assunto, setAssunto] = useState('');
    const [availableTimes, setAvailableTimes] = useState([]);

    useEffect(() => {
        fetchDisponibilidades(psicologoId);
    }, [psicologoId]);

    const fetchDisponibilidades = async (psicologoId) => {
        try {
            const response = await fetch(`http://localhost:3000/api/psicologo/${psicologoId}/disponibilidade`);
            if (!response.ok) {
                throw new Error(`Erro ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            setAvailableTimes(data);
        } catch (error) {
            console.error('Erro ao buscar as disponibilidades:', error);
        }
    };

    const handleShow = () => setShow(true);
    
    const handleDateSelect = (date) => {
        setSelectedDate(date);
        fetchAvailableTimes(date); // Busque os horários disponíveis ao selecionar uma data
        setShow(true); // Mostra o modal ao selecionar a data
    };

    const fetchAvailableTimes = (date) => {
        const formattedDate = date.toISOString().split('T')[0];
        fetch(`http://localhost:3001/api/horarios?data=${formattedDate}`)
            .then(response => response.json())
            .then(data => setAvailableTimes(data.horarios || []))
            .catch(err => {
                console.error('Erro ao buscar horários disponíveis:', err);
                alert('Erro ao buscar horários disponíveis.');
            });
    };

    const handleTimeClick = (time) => setSelectedTime(time);
    const handleTipoClick = (tipo) => setSelectedTipo(tipo);
    const handleAssuntoChange = (e) => setAssunto(e.target.value);

    const handleSave = () => {
        if (!selectedDate || !selectedTime || !selectedTipo || !assunto) {
            alert('Por favor, preencha todos os campos antes de salvar.');
            return;
        }

        // Aqui você deve adicionar a lógica para salvar o agendamento
        console.log("Agendamento salvo:", { selectedDate, selectedTime, selectedTipo, assunto });
        handleClose(); // Fecha o modal após salvar
    };

    const handleClose = () => {
        setShow(false);
        setSelectedDate(null);
        setSelectedTime(null);
        setSelectedTipo(null);
        setAssunto('');
    };

    const renderAvailableTimes = () => (
        availableTimes.length > 0 ? (
            availableTimes.map(time => (
                <button key={time} className={`time-slot ${selectedTime === time ? 'active' : ''}`} onClick={() => handleTimeClick(time)}>
                    {time}
                </button>
            ))
        ) : (
            <p>Não há horários disponíveis para esta data.</p>
        )
    );

    return (
        <Container>
            <Row>
                <Col md={6}>
                    <div className='perfilPsico'>
                        <img className="fundoPsico" src={fundoPsico} alt="Imagem de fundo" />
                        <img className="psicologo" src={perfilPsicologo} alt="Perfil do psicólogo" />
                        <button className='valores'>Duração da sessão <br /><b>1 hora</b></button>
                        <h4 className='nomePsico container p-4'>{nomePsico}</h4>
                        <b className='infoPsico'>Psicólogo Cognitivo</b>
                        <h6 className='infoPsico'>Cornélio Procópio - PR</h6>
                        <h6 className='crp'>214579 / CRP - 4ª Região</h6>
                    </div>
                </Col>
                <Col md={6}>
                    <div className='agenda'>
                        <h5 className='titulosSobre py-3 pl-2 mb-2'>
                            <span className="material-symbols-outlined iconsSaibaMais">calendar_month</span> Agende sua consulta...
                        </h5>
                        <div className='displayCalendario'>
                            <DatePicker onDateSelect={handleDateSelect} />
                        </div>
                        <button className='agendaConsulta' onClick={handleShow} disabled={!selectedDate}>
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
                                            <Form.Group className="mb-3">
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
                                <Button variant="secondary" onClick={handleClose}>Fechar</Button>
                                <Button className='salvar' onClick={handleSave}>Salvar</Button>
                            </Modal.Footer>
                        </Modal>
                    </div>

                    <div className='biografia p-4'>
                        <h5 className='titulosSobre py-3'><span className="material-symbols-outlined iconsSaibaMais">person_book</span> Biografia</h5>
                        <p className='mb-4'>
                            Psicólogo, formado em 1990 pela Universidade Estadual do Paraná. Especialista em Terapia Cognitivo-Comportamental e Psicoterapia de Casal.
                            Atua na área clínica há mais de 30 anos, com experiência em atendimentos individuais e grupais.
                        </p>
                    </div>

                    <div className='contato p-4'>
                        <h5 className='titulosSobre py-3'><span className="material-symbols-outlined iconsSaibaMais">send</span> Contato</h5>
                        <p>Telefone: (43) 1234-5678 <br /> Email: contato@psicologo.com.br</p>
                    </div>

                    <div className='localizacao p-4'>
                        <h5 className='titulosSobre py-3'><span className="material-symbols-outlined iconsSaibaMais">location_on</span> Localização</h5>
                        <p>Cornélio Procópio, PR - Brasil</p>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Agendar;