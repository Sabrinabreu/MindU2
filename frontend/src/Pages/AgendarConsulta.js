import React, { useState } from 'react';
import "../css/AgendarConsulta.css";
import perfilPsicologo from '../img/perfilPsicologo.jfif';
import perfilPsicologa from '../img/perfilPsicologa.jfif';
import perfilPsicologaclinica from '../img/perfilPsicologaclinica.png';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { BrowserRouter as Link } from 'react-router-dom';
import { Container, Row, Col, Form } from 'react-bootstrap';

function AgendarConsulta() {
  const [activeTabs, setActiveTabs] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('nome'); // Nome, Profissão, Local

  const slidesContent = [
    {
      foto: perfilPsicologa,
      title: "Marina Romeo da Silva",
      profissao: "Psicólogo Psicanalista",
      local: "Cornélio Procópio - PR",
      sessao: "Duração da sessão",
      hora: "2 horas",
      valor: "sessão: R$200,00",
      rating: 5,
      tabs: [
        { eventKey: "agenda", title: "Agenda", content: "Conteúdo da Agenda para Marina." },
        { eventKey: "servicos", title: "Serviços", content: "Conteúdo dos Serviços para Marina." },
        { eventKey: "sobre", title: "Sobre Mim", content: "Sou Psicóloga Clínica pela Universidade Paulista, atuo com a abordagem Psicanalítica. Tenho experiência com atendimento psicológico de pessoas que estão passando pela depressão, transtorno de ansiedade, conflitos amorosos, conflitos familiares e problemas de autoestima. A psicanálise é uma metodologia de tratamento em psicologia que recai seu enfoque sobre os processos mentais inconscientes." }
      ]
    },
    {
      foto: perfilPsicologo,
      title: "Flávio Monteiro Lobato",
      profissao: "Psicólogo Cognitivo",
      local: "Cornélio Procópio - PR",
      sessao: "Duração da sessão",
      hora: "1 hora",
      valor: "sessão: R$100,00",
      rating: 5,
      tabs: [
        { eventKey: "agenda", title: "Agenda", content: "Conteúdo da Agenda para Flávio." },
        { eventKey: "servicos", title: "Serviços", content: "Conteúdo dos Serviços para Flávio." },
        { eventKey: "sobre", title: "Sobre Mim", content: "Conteúdo de Sobre Mim para Flávio." }
      ]
    },
    {
      foto: perfilPsicologaclinica,
      title: "Cris da Silva de Brázino",
      profissao: "Psicóloga Clinica",
      local: "São Bernardo - SP",
      sessao: "Duração da sessão",
      hora: "2 horas",
      valor: "sessão: R$350,00",
      rating: 5,
      tabs: [
        { eventKey: "agenda", title: "Agenda", content: "Conteúdo da Agenda para Cris." },
        { eventKey: "servicos", title: "Serviços", content: "Conteúdo dos Serviços para Cris." },
        { eventKey: "sobre", title: "Sobre Mim", content: "Conteúdo de Sobre Mim para Cris." }
      ]
    }
  ];

  const filteredSlidesContent = slidesContent.filter(slide => {
    const term = searchTerm.toLowerCase();
    return (
      (filterType === 'nome' ? slide.title.toLowerCase().includes(term) : true) &&
      (filterType === 'profissao' ? slide.profissao.toLowerCase().includes(term) : true) &&
      (filterType === 'local' ? slide.local.toLowerCase().includes(term) : true)
    );
  });

  return (
    <div className='fundo p-4'>
      <Container>

        <div className="d-flex mb-4 align-items-center">
          {/* Filtro Seleção */}
          <Form.Control
            as="select"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="dropFilter mr-2 "
          >
            <option value="nome">Nome</option>
            <option value="profissao">Profissão</option>
            <option value="local">Localização</option>
          </Form.Control>

          {/* Campo de Busca */}
          <Form.Control
            type="text"
            placeholder={`Buscar por ${filterType === 'nome' ? 'nome' : filterType === 'profissao' ? 'profissão' : 'localização'}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="busca flex-grow-1 search-input"
          />
        </div>

        <h2 className='tituloAgenda'>Agendar Consulta</h2>

        {filteredSlidesContent.length > 0 ? (
          filteredSlidesContent.map((slide, index) => {
            const activeTab = activeTabs[index] || 'agenda';

            return (
              <Row key={index} className="mb-4">
                <Col md={12}>
                  <div className="cardAgenda">
                    <div className="content-container">
                      <img className='imgPerfil' src={slide.foto} alt="Foto de Perfil" />
                      <div className="primeiro">
                        <h3 className='nomeAgenda'>{slide.title}</h3>
                        <p className='profissao'>{slide.profissao}</p>
                        <p className='local'>{slide.local}</p>
                        <div className="estrelas">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className={`star ${i < slide.rating ? 'filled' : ''}`}></span>
                          ))}
                        </div>
                      </div>
                      <div className='segundo'>
                        <Col className='p-2'>
                          <button className='sessao'>{slide.sessao}<br /><b className='hora'>{slide.hora}</b></button>
                        </Col>
                        <Col>
                          <button className='valor'>{slide.valor}</button>
                        </Col>
                      </div>
                    </div>
                    <div className="tabs-container">
                      <Tabs
                        defaultActiveKey="agenda"
                        id={`tabs-${index}`}
                        className=""
                        fill
                        activeKey={activeTab}
                        onSelect={(k) => setActiveTabs(prev => ({ ...prev, [index]: k }))}
                      >
                        {slide.tabs.map((tab, i) => (
                          <Tab key={i} className='tabText p-3' eventKey={tab.eventKey} title={tab.title}>
                            <p>{tab.content}</p>
                            {tab.eventKey === 'sobre' && activeTab === 'sobre' && (
                               <Link to="/saibamais" className='saibaMais mt-3'>
                               Saiba mais
                             </Link>
                            )}
                          </Tab>
                        ))}
                      </Tabs>
                    </div>
                  </div>
                </Col>
              </Row>
            );
          })
        ) : (
          <p>Nenhum psicólogo encontrado.</p>
        )}
      </Container>
    </div>
  );
}

export default AgendarConsulta;
