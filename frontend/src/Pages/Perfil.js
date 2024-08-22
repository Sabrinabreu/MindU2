import React, { useEffect, useState } from 'react';
import "../css/Perfil.css";
import perfilPsicologo from '../img/perfilPsicologo.jfif';
import { Container, Row, Col } from 'react-bootstrap';

function Perfil() {
    const [consultationDetails, setConsultationDetails] = useState(null);

    useEffect(() => {
        const details = localStorage.getItem('consultationDetails');
        if (details) {
            setConsultationDetails(JSON.parse(details));
        }
    }, []);

    return (
        <Container>
            <h2>Meu Perfil</h2>
            <Row>
                <Col md={5}>
                    <div className="perfil-container">
                        <img className="meuPerfil" src={perfilPsicologo} alt="Perfil Psicólogo" />
                        <div className="perfil-overlay">
                            <p>BLABLANLA!</p>
                        </div>
                    </div>
                </Col>
                <Col className='p-4 mt-5' md={7}>
                    <p>Username:</p>
                    <p>E-mail:</p>
                    <p>Senha:</p>
                </Col>
            </Row>

            <div className="calendar-container">
                <div className="calendar">
                    <h5>Detalhes da Consulta</h5>
                    {consultationDetails ? (
                        <div>
                            <p><strong>Data:</strong> {consultationDetails.date}</p>
                            <p><strong>Horários disponíveis:</strong></p>
                            <ul>
                                {consultationDetails.times.map((time, index) => (
                                    <li key={index}>{time}</li>
                                ))}
                            </ul>
                        </div>
                    ) : (
                        <p>Nenhuma consulta agendada.</p>
                    )}
                </div>
            </div>
        </Container>
    );
}

export default Perfil;
