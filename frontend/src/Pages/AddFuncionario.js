import { Card, Button, Tabs, Tab, Dropdown } from 'react-bootstrap';
import PaymentForm from '../Components/Pagamento';
import '../css/ModalPag.css';
import PagFuncionarios from '../Components/PagFuncionários';
import { Container, Row, Col } from 'react-bootstrap';
import axios from "axios";
import CriarContasFuncionarios from '../Components/CriarContasFuncionarios';
import { useState, useEffect } from 'react';
import '../css/SideBar.css';
import { GiCancel } from 'react-icons/gi';
import { PlusCircle } from 'lucide-react';
import { SquareChartGantt, CopyPlus, ChevronDown, LogOut, FilterX, CircleX, UserRoundPen } from 'lucide-react';
import { parseJwt } from '../Components/jwtUtils';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider";

const MyCard = () => {
    const [nContas, setNContas] = useState(1);
    const [resultados, setResultados] = useState([]);
    const [activeTab, setActiveTab] = useState("home");
    const [completedSteps, setCompletedSteps] = useState([false, false, false]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [data, setData] = useState(null);
    const [planos, setPlanos] = useState([]);
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [perfil, setPerfil] = useState({});
    const [compras, setCompras] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [empresaId, setEmpresaId] = useState(null);
    const [tipoUsuario, setTipoUsuario] = useState(null);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [feedbackMessage, setFeedbackMessage] = useState(null);

    useEffect(() => {
        console.log('Dados:', data);
    }, [data]);

    const { setToken } = useAuth();
    const navegacao = useNavigate();
    const token = localStorage.getItem('token');
    const decodedToken = parseJwt(token);

    useEffect(() => {
        setPerfil(decodedToken.perfil);
    }, [decodedToken.perfil]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setToken(null);
        navegacao("/", { replace: true });
    };

    const toggleSidebar = () => {
        setSidebarCollapsed(prevState => !prevState);
    };

    const getInitials = (name) => {
        if (!name) return '';
        const names = name.trim().split(' ').filter(Boolean);
        if (names.length === 0) return '';
        const initials = names.slice(0, 2).map(n => n[0].toUpperCase()).join('');
        return initials;
    };

    const getColorFromInitials = (initials) => {
        let hash = 0;
        for (let i = 0; i < initials.length; i++) {
            hash = initials.charCodeAt(i) + ((hash << 5) - hash);
        }
        const color = `#${((hash & 0x00FFFFFF) >> 0).toString(16).padStart(6, '0').toUpperCase()}`;
        return color;
    };

    const getContrastingColor = (backgroundColor) => {
        const r = parseInt(backgroundColor.substring(1, 3), 16);
        const g = parseInt(backgroundColor.substring(3, 5), 16);
        const b = parseInt(backgroundColor.substring(5, 7), 16);
        const luminosity = 0.2126 * r + 0.7152 * g + 0.0722 * b;
        return luminosity > 128 ? '#000000' : '#FFFFFF';
    };

    const formatCurrency = (value) => {
        return parseFloat(value).toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
    };

    const handleTabSelect = (key) => {
        const tabIndex = key === "home" ? 0 : key === "profile" ? 1 : 2;
        if (tabIndex > 0 && !completedSteps[tabIndex - 1]) {
            return; // Não pode mudar para a próxima aba se a anterior não estiver completa
        }
        setActiveTab(key);
    };

    const handleSubmitPurchase = async () => {
        const purchaseData = {
            id_empresa: empresaId,
            id_plano: selectedPlan?.id,
            qtd_funcionarios: nContas,
        };

        try {
            const response = await axios.post('http://localhost:3001/api/compras', purchaseData);
            console.log('Compra salva com sucesso:', response.data);
            setData(response.data);
        } catch (error) {
            console.error('Erro ao enviar a compra:', error);
        }
    };

    const completeStep = (stepIndex) => {
        const updatedSteps = [...completedSteps];
        updatedSteps[stepIndex] = true;
        setCompletedSteps(updatedSteps);

        if (stepIndex === 1) {
            handleSubmitPurchase();
        }

        if (stepIndex < 2) {
            setActiveTab(stepIndex === 0 ? "profile" : "contact");
        }
    };

    const planoNomes = {
        1: "Bem-Estar",
        2: "Equilíbrio",
        3: "Transformação",
    };

    const planoPrecos = {
        1: 250,
        2: 310,
        3: 600,
    };

    useEffect(() => {
        if (token) {
            const decodedToken = parseJwt(token);
            setTipoUsuario(decodedToken.tipo_usuario);
            setEmpresaId(decodedToken.id_referencia);
        }
    }, [token]);
    
    useEffect(() => {
        const fetchCompras = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/compras');
                setCompras(response.data);
            } catch (err) {
                console.error('Erro ao carregar as compras:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchCompras();
    }, []);

    // Filtrar as compras pelo ID da empresa
    const compraFiltrada = compras.find(compra => compra.id_empresa === empresaId);

    const handlePlanSelect = (planId) => {
        setSelectedPlan(planId);
        setTotalPrice(planoPrecos[planId] * nContas);
    };

    const handleCreateAccounts = async () => {
        const accountData = {
            id_empresa: empresaId,
            id_plano: selectedPlan?.id,
            qtd_funcionarios: nContas,
        };

        try {
            const response = await axios.post('http://localhost:3001/contafuncionarios', accountData);
            console.log('Contas criadas com sucesso:', response.data);
            setResultados(response.data.result); // Armazena os resultados, se necessário
            // Aqui você pode adicionar lógica para mostrar uma mensagem de sucesso ou redirecionar o usuário
        } catch (error) {
            console.error('Erro ao criar contas:', error);
            // Aqui você pode adicionar lógica para mostrar uma mensagem de erro
        }
    };

    return (
        <>

            {/* SideBar */}

            <div id="navbar" className={isSidebarCollapsed ? 'collapsed' : ''}>
                <input id="nav-toggle" type="checkbox" onChange={toggleSidebar} />
                <div id="nav-header">
                    <div className={`nav-title ${isSidebarCollapsed ? 'hidden' : ''}`}>
                        <Link to="/dashboard"><h5>Dashboard</h5></Link>
                    </div>
                    <label htmlFor="nav-toggle">
                        <span id="nav-toggle-burger"></span>
                    </label>
                    <hr />
                </div>
                <div id="nav-content">
                    <Link to="/dashboard/seuplano"><div className="nav-button">
                        <i className="fas"><SquareChartGantt /></i><span>Seu Plano</span>
                    </div></Link>
                    <Link to="/dashboard/addfuncionario">
                        <div className="nav-button">
                            <i className="fas"><CopyPlus /></i>
                            <span>Adicionar Funcionários</span>
                        </div>
                    </Link>
                    <Link to="/perfilempresa"><div className="nav-button">
                        <i className="fas"><SquareChartGantt /></i><span>Perfil</span>
                    </div></Link>
                    <div id="nav-content-highlight"></div>
                </div>
                <input id="nav-footer-toggle" type="checkbox" />
                <div id="nav-footer">
                    <div id="nav-footer-heading">
                        <div id="nav-footer-avatar">
                            <div
                                className="profile-initials"
                                style={{
                                    backgroundColor: getColorFromInitials(getInitials(perfil.empresa || '')),
                                    color: getContrastingColor(getColorFromInitials(getInitials(perfil.empresa || '')))
                                }}
                            >
                                {getInitials(perfil.empresa || '')}
                            </div>
                        </div>
                        <div id="nav-footer-titlebox">
                            <a id="nav-footer-title"
                                target="_blank" rel="noopener noreferrer">{perfil.empresa}</a>
                            <span id="nav-footer-subtitle">Admin</span>
                        </div>
                        <label htmlFor="nav-footer-toggle">
                            <i className="fas"> <ChevronDown /></i>
                        </label>
                    </div>
                    <div id="nav-footer-content">
                        <button onClick={handleLogout} className="logout">Sair<LogOut className="logsvg" /></button>
                    </div>
                </div>
            </div>

            <Container className={`addFunc ${isSidebarCollapsed ? 'collapsed' : 'expanded'}`}>
                <Row>
                    {compraFiltrada ? (
                        <Col md={10} key={compraFiltrada.id} className="mt-5">
                            <Card>
                                <Card.Header className="d-flex justify-content-between align-items-center">
                                    <Dropdown>
                                        <Dropdown.Toggle variant="purple" id="dropdown-basic">
                                            {selectedPlan ? planoNomes[selectedPlan] : "Selecione um plano"}
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            {compras.map(compra => (
                                                <Dropdown.Item
                                                    key={compra.id_plano}
                                                    onClick={() => handlePlanSelect(compra.id_plano)}>
                                                    {planoNomes[compra.id_plano]}
                                                </Dropdown.Item>
                                            ))}
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Card.Header>
                                <Card.Body>
                                    <h6>Preço total: R$ {formatCurrency(selectedPlan ? planoPrecos[selectedPlan] * nContas : 0)}</h6>
                                    <Tabs
                                        activeKey={activeTab}
                                        onSelect={handleTabSelect}
                                        id="controlled-tab-example"
                                        className="mb-3"
                                    >
                                        <Tab eventKey="home" title="Passo 1: Escolha a qnt de contas">
                                            <PagFuncionarios setNContas={setNContas} nContas={nContas} completeStep={() => completeStep(0)} />
                                        </Tab>
                                        <Tab  className='tab' eventKey="profile" title="Passo 2: Pagamento" disabled={!completedSteps[0]}>
                                            <PaymentForm
                                                selectedPlan={{ price: totalPrice }}
                                                completeStep={() => completeStep(1)}
                                            />
                                        </Tab>
                                        <Tab className='tab' eventKey="contact" title="Passo 3: Criar Contas" disabled={!completedSteps[1]}>
                            <CriarContasFuncionarios
                            nContas={nContas}
                            empresaId={empresaId}
                            planoSelecionado={selectedPlan}
                            setResultados={setResultados}
                            />
                        </Tab>
                                    </Tabs>
                                </Card.Body>
                            </Card>
                        </Col>
                    ) : (
                        <Col>
                            <Card className='mt-5'>
                                <Card.Body>
                                    <Card.Text>Nenhum plano encontrado.</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    )}
                </Row>
            </Container>
        </>
    );
};

export default MyCard;
