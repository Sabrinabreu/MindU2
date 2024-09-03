//Cadastro
import React, { useState, useEffect } from "react";
import '../css/Planos.css';
import { Container, Row, Col } from "react-bootstrap";
import Rodape from "../Components/Rodape";
import "../css/Rodape.css";

const Cadastro = () => {
    const sectionsConfig = [
        { id: 'section1', delay: '0.2s' },
        { id: 'section2', delay: '0.4s' },
        { id: 'section3', delay: '0.6s' },
      ];
    
      useEffect(() => {
        const handleScroll = () => {
          sectionsConfig.forEach(({ id, delay }) => {
            const section = document.getElementById(id);
            if (section) {
              const rect = section.getBoundingClientRect();
              if (rect.top < window.innerHeight && rect.bottom > 0) {
                section.classList.add('visible');
                section.style.transitionDelay = delay;
              } else {
                section.classList.remove('visible');
                section.style.transitionDelay = '0s';
              }
            }
          });
        };
    
        window.addEventListener('scroll', handleScroll);
        handleScroll();
    
        return () => window.removeEventListener('scroll', handleScroll);
      }, []);

    return (
        <>
            <Container className="caixaPlanos">
                <Row>
                    <Col className="text-center mb-4">
                        <h2>Nossos Planos</h2>
                    </Col>
                </Row>
                <Row className="assinatura">
                    <Col>
                    <div className="scroll-section" id="section1">
                        <div class="plan">
                            <div class="inner">
                                <p class="title">Bem-Estar</p>
                                <p class="info">Ideal para quem busca suporte psicológico básico e orientação.</p>
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
                                    <a class="botaoPlan" href="#">
                                        Escolher plano
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div></Col>

                    <Col>
                    <div className="scroll-section" id="section2">
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
                    </div></Col>

                    <Col>
                    <div className="scroll-section" id="section3">
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
                    </div></Col>
                </Row>
            </Container >
        </>
    );
};

export default Cadastro;
