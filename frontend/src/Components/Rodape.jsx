import React from 'react';
import { Container, Row, Col } from "react-bootstrap";
import '../css/Rodape.css';
import Certificado from "../img/certificado.png";
import Face from "../img/faceicon.svg";
import Insta from "../img/instaicon.svg";
import X from "../img/tticon.svg";
import Link from "../img/linkedinicon.svg";
import Yt from "../img/youtubeicon.svg";
import Logo from "../img/logo.png";

const Footer = () => {
    return (
        <footer className="footer">
            <Container className="footer-content">
                <Row>
                    <Col xl={3} sm={12} className='imgs'>
                        <div><img src={Logo} alt="Logo da empresa." width={210} className='logo'/></div>
                        <hr></hr>
                        <div className='redes'>
                            <div className='redesum'>
                                <img src={Face} width={30} alt="icone da rede social Facebook" className='redesociais'/>
                                <img src={Insta} width={30} alt="icone da rede social Instagram" className='redesociais'/>
                                <img src={X} width={30} alt="icone da rede social X (Twitter)" className='redesociais'/>          
                                <img src={Link} width={30} alt="icone da rede social Likedin" className='redesociais'/>
                                <img src={Yt} width={40} alt="icone da rede social Youtube" className='redesociais'/>
                            </div>

                        </div>
                    </Col>
                    <Col xl={3}>
                        <div className="info text-center">
                            <p><a href="/sobre">Sobre Nós</a></p>
                            <p><a href="/contato">Termos de Uso</a></p>
                            <p><a href="/privacidade">Política de Privacidade</a></p>
                            <p><a href="/privacidade">FAQ</a></p>
                        </div>
                    </Col>
                    <Col xl={3}>
                        <div className='info text-center'>
                            <p><a href="/privacidade">Ouvidoria</a></p>
                            <p><a href="/privacidade">Trabalhe Conosco</a></p>
                            <p><a href="/privacidade">Fale Conosco</a></p>
                            <p><a href="/privacidade">Conselho Federal de Psicologia</a></p>
                        </div>
                    </Col>
                    <Col className='cert text-center'>
                        <img src={Certificado} width={110} alt="Imagem de certificado de boa empresa para trabalhar." />
                    </Col>
                </Row>
            </Container>
            <Container className='colortwo'>
                    <Col className='cnes text-center'>
                        CNES 9383783
                    </Col>
                    <Col className='direitos text-center'>
                        <p>&copy; {new Date().getFullYear()} MindU - Todos os direitos reservados.</p>
                    </Col>
            </Container>
        </footer>
    );
}

export default Footer;
