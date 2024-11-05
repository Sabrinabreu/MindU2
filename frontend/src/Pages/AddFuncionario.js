import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Dropdown, Tabs, Tab } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../provider/AuthProvider";
import { parseJwt } from '../Components/jwtUtils';
import Sidebar from '../Components/SideBar';  // Importando o Sidebar
import PaymentForm from '../Components/Pagamento';
import PagFuncionarios from '../Components/PagFuncionários';
import CriarContasFuncionarios from '../Components/CriarContasFuncionarios';
import { PlusCircle } from 'lucide-react';

const MyCard = () => {
  const [nContas, setNContas] = useState(1);
  const [resultados, setResultados] = useState([]);
  const [activeTab, setActiveTab] = useState('home');
  const [completedSteps, setCompletedSteps] = useState([false, false, false]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [data, setData] = useState(null);
  const [planos, setPlanos] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [perfil, setPerfil] = useState({});
  const [compras, setCompras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [empresaId, setEmpresaId] = useState(null);
  const [tipoUsuario, setTipoUsuario] = useState(null);

  const { setToken } = useAuth();
  const navegacao = useNavigate();
  const token = localStorage.getItem('token');
  const decodedToken = parseJwt(token);

  useEffect(() => {
    setPerfil(decodedToken.perfil);
  }, [decodedToken.perfil]);

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

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    navegacao('/', { replace: true });
  };

  const toggleSidebar = () => {
    setSidebarCollapsed((prevState) => !prevState);
  };

  const handleTabSelect = (key) => {
    const tabIndex = key === 'home' ? 0 : key === 'profile' ? 1 : 2;
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

    return (
        <div className="conteudoADDfuncionario">

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
                    {listaPlanosUnicos.length > 0 ? (
                        <Col md={10} className="mt-5">
                            <Card className="cardaddfuncionarios">
                                <Card.Header className="d-flex justify-content-between align-items-center">
                                    <Dropdown>
                                        <Dropdown.Toggle variant="purple" id="dropdown-basic">
                                            {selectedPlan ? planoNomes[selectedPlan] : "Selecione um plano"}
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            {listaPlanosUnicos.map(plano => (
                                                <Dropdown.Item
                                                    key={plano.id_plano}
                                                    onClick={() => handlePlanSelect(plano.id_plano)}
                                                >
                                                    {planoNomes[plano.id_plano]}
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
                                        <Tab className='tab' eventKey="profile" title="Passo 2: Pagamento" disabled={!completedSteps[0]}>
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
        </div>
    );
};

export default MyCard;
