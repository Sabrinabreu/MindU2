import { useState } from 'react';
import { useParams } from 'react-router-dom';
import "../css/AgendarConsulta.css";
import "../css/SobrePsicologo.css";
import perfilPsicologo from '../img/perfilPsicologo.jfif';
import fundoPsico from '../img/fundoPsico.webp';
import { Container, Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DatePicker from "../Components/Calendario";

const nomePsico = 'Flávio Monteiro Lobato';

const Agendar = () => {
    const { psicologo_id } = useParams();
    console.log('Psicologo ID:', psicologo_id);
    const [show, setShow] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [horarios, setHorarios] = useState([]);

    const handleDateSelect = (date) => {
        setSelectedDate(new Date(date));
    };

    const handleShow = () => {
        if (selectedDate) {
            const url = `http://localhost:3001/disponibilidade/psicologo/${psicologo_id}?data=${selectedDate.toISOString().split('T')[0]}`;
            console.log('URL da requisição:', url);
            fetch(url)
                .then(response => {
                    console.log('Resposta:', response);
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Dados:', data);
                    setHorarios(data);
                    setShow(true);
                })
                .catch(error => {
                    console.error('Erro ao obter horários:', error);
                    alert('Erro ao obter horários. Por favor, tente novamente.');
                });
        }
    };

    const handleClose = () => {
        setShow(false);
    };

    return (
        <Container className='mb-4'>
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
                        <button className='agendaConsulta' onClick={handleShow}>
                            Agendar consulta
                        </button>

                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title className='agendando'>Horários Disponíveis</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {horarios.length > 0 ? (
                                    <ul>
                                        {horarios.map((horario, index) => (
                                            <li key={index}>{horario.title} às {new Date(horario.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p>Nenhum horário disponível para esta data.</p>
                                )}
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>Fechar</Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Agendar;


/*import { useState, useEffect } from 'react'; 
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

const nomePsico = 'Flávio Monteiro Lobato'; 

const Agendar = () => { 
    const { psicologoId } = useParams(); 
    const [show, setShow] = useState(false); 
    const [selectedDate, setSelectedDate] = useState(null); 
    const [selectedTime, setSelectedTime] = useState(null); 
    const [selectedTipo, setSelectedTipo] = useState(null); 
    const [assunto, setAssunto] = useState(''); 
    const [availableTimes, setAvailableTimes] = useState([]); 
    
    // Chama a função para buscar disponibilidades ao carregar o componente
    useEffect(() => { 
        if (psicologoId) { 
            fetchDisponibilidades(psicologoId); 
        }  
    }, [psicologoId]); 

    // Função para buscar as disponibilidades do psicólogo pelo ID
    const fetchDisponibilidades = async (psicologoId) => { 
        try { 
            const response = await fetch(`http://localhost:3001/disponibilidade/psicologo/${psicologoId}`);
            if (!response.ok) { 
                throw new Error(`Erro ${response.status}: ${response.statusText}`); 
            } 
            const data = await response.json();
            console.log('Dados recebidos da API:', data); // Log dos dados recebidos
            setAvailableTimes(data); // Armazena os horários disponíveis no estado
        } catch (error) { 
            console.error('Erro ao buscar as disponibilidades:', error); 
        } 
    };         

    const handleShow = () => setShow(true); 

    const handleDateSelect = (date) => { 
        console.log("Data selecionada:", date); 
        setSelectedDate(new Date(date)); // Garante que seja um objeto Date
        setShow(true); // Mostra o modal ao selecionar a data 
    }; 
    
    const handleTimeClick = (time) => setSelectedTime(time); 
    const handleTipoClick = (tipo) => setSelectedTipo(tipo); 
    const handleAssuntoChange = (e) => setAssunto(e.target.value); 

    const handleSave = () => { 
        if (!selectedDate || !selectedTime || !selectedTipo || !assunto) { 
            alert('Por favor, preencha todos os campos antes de salvar.'); 
            return; 
        } 

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

    // Função para renderizar os horários disponíveis com base na data selecionada
    const renderAvailableTimes = () => { 
        if (!selectedDate) return null; 

        console.log('Selected date:', selectedDate);

        const timesForSelectedDate = availableTimes.filter(evento => {
            const eventDate = new Date(evento.start);
            const selectedFormattedDate = new Date(selectedDate);
            console.log('Event date:', eventDate.toISOString().split('T')[0], 'Selected date:', selectedFormattedDate.toISOString().split('T')[0]);

            return eventDate.toISOString().split('T')[0] === selectedFormattedDate.toISOString().split('T')[0];
        });

        console.log('Horários disponíveis para a data selecionada:', timesForSelectedDate);

        return timesForSelectedDate.length > 0 ? ( 
            timesForSelectedDate.map(evento => ( 
                <button key={evento.start} 
                    className={`time-slot ${selectedTime === evento.start ? 'active' : ''}`} 
                    onClick={() => handleTimeClick(evento.start)}> 
                    {new Date(evento.start).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                </button> 
            )) 
        ) : ( 
            <p>Não há horários disponíveis para esta data.</p> 
        ); 
    }; 

    return ( 
        <Container className='-4'> 
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
                                        <h6>Data selecionada: {selectedDate instanceof Date ? selectedDate.toLocaleDateString('pt-BR') : 'Data inválida'}</h6> 
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
                </Col> 
            </Row> 
        </Container> 
    ); 
}; 

export default Agendar; */