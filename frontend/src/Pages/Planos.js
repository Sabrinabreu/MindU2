import React from "react";
import '../css/Planos.css';
import { Container, Row, Col, Button } from "react-bootstrap";
import BAPO from "../Components/WidgetBAPO";
import MyVerticallyCenteredModal from '../Components/ModalPag';
import "../css/WidgetBAPO.css";
import PaymentForm from "../Components/Pagamento"; // Importe o PaymentForm

const Cadastro = () => {
    const [modalShow, setModalShow] = React.useState(false);
    const [selectedPlan, setSelectedPlan] = React.useState(null);

    // Definição dos planos com informações completas
    const planos = {
        'Bem-Estar': {
            name: 'Bem-Estar',
            price: 5199,
            description: 'Ideal para quem busca suporte psicológico básico e orientação.'
        },
        'Equilíbrio': {
            name: 'Equilíbrio',
            price: 10349,
            description: 'Para quem deseja um suporte psicológico mais abrangente e contínuo.'
        },
        'Transformação': {
            name: 'Transformação',
            price: 16499,
            description: 'Para quem busca um acompanhamento intensivo e personalizado.'
        }
    };

    // Função para selecionar o plano e exibir o modal
    const handlePlanSelect = (planName) => {
        const selectedPlanDetails = planos[planName];
        setSelectedPlan(selectedPlanDetails);  // Passa todas as informações do plano
        setModalShow(true);
    };

    return (
        <>
            <BAPO />
            <Container className="caixaPlanos">
                <Row>
                    <Col className="title text-center">
                        <h2>Nossos Planos</h2>
                    </Col>
                </Row>
                <Row className="assinatura">
                    <Row className="assinatura">
                        <Col>
                            <div className="plan">
                                <div className="inner">
                                    <p className="title">Bem-Estar</p>
                                    <p className="info">Ideal para quem busca suporte psicológico básico e orientação.</p><br />
                                    <div className="price">R$5.199<span>/ mês</span></div>
                                    <ul className="featureList">
                                        <li>Consultas semanais com psicólogo (1 sessão por semana)</li>
                                        <li>Acesso a workshops mensais sobre saúde mental</li>
                                        <li>Suporte online entre consultas</li>
                                        <li>Acesso a material educativo sobre bem-estar psicológico</li>
                                        <li className="disabled">Suporte online 24/7</li>
                                        <li className="disabled">Sessões de coaching psicológico personalizadas (1 vez por mês)</li>
                                    </ul><br /><br />
                                    <div className="action">
                                        <Button className="botaoPlan" onClick={() => handlePlanSelect('Bem-Estar')}>
                                            Escolher plano
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col>
                            <div className="plan">
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
                                    <div className="price">R$10.349<span>/ mês</span></div>
                                    <ul className="featureList">
                                        <li>Consultas semanais com psicólogo (1 sessão por semana)</li>
                                        <li>Sessões de terapia em grupo (2 vezes por mês)</li>
                                        <li>Acesso a workshops semanais sobre saúde mental</li>
                                        <li>Suporte online 24/7</li>
                                        <li>Acesso a material educativo e ferramentas de autoajuda</li>
                                        <li className="disabled">Sessões de coaching psicológico personalizadas (1 vez por mês)</li>
                                    </ul><br />
                                    <div className="action">
                                        <Button className="botaoPlan" onClick={() => handlePlanSelect('Equilíbrio')}>
                                            Escolher plano
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col>
                            <div className="plan">
                                <div className="inner">
                                    <p className="title">Transformação</p>
                                    <p className="info">Para quem busca um acompanhamento intensivo e personalizado.</p>
                                    <div className="price">R$16.499<span>/ mês</span></div>
                                    <ul className="featureList">
                                        <li>Consultas semanais (2 sessões)</li>
                                        <li>Sessões de terapia em grupo (4x por mês)</li>
                                        <li>Acesso ilimitado a workshops e webinars sobre saúde mental</li>
                                        <li>Suporte online 24/7 e acompanhamento personalizado</li>
                                        <li>Acesso completo a materiais educativos e ferramentas de autoajuda</li>
                                        <li>Sessões de coaching psicológico personalizadas (1 vez por mês)</li>
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

export default Cadastro;

