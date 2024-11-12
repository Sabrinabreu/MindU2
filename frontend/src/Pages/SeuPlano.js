import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { GiCancel } from 'react-icons/gi';
import { PlusCircle } from 'lucide-react';
import { parseJwt } from '../Components/jwtUtils';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "../provider/AuthProvider";
import Sidebar from '../Components/SideBar';
import BAPO from "../Components/WidgetBAPO";
import "../css/WidgetBAPO.css";


const Compras = () => {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [perfil, setPerfil] = useState({});
  const [compras, setCompras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [empresaId, setEmpresaId] = useState(null);

  const { setToken } = useAuth();
  const navegacao = useNavigate();
  const token = localStorage.getItem('token');
  const decodedToken = parseJwt(token);

  useEffect(() => {
    setPerfil(decodedToken.perfil);
  }, []);

  useEffect(() => {
    if (token) {
      const decodedToken = parseJwt(token);
      setEmpresaId(decodedToken.id_referencia);
    }
  }, [token]);

  useEffect(() => {
    const fetchPlanos = async () => {
      if (!empresaId) return;
      try {
        const response = await axios.get(`http://localhost:3001/empresa/${empresaId}/planos`);
        setCompras(response.data);
      } catch (err) {
        console.error('Erro ao carregar os planos da empresa', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlanos();
  }, [empresaId]);


  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    navegacao("/", { replace: true });
  };

  const toggleSidebar = () => {
    setSidebarCollapsed((prevState) => !prevState);
  };

  const cancelarPlano = () => {
    const confirmCancel = window.confirm(
      "Tem certeza de que deseja cancelar o seu plano? No próximo mês você não terá acesso às contas pertencentes a esse plano."
    );
    if (confirmCancel) {
      alert("O seu plano foi cancelado! No próximo mês você não terá acesso às contas pertencentes a esse plano.");
      // Adicione aqui qualquer outra lógica para cancelar o plano, se necessário
    }
  };

  return (
    <>
      <BAPO />
      <Sidebar
        perfil={perfil}
        isCollapsed={isSidebarCollapsed}
        toggleSidebar={toggleSidebar}
        handleLogout={handleLogout}
      />

      <Container className={`planCard ${isSidebarCollapsed ? 'collapsed' : 'expanded'}`}>
        <h2 className="titleseuplano">Planos Comprados</h2>
        <Row>
          {compras.length > 0 ? (
            compras.map(plano => (
              <Col md={6} key={plano.plano} className="mb-4">
                <Card className='cardseuplano'>
                  <Card.Body className='seuplanobody'>
                    <Card.Title>{plano.plano || "Desconhecido"}</Card.Title>
                    <Card.Text>
                      Quantidade de Funcionários: {plano.qtd_funcionarios}
                    </Card.Text>
                  </Card.Body>
                  <div className='upgrade'>
                    <button onClick={cancelarPlano} className='cancelbtn'>
                      <GiCancel className='cancelicon' /> Cancelar
                    </button>
                  </div>
                </Card>
              </Col>
            ))
          ) : (
            <Col>
              <Card>
                <Card.Body>
                  <Card.Text>Nenhum plano encontrado.</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          )}

          {/* Cartão para adicionar novo plano */}
          <Col md={6} className="mb-4">
            <Card className="add-plan-card cardaddplano">
              <Card.Body className="text-center">
                <Card.Title>Adicionar Novo Plano</Card.Title>
                <Card.Text>
                  Clique no botão abaixo para adicionar um novo plano à sua empresa.
                </Card.Text>
                <Link to='/planos'>
                  <button className="addplanbtn">
                    <PlusCircle className='plusicon' />Adicionar Plano
                  </button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Compras;