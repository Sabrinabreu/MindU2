import React, { useState } from 'react';
import "../css/AgendarConsulta.css";
import perfilPsicologo from '../img/perfilPsicologo.jfif';
import perfilPsicologa from '../img/perfilPsicologa.jfif';
import perfilPsicologaclinica from '../img/perfilPsicologaclinica.png';
import perfilPsicanalista from '../img/perfilPsicanalista.jpeg';
import perfilEscolar from '../img/perfilEscolar.avif';
import perfilOrganizacional from '../img/perfilOrganizacional.avif';
import perfilclinico from '../img/perfilClinico.jpg';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import BAPO from "../Components/WidgetBAPO";
import "../css/WidgetBAPO.css";
import { Search } from 'lucide-react';

function AgendarConsulta() {
  const [activeTabs, setActiveTabs] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [availableTimes, setAvailableTimes] = useState({});
  const [editableTimes, setEditableTimes] = useState({});
  const [showAll, setShowAll] = useState(false);
  const [selectedProfession, setSelectedProfession] = useState(''); 

  const slidesContent = [
    {
      foto: perfilPsicologa,
      title: "Marina Romeo da Silva",
      profissao: "Psicólogo Psicanalista",
      local: "São Paulo - SP",
      sessao: "Duração da sessão",
      hora: "2 horas",
      valor: "sessão: R$200,00",
      rating: 5,
      tabs: [
        { eventKey: "agenda", title: "Agenda", content: "Conteúdo da Agenda para Marina." },
        { eventKey: "servicos", title: "Serviços", content: "Psicóloga pela Universidade Paulista, atuo com a abordagem Psicanalítica. Tenho experiência com atendimento psicológico de pessoas que estão passando pela depressão, transtorno de ansiedade, conflitos amorosos, conflitos familiares e problemas de autoestima." },
        { eventKey: "sobre", title: "Sobre Mim", content: "Sou Psicóloga pela Universidade Paulista, atuo com a abordagem Psicanalítica. Tenho experiência com atendimento psicológico de pessoas que estão passando pela depressão, transtorno de ansiedade, conflitos amorosos, conflitos familiares e problemas de autoestima." }
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
      hora: "1 hora",
      valor: "sessão: R$150,00",
      rating: 5,
      tabs: [
        { eventKey: "agenda", title: "Agenda", content: "Conteúdo da Agenda para Cris." },
        { eventKey: "servicos", title: "Serviços", content: "Conteúdo dos Serviços para Cris." },
        { eventKey: "sobre", title: "Sobre Mim", content: "Conteúdo de Sobre Mim para Cris." }
      ]
    },
    {
      foto: perfilPsicanalista,
      title: "Roberto Freitas Dias",
      profissao: "Psicólogo Psicanalista",
      local: "Salvador - BA",
      sessao: "Duração da sessão",
      hora: "2 horas",
      valor: "sessão: R$100,00",
      rating: 5,
      tabs: [
        { eventKey: "agenda", title: "Agenda", content: "Conteúdo da Agenda para Roberto." },
        { eventKey: "servicos", title: "Serviços", content: "Conteúdo dos Serviços para Roberto." },
        { eventKey: "sobre", title: "Sobre Mim", content: "Conteúdo de Sobre Mim para Roberto." }
      ]
    },
    {
      foto: perfilEscolar,
      title: "Lidiane Moraes Costa",
      profissao: "Psicóloga Escolar",
      local: "Brumadinho - MG",
      sessao: "Duração da sessão",
      hora: "2 horas",
      valor: "sessão: R$350,00",
      rating: 5,
      tabs: [
        { eventKey: "agenda", title: "Agenda", content: "Conteúdo da Agenda para Lidiane." },
        { eventKey: "servicos", title: "Serviços", content: "Conteúdo dos Serviços para Lidiane." },
        { eventKey: "sobre", title: "Sobre Mim", content: "Conteúdo de Sobre Mim para Lidiane." }
      ]
    },
    {
      foto: perfilOrganizacional,
      title: "Marilia Souza",
      profissao: "Psicóloga Organizacional",
      local: "São Bernardo - SP",
      sessao: "Duração da sessão",
      hora: "2 horas",
      valor: "sessão: R$350,00",
      rating: 5,
      tabs: [
        { eventKey: "agenda", title: "Agenda", content: "Conteúdo da Agenda para Marilia." },
        { eventKey: "servicos", title: "Serviços", content: "Conteúdo dos Serviços para Marilia." },
        { eventKey: "sobre", title: "Sobre Mim", content: "Conteúdo de Sobre Mim para Marilia." }
      ]
    },
    {
      foto: perfilclinico,
      title: "Caio Muniz de Almeida",
      profissao: "Psicólogo Clínico",
      local: "São Bernardo - SP",
      sessao: "Duração da sessão",
      hora: "2 horas",
      valor: "sessão: R$350,00",
      rating: 5,
      tabs: [
        { eventKey: "agenda", title: "Agenda", content: "Conteúdo da Agenda para Caio." },
        { eventKey: "servicos", title: "Serviços", content: "Conteúdo dos Serviços para Caio." },
        { eventKey: "sobre", title: "Sobre Mim", content: "Conteúdo de Sobre Mim para Caio." }
      ]
    }
  ];

  const filteredSlidesContent = slidesContent.filter(slide => {
    const term = searchTerm.toLowerCase();
    const isMatchingProfession = filterType === 'profissao'
      ? slide.profissao.toLowerCase().includes(selectedProfession.toLowerCase())
      : true;

      return (
        (filterType === 'nome' ? slide.title.toLowerCase().includes(term) : true) &&
        isMatchingProfession &&
        (filterType === 'local' ? slide.local.toLowerCase().includes(term) : true)
      );
    });

    const [professionOptions, setProfessionOptions] = useState([
      "Psicólogo Psicanalista",
      "Psicólogo Cognitivo",
      "Psicóloga Clínica",
      "Psicólogo Clínico",
      "Psicóloga Escolar",
      "Psicóloga Organizacional",
    ]);

  const getAvailableTimes = (psicologoIndex) => {
    const times = {
      0: {
        "2024-08-27": ["09:00", "10:00", "11:00"],
        "2024-08-29": ["14:00", "15:00"],
        "2024-08-30": ["17:00", "20:00"],
      },
      1: {
        "2024-08-28": ["08:00", "09:30"],
        "2024-08-39": ["13:00", "15:00"],
      },
      3: {
        "2024-08-27": ["07:30", "10:30", "15:00"],
        "2024-08-30": ["15:00", "18:00", "20:00"],
      },
      4: {
        "2024-08-27": ["08:00", "09:30"],
        "2024-08-29": ["07:00", "11:00"],
      },
      5: {
        "2024-08-30": ["08:00", "09:30"],
        "2024-09-01": ["13:00", "15:00"],
      },
      6: {
        "2024-08-30": ["08:00", "09:30"],
        "2024-08-31": ["13:00", "15:00"],
      },
      7: {
        "2024-08-30": ["08:00", "09:30"],
        "2024-09-01": ["13:00", "15:00"],
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
    setEditableTimes(prev => ({
      ...prev,
      [psicologoIndex]: {
        ...prev[psicologoIndex],
        [selectedDate.toDateString()]: {
          ...prev[psicologoIndex]?.[selectedDate.toDateString()],
          [time]: !prev[psicologoIndex]?.[selectedDate.toDateString()]?.[time]
        }
      }
    }));
  };

  const handleSearch = () => {
    console.log('Buscando por:', searchTerm);
  };

  return (
    <>
      <BAPO />
      <div className='fundoFiltro'>
        <div className="d-flex mb-4 align-items-center">
          <Form.Control
            as="select"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="dropFilter mr-2"
          >
            <option value="">Selecionar</option> {/* Opção padrão para o dropdown */}
            <option value="nome">Nome</option>
            <option value="profissao">Profissão</option>
            <option value="local">Localização</option>
          </Form.Control>


          <Form.Control
            type="text"
            placeholder={`Buscar por ${filterType === 'nome' ? 'nome' : filterType === 'profissao' ? 'profissão' : filterType === 'local' ? 'localização' : 'tema'}...`} // Placeholder dinâmico
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="busca flex-grow-1 search-input"
          />
          <Button className="ml-2 search-button" onClick={handleSearch}>
            <i className="fa fa-search"></i>   <Search />
          </Button>
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
                        fill
                        activeKey={activeTab}
                        onSelect={(k) => setActiveTabs(prev => ({ ...prev, [index]: k }))}
                      >
                        {slide.tabs.map((tab, i) => (
                          <Tab key={i} className='tabText p-3' eventKey={tab.eventKey} title={tab.title}>
                            {tab.eventKey === 'agenda' ? (
                              <div>
                                <div className="calendar-container">
                                  <div className="calendar-header">
                                    <button className="setaCalendario" onClick={() => {
                                      const newDate = new Date(selectedDate);
                                      newDate.setDate(newDate.getDate() - 7);
                                      setSelectedDate(newDate);
                                      const available = getAvailableTimes(index)[newDate.toISOString().split('T')[0]] || [];
                                      console.log(`Horários disponíveis para ${newDate.toISOString().split('T')[0]}:`, available);
                                      setAvailableTimes(prev => ({
                                        ...prev,
                                        [index]: {
                                          ...prev[index],
                                          [newDate.toISOString().split('T')[0]]: available
                                        }
                                      }));
                                    }}>
                                      ←
                                    </button>
                                    <span>{selectedDate.toLocaleString('default', { month: 'long' })} {selectedDate.getFullYear()}</span>
                                    <button className="setaCalendario" onClick={() => {
                                      const newDate = new Date(selectedDate);
                                      newDate.setDate(newDate.getDate() + 7);
                                      setSelectedDate(newDate);
                                      const available = getAvailableTimes(index)[newDate.toISOString().split('T')[0]] || [];
                                      console.log(`Horários disponíveis para ${newDate.toISOString().split('T')[0]}:`, available);
                                      setAvailableTimes(prev => ({
                                        ...prev,
                                        [index]: {
                                          ...prev[index],
                                          [newDate.toISOString().split('T')[0]]: available
                                        }
                                      }));
                                    }}>
                                      →
                                    </button>
                                  </div>
                                  {generateWeek(selectedDate, index)}
                                  <div className="available-times">
                                    {timesForDate.length > 0 ? (
                                      <div className="times-container">
                                        {timesForDate.map(time => (
                                          <button
                                            key={time}
                                            className={`time-button ${editableTimes[index]?.[selectedDate.toDateString()]?.[time] ? 'selected' : ''}`}
                                            onClick={() => handleTimeChange(time, index)}
                                          >
                                            {time}
                                          </button>
                                        ))}
                                      </div>
                                    ) : (
                                      <button className='semhora'>!!! Sem horários disponíveis.</button>
                                    )}
                                  </div>
                                  <Link to="/saibamais" className='agendarBot mt-3'>
                                    Agendar consulta
                                  </Link>
                                </div>
                              </div>
                            ) : (
                              <p>{tab.content}</p>
                            )}
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

        {filteredSlidesContent.length > Math.ceil(filteredSlidesContent.length / 2) && (
          <div className="text-center">
            <button className="verMaisBotao" onClick={() => setShowAll(!showAll)}>
              {showAll ? 'Ver Menos' : 'Ver Mais'}
            </button>
          </div>
        )}
      </Container>
    </>
  );
}

export default AgendarConsulta;