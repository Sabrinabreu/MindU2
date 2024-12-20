import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import '../css/Dashboard.css';
import axios from "axios";
import Sidebar from '../Components/SideBar';
import { parseJwt } from '../Components/jwtUtils';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider";
import FotoPerfil from '../Components/FotoPerfil';
import BAPO from "../Components/WidgetBAPO";
import "../css/WidgetBAPO.css";

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
    
        return matchesSearch;
    });

    return (
        <>
            <BAPO />
            <Sidebar
                perfil={perfil}
                isCollapsed={isSidebarCollapsed}
                toggleSidebar={toggleSidebar}
                handleLogout={handleLogout}
            />

            <div className={`dashboard ${isSidebarCollapsed ? 'collapsed' : 'expanded'}`}>
                {/* Filtro */}
                <aside className="search-wrap">
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
                                                        <FotoPerfil className="profile-image"
                                                            name={contafuncionarios.nome || ''}
                                                            src={contafuncionarios.foto_perfil ? `http://localhost:3001/uploads/${contafuncionarios.foto_perfil}` : null}
                                                            style={{
                                                                width: '100px', // Exemplo de largura específica
                                                                height: '100px', // Exemplo de altura específicaborder: '3px solid #4A90E2' // Exemplo de borda personalizada
                                                            }}
                                                        />

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
