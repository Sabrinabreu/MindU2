//Cadastro
import React from "react";
import '../css/Planos.css';
import { Container, Row, Col } from "react-bootstrap";
import { Link } from 'react-router-dom';


const Cadastro = () => {
    return (
        <>
            <Container className="caixaPlanos">
                <Row>
                    <Col className="title text-center">
                        <h2>Nossos Planos</h2>
                    </Col>
                </Row>
                <Row className="assinatura">
                    <Col>
                        <div class="plan">
                            <div class="inner">
                                <p class="title">Bem-Estar</p>
                                <p class="info">Ideal para quem busca suporte psicológico básico e orientação.</p><br></br>
                                <div class="price">R$5.199<span>/ mês</span></div>

                                <ul class="featureList">
                                    <li>Consultas semanais com psicólogo (1 sessão por semana) </li>
                                    <li>Acesso a workshops mensais sobre saúde mental </li>
                                    <li>Suporte online entre consultas </li>
                                    <li>Acesso a material educativo sobre bem-estar psicológico </li>
                                    <li class="disabled">Suporte online 24/7</li>
                                    <li class="disabled">Sessões de coaching psicológico personalizadas (1 vez por mês)</li>
                                </ul><br></br><br></br>
                                <div class="action">
                                    <Link to="/dashboard" class="botaoPlan">
                                        Escolher plano
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </Col>

                    <Col>
                        <div class="plan">
                            <div class="inner">
                                <div className="pop">
                                    <div>
                                        <p class="title">Equilíbrio </p>
                                    </div>
                                    <div className="poptext">
                                        <p>Popular</p>
                                    </div>
                                </div>
                                <p class="info">Para quem deseja um suporte psicológico mais abrangente e contínuo.</p>
                                <div class="price">R$10.349<span>/ mês</span></div>

                                <ul class="featureList">
                                    <li>Consultas semanais com psicólogo (1 sessão por semana) </li>
                                    <li>Sessões de terapia em grupo (2 vezes por mês) </li>
                                    <li>Acesso a workshops semanais sobre saúde mental </li>
                                    <li>Suporte online 24/7 </li>
                                    <li>Acesso a material educativo e ferramentas de autoajuda </li>
                                    <li class="disabled">Sessões de coaching psicológico personalizadas (1 vez por mês)</li>
                                </ul><br></br>
                                <div class="action">
                                    <a class="botaoPlan" href="#">
                                        Escolher plano
                                    </a>
                                </div>
                            </div>
                        </div>
                    </Col>

                    <Col>
                        <div class="plan">
                            <div class="inner">
                                <p class="title">Transformação </p>
                                <p class="info">Para quem busca um acompanhamento intensivo e personalizado.</p>
                                <div class="price">R$16.499<span>/ mês</span></div>
                                <ul class="featureList">
                                    <li>Consultas semanais (2 sessões)  </li>
                                    <li>Sessões de terapia em grupo (4x por mês)  </li>
                                    <li>Acesso ilimitado a workshops e webinars sobre saúde mental </li>
                                    <li>Suporte online 24/7 e acompanhamento personalizado </li>
                                    <li>Acesso completo a materiais educativos e ferramentas de autoajuda </li>
                                    <li>Sessões de coaching psicológico personalizadas (1 vez por mês) </li>
                                </ul>
                                <div class="action">
                                    <a class="botaoPlan" href="#">
                                        Escolher plano
                                    </a>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container >
        </>
    );
};

export default Cadastro;
