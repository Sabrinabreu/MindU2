import React, {useState} from "react";
import '../css/Planos.css';
import { Container, Row, Col, Button } from "react-bootstrap";
import BAPO from "../Components/WidgetBAPO";
import MyVerticallyCenteredModal from '../Components/ModalPag';
import "../css/WidgetBAPO.css";
import { useNavigate } from "react-router-dom";
import PaymentForm from "../Components/Pagamento"; 
import { parseJwt } from "../Components/jwtUtils";

const Planos = () => {
    const [modalShow, setModalShow] = React.useState(false);
    const [selectedPlan, setSelectedPlan] = React.useState(null);
    const [tipoUsuario, setTipoUsuario] = useState('');

    const planos = {
        'Bem-Estar': {
            name: 'Bem-Estar',
            price: 40399,
            description: 'Ideal para quem busca suporte psicológico básico e orientação.'
        },
        'Equilíbrio': {
            name: 'Equilíbrio',
            price: 125799,
            description: 'Para quem deseja um suporte psicológico mais abrangente e contínuo.'
        },
        'Transformação': {
            name: 'Transformação',
            price: 15000000,
            description: 'Para quem busca um acompanhamento intensivo e personalizado.'
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
                <h2 className="mb-4 title text-center">Nossos Planos</h2>
                <Row className="assinatura">
                    <Row className="assinatura">
                        <Col md={4}>
                            <div className="plan">
                                <div className="inner">
                                    <p className="title">Bem-Estar</p>
                                    <p className="info">Ideal para quem busca suporte psicológico básico e orientação contínua.</p>
                                    <div className="price">R$40.399<span>/ mês</span></div>
                                    <ul className="featureList">
                                        <li><p>200 funcionários</p></li>
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
                                    <div className="price">R$125.799<span>/ mês</span></div>
                                    <ul className="featureList">
                                        <li><p>500 funcionários</p></li>
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
                                    <div className="price">R$1.5milhão<span>/ mês</span></div>
                                    <ul className="featureList">
                                        <li><p>10.000 funcionários</p></li>
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

