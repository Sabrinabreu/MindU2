import React, { useState, useEffect } from 'react';
import "../css/AgendarConsulta.css";
import { Container, Row, Col, Form } from 'react-bootstrap';
import axios from 'axios';
import BAPO from "../Components/WidgetBAPO";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import perfilPsicologo from '../img/perfilPsicologo.jfif';
import perfilPsicologa from '../img/perfilPsicologa.jfif';
import perfilPsicologaclinica from '../img/perfilPsicologaclinica.png';
import perfilPsicanalista from '../img/perfilPsicanalista.jpeg';
import perfilEscolar from '../img/perfilEscolar.avif';
import perfilOrganizacional from '../img/perfilOrganizacional.avif';
import perfilclinico from '../img/perfilClinico.jpg';
import { Link } from 'react-router-dom';

function AgendarConsulta() {
  const [activeTabs, setActiveTabs] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const [selectedProfession, setSelectedProfession] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const [data, setData] = useState([]);

  useEffect(() => {
    console.log('Dados:', data);
  }, [data]);

  useEffect(() => {
    axios.get('http://localhost:3001/psicologos')
      .then(response => {
        console.log('Dados recebidos:', response.data);
        setData(response.data);
      })
      .catch(error => {
        console.error("Erro ao buscar os dados:", error);
      });
  }, []);

  const tabs = [
    {
      id: 1,
      foto: perfilPsicologa,
      tabs: [
        { eventKey: "sobre", title: "Sobre Mim", content: "Sou Psicóloga pela Universidade Paulista, atuo com a abordagem Psicanalítica." },
        { eventKey: "servicos", title: "Serviços", content: "Atendimento psicológico de pessoas que estão passando pela depressão." },
        { eventKey: "agenda", title: "Agenda", content: "Conteúdo da Agenda para Marina." }
      ]
    },
    {
      id: 2,
      foto: perfilPsicologo,
      tabs: [
        { eventKey: "sobre", title: "Sobre Mim", content: "Conteúdo de Sobre Mim para Flávio." },
        { eventKey: "servicos", title: "Serviços", content: "Conteúdo dos Serviços para Flávio." },
        { eventKey: "agenda", title: "Agenda", content: "Conteúdo da Agenda para Flávio." }
      ]
    },
    {
      id: 3,
      foto: perfilPsicologaclinica,
      tabs: [
        { eventKey: "sobre", title: "Sobre Mim", content: "Conteúdo de Sobre Mim para Cris." },
        { eventKey: "servicos", title: "Serviços", content: "Conteúdo dos Serviços para Cris." },
        { eventKey: "agenda", title: "Agenda", content: "Conteúdo da Agenda para Cris." }
      ]
    },
    {
      id: 4,
      foto: perfilPsicanalista,
      tabs: [
        { eventKey: "sobre", title: "Sobre Mim", content: "Conteúdo de Sobre Mim para Roberto." },
        { eventKey: "servicos", title: "Serviços", content: "Conteúdo dos Serviços para Roberto." },
        { eventKey: "agenda", title: "Agenda", content: "Conteúdo da Agenda para Roberto." }
      ]
    },
    {
      id: 5,
      foto: perfilEscolar,
      tabs: [
        { eventKey: "sobre", title: "Sobre Mim", content: "Conteúdo de Sobre Mim para Lidiane." },
        { eventKey: "servicos", title: "Serviços", content: "Conteúdo dos Serviços para Lidiane." },
        { eventKey: "agenda", title: "Agenda", content: "Conteúdo da Agenda para Lidiane." }
      ]
    },
    {
      id: 6,
      foto: perfilOrganizacional,
      tabs: [
        { eventKey: "sobre", title: "Sobre Mim", content: "Conteúdo de Sobre Mim para Marilia." },
        { eventKey: "servicos", title: "Serviços", content: "Conteúdo dos Serviços para Marilia." },
        { eventKey: "agenda", title: "Agenda", content: "Conteúdo da Agenda para Marilia." }
      ]
    },
    {
      id: 7,
      foto: perfilclinico,
      tabs: [
        { eventKey: "sobre", title: "Sobre Mim", content: "Conteúdo de Sobre Mim para Caio." },
        { eventKey: "servicos", title: "Serviços", content: "Conteúdo dos Serviços para Caio." },
        { eventKey: "agenda", title: "Agenda", content: "Conteúdo da Agenda para Caio." }
      ]
    }

  ];

  const professionOptions = [
    "Psicólogo Psicanalista",
    "Psicólogo Cognitivo",
    "Psicóloga Clínica",
    "Psicólogo Clínico",
    "Psicóloga Escolar",
    "Psicóloga Organizacional",
  ];

  const filteredCards = data.filter(psicologo => {
    const term = searchTerm.toLowerCase();
    const isMatchingProfession = selectedProfession === '' || psicologo.especialidade.toLowerCase().includes(selectedProfession.toLowerCase());
    const isMatchingSearchTerm = filterType === 'nome' ? psicologo.nome.toLowerCase().includes(term) :
      filterType === 'local' ? psicologo.localizacao.toLowerCase().includes(term) :
        true; // Se nenhum filtro específico, não filtra

    return isMatchingProfession && isMatchingSearchTerm;
  });


  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  return (
    <>
      <BAPO />
      <div className='fundoFiltro'>
        <div className="d-flex mb-4 align-items-center ">
          <Form.Control
            as="select"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="dropFilter mr-2"
          >
            <option value="">Selecionar <p className="setaSelecionar">→</p></option>
            <option value="nome" className={filterType === 'nome' ? 'selected-option' : ''}>Nome</option>
            <option value="profissao" className={filterType === 'profissao' ? 'selected-option' : ''}>Profissão</option>
            <option value="local" className={filterType === 'local' ? 'selected-option' : ''}>Localização</option>
          </Form.Control>

          {filterType === 'profissao' && (
            <Form.Control
              as="select"
              value={selectedProfession}
              onChange={(e) => setSelectedProfession(e.target.value)}
              className="buscaPor mr-2"
            >
              <option value="" className={selectedProfession === '' ? 'selected-option' : ''}>Todas as profissões...</option>
              {professionOptions.map((profession, index) => (
                <option key={index} value={profession} className={selectedProfession === profession ? 'selected-option' : ''}>{profession}</option>
              ))}
            </Form.Control>
          )}

          {filterType !== 'profissao' && (
            <Form.Control
              type="text"
              placeholder={`Buscar por ${filterType || '...'}`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="buscaPor mr-2"
            />
          )}

          <div className="searchA">
            {isLoading ? 'Buscando...' : 'Buscar'}
          </div>
        </div>
      </div>

      <Container>
        <h2 className='tituloAgenda p-4'>Agendar Consulta</h2>
        <Col md={12}>
          {filteredCards.length > 0 ? (
            filteredCards.map(psicologo => (
              <div key={psicologo.psicologo_id} className="cardAgenda">
                <div className="content-container">
                  <img className='imgPerfil' src={psicologo.foto} alt="Foto de Perfil" />
                  <div className="primeiro">
                    <h3 className='nomeAgenda'>{psicologo.nome}</h3>
                    <p className='profissao'>{psicologo.crp}</p>
                    <p className='profissao'>{psicologo.especialidade}</p>
                    <p className='local'>{psicologo.localizacao}</p>
                    <div className="estrelas">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={`star ${i < psicologo.rating ? 'filled' : ''}`}></span> 
                      ))}
                    </div> 
                  </div>
                  <div className='segundo'>
                    <Col className='p-2'>
                      <div className='sessao'>Duração da Sessão<br /><b className='hora'>1 Hora</b></div>
                    </Col>
                  </div>
                  <div className="tabs-container">
                    <Tabs
                      defaultActiveKey="agenda"
                      id={`tabs-${psicologo.psicologo_id}`}
                      fill
                      activeKey={activeTabs[psicologo.psicologo_id] || 'agenda'}
                      onSelect={(k) => setActiveTabs(prev => ({ ...prev, [psicologo.psicologo_id]: k }))}>
                      {tabs.find(t => t.id === psicologo.psicologo_id)?.tabs.map((tab, i) => (
                        <Tab key={i} className='tabText p-3' eventKey={tab.eventKey} title={tab.title}>
                          {tab.eventKey === 'agenda' ? (
                            <Link to={`/psicologo/${psicologo.psicologo_id}`} className="agendarBot mt-3">
                              Agendar
                            </Link>
                          ) : (
                            <p>{tab.content}</p>
                          )}
                          {tab.eventKey === 'sobre' && activeTabs[psicologo.psicologo_id] === 'sobre' && (
                            <Link to={`/psicologo/${psicologo.psicologo_id}`} className="agendarBot mt-3">
                              Saiba mais
                            </Link>
                          )}
                        </Tab>
                      ))}
                    </Tabs>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className='semResultado'>Nenhum resultado encontrado.</div>
          )}
        </Col>
      </Container>
    </>
  );
}

export default AgendarConsulta;
