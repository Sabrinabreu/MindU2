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

const nomePsico = 'Flávio Monteiro Lobato'; 

const Agendar = () => { 
    const { psicologoId } = useParams(); 
    const [show, setShow] = useState(false); 
    const [selectedDate, setSelectedDate] = useState(null); 
    const [selectedTime, setSelectedTime] = useState(null); 
    const [selectedTipo, setSelectedTipo] = useState(null); 
    const [assunto, setAssunto] = useState(''); 
    const [availableTimes, setAvailableTimes] = useState([]); 

    useEffect(() => { 
        if (psicologoId) { 
            fetchDisponibilidades(psicologoId); 
        }  
    }, [psicologoId]); 

    const fetchDisponibilidades = async (psicologoId) => { 
        try { 
            const response = await fetch(`http://localhost:3000/psicologo/${psicologoId}`); 
            if (!response.ok) { 
                throw new Error(`Erro ${response.status}: ${response.statusText}`); 
            } 
            const data = await response.json(); 
            console.log('Dados recebidos da API:', data); 

            const formattedData = data.map(event => ({
                start: new Date(`${event.data}T${event.horario}Z`).toISOString()
            }));

            console.log('Dados formatados:', formattedData);
            setAvailableTimes(formattedData); 
        } catch (error) { 
            console.error('Erro ao buscar as disponibilidades:', error); 
        } 
    };    

    const handleShow = () => {
        if (selectedDate && availableTimes.length > 0) {
            setShow(true); 
        }
    };

    const handleDateSelect = (date) => { 
        console.log("Data selecionada:", date); 
        setSelectedDate(date); 
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
        handleClose(); 
    }; 

    const handleClose = () => { 
        setShow(false); 
        setSelectedDate(null); 
        setSelectedTime(null); 
        setSelectedTipo(null); 
        setAssunto(''); 
    }; 

    const renderAvailableTimes = () => { 
        if (!selectedDate) return null; 

        const selectedDateString = selectedDate.toISOString().split('T')[0]; 
        console.log('Data formatada selecionada:', selectedDateString);
        console.log('Horários disponíveis antes da filtragem:', availableTimes);

        const timesForSelectedDate = availableTimes.filter(event => {
            const eventDateString = new Date(event.start).toISOString().split('T')[0];
            return eventDateString === selectedDateString;
        });

        console.log('Horários disponíveis para a data selecionada:', timesForSelectedDate);

        return timesForSelectedDate.length > 0 ? ( 
            timesForSelectedDate.map(event => ( 
                <button key={event.start} 
                    className={`time-slot ${selectedTime === event.start ? 'active' : ''}`} 
                    onClick={() => handleTimeClick(event.start)}> 
                    {new Date(event.start).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })} 
                </button> 
            )) 
        ) : ( 
            <p>Não há horários disponíveis para esta data.</p> 
        ); 
    }; 

    return ( 
        <Container  className='p-4'> 
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
                        <button className='agendaConsulta' onClick={handleShow} disabled={!selectedDate || !availableTimes.length}> 
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
                        <p>Telefone: (43) 1234-5678 <br /> Email: flavio.psicologo@example.com</p> 
                    </div> 
                </Col> 
            </Row> 
        </Container> 
    ); 
}; 

export default Agendar; 