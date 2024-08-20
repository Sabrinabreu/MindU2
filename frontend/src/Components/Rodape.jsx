import React from 'react';
import { Container, Row, Col } from "react-bootstrap";
import '../css/Rodape.css';
import Certificado from "../img/certificado.png";

const Footer = () => {
    return (
        <footer className="footer">
            <Container className="footer-content">
                <Row>
                    <Col xl={3}>
                    <div>img</div>
                    <div>redes sociais</div>
                    </Col>
                    <Col xl={3}>
                        <ul className="footer-links">
                            <li><a href="/sobre">Sobre Nós</a></li>
                            <li><a href="/contato">Termos de Uso</a></li>
                            <li><a href="/privacidade">Política de Privacidade</a></li>
                            <li><a href="/privacidade">FAQ</a></li>
                        </ul>
                    </Col>
                    <Col xl={3}>
                        <ul>
                            <li><a href="/privacidade">Ouvidoria</a></li>
                            <li><a href="/privacidade">Trabalhe Conosco</a></li>
                            <li><a href="/privacidade">Fale Conosco</a></li>
                            <li><a href="/privacidade">Conselho Federal de Psicologia</a></li>
                        </ul>
                    </Col>
                    <Col>
                    <img src={Certificado} alt="" />
                    </Col>
                </Row>
            </Container>
            <Container className='colortwo'>
                <Row>
                    <Col className='cnes text-center'>
                        CNES 9383783
                    </Col>
                </Row>
                <hr></hr>
                <Row>
                    <Col className='direitos text-center'>
                        <p>&copy; {new Date().getFullYear()} MindU - Todos os direitos reservados.</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}

export default Footer;
