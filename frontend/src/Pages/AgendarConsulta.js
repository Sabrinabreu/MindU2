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
        { eventKey: "sobre", title: "Sobre Mim", content: "Sou Psicóloga pela Universidade Paulista, atuo com a abordagem Psicanalítica. Tenho experiência com atendimento psicológico de pessoas que estão passando pela depressão, transtorno de ansiedade, conflitos amorosos, conflitos familiares e problemas de autoestima." },
        {
          eventKey: "espeialidades",
          title: "Especialidades",
          content: (
            <div className="especialidades">
              {[
                { description: "Identidade" },
                { description: "Dinâmica familiar" },
                { description: "Comunicação" },
                { description: "Resolução de conflitos" },
                { description: "Autoestima e confiança" },
                { description: "Depressão" },
                { description: "Ansiedade" },
                { description: "transtorno obsessivo-compulsivo" },
              ].map((servico, index) => (
                <div key={index}>
                  <p className='especialidade'>{servico.description}</p>
                </div>
              ))}
            </div>
          ),
        },
        { eventKey: "agenda", title: "Agenda", content: "Clique aqui para ver a agenda de Marina e agendar sua consulta." }
      ]
    },
    {
      id: 2,
      foto: perfilPsicologo,
      tabs: [
        { eventKey: "sobre", title: "Sobre Mim", content: "Sou formado na Pontifícia Universidade Católica (PUC), atuo com a abordagem Humanista. Experiência com atendimento psicológico de pessoas que estão passando por perdas, luto, estresse, ansiedade e problemas de autoconfiança." },
        {
          eventKey: "espeialidades",
          title: "Especialidades",
          content: (
            <div className="especialidades">
              {[
                { description: "Transtornos mentais" },
                { description: "Atenção" },
                { description: "Insônia" },
                { description: "Pensamento negativos e distorcidos" },
                { description: "Autoestima e confiança" },
                { description: "Memória" },
                { description: "Luto" },
              ].map((servico, index) => (
                <div key={index}>
                  <p className='especialidade'>{servico.description}</p>
                </div>
              ))}
            </div>
          ),
        },
        { eventKey: "agenda", title: "Agenda", content: "Conteúdo da Agenda para Flávio." }
      ]
    },
    {
      id: 3,
      foto: perfilPsicologaclinica,
      tabs: [
        { eventKey: "sobre", title: "Sobre Mim", content: "Sou Psicólogo pela Universidade Federal do Rio de Janeiro e atuo com a abordagem Sistêmica. Minha experiência inclui atendimento a famílias e indivíduos que enfrentam conflitos familiares, problemas de relacionamento, estresse e ansiedade. Meu objetivo é ajudar meus pacientes a encontrar soluções duradouras e melhorar sua qualidade de vida." },
        {
          eventKey: "espeialidades",
          title: "Especialidades",
          content: (
            <div className="especialidades">
              {[
                { description: "Ansiedade" },
                { description: "Apoio a doenças crônicas" },
                { description: "Saúde mental de crianças e adolescentes" },
                { description: "Luto e perda" },
                { description: "Coping e resiliência" },
                { description: "Resolução de conflitos" },
                { description: "Trabalho" },
              ].map((servico, index) => (
                <div key={index}>
                  <p className='especialidade'>{servico.description}</p>
                </div>
              ))}
            </div>
          ),
        },
        { eventKey: "agenda", title: "Agenda", content: "Conteúdo da Agenda para Cris." }
      ]
    },
    {
      id: 4,
      foto: perfilPsicanalista,
      tabs: [
        { eventKey: "sobre", title: "Sobre Mim", content: "Com formação pela Universidade Estadual de Campinas e abordagem Psicodinâmica, meu foco é ajudar meus pacientes a entender e superar seus padrões de pensamento e comportamento negativos. Tenho experiência em atendimento a pessoas que enfrentam depressão, ansiedade, conflitos amorosos e problemas de autoestima." },
        {
          eventKey: "espeialidades",
          title: "Especialidades",
          content: (
            <div className="especialidades">
              {[
                { description: "Transtornos de personalidade" },
                { description: "Identidade" },
                { description: "Sexualidade" },
                { description: "Autoestima e confiança" },
                { description: "Carreira" },
                { description: "Análise da dinâmica familiar" },
                { description: "Resolução de conflitos" },
                { description: "Trabalho" },
              ].map((servico, index) => (
                <div key={index}>
                  <p className='especialidade'>{servico.description}</p>
                </div>
              ))}
            </div>
          ),
        },
        { eventKey: "agenda", title: "Agenda", content: "Conteúdo da Agenda para Roberto." }
      ]
    },
    {
      id: 5,
      foto: perfilEscolar,
      tabs: [
        { eventKey: "sobre", title: "Sobre Mim", content: "Como Psicóloga pela Universidade de Brasília, minha abordagem é baseada na Behaviorista. Meu objetivo é ajudar meus pacientes a identificar e mudar padrões de comportamento negativos, superando problemas de ansiedade, fobias, estresse e problemas de relacionamento." },
        {
          eventKey: "espeialidades",
          title: "Especialidades",
          content: (
            <div className="especialidades">
              {[
                { description: "Dificuldades de aprendizagem" },
                { description: "Habilidades  e emocionais" },
                { description: "Técnicas de estudo" },
                { description: "Intervenção em bullying" },
                { description: "Adaptação escolar" },
                { description: "Análise de clima organizacional" },
              ].map((servico, index) => (
                <div key={index}>
                  <p className='especialidade'>{servico.description}</p>
                </div>
              ))}
            </div>
          ),
        },
        { eventKey: "agenda", title: "Agenda", content: "Conteúdo da Agenda para Lidiane." }
      ]
    },
    {
      id: 6,
      foto: perfilOrganizacional,
      tabs: [
        { eventKey: "sobre", title: "Sobre Mim", content: " Sou Psicóloga pela Universidade Federal do ABC e atuo com a abordagem Existencial. Meu trabalho é ajudar meus pacientes a encontrar significado e propósito na vida, superando crises existenciais, estresse, ansiedade, depressão e problemas de autoconhecimento. Meu objetivo é ajudar meus pacientes a viver uma vida mais autêntica e plena." },
        {
          eventKey: "espeialidades",
          title: "Especialidades",
          content: (
            <div className="especialidades">
              {[
                { description: "Aconselhamento individual" },
                { description: "Ansiedade" },
                { description: "Habilidades para liderança" },
                { description: "Estresse" },
                { description: "Treinamento em comunicação eficaz" },
                { description: "Análise de clima organizacional" },
              ].map((servico, index) => (
                <div key={index}>
                  <p className='especialidade'>{servico.description}</p>
                </div>
              ))}
            </div>
          ),
        },
        { eventKey: "agenda", title: "Agenda", content: "Conteúdo da Agenda para Marilia." }
      ]
    },
    {
      id: 7,
      foto: perfilclinico,
      tabs: [
        { eventKey: "sobre", title: "Sobre Mim", content: " Sou Psicóloga pela Universidade Federal do ABC e atuo com a abordagem Existencial. Meu trabalho é ajudar meus pacientes a encontrar significado e propósito na vida, superando crises existenciais, estresse, ansiedade, depressão e problemas de autoconhecimento. Meu objetivo é ajudar meus pacientes a viver uma vida mais autêntica e plena." },
        {
          eventKey: "espeialidades",
          title: "Especialidades",
          content: (
            <div className="especialidades">
              {[
                { description: "Aconselhamento individual e em grupo" },
                { description: "Desenvolvimento de autoestima" },
                { description: "Coaching" },
                { description: "Habilidades para lidar com estresse e ansiedade" },
              ].map((servico, index) => (
                <div key={index}>
                  <p className='especialidade'>{servico.description}</p>
                </div>
              ))}
            </div>
          ),
        },
        { eventKey: "agenda", title: "Agenda", content: "Conteúdo da Agenda para ele." }
      ],
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
            <option value="">Selecionar <p className="setaSelecionar">↓</p></option>
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
        <h2 className='centralizar textroxo textclaro p-4 m-4'>Agendar Consulta</h2>
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