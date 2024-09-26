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
                <h2 className="mb-4 title text-center">Nossos Planos</h2>
                <Row className="assinatura">
                    <Row className="assinatura">
                        <Col md={4}>
                            <div className="plan">
                                <div className="inner">
                                    <p className="title">Bem-Estar</p>
                                    <p className="info">Ideal para quem busca suporte psicológico básico e orientação contínua.</p>
                                    <div className="price">R$250,00<span>/ por funcionário</span></div>
                                    <ul className="featureList">

                                        <li><p>Consultas semanais com psicólogo (1 sessão por semana)</p></li>
                                        <li><p>Acesso a workshops mensais sobre saúde mental</p></li>
                                        <li><p>Suporte online entre consultas</p></li>
                                        <li><p>Acesso a material educativo sobre bem-estar psicológico</p></li>
                                        <li className="disabled" ><p>Suporte online 24/7</p></li>
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
                                    <div className="price">R$310,00<span>/por funcionário</span></div>
                                    <ul className="featureList">

                                        <li><p>Consultas semanais com psicólogo (1 sessão por semana)</p></li>
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
                            <div className="plan">
                                <div className="inner">
                                    <p className="title">Transformação</p>
                                    <p className="info">Para quem busca um acompanhamento intensivo e personalizado.</p>
                                    <div className="price">R$600,00<span>/ por funcionário</span></div>
                                    <ul className="featureList">

                                        <li><p>Consultas semanais (2 sessões por semana)</p></li>
                                        <li><p>Sessões de terapia em grupo (4 vezes por mês)</p></li>
                                        <li><p>Acesso ilimitado a workshops e webinars sobre saúde mental</p></li>
                                        <li><p>Suporte online 24/7 e acompanhamento personalizado</p></li>
                                        <li><p>Acesso completo a materiais educativos e ferramentas de autoajuda</p></li>
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

            />
        </>
    );
};

export default Cadastro;

