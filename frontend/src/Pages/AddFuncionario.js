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
    <>
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        toggleSidebar={toggleSidebar}
        perfil={perfil}
        handleLogout={handleLogout}
      />

      <Container className={`addFunc ${isSidebarCollapsed ? 'collapsed' : 'expanded'}`}>
        <Row>
          {compras.length > 0 ? (
            <Col md={10} className="mt-5">
              <Card>
                <Card.Header className="d-flex justify-content-between align-items-center">
                  <Dropdown>
                    <Dropdown.Toggle variant="purple" id="dropdown-basic">
                      {selectedPlan ? selectedPlan.name : 'Selecione um plano'}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      {compras.map((compra) => (
                        <Dropdown.Item
                          key={compra.id_plano}
                          onClick={() => setSelectedPlan(compra)}
                        >
                          {compra.name}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                </Card.Header>

                <Card.Body>
                  <Tabs
                    activeKey={activeTab}
                    onSelect={handleTabSelect}
                    id="controlled-tab-example"
                    className="mb-3"
                  >
                    <Tab eventKey="home" title="Passo 1: Escolha a qnt de contas">
                      <PagFuncionarios setNContas={setNContas} nContas={nContas} />
                    </Tab>
                    <Tab eventKey="profile" title="Passo 2: Pagamento">
                      <PaymentForm selectedPlan={selectedPlan} />
                    </Tab>
                    <Tab eventKey="contact" title="Passo 3: Criar Contas">
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
              <Card className="mt-5">
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