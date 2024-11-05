import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card } from 'react-bootstrap';
import '../css/Planos.css';
import '../css/SideBar.css';
import { GiCancel } from 'react-icons/gi';
import { PlusCircle } from 'lucide-react';
import { SquareChartGantt, CopyPlus, ChevronDown, LogOut, FilterX, CircleX, UserRoundPen } from 'lucide-react';
import { parseJwt } from '../Components/jwtUtils';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider";

const Compras = () => {
    const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [perfil, setPerfil] = useState({});
    const [compras, setCompras] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [empresaId, setEmpresaId] = useState(null);
    const [tipoUsuario, setTipoUsuario] = useState(null);
    const [data, setData] = useState([]);

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

    // iniciais na foto de perfil
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


    const planoNomes = {
        1: "Bem-Estar",
        2: "Equilíbrio",
        3: "Transformação",
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
                setError('Erro ao carregar as compras');
            } finally {
                setLoading(false);
            }
        };

        fetchCompras();
    }, []);

    // Filtrar e consolidar as compras pelo ID da empresa e plano
const comprasFiltradas = compras
.filter(compra => compra.id_empresa === empresaId)
.reduce((acumulado, compra) => {
    if (acumulado[compra.id_plano]) {
        acumulado[compra.id_plano].qtd_funcionarios += compra.qtd_funcionarios;
    } else {
        acumulado[compra.id_plano] = { ...compra };
    }
    return acumulado;
}, {});

// Converter o objeto consolidado em uma lista para renderização
const comprasConsolidadas = Object.values(comprasFiltradas);

    return (
        <>
            {/* Sidebar */}

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
                    <Link to="/seuplano"><div className="nav-button">
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

            <Container className={`planCard ${isSidebarCollapsed ? 'collapsed' : 'expanded'}`}>
        <h2 className="titleseuplano">Planos Comprados</h2>
        <Row>
            {comprasConsolidadas.length > 0 ? (
                comprasConsolidadas.map(compra => (
                    <Col md={6} key={compra.id} className="mb-4">
                        <Card className='cardseuplano'>
                            <Card.Body className='seuplanobody'>
                                <Card.Title>{planoNomes[compra.id_plano] || "Desconhecido"}</Card.Title>
                                <Card.Text>
                                    Quantidade de Funcionários: {compra.qtd_funcionarios}
                                </Card.Text>
                            </Card.Body>
                            <div className='upgrade'>
                                <button className='cancelbtn'><GiCancel className='cancelicon' /> Cancelar</button>
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
                        <a href='/planos'>
                            <button className="addplanbtn"><PlusCircle className='plusicon' />Adicionar Plano</button>
                        </a>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    </Container>
        </>
    );
};

export default Compras;