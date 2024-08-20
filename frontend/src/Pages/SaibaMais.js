import React from 'react';
import "../css/AgendarConsulta.css";
import perfilPsicologo from '../img/perfilPsicologo.jfif';
import fundoPsico from '../img/fundoPsico.webp';
import { Container, Row, Col } from 'react-bootstrap';

function Agendar() {
    return (
        <Container>
            <Row>
                <Col>
                    <div className='perfilPsico'>
                        <img className="fundoPsico" src={fundoPsico} alt="Fundo Psicólogo" />
                        <img className="psicologo" src={perfilPsicologo} alt="Perfil Psicólogo" />
                        
                        <button className='valores'>Valor</button>

                       
                    </div>
                </Col>
                <Col>
                    <div className='agenda'>wo</div>
                    
                </Col>
            </Row>
        </Container>
    );
}

export default Agendar;
