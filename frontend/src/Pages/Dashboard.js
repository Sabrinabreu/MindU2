import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import '../css/Dashboard.css';
import axios from "axios";
import Sidebar from '../Components/SideBar';
import { parseJwt } from '../Components/jwtUtils';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider";

const Dashboard = () => {
    const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [perfil, setPerfil] = useState({});
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [data, setData] = useState([]);

    const { setToken } = useAuth();
    const navegacao = useNavigate();
    const token = localStorage.getItem('token');
    const decodedToken = parseJwt(token);

    useEffect(() => {
        setPerfil(decodedToken.perfil);
    }, []);

    useEffect(() => {
        axios
            .get('http://localhost:3001/contafuncionarios', {
                params: { loginMethod: 'email' },
            })
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.error("Erro ao buscar os dados:", error);
            });
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setToken(null);
        navegacao("/", { replace: true });
    };

    const toggleSidebar = () => {
        setSidebarCollapsed((prevState) => !prevState);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredCards = data.filter((contafuncionarios) => {
        const nome = contafuncionarios.nome ? contafuncionarios.nome.toLowerCase() : "";
        const matchesSearch = nome.includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === "all" || contafuncionarios.cargo === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <>
            <Sidebar
                perfil={perfil}
                isCollapsed={isSidebarCollapsed}
                toggleSidebar={toggleSidebar}
                handleLogout={handleLogout}
            />

            <div className={`dashboard ${isSidebarCollapsed ? 'collapsed' : 'expanded'}`}>
                {/* Filtro */}
                <aside className="search-wrap">
                    <div className={`filter ${selectedCategory !== 'all' ? 'filter-selected' : ''}`}>
                        <label htmlFor="categoryFilter">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={`filtersvg ${selectedCategory !== 'all' ? 'hidden' : ''}`}>
                                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                            </svg>
                            {selectedCategory !== 'all' && <span onClick={() => setSelectedCategory("all")}>Resetar Filtro</span>}
                        </label>
                        <select id="categoryFilter" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                            <option value="all">Todos</option>
                            <option value="Bem-Estar">Plano Bem-Estar</option>
                            <option value="Equilíbrio">Plano Equilíbrio</option>
                            <option value="Transformação">Plano Transformação</option>
                        </select>
                    </div>
                    <div className="search">
                        <label htmlFor="search">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                <path d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z" />
                            </svg>
                            <input type="text" id="busca" placeholder="Procurar funcionário..." value={searchTerm} onChange={handleSearchChange} />
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
                                                        <p className="bio-position">Plano {contafuncionarios.nomePlano}</p>
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

