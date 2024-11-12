// CadastroPsico
import React from 'react';
import CadastroFormPsicologos from '../Components/CadastroFormPsicologos'
import '../css/CadastroPsicólogos.css'
import BAPO from "../Components/WidgetBAPO";
import "../css/WidgetBAPO.css";
import { Col, Container, Row } from 'react-bootstrap';
import Psicologos from '../img/mindu psicologos.png'
import PsicologosImg1 from '../img/psico.png'
import { useEffect, useState } from 'react';

const sectionsConfig = [
    { id: 'section1', delay: '0.2s' },
    { id: 'section2', delay: '0.3s' },
    { id: 'section3', delay: '0.4s' },
    { id: 'section4', delay: '0.7s' },
    { id: 'section5', delay: '0.8s' },
    { id: 'section6', delay: '0.9s' },
    { id: 'section7', delay: '1s' },
    { id: 'section8', delay: '0.8s' }
];

function CadastroPsicólogos() {
    const [hasScrolled, setHasScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (!hasScrolled && window.scrollY > 0) {
                setHasScrolled(true);
            }

            sectionsConfig.forEach(({ id, delay }) => {
                const section = document.getElementById(id);
                if (section) {
                    const rect = section.getBoundingClientRect();
                    if (rect.top < window.innerHeight && rect.bottom > 0) {
                        section.classList.add('visible');
                        if (hasScrolled) {
                            section.classList.add('no-animate');
                        }
                        section.style.transitionDelay = delay;
                    } else {
                        if (!hasScrolled) {
                            section.classList.remove('visible');
                            section.style.transitionDelay = '0s';
                        }
                    }
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, [hasScrolled]);

    return (
        <Container>
            <BAPO />
            <Row>
                <div className="scroll-section" id="section1">
                    <div id="header" className="fundoFormsPsi d-flex">
                        <img className='imgpsi' width={610} height={350} src={PsicologosImg1} alt="desenho de uma mulher fazendo terapia" />
                        <Col md='4' sm='12' className='blococadastropsi'>

                            <div className='cardcadastropsi'>
                                <h6 className='questioncadastro'>Você está pronto para levar sua carreira a um novo patamar e ampliar o impacto positivo que pode ter na vida das pessoas? </h6>
                                <p className='textocardcadastropsi'> Na MindU, acreditamos que a saúde mental é fundamental para o bem-estar geral, e estamos em busca de profissionais dedicados como você para se juntar à nossa rede de excelência. </p>
                            </div>
                        </Col>

                    </div>
                </div>
                <div className="scroll-section" id="section2">
                    <h2 className=" titleporque m-4 centralizar">Por que ser MindU?</h2>
                </div>
                <div>
                    <div className='d-flex conteinerporque'>

                        <div className="scroll-section" id="section3">
                            <img className='imgporque' src={Psicologos} width={600} height={450} alt="desenho de uma psicologa ajudando o paciente a se entender" />
                        </div>

                        <Col md='4' sm='12'>

                            <div className="scroll-section" id="section4">
                                <h4 className='txtporque'>1. Flexibilidade de Horários</h4>
                                <div className='cardporque'>
                                    <p>
                                        <h6>Horários Personalizáveis:</h6> Permite ajustar os horários de trabalho para melhor atender às necessidades pessoais e profissionais.
                                    </p>
                                </div>
                            </div>

                            <div className="scroll-section" id="section5">
                                <div className='cardporque'>
                                    <p>
                                        <h6>Opções de Trabalho Remoto:</h6> Oferece a possibilidade de realizar atendimentos online, facilitando a gestão do tempo.
                                    </p>
                                </div>
                            </div>
                        </Col>

                        <Col md='4' sm='12'>

                            <div className="scroll-section" id="section6">
                                <h4 className='txtporque'>2. Avanço Profissional</h4>
                                <div className='cardporque'>
                                    <p>
                                        <h6>Treinamentos Contínuos:</h6> Acesso a cursos, workshops e seminários para aprimorar habilidades e conhecimentos.
                                    </p>
                                </div>
                            </div>
                            <div className="scroll-section" id="section7">
                                <div className='cardporque'>
                                    <p>
                                        <h6>Oportunidades de Especialização:</h6> Possibilidade de se especializar em áreas específicas da psicologia com suporte da empresa.
                                    </p>
                                </div>
                            </div>
                        </Col>
                    </div>
                </div>

                <div className="scroll-section" id="section8" >
                    <div className='container align-self-center d-flex justify-content-center'>
                        <Col md={9} sm={12} className="blocoFormsPsi centralizar">
                            <h2 className="m-4 centralizar">Cadastre-se no nosso convênio!</h2>
                            <div>
                                <CadastroFormPsicologos />
                            </div>

                        </Col>
                    </div>

                </div>
            </Row>
        </Container>
    );
}

export default CadastroPsicólogos;
