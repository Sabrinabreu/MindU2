import React, { useState } from "react";
import '../css/Planos.css';
import { Container, Row, Col, Button } from "react-bootstrap";
import BAPO from "../Components/WidgetBAPO";
import MyVerticallyCenteredModal from '../Components/ModalPag';
import "../css/WidgetBAPO.css";
import { useNavigate } from "react-router-dom";
import { parseJwt } from "../Components/jwtUtils";

const Planos = () => {
    const [modalShow, setModalShow] = React.useState(false);
    const [selectedPlan, setSelectedPlan] = React.useState(null);
    const [tipoUsuario, setTipoUsuario] = useState('');

    const planos = {
        'Bem-Estar': {
            name: 'Bem-Estar',
            price: 250.00,

        },
        'Equilíbrio': {
            name: 'Equilíbrio',
            price: 310.00,

        },
        'Transformação': {
            name: 'Transformação',
            price: 600.00,

        }
    };

    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const handlePlanSelect = (planName) => {
        if (token) {
            const decodedToken = parseJwt(token);
            setTipoUsuario(decodedToken.tipo_usuario);
            if (decodedToken.tipo_usuario === 'empresa') {
                const selectedPlanDetails = planos[planName];
                setSelectedPlan(selectedPlanDetails);
                setModalShow(true);
            }
            else {
                alert("você precisa de uma conta de empresa para contratar o nosso serviço");
            }
        }
        else {
            navigate("/login");
        }


    };

    return (
        <>
            <BAPO />
            <Container className="caixaPlanos">
                <h2 className="mb-4 text-center textroxo textclaro">Nossos Planos</h2>
                <Row className="assinatura">
                    <Row className="assinatura">
                        <Col md={4}>
                            <div className="plan mt-2">
                                <div className="inner">
                                    <p className="title">Bem-Estar</p>
                                    <p className="info">Ideal para quem busca suporte psicológico básico e orientação contínua.</p>
                                    <div className="price">R$250<span>/ funcionário</span></div>
                                    <ul className="featureList">
                                        <li><p>Consultas semanais (1 sessão por semana)</p></li>
                                        <li className="disabled"><p>Sessões de terapia em grupo (2 vezes por mês)</p></li>
                                        <li><p>Acesso a workshops mensais sobre saúde mental</p></li>
                                        <li className="disabled" ><p>Suporte online 24/7</p></li>
                                        <li><p>Acesso a material educativo sobre bem-estar psicológico</p></li>
                                        <li className="disabled"><p>Sessões de coaching psicológico personalizadas (1 vez por mês)</p></li>
                                    </ul>
                                    <div class="action">
                                        <Button className="botaoPlan" onClick={() => handlePlanSelect('Bem-Estar')}>
                                            Escolher plano
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col md={4}>
                            <div className="plan mt-2">
                                <div className="inner">
                                    <div className="pop">
                                        <div>
                                            <p className="title">Equilíbrio</p>
                                        </div>
                                        <div className="poptext">
                                            <p>Popular</p>
                                        </div>
                                    </div>
                                    <p className="info">Para quem deseja um suporte psicológico mais abrangente e contínuo.</p>
                                    <div className="price">R$310<span>/ funcionário</span></div>
                                    <ul className="featureList">
                                        <li><p>Consultas semanais (1 sessão por semana)</p></li>
                                        <li><p>Sessões de terapia em grupo (2 vezes por mês)</p></li>
                                        <li><p>Acesso a workshops semanais sobre saúde mental</p></li>
                                        <li><p>Suporte online 24/7</p></li>
                                        <li><p>Acesso a material educativo e ferramentas de autoajuda</p></li>
                                        <li className="disabled"><p>Sessões de coaching psicológico personalizadas (1 vez por mês)</p></li>
                                    </ul>
                                    <div className="action">
                                        <Button className="botaoPlan" onClick={() => handlePlanSelect('Equilíbrio')}>
                                            Escolher plano
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col md={4}>
                            <div className="plan mt-2">
                                <div className="inner">
                                    <p className="title">Transformação</p>
                                    <p className="info">Para quem busca um acompanhamento intensivo e personalizado.</p>
                                    <div className="price">R$600<span>/ funcionário</span></div>
                                    <ul className="featureList">
                                        <li><p>Consultas semanais (2 sessões por semana)</p></li>
                                        <li><p>Sessões de terapia em grupo (4 vezes por mês)</p></li>
                                        <li><p>Acesso ilimitado a workshops e webinars sobre saúde mental</p></li>
                                        <li><p>Suporte online 24/7 e acompanhamento personalizado</p></li>
                                        <li><p>Acesso a materiais educativos e ferramentas de autoajuda</p></li>
                                        <li><p>Sessões de coaching psicológico personalizadas (1 vez por mês)</p></li>
                                    </ul>
                                    <div className="action">
                                        <Button className="botaoPlan" onClick={() => handlePlanSelect('Transformação')}>
                                            Escolher plano
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Row>
            </Container>

            {/* Passando as informações completas para o modal */}
            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                planName={selectedPlan?.name}
                planPrice={selectedPlan?.price}
                planDescription={selectedPlan?.description}
            />
        </>
    );
};

export default Planos;

