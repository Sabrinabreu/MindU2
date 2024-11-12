import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Dropdown, Tabs, Tab } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../provider/AuthProvider";
import { parseJwt } from '../Components/jwtUtils';
import Sidebar from '../Components/SideBar';
import PaymentForm from '../Components/Pagamento';
import PagFuncionarios from '../Components/PagFuncionários';
import CriarContasFuncionarios from '../Components/CriarContasFuncionarios';
import BAPO from "../Components/WidgetBAPO";
import "../css/WidgetBAPO.css";

const MyCard = () => {
  const [nContas, setNContas] = useState(1);  // Número de contas selecionadas
  const [selectedPlan, setSelectedPlan] = useState(null);  // Plano selecionado
  const [plans, setPlans] = useState([]);  // Lista de planos disponíveis
  const [activeTab, setActiveTab] = useState('home');
  const [completedSteps, setCompletedSteps] = useState([false, false, false]);
  const [totalPrice, setTotalPrice] = useState(0);  // Inicializando o totalPrice
  const [empresaId, setEmpresaId] = useState(null);
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [perfil, setPerfil] = useState({});
  const [contasFuncionarios, setContasFuncionarios] = useState([]);  // Estado para armazenar os funcionários não cadastrados
  const [resultados, setResultados] = useState([]);  // Definindo o estado resultados
  const { setToken } = useAuth();
  const navegacao = useNavigate();
  const token = localStorage.getItem('token');
  const decodedToken = parseJwt(token);

  useEffect(() => {
    setPerfil(decodedToken?.perfil || {});
    setEmpresaId(decodedToken?.id_referencia || null);
  }, [token]);

  // Buscar funcionários não cadastrados
  useEffect(() => {
    const fetchFuncionariosNaoCadastrados = async () => {
      try {
        const response = await axios.get('http://localhost:3001/contaFuncionarios', {
          params: { empresaId }
        });
        setContasFuncionarios(response.data);  // Atualiza a lista de contas de funcionários
      } catch (error) {
        console.error('Erro ao buscar funcionários não cadastrados:', error);
      }
    };

    if (empresaId) {
      fetchFuncionariosNaoCadastrados();
    }
  }, [empresaId]);

  // Calcular o totalPrice baseado no plano e no número de contas
  useEffect(() => {
    if (selectedPlan && nContas) {
      setTotalPrice(selectedPlan.preco * nContas);  // Ajuste conforme a estrutura do seu plano
    }
  }, [selectedPlan, nContas]);

  // Definir planos disponíveis sem filtrar por número de funcionários
  useEffect(() => {
    const availablePlans = [
      { id: 1, nome: 'Bem-Estar', preco: 250 },
      { id: 2, nome: 'Equilíbrio', preco: 310 },
      { id: 3, nome: 'Transformação', preco: 600 },
    ];

    setPlans(availablePlans);

    if (availablePlans.length > 0) {
      setSelectedPlan(availablePlans[0]);  // Se houver planos, define o primeiro como selecionado
    }
  }, []);  // Agora, o estado de planos é carregado sem qualquer filtro

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    navegacao('/', { replace: true });
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(prevState => !prevState);
  };

  const handleTabSelect = (key) => {
    const tabIndex = key === 'home' ? 0 : key === 'profile' ? 1 : 2;
    if (tabIndex > 0 && !completedSteps[tabIndex - 1]) {
      return; // Não pode mudar para a próxima aba se a anterior não estiver completa
    }
    setActiveTab(key);
  };

  const completeStep = (stepIndex) => {
    const updatedSteps = [...completedSteps];
    updatedSteps[stepIndex] = true;
    setCompletedSteps(updatedSteps);
    if (stepIndex < 2) {
      setActiveTab(stepIndex === 0 ? 'profile' : 'contact');
    }
  };

  return (
    <>
      <BAPO />
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        toggleSidebar={toggleSidebar}
        perfil={perfil}
        handleLogout={handleLogout}
      />
      <Container className={`addFunc ${isSidebarCollapsed ? 'collapsed' : 'expanded'}`}>
        <Row>
          <Col md={10} className="mt-5">
            <Card className="card-modal" style={{ width: '100%', margin: '20px auto' }}>
              <Card.Header className="d-flex justify-content-between align-items-center">
                <h5 className="m-0">
                  Plano Selecionado: {selectedPlan ? selectedPlan.nome : "Nenhum Plano Selecionado"}
                </h5>
                <Dropdown>
                  <Dropdown.Toggle variant="purple" id="dropdown-custom-components">
                    Selecionar Plano
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    {plans.length > 0 ? (
                      plans.map((plan) => (
                        <Dropdown.Item
                          key={plan.id}
                          onClick={() => {
                            setSelectedPlan(plan);  // Seleciona o plano
                          }}
                        >
                          {plan.nome}
                        </Dropdown.Item>
                      ))
                    ) : (
                      <Dropdown.Item disabled>
                        Nenhum plano disponível
                      </Dropdown.Item>
                    )}
                  </Dropdown.Menu>
                </Dropdown>
              </Card.Header>
              <Card.Body>
                <Tabs activeKey={activeTab} onSelect={handleTabSelect} id="controlled-tab-example" className="mb-3 tabpag">
                  <Tab eventKey="home" title="Passo 1: Escolha a qnt de contas">
                    <PagFuncionarios setNContas={setNContas} nContas={nContas} completeStep={() => completeStep(0)} />
                  </Tab>
                  <Tab eventKey="profile" title="Passo 2: Pagamento" disabled={!completedSteps[0]}>
                    <PaymentForm selectedPlan={{ name: selectedPlan?.nome, price: totalPrice }} completeStep={() => completeStep(1)} />
                  </Tab>
                  <Tab eventKey="contact" title="Passo 3: Criar Contas" disabled={!completedSteps[1]}>
                    <CriarContasFuncionarios
                      nContas={nContas}
                      empresaId={empresaId}
                      planoSelecionado={selectedPlan}
                      setResultados={setResultados}  // Passando setResultados corretamente
                    />
                  </Tab>
                </Tabs>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default MyCard;
