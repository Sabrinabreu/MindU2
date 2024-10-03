import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import '../css/Dashboard.css';
import '../css/SideBar.css';
import axios from "axios";
import { SquareChartGantt, CopyPlus, ChevronDown, LogOut, FilterX } from 'lucide-react';
import BAPO from "../Components/WidgetBAPO";
import { parseJwt } from '../Components/jwtUtils';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider";

const Dashboard = () => {
    const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [perfil, setPerfil] = useState({});
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [cards, setCards] = useState([]);

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

    useEffect(() => {
        fetchCards();
    }, []);

    const fetchCards = async () => {
        try {
            const response = await axios.get('http://localhost:3001/contaFuncionarios', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            setCards(response.data);
        } catch (error) {
            console.error('Erro ao buscar os dados dos funcionários:', error);
        }
    };

    const toggleSidebar = () => {
        setSidebarCollapsed(!isSidebarCollapsed);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredCards = cards.filter(card => {
        const nomeFunc = card.nomeFunc ? card.nomeFunc.toLowerCase() : "";  // Verifique se card.nomeFunc existe
        const matchesSearch = nomeFunc.includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === "all" || card.categoria === selectedCategory;
        return matchesSearch && matchesCategory;
    });
    

    const resetFilter = () => {
        setSelectedCategory("all");
    };

    return (
        <>
            <BAPO />

            {/* Sidebar */}

            <div id="navbar" className={isSidebarCollapsed ? 'collapsed' : ''}>
                <input id="nav-toggle" type="checkbox" onChange={toggleSidebar} />
                <div id="nav-header">
                    <div className={`nav-title ${isSidebarCollapsed ? 'hidden' : ''}`}>
                        <h5>Dashboard</h5>
                    </div>
                    <label htmlFor="nav-toggle">
                        <span id="nav-toggle-burger"></span>
                    </label>
                    <hr />
                </div>
                <div id="nav-content">
                    <div className="nav-button">
                        <i className="fas"><SquareChartGantt /></i><span>Seu Plano</span>
                    </div>
                    <div className="nav-button">
                        <i className="fas"><CopyPlus /></i><span>Adicionar Funcionários</span>
                    </div>
                    <div id="nav-content-highlight"></div>
                </div>
                <input id="nav-footer-toggle" type="checkbox" />
                <div id="nav-footer">
                    <div id="nav-footer-heading">
                        <div id="nav-footer-avatar">
                            <img src="https://gravatar.com/avatar/4474ca42d303761c2901fa819c4f2547" alt="Avatar" />
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

            {/* Filtro */}

            <div className={`dashboard ${isSidebarCollapsed ? 'collapsed' : 'expanded'}`}>
                <aside class="search-wrap" >
                    <div className={`filter ${selectedCategory !== 'all' ? 'filter-selected' : ''}`}>
                        <label htmlFor="categoryFilter">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={`filtersvg ${selectedCategory !== 'all' ? 'hidden' : ''}`}
                            ><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                            </svg>
                            {selectedCategory !== 'all' && <FilterX className="filterx" onClick={resetFilter} />}
                        </label>
                        <select
                            id="categoryFilter"
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                            <option value="all">Todos</option>
                            <option value="CEO">CEO</option>
                            <option value="Chairman">Chairman</option>
                            <option value="Head of Digital">Head of Digital</option>
                        </select>
                    </div>
                    <div className="search">
                        <label for="search">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z" /></svg>

                            <input type="text" id="busca"
                                placeholder="Procurar funcionário..."
                                value={searchTerm}
                                onChange={handleSearchChange}  />
                        </label>
                    </div>
                </aside>

                {/* Cards */}

                <main class="content-wrap">
                    <div class="content">
                        <section class="person-boxes">
                        <Container className="cards">
                                <Row>
                                    {filteredCards.length > 0 ? (
                                        filteredCards.map((card) => (
                                            <Col lg={4} md={6} sm={6} xs={12} key={card.id}>
                                                <div className="person-box">
                                                    <div className="box-avatar">
                                                        <img src={card.foto} alt={card.nomeFunc} />
                                                    </div>
                                                    <div className="box-bio">
                                                        <h2 className="bio-name">{card.nomeFunc}</h2>
                                                        <p className="bio-position">{card.categoria}</p>
                                                    </div>
                                                    <div className="box-actions">
                                                        <button>
                                    
                                                        </button>
                                                    </div>
                                                </div>
                                            </Col>
                                        ))
                                    ) : (
                                        <Col className="notFound">
                                            <p>Nenhum Funcionário Encontrado :(</p>
                                        </Col>
                                    )}
                                </Row>
                            </Container>
                        </section>
                    </div>
                </main>
            </div>
        </>
    );
};

export default Dashboard;