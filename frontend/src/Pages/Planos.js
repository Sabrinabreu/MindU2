import React, { useState, useEffect } from "react";
import '../css/Planos.css';
import { Container, Row, Col, Button } from "react-bootstrap";
import BAPO from "../Components/WidgetBAPO";
import MyVerticallyCenteredModal from '../Components/ModalPag';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { parseJwt } from "../Components/jwtUtils";

const Planos = () => {
    const [modalShow, setModalShow] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [planos, setPlanos] = useState([]);
    const [tipoUsuario, setTipoUsuario] = useState('');
    const [empresaId, setEmpresaId] = useState(null);

    useEffect(() => {
        const fetchPlanos = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/planos');
                setPlanos(response.data);
            } catch (error) {
                console.error('Erro ao carregar planos:', error);
            }
        };

        fetchPlanos();
    }, []);

    const descricao = [
        {
            id: 1,
            texto: "Ideal para quem busca suporte psicológico básico e orientação contínua.",
            lista: [
                { description: "Consultas semanais (1 sessão por semana)", disabled: false },
                { description: "Sessões de terapia em grupo (2 vezes por mês)", disabled: true },
                { description: "Acesso a workshops mensais sobre saúde mental", disabled: false },
                { description: "Suporte online 24/7", disabled: true },
                { description: "Acesso a material educativo sobre bem-estar psicológico", disabled: false },
                { description: "Sessões de coaching psicológico personalizadas (1 vez por mês)", disabled: true },
            ]
        },
        {
            id: 2,
            texto: "Para quem deseja um suporte psicológico mais abrangente e contínuo.",
            lista: [
                { description: "Consultas semanais (1 sessão por semana)", disabled: false },
                { description: "Sessões de terapia em grupo (2 vezes por mês)", disabled: false },
                { description: "Acesso a workshops mensais sobre saúde mental", disabled: false },
                { description: "Suporte online 24/7", disabled: true },
                { description: "Acesso a material educativo e ferramentas de autoajuda", disabled: false },
                { description: "Sessões de coaching psicológico personalizadas (1 vez por mês)", disabled: true },
            ]
        },
        {
            id: 3,
            texto: "Para quem busca um acompanhamento intensivo e personalizado.",
            lista: [
                { description: "Consultas semanais (2 sessões por semana)", disabled: false },
                { description: "Sessões de terapia em grupo (4 vezes por mês)", disabled: false },
                { description: "Acesso ilimitado a workshops e webinars sobre saúde mental", disabled: false },
                { description: "Suporte online 24/7 e acompanhamento personalizado", disabled: false },
                { description: "Acesso a materiais educativos e ferramentas de autoajuda", disabled: false },
                { description: "Sessões de coaching psicológico personalizadas (1 vez por mês)", disabled: false },
            ]
        }
    ];

    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (token) {
            const decodedToken = parseJwt(token);
            setTipoUsuario(decodedToken.tipo_usuario);
            setEmpresaId(decodedToken.id_referencia);
        }
    }, [token]);


    const handlePlanSelect = (plan) => {
        if (token) {
            const decodedToken = parseJwt(token);
            setTipoUsuario(decodedToken.tipo_usuario);
            if (decodedToken.tipo_usuario === 'empresa') {
                setSelectedPlan(plan);
                setModalShow(true);
            } else {
                alert("Você precisa de uma conta de empresa para contratar o nosso serviço");
            }
        } else {
            navigate("/login");
        }
    };



    return (
        <>
            <BAPO />
            <Container className="caixaPlanos">
                <h2 className="mb-4 text-center textroxo textclaro">Nossos Planos</h2>
                <Row className="assinatura rowPlanos">
                    {Array.isArray(planos) && planos.length > 0 ? (
                        planos.map((plano, index) => (
                            <Col md={4} key={plano.id} className="colPlanos">
                                <div className="plan mt-2">
                                    <div className="inner">
                                        <p className="title">{plano.nome}</p>
                                        {/* Verifica se o id do plano é 2 para mostrar "Popular" */}
                                        {plano.id === 2 && (
                                            <div className="poptext">
                                                <p>Popular</p>
                                            </div>
                                        )}
                                        <p className="descricao">{descricao[index]?.texto}</p>
                                        <div className="price">R$ {plano.preco_por_funcionario}<span>/ funcionário</span></div>
                                        <ul className="featureList">
                                            {descricao[index]?.lista.map((item, itemIndex) => (
                                                <li key={itemIndex} className={item.disabled ? "disabled" : ""}>
                                                    <p>{item.description}</p>
                                                </li>
                                            ))}
                                        </ul>
                                        <div className="action">
                                            <Button
                                                className="botaoPlan"
                                                onClick={() => handlePlanSelect(plano)}
                                            >
                                                Escolher plano
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        ))
                    ) : (
                        <Col md={12}>
                            <p>Nenhum plano disponível no momento.</p>
                        </Col>
                    )}
                </Row>
            </Container>

            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                planName={selectedPlan ? selectedPlan.nome : ""}
                planPrice={selectedPlan ? selectedPlan.preco_por_funcionario : 0}
                selectedPlan={selectedPlan} 
                empresaId={empresaId}
            />

        </>
    );
};

export default Planos;
