import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import '../css/Dashboard.css';
import '../css/SideBar.css';
import axios from "axios";
import { SquareChartGantt, CopyPlus, ChevronDown, LogOut, FilterX, CircleX, UserRoundPen } from 'lucide-react';
import BAPO from "../Components/WidgetBAPO";
import { parseJwt } from '../Components/jwtUtils';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider";
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [perfil, setPerfil] = useState({});
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [data, setData] = useState([]);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [feedbackMessage, setFeedbackMessage] = useState(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        console.log('Dados:', data);
    }, [data]);

    useEffect(() => {
        axios.get('http://localhost:3001/contafuncionarios', {
            params: { loginMethod: 'email' }
        })
            .then(response => {
                console.log('Dados recebidos:', response.data);
                setData(response.data);
            })
            .catch(error => {
                console.error("Erro ao buscar os dados:", error);
            });
    }, []);


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


    const handleDeleteAccount = () => {
        setShowConfirmation(true);
    };

    const confirmDelete = async () => {
        // console.log("ID da empresa:", perfil.ID);
        // console.log("Token:", decodedToken);
        try {
            await axios.delete(`http://localhost:3001/empresa/delete/${perfil.ID}`);
            setError(false);
            navegacao('/');
            localStorage.removeItem('token');
            setToken(null);
            console.log("conta excluída com sucesso!");
            setFeedbackMessage("Conta excluída com sucesso!");
        } catch (error) {
            setError(false);
            console.error("Erro ao excluir conta:", error);
            setFeedbackMessage("Erro ao excluir conta.");
        } finally {
            setShowConfirmation(false);
        }
    };
    // A mensagem desaparece após 3 segundos
    useEffect(() => {
        if (feedbackMessage) {
            const timer = setTimeout(() => {
                setFeedbackMessage(null);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [feedbackMessage]);



    const cancelDelete = () => {
        setShowConfirmation(false);
    };

    const toggleSidebar = () => {
        setSidebarCollapsed(!isSidebarCollapsed);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredCards = data.filter(contafuncionarios => {
        const nome = contafuncionarios.nome ? contafuncionarios.nome.toLowerCase() : "";
        const matchesSearch = nome.includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === "all" || contafuncionarios.cargo === selectedCategory;
        return matchesSearch && matchesCategory;
    });


    const resetFilter = () => {
        setSelectedCategory("all");
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
    return (
        <>
            <BAPO />

            {feedbackMessage && (
                <div className={`confirmation-modal feedback-message ${error ? 'error' : 'success'}`}>
                    {feedbackMessage}
                </div>
            )}

            {/* Sidebar */}

            <div id="navbar" className={isSidebarCollapsed ? 'collapsed' : ''}>
                <input id="nav-toggle" type="checkbox" onChange={toggleSidebar} />
                <div id="nav-header">
                    <div className={`nav-title ${isSidebarCollapsed ? 'hidden' : ''}`}>
                        <h5>Dashboard</h5>
                    </div>
                    <label htmlFor="nav-toggle" 
                        tabIndex="0" 
                        role="button"
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault(); 
                                document.getElementById("nav-toggle").click();
                            }
                        }}
                    >
                        <span id="nav-toggle-burger"></span>
                    </label>
                    <hr />
                </div>
                <div id="nav-content">
                    <div className="nav-button">
                        <Link to="/seuplano">
                            <i className="fas"><SquareChartGantt /></i>
                            <span>Seu Plano</span>
                        </Link>
                    </div>
                    <div className="nav-button">
                        <Link to="/adicionarfuncionarios">
                            <i className="fas"><CopyPlus /></i>
                            <span>Adicionar Funcionários</span>
                        </Link>
                    </div>
                    <div className="nav-button">
                        <Link to="/perfilempresa">
                            <i className="fas"><UserRoundPen /></i>
                            <span>Perfil</span>
                        </Link>
                    </div>
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
                            <i  className="fas" 
                                tabIndex="0" 
                                role="button"
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        e.preventDefault();
                                        document.getElementById("nav-footer-toggle").click();
                                    }
                                }}> <ChevronDown /></i>
                        </label>
                    </div>
                    <div id="nav-footer-content">
                        <button onClick={handleLogout} className="logout">Sair<LogOut className="logsvg" /></button>
                        <button onClick={handleDeleteAccount} className="logout"> Deletar conta <CircleX className="logsvg" /> </button>

                        {showConfirmation && (
                            <>
                                <div className="overlay"></div>
                                <div className="confirmation-modal">
                                    <p>Tem certeza de que deseja deletar sua conta? Todos os funcionários associados a esta empresa também serão deletados.</p>
                                    <button onClick={confirmDelete} className="btn btn-danger confirm-button">Sim, deletar</button>
                                    <button onClick={cancelDelete} className="btn btn-secondary">Cancelar</button>
                                </div>
                            </>
                        )}
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
                            <option value="Plano1">Plano Bem-Estar</option>
                            <option value="Plano2">Plano Equilíbrio</option>
                            <option value="Plano3">Plano Transformação</option>
                        </select>
                    </div>
                    <div className="search">
                        <label for="search">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z" /></svg>

                            <input type="text" id="busca"
                                placeholder="Procurar funcionário..."
                                value={searchTerm}
                                onChange={handleSearchChange} />
                        </label>
                    </div>
                </aside>

                {/* Cards */}

                <main className="content-wrap">
                    <div className="content">
                        <section className="person-boxes">
                            <Container className="cards">
                                <Row>
                                    {filteredCards.length > 0 ? (
                                        filteredCards.map(contafuncionarios => (
                                            <Col lg={4} md={6} sm={6} xs={12}>
                                                <div key={contafuncionarios.id} className="person-box">
                                                    <div className="box-avatar">
                                                        <img src={contafuncionarios.foto} />
                                                    </div>
                                                    <div className="box-bio">
                                                        <h2 className="bio-name">{contafuncionarios.nome}</h2>
                                                        <p className="bio-position">{contafuncionarios.cargo}</p>
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