//Cadastro
import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import '../css/Dashboard.css';
import '../css/SideBar.css';
import { SquareChartGantt } from 'lucide-react';
import { CopyPlus } from 'lucide-react';
import { ChevronDown } from 'lucide-react';
import { LogOut } from 'lucide-react';
import BAPO from "../Components/WidgetBAPO";

const Cadastro = () => {
    const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");

    const toggleSidebar = () => {
        setSidebarCollapsed(!isSidebarCollapsed);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };
    const [cards, setCards] = useState([

        {
            nomeFunc: "Frederic Levy",
            foto: <img src="https://images.unsplash.com/photo-1495791085242-4abf2dcc3be3?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=30e718c0d1804c6365c73fc48419505d&auto=format&fit=crop&w=140&q=80" alt="Frederic Levy, Chief Executive Officer" />,
            id: 1,
            link: '/CadFuncionarios',
            categoria: "CEO"
        },

        {
            nomeFunc: "Robert Smaghi",
            foto: <img src="https://images.unsplash.com/photo-1495147334217-fcb3445babd5?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=35fc38ccdb26717006d7b48f79a2bb83&auto=format&fit=crop&w=140&q=80" alt="Robert Smaghi, Chairman" />,
            id: 2,
            link: '/CadFuncionarios',
            categoria: "Chairman"
        },

        {
            nomeFunc: "Victoire Durand",
            foto: <span class="no-name">VD</span>,
            id: 3,
            link: '/CadFuncionarios',
            categoria: "head of digital"
        },

        {
            nomeFunc: "John Connely",
            foto: <img src="https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=afb35d2683e102d67bcd70b87b100723&auto=format&fit=crop&w=140&q=80" alt="John Connely, Head of Digital" />,
            id: 4,
            link: '/CadFuncionarios'
        },

        {
            nomeFunc: "Gerart Rotchet",
            foto: <span class="no-name">GR</span>,
            id: 5,
            link: '/CadFuncionarios'
        },

        {
            nomeFunc: "Nathalie Mestralet",
            foto: <img src="https://images.unsplash.com/photo-1511019621063-1bd36feaece2?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=e81c3e03912567cee323dc6993f88fe4&auto=format&fit=crop&w=140&q=80" alt="Nathalie Mestralet, Head of Trading" />,
            id: 6,
            link: '/CadFuncionarios'
        },

        {
            nomeFunc: "Alexandra Johnson",
            foto: <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=5d43ec18ec2cf6ff854513b9e8395c1e&auto=format&fit=crop&w=140&q=80" alt="Alexandra Johnson, Head of Human Resources" />,
            id: 7,
            link: '/CadFuncionarios'
        },

        {
            nomeFunc: "Herve De Rinel",
            foto: <img src="https://images.unsplash.com/photo-1506085452766-c330853bea50?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=c90ef12b4dc22a4a4c277dd056dd0b7e&auto=format&fit=crop&w=140&q=80" alt="Herve De Rinel, Head of International" />,
            id: 8,
            link: '/CadFuncionarios'
        }

    ]);

    const filteredCards = cards.filter(card => {
        const matchesSearch = card.nomeFunc.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === "all" || card.categoria === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <>
            <BAPO />

            {/* Sidebar */}

            <div id="navbar" className={isSidebarCollapsed ? 'collapsed' : ''}>
                <input id="nav-toggle" type="checkbox" onChange={toggleSidebar} />
                <div id="nav-header">
                    <div className={`nav-title ${isSidebarCollapsed ? 'hidden' : ''}`}>
                        Dashboard
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
                    <div className="nav-button">
                        <i className="fas fa-thumbtack"></i><span>Pinned Items</span>
                    </div>
                    <hr />
                    <div className="nav-button">
                        <i className="fas fa-heart"></i><span>Following</span>
                    </div>
                    <div className="nav-button">
                        <i className="fas fa-chart-line"></i><span>Trending</span>
                    </div>
                    <div className="nav-button">
                        <i className="fas fa-fire"></i><span>Challenges</span>
                    </div>
                    <div className="nav-button">
                        <i className="fas fa-magic"></i><span>Spark</span>
                    </div>
                    <hr />
                    <div className="nav-button">
                        <i className="fas fa-gem"></i><span>Codepen Pro</span>
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
                                target="_blank" rel="noopener noreferrer">Empresa</a>
                            <span id="nav-footer-subtitle">Admin</span>
                        </div>
                        <label htmlFor="nav-footer-toggle">
                            <i className="fas"> <ChevronDown /></i>
                        </label>
                    </div>
                    <div id="nav-footer-content">
                       <button className="logout">Sair<LogOut className="logsvg"/></button>
                    </div>
                </div>
            </div>

            {/* Final Sidebar */}

            {/* Filtro */}

            <div className={`dashboard ${isSidebarCollapsed ? 'collapsed' : 'expanded'}`}>
                <aside class="search-wrap" >
                    <div className="filter">
                        <label htmlFor="categoryFilter"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" className="filtersvg"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" /></svg></label>
                        <select
                            id="categoryFilter"
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                            <option value="all">Todos</option>
                            <option value="CEO">CEO</option>
                            <option value="Chairman">Chairman</option>
                            <option value="Head of Digital">Head of Digital</option>
                            {/* Adicione mais opções conforme necessário */}
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

                {/* Fim do Filtro */}

                {/* Cards */}

                <main class="content-wrap">
                    <div class="content">
                        <section class="person-boxes">
                            <Container className="cards">
                                <Row >
                                    {filteredCards.length > 0 ? (
                                        filteredCards.map((card) => (
                                            <Col lg={4} md={4} sm={6} xs={12} key={card.id}>
                                                <div className="person-box">
                                                    <div className="box-avatar">
                                                        {card.foto}
                                                    </div>
                                                    <div className="box-bio">
                                                        <h2 className="bio-name">{card.nomeFunc}</h2>
                                                        <p className="bio-position">{card.categoria}</p>
                                                    </div>
                                                    {/* <div className="card text-dark card-has-bg click-col">
                                                        <div className="card-img-overlay d-flex flex-column">
                                                            <div className="card-body">
                                                                <p className="icone">{card.icone}</p>
                                                            </div>
                                                        </div>
                                                    </div> */}
                                                    <div class="box-actions">
                                                        <button>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="boxsvg"><path d="M6.855 14.365l-1.817 6.36a1.001 1.001 0 0 0 1.517 1.106L12 18.202l5.445 3.63a1 1 0 0 0 1.517-1.106l-1.817-6.36 4.48-3.584a1.001 1.001 0 0 0-.461-1.767l-5.497-.916-2.772-5.545c-.34-.678-1.449-.678-1.789 0L8.333 8.098l-5.497.916a1 1 0 0 0-.461 1.767l4.48 3.584zm2.309-4.379c.315-.053.587-.253.73-.539L12 5.236l2.105 4.211c.144.286.415.486.73.539l3.79.632-3.251 2.601a1.003 1.003 0 0 0-.337 1.056l1.253 4.385-3.736-2.491a1 1 0 0 0-1.109-.001l-3.736 2.491 1.253-4.385a1.002 1.002 0 0 0-.337-1.056l-3.251-2.601 3.79-.631z" /></svg>
                                                        </button>

                                                        <button>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="boxsvg"><path d="M18 18H6V6h7V4H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-8h-2v7z" /><path d="M17.465 5.121l-6.172 6.172 1.414 1.414 6.172-6.172 2.12 2.121L21 3h-5.657z" /></svg>
                                                        </button>

                                                        <button>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="boxsvg"><path d="M12 3C6.486 3 2 6.364 2 10.5c0 2.742 1.982 5.354 5 6.678V21a.999.999 0 0 0 1.707.707l3.714-3.714C17.74 17.827 22 14.529 22 10.5 22 6.364 17.514 3 12 3zm0 13a.996.996 0 0 0-.707.293L9 18.586V16.5a1 1 0 0 0-.663-.941C5.743 14.629 4 12.596 4 10.5 4 7.468 7.589 5 12 5s8 2.468 8 5.5-3.589 5.5-8 5.5z" /></svg>
                                                        </button>

                                                        <button>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="boxsvg"><path d="M19 8L17 8 17 11 14 11 14 13 17 13 17 16 19 16 19 13 22 13 22 11 19 11zM3 20h10c.553 0 1-.447 1-1v-.5c0-2.54-1.212-4.651-3.077-5.729C11.593 12.063 12 11.1 12 10c0-2.28-1.72-4-4-4s-4 1.72-4 4c0 1.1.407 2.063 1.077 2.771C3.212 13.849 2 15.96 2 18.5V19C2 19.553 2.448 20 3 20zM6 10c0-1.178.822-2 2-2s2 .822 2 2-.822 2-2 2S6 11.178 6 10zM8 14c2.43 0 3.788 1.938 3.977 4H4.023C4.212 15.938 5.57 14 8 14z" /></svg>
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

export default Cadastro;
