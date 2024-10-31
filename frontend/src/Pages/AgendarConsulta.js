import React, { useState, useEffect } from 'react';
import "../css/AgendarConsulta.css";
import { Container, Col, Row, Button, Tab, Tabs } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import BAPO from "../Components/WidgetBAPO";
import perfilPsicologo from '../img/perfilPsicologo.jfif';
import perfilPsicologa from '../img/perfilPsicologa.jfif';
import perfilPsicologaclinica from '../img/perfilPsicologaclinica.png';
import perfilPsicanalista from '../img/perfilPsicanalista.jpeg';
import perfilEscolar from '../img/perfilEscolar.avif';
import perfilOrganizacional from '../img/perfilOrganizacional.avif';
import perfilclinico from '../img/perfilClinico.jpg';
import padraoPerfil from '../img/padraoPerfil.png';
import FiltroBusca from '../Components/FiltroAgendarConsulta';
import { Pencil } from 'lucide-react';

function AgendarConsulta() {
  const [activeTabs, setActiveTabs] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const [selectedProfession, setSelectedProfession] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const [data, setData] = useState([]);
  const [editableInfo, setEditableInfo] = useState({});
  const [editedText, setEditedText] = useState({});

  const handleEditToggle = (psicologoId) => {
    setEditableInfo(prev => ({
      ...prev,
      [psicologoId]: !prev[psicologoId]
    }));
  };

  const handleTextChange = (psicologo_id, value) => {
    setEditedText(prev => ({
      ...prev,
      [psicologo_id]: value
    }));
  };

  useEffect(() => {
    axios.get('http://localhost:3001/psicologos')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error("Erro ao buscar os dados:", error);
      });
  }, []);

  const defaultTabs = [
    {
      eventKey: "sobre",
      title: "Sobre Mim",
      content: "Informações não disponíveis.",
    },
    {
      eventKey: "especialidades",
      title: "Especialidades",
      content: <p>Clique aqui para listar suas especialidades .</p>,
    },
    {
      eventKey: "agenda",
      title: "Agenda",
      content: "Clique aqui para ver mais sobre o psicólogo e agendar sua consulta.",
    },
  ];

  const tabs = [
    {
      id: 1,
      foto: perfilPsicologa,
      tabs: [
        {
          eventKey: "sobre",
          title: "Sobre Mim",
          content: "Sou Psicóloga pela Universidade Paulista, atuo com a abordagem Psicanalítica. Tenho experiência com atendimento psicológico de pessoas que estão passando pela depressão, transtorno de ansiedade, conflitos amorosos, conflitos familiares e problemas de autoestima."
        },
        {
          eventKey: "especialidades",
          title: "Especialidades",
          content: (
            <div className="especialidades">
              {[{ description: "Identidade" }, { description: "Dinâmica familiar" }, { description: "Comunicação" }, { description: "Resolução de conflitos" }, { description: "Autoestima e confiança" }, { description: "Depressão" }, { description: "Ansiedade" }, { description: "Transtorno obsessivo-compulsivo" }].map((servico, index) => (
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
        {
          eventKey: "sobre",
          title: "Sobre Mim",
          content: "Sou formado na Pontifícia Universidade Católica (PUC), atuo com a abordagem Humanista. Experiência com atendimento psicológico de pessoas que estão passando por perdas, luto, estresse, ansiedade e problemas de autoconfiança."
        },
        {
          eventKey: "especialidades",
          title: "Especialidades",
          content: (
            <div className="especialidades">
              {[{ description: "Transtornos mentais" }, { description: "Atenção" }, { description: "Insônia" }, { description: "Pensamentos negativos e distorcidos" }, { description: "Autoestima e confiança" }, { description: "Memória" }, { description: "Luto" }].map((servico, index) => (
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
        {
          eventKey: "sobre",
          title: "Sobre Mim",
          content: "Sou Psicólogo pela Universidade Federal do Rio de Janeiro e atuo com a abordagem Sistêmica. Minha experiência inclui atendimento a famílias e indivíduos que enfrentam conflitos familiares, problemas de relacionamento, estresse e ansiedade. Meu objetivo é ajudar meus pacientes a encontrar soluções duradouras e melhorar sua qualidade de vida."
        },
        {
          eventKey: "especialidades",
          title: "Especialidades",
          content: (
            <div className="especialidades">
              {[{ description: "Ansiedade" }, { description: "Apoio a doenças crônicas" }, { description: "Saúde mental de crianças e adolescentes" }, { description: "Luto e perda" }, { description: "Coping e resiliência" }, { description: "Resolução de conflitos" }, { description: "Trabalho" }].map((servico, index) => (
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
        {
          eventKey: "sobre",
          title: "Sobre Mim",
          content: "Com formação pela Universidade Estadual de Campinas e abordagem Psicodinâmica, meu foco é ajudar meus pacientes a entender e superar seus padrões de pensamento e comportamento negativos. Tenho experiência em atendimento a pessoas que enfrentam depressão, ansiedade, conflitos amorosos e problemas de autoestima."
        },
        {
          eventKey: "especialidades",
          title: "Especialidades",
          content: (
            <div className="especialidades">
              {[{ description: "Transtornos de personalidade" }, { description: "Identidade" }, { description: "Sexualidade" }, { description: "Autoestima e confiança" }, { description: "Carreira" }, { description: "Análise da dinâmica familiar" }, { description: "Resolução de conflitos" }, { description: "Trabalho" }].map((servico, index) => (
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
        {
          eventKey: "sobre",
          title: "Sobre Mim",
          content: "Como Psicóloga pela Universidade de Brasília, minha abordagem é baseada na Behaviorista. Meu objetivo é ajudar meus pacientes a identificar e mudar padrões de comportamento negativos, superando problemas de ansiedade, fobias, estresse e problemas de relacionamento."
        },
        {
          eventKey: "especialidades",
          title: "Especialidades",
          content: (
            <div className="especialidades">
              {[{ description: "Dificuldades de aprendizagem" }, { description: "Habilidades emocionais" }, { description: "Técnicas de estudo" }, { description: "Intervenção em bullying" }, { description: "Adaptação escolar" }, { description: "Análise de clima organizacional" }].map((servico, index) => (
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
        {
          eventKey: "sobre",
          title: "Sobre Mim",
          content: "Sou Psicóloga pela Universidade Federal do ABC e atuo com a abordagem Existencial. Meu trabalho é ajudar meus pacientes a encontrar significado e propósito na vida, superando crises existenciais, estresse, ansiedade, depressão e problemas de autoconhecimento. Meu objetivo é ajudar meus pacientes a viver uma vida mais autêntica e plena."
        },
        {
          eventKey: "especialidades",
          title: "Especialidades",
          content: (
            <div className="especialidades">
              {[{ description: "Aconselhamento individual" }, { description: "Ansiedade" }, { description: "Habilidades para liderança" }, { description: "Estresse" }, { description: "Treinamento em comunicação eficaz" }, { description: "Análise de clima organizacional" }].map((servico, index) => (
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
        {
          eventKey: "sobre",
          title: "Sobre Mim",
          content: "Sou Psicóloga pela Universidade Federal do ABC e atuo com a abordagem Existencial. Meu trabalho é ajudar meus pacientes a encontrar significado e propósito na vida, superando crises existenciais, estresse, ansiedade, depressão e problemas de autoconhecimento. Meu objetivo é ajudar meus pacientes a viver uma vida mais autêntica e plena."
        },
        {
          eventKey: "especialidades",
          title: "Especialidades",
          content: (
            <div className="especialidades">
              {[{ description: "Aconselhamento individual e em grupo" }, { description: "Desenvolvimento de autoestima" }, { description: "Coaching" }, { description: "Habilidades para lidar com estresse e ansiedade" }].map((servico, index) => (
                  <div key={index}>
                    <p className='especialidade'>{servico.description}</p>
                  </div>
              ))}
            </div>
          ),
        },        
        { eventKey: "agenda", title: "Agenda", content: "Conteúdo da Agenda para ele." }
      ]
    }
  ];

  const getTabsForPsicologo = (psicologo) => {
    const psicologoTabs = tabs.find(tab => tab.id === psicologo.psicologo_id);
    return psicologoTabs ? psicologoTabs.tabs : defaultTabs;
  };

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
        true; // se nenhum filtro específico, não filtra

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

  const handleSaveEdit = async (psicologo_id) => {
    const updatedBiografia = editedText[psicologo_id];

    if (!updatedBiografia) {
      alert('Por favor, preencha as informações antes de salvar.');
      return;
    }

    const psicologoData = {
      biografia: updatedBiografia,
    };

    try {
      await axios.put(`http://localhost:3001/api/psicologos/${psicologo_id}`, psicologoData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      // Atualiza a biografia na lista de psicólogos
      setData(prevData =>
        prevData.map(psicologo =>
          psicologo.psicologo_id === psicologo_id
            ? { ...psicologo, biografia: updatedBiografia }
            : psicologo
        )
      );

      alert('Biografia atualizada com sucesso!');
      handleEditToggle(psicologo_id);
    } catch (error) {
      console.error("Erro ao salvar as edições:", error);
      alert('Erro ao salvar as informações. Tente novamente.');
    }
  };

  return (
    <>
      <BAPO />
      <FiltroBusca
        filterType={filterType}
        setFilterType={setFilterType}
        selectedProfession={selectedProfession}
        setSelectedProfession={setSelectedProfession}
        professionOptions={professionOptions}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <Container>
        <h2 className='centralizar textroxo textclaro p-4 m-4'>Agendar Consulta</h2>
        <Row>
          <Col md={12}>
            {filteredCards.length > 0 ? (
              filteredCards.map(psicologo => {
                const tabsData = getTabsForPsicologo(psicologo);

              return (
                <div key={psicologo.psicologo_id}
                // className="cardAgenda"
                >
                  <Row className="rowCardAgenda">
                    <img className='imgPerfil' src={tabs.find(tab => tab.id === psicologo.psicologo_id)?.foto || padraoPerfil} alt="Foto de Perfil" />
                    <Col md={6} sm={12} className="colCardAgenda">
                    
                    <div className='txtCardAgenda'
                    // className="primeiro"
                    >
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
                    <div
                    // className='segundo'
                    >
                      <div className='p-2'>
                        <div className='sessao'>Duração da Sessão<br /><b className='hora'>1 Hora</b></div>
                      </div>
                    </div>
                    </Col>


                    <Col md={6} sm={12} className="tabs-container">
  <Tabs
    defaultActiveKey="agenda"
    id={`tabs-${psicologo.psicologo_id}`}
    fill
    activeKey={activeTabs[psicologo.psicologo_id] || 'agenda'}
    onSelect={(k) => setActiveTabs((prev) => ({ ...prev, [psicologo.psicologo_id]: k }))}
  >
    {tabsData.map((tab, i) => (
      <Tab
        key={i}
        className="tabText p-3"
        eventKey={tab.eventKey}
        title={
          <span
            tabIndex="0"
            role="tab"
            aria-selected={activeTabs[psicologo.psicologo_id] === tab.eventKey}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                setActiveTabs((prev) => ({ ...prev, [psicologo.psicologo_id]: tab.eventKey }));
              }
            }}
          >
            {tab.title}
          </span>
        }
      >
        {tab.eventKey === 'sobre' ? (
          psicologo.psicologo_id >= 8 ? (
            <>
              {editableInfo[psicologo.psicologo_id] ? (
                <>
                  <input
                    type="text"
                    value={editedText[psicologo.psicologo_id] || psicologo.biografia}
                    onChange={(e) => handleTextChange(psicologo.psicologo_id, e.target.value)}
                  />
                  <button className="salvarEdicoes" onClick={() => handleSaveEdit(psicologo.psicologo_id)}>Salvar</button>
                </>
              ) : (
                <>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <p style={{ marginRight: '10px' }}>{psicologo.biografia}</p>
                    <button className="editarTabs" onClick={() => handleEditToggle(psicologo.psicologo_id)}>
                      <Pencil />
                    </button>
                  </div>
                  <Link to={`/psicologo/${psicologo.psicologo_id}`} className="saibaMaisBot mt-3">
                    Saiba Mais
                  </Link>
                </>
              )}
            </>
          ) : (
            <div>
              <p>{tabs.find((tab) => tab.id === psicologo.psicologo_id)?.tabs[0].content}</p>
              {editableInfo[psicologo.psicologo_id] && (
                <>
                  <button onClick={() => handleEditToggle(psicologo.psicologo_id)}>Editar</button>
                </>
              )}
            </div>
          )
        ) : (
          <p>{tab.content}</p>
        )}
        {tab.eventKey === 'agenda' && (
          <Button to={`/psicologo/${psicologo.psicologo_id}`} className="agendarBot mt-3">
            Agendar
          </Button>
        )}
      </Tab>
    ))}
  </Tabs>
</Col>


                  </Row>
                </div>
              );
            })
          ) : (
            <div className='semResultado'>Nenhum resultado encontrado.</div>
          )}
        </Col >
        </Row>
      </Container >
    </>
  );
}

export default AgendarConsulta;