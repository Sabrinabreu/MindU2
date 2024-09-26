import React, { useState, useEffect } from 'react';
import "../css/AgendarConsulta.css";
import perfilPsicologo from '../img/perfilPsicologo.jfif';
import perfilPsicologa from '../img/perfilPsicologa.jfif';
import perfilPsicologaclinica from '../img/perfilPsicologaclinica.png';
import perfilPsicanalista from '../img/perfilPsicanalista.jpeg';
import perfilEscolar from '../img/perfilEscolar.avif';
import perfilOrganizacional from '../img/perfilOrganizacional.avif';
import perfilclinico from '../img/perfilClinico.jpg';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Form, Tab, Tabs } from 'react-bootstrap';
import BAPO from "../Components/WidgetBAPO";
import "../css/WidgetBAPO.css";
import { Search } from 'lucide-react';

function AgendarConsulta() {
  const [activeTabs, setActiveTabs] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [availableTimes, setAvailableTimes] = useState({});
  const [ setEditableTimes] = useState({});
  const [selectedProfession, setSelectedProfession] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

  const slidesContent = [
    {
      id: 1,
      foto: perfilPsicologa,
      title: "Marina Romeo da Silva",
      profissao: "Psicólogo Psicanalista",
      local: "São Paulo - SP",
      sessao: "Duração da sessão",
      hora: "2 horas",
      valor: "sessão: R$200,00",
      rating: 5,
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
      title: "Flávio Monteiro Lobato",
      profissao: "Psicólogo Cognitivo",
      local: "Cornélio Procópio - PR",
      sessao: "Duração da sessão",
      hora: "1 hora",
      valor: "sessão: R$100,00",
      rating: 5,
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
      title: "Cris da Silva de Brázino",
      profissao: "Psicóloga Clínica",
      local: "São Bernardo - SP",
      sessao: "Duração da sessão",
      hora: "1 hora",
      valor: "sessão: R$150,00",
      rating: 5,
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
      title: "Roberto Freitas Dias",
      profissao: "Psicólogo Psicanalista",
      local: "Salvador - BA",
      sessao: "Duração da sessão",
      hora: "2 horas",
      valor: "sessão: R$100,00",
      rating: 5,
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
      title: "Lidiane Moraes Costa",
      profissao: "Psicóloga Escolar",
      local: "Brumadinho - MG",
      sessao: "Duração da sessão",
      hora: "2 horas",
      valor: "sessão: R$350,00",
      rating: 5,
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
      title: "Marilia Souza",
      profissao: "Psicóloga Organizacional",
      local: "São Bernardo - SP",
      sessao: "Duração da sessão",
      hora: "2 horas",
      valor: "sessão: R$350,00",
      rating: 5,
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
    title: "Caio Muniz de Almeida",
    profissao: "Psicólogo Clínico",
    local: "São Bernardo - SP",
    sessao: "Duração da sessão",
    hora: "2 horas",
    valor: "sessão: R$350,00",
    rating: 5,
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
  },


  ];

  const filteredSlidesContent = slidesContent.filter(slide => {
    const term = debouncedSearchTerm.toLowerCase();
    const isMatchingProfession = filterType === 'profissao'
      ? selectedProfession === '' || slide.profissao.toLowerCase().includes(selectedProfession.toLowerCase())
      : true;

    return (
      (filterType === 'nome' ? slide.title.toLowerCase().includes(term) : true) &&
      isMatchingProfession &&
      (filterType === 'local' ? slide.local.toLowerCase().includes(term) : true)
    );
  });

  const [professionOptions] = useState([
    "Psicólogo Psicanalista",
    "Psicólogo Cognitivo",
    "Psicóloga Clínica",
    "Psicólogo Clínico",
    "Psicóloga Escolar",
    "Psicóloga Organizacional",
  ]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  useEffect(() => {
    if (debouncedSearchTerm.trim() === '') {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    const fetchData = () => {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    };

    fetchData();
  }, [debouncedSearchTerm]);


  const getAvailableTimes = (psicologoIndex) => {
    const times = {
      0: {
        "2024-09-17": ["09:00", "10:00", "11:00"],
        "2024-09-18": ["14:00", "15:00"],
        "2024-09-20": ["17:00", "20:00"],
      },
      1: {
        "2024-09-19": ["08:00", "09:30"],
        "2024-09-30": ["13:00", "15:00"],
      },
      3: {
        "2024-09-19": ["07:30", "10:30", "15:00"],
        "2024-09-29": ["15:00", "18:00", "20:00"],
      },
      4: {
        "2024-09-17": ["08:00", "09:30"],
        "2024-09-20": ["07:00", "11:00"],
      },
      5: {
        "2024-09-19": ["08:00", "09:30"],
        "2024-09-21": ["13:00", "15:00"],
      },
      6: {
        "2024-09-17": ["08:00", "09:30"],
        "2024-09-11": ["13:00", "15:00"],
      },
      7: {
        "2024-09-18": ["08:00", "09:30"],
        "2024-09-23": ["13:00", "15:00"],
      },
    };
   

    if (typeof psicologoIndex !== 'number' || !times[psicologoIndex]) {
      console.warn(`Índice do psicólogo ${psicologoIndex} não encontrado ou inválido.`);
      return {};
    }

    return times[psicologoIndex] || {};
  }; 

  const generateWeek = (selectedDate, psicologoIndex) => {
    const startOfWeek = new Date(selectedDate);
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());

    const weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
    const dayHeaders = weekDays.map((day, i) => (
      <div key={`header-${i}`} className="calendar-day-header">
        {day}
      </div>
    ));

    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(day.getDate() + i);
      const dayStr = day.toISOString().split('T')[0];
      days.push(
        <div
          key={i}
          className={`calendar-day ${selectedDate.toISOString().split('T')[0] === dayStr ? 'selected' : ''}`}
          onClick={() => {
            setSelectedDate(day);
            const available = getAvailableTimes(psicologoIndex)[dayStr] || [];
            console.log(`Horários disponíveis para ${dayStr}:`, available);
            setAvailableTimes(prev => ({
              ...prev,
              [psicologoIndex]: {
                ...prev[psicologoIndex],
                [dayStr]: available
              }
            }));
          }}
        >
          {day.getDate()}
        </div>
      );
    }

    return (
      <div className="calendar-grid">
        <div className="calendar-day-headers">
          {dayHeaders}
        </div>
        <div className="calendar-days">
          {days}
        </div>
      </div>
    );
  };

  const handleTimeChange = (time, psicologoIndex) => {
    setEditableTimes(prev => {
      return {
        ...prev,
        [psicologoIndex]: {
          ...prev[psicologoIndex],
          [selectedDate.toDateString()]: {
            ...prev[psicologoIndex]?.[selectedDate.toDateString()],
            [time]: !prev[psicologoIndex]?.[selectedDate.toDateString()]?.[time]
          }
        }
      };
    });
  };

  const handleAtendendoHoje = () => {
    const today = new Date().toISOString().split('T')[0];
    const atendendoHoje = slidesContent.filter(slide => {
      const availableTimes = getAvailableTimes(slide.id);
      return availableTimes[today] && availableTimes[today].length > 0;
    });
  };

  return (
    <>
      <BAPO />

      <div className='fundoFiltro'>
        <div className="d-flex mb-4 align-items-center ">
        <button onClick={handleAtendendoHoje} >hoje</button>

          <Form.Control
            as="select"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="dropFilter mr-2 "
          >
            <option value="" >Selecionar <p className="setaSelecionar">→</p></option>
            <option
              value="nome"
              className={filterType === 'nome' ? 'selected-option' : ''}
            >
              Nome
            </option>
            <option
              value="profissao"
              className={filterType === 'profissao' ? 'selected-option' : ''}
            >
              Profissão
            </option>
            <option
              value="local"
              className={filterType === 'local' ? 'selected-option' : ''}
            >
              Localização
            </option>
          </Form.Control>

          {filterType === 'profissao' && (
            <Form.Control
              as="select"
              value={selectedProfession}
              onChange={(e) => setSelectedProfession(e.target.value)}
              className="buscaPor mr-2"
            >
              <option
                value=""
                className={selectedProfession === '' ? 'selected-option' : ''}
              >
                Todas as profissões...
              </option>
              {professionOptions.map((profession, index) => (
                <option
                  key={index}
                  value={profession}
                  className={selectedProfession === profession ? 'selected-option' : ''}
                >
                  {profession}
                </option>
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

          <div className="searchA onClick={handleSearch}">
            {isLoading ? '...' :  <Search />}
          </div>
        </div>
      </div>

      <Container>
        <h2 className='tituloAgenda p-4'>Agendar Consulta</h2>

        {filteredSlidesContent.length > 0 ? (
          filteredSlidesContent.map((slide, index) => {
            const activeTab = activeTabs[index] || 'agenda';
            const timesForDate = availableTimes[index]?.[selectedDate.toISOString().split('T')[0]] || [];

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
                          <div className='sessao'>{slide.sessao}<br /><b className='hora'>{slide.hora}</b></div>
                        </Col>
                        <Col>
                          <div className='valor'>{slide.valor}</div>
                        </Col>
                      </div>
                    </div>
                    <div className="tabs-container">
                      <Tabs
                        defaultActiveKey="agenda"
                        id={`tabs-${index}`}
                        fill
                        activeKey={activeTab}
                        onSelect={(k) => setActiveTabs(prev => ({ ...prev, [index]: k }))}
                      >
                        {slide.tabs.map((tab, i) => (
                          <Tab key={i} className='tabText p-3' eventKey={tab.eventKey} title={tab.title}>
                            {tab.eventKey === 'agenda' ? (
                             
                              <Link to={`/psicologo/${slide.id}`} className="agendarBot mt-3">
                              {slide.title}
                            </Link>
                            
                            ) : (
                              <p>{tab.content}</p>
                            )}
                            {tab.eventKey === 'sobre' && activeTab === 'sobre' && (
                              <Link to={`/psicologo/${slide.id}`} className="agendarBot mt-3">
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
          <div className="no-results">
            <h3 className='p-4 text-center'>Nenhum resultado encontrado :(</h3>
          </div>
        )}
      </Container>
    </>
  );
};

export default AgendarConsulta;