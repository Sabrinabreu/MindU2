import React, { useState, useEffect } from 'react';
import "../css/AgendarConsulta.css";
import { Container, Col, Row, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import BAPO from "../Components/WidgetBAPO";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import padraoPerfil from '../img/padraoPerfil.png';
import FiltroBusca from '../Components/FiltroAgendarConsulta';
import { useNavigate } from "react-router-dom";
import { parseJwt } from "../Components/jwtUtils";
import { Pencil } from 'lucide-react';
import { Plus } from 'lucide-react';

function AgendarConsulta() {
  const [activeTabs, setActiveTabs] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const [selectedProfession, setSelectedProfession] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const [data, setData] = useState([]);

  //editar as informações
  const [editableInfo, setEditableInfo] = useState({});
  const [editedText, setEditedText] = useState({});
  const [editableSpecialties, setEditableSpecialties] = useState({});
  const [editedSpecialties, setEditedSpecialties] = useState({});

  const [specialtiesList, setSpecialtiesList] = useState({});

  const [perfil, setPerfil] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const decodedToken = parseJwt(token);
  console.log(decodedToken.perfil)

  useEffect(() => {
    if (token) {
      const decodedToken = parseJwt(token);
      setPerfil(decodedToken);
    }
  }, [token]);

  const handleEditToggle = (psicologoId) => {
    setEditableInfo(prev => ({
      ...prev,
      [psicologoId]: !prev[psicologoId]
    }));

    if (!editableInfo[psicologoId]) {
      // Se estamos habilitando a edição, inicialize o estado com a biografia atual
      const psicologo = data.find(psicologo => psicologo.psicologo_id === psicologoId);
      setEditedText(prev => ({
        ...prev,
        [psicologoId]: psicologo.biografia // Pega a biografia atual
      }));
    }
  };

  const handleTextChange = (psicologo_id, value) => {
    setEditedText(prev => ({
      ...prev,
      [psicologo_id]: value // Atualiza o estado com o valor do textarea
    }));
  };

  useEffect(() => {
    axios.get('http://localhost:3001/psicologos')
      .then(response => {
        // Converte a especificidade em um array se não for um array
        const updatedData = response.data.map(psicologo => ({
          ...psicologo,
          especificidade: Array.isArray(psicologo.especificidade) ? psicologo.especificidade : psicologo.especificidade ? psicologo.especificidade.split(',') : [],
        }));
        setData(updatedData);
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
            <div className="especialidadesA">
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
            <div className="especialidadesA">
              {[{ description: "Transtornos mentais" }, { description: "Atenção" }, { description: "Insônia" }, { description: "Pensamentos negativos e distorcidos" }, { description: "Autoestima e confiança" }, { description: "Memória" }, { description: "Luto" }].map((servico, index) => (
                <div key={index}>
                  <p className='especialidade'>{servico.description}</p>
                </div>
              ))}
            </div>
          ),
        },
        { eventKey: "agenda", title: "Agenda", content: "Clique aqui para ver a agenda de Flávio e agendar sua consulta." }
      ]
    },
    {
      id: 3,
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
            <div className="especialidadesA">
              {[{ description: "Ansiedade" }, { description: "Apoio a doenças crônicas" }, { description: "Saúde mental de crianças e adolescentes" }, { description: "Luto e perda" }, { description: "Coping e resiliência" }, { description: "Resolução de conflitos" }, { description: "Trabalho" }].map((servico, index) => (
                <div key={index}>
                  <p className='especialidade'>{servico.description}</p>
                </div>
              ))}
            </div>
          ),
        },
        { eventKey: "agenda", title: "Agenda", content: "Clique aqui para ver a agenda de Cris e agendar sua consulta." }
      ]
    },
    {
      id: 4,
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
            <div className="especialidadesA">
              {[{ description: "Transtornos de personalidade" }, { description: "Identidade" }, { description: "Sexualidade" }, { description: "Autoestima e confiança" }, { description: "Carreira" }, { description: "Análise da dinâmica familiar" }, { description: "Resolução de conflitos" }, { description: "Trabalho" }].map((servico, index) => (
                <div key={index}>
                  <p className='especialidade'>{servico.description}</p>
                </div>
              ))}
            </div>
          ),
        },
        { eventKey: "agenda", title: "Agenda", content: "Clique aqui para ver a agenda de Roberta e agendar sua consulta." }
      ]
    },
    {
      id: 5,
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
            <div className="especialidadesA">
              {[{ description: "Dificuldades de aprendizagem" }, { description: "Habilidades emocionais" }, { description: "Técnicas de estudo" }, { description: "Intervenção em bullying" }, { description: "Adaptação escolar" }, { description: "Análise de clima organizacional" }].map((servico, index) => (
                <div key={index}>
                  <p className='especialidade'>{servico.description}</p>
                </div>
              ))}
            </div>
          ),
        },
        { eventKey: "agenda", title: "Agenda", content: "Clique aqui para ver a agenda de Lidiane e agendar sua consulta." }
      ]
    },
    {
      id: 6,
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
            <div className="especialidadesA">
              {[{ description: "Aconselhamento individual" }, { description: "Ansiedade" }, { description: "Habilidades para liderança" }, { description: "Estresse" }, { description: "Treinamento em comunicação eficaz" }, { description: "Análise de clima organizacional" }].map((servico, index) => (
                <div key={index}>
                  <p className='especialidade'>{servico.description}</p>
                </div>
              ))}
            </div>
          ),
        },
        { eventKey: "agenda", title: "Agenda", content: "Clique aqui para ver a agenda de Marilia e agendar sua consulta." }
      ]
    },
    {
      id: 7,
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
            <div className="especialidadesA">
              {[{ description: "Aconselhamento individual e em grupo" }, { description: "Desenvolvimento de autoestima" }, { description: "Coaching" }, { description: "Habilidades para lidar com estresse e ansiedade" }].map((servico, index) => (
                <div key={index}>
                  <p className='especialidade'>{servico.description}</p>
                </div>
              ))}
            </div>
          ),
        },
        { eventKey: "agenda", title: "Agenda", content: "Clique aqui para ver a agenda de Caio e agendar sua consulta." }
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

    const isMatchingProfession = selectedProfession === '' ||
      (psicologo.especialidade && psicologo.especialidade.toLowerCase().includes(selectedProfession.toLowerCase()));

    const isMatchingSearchTerm = filterType === 'nome'
      ? (psicologo.nome && psicologo.nome.toLowerCase().includes(term))
      : filterType === 'local'
        ? (psicologo.localizacao && psicologo.localizacao.toLowerCase().includes(term))
        : true;

    const isVisible = isMatchingProfession && isMatchingSearchTerm;

    console.log(`Psicólogo: ${psicologo.nome}, Visível: ${isVisible}`);

    return isVisible;
  });

  console.log("Filtered Cards: ", filteredCards);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  //EDICAO
  const handleSaveEdit = async (psicologo_id) => {
    const updatedBiografia = editedText[psicologo_id];

    if (!updatedBiografia || updatedBiografia.trim() === '') {
      alert('Por favor, preencha as informações antes de salvar.');
      return;
    }

    const psicologoData = {
      biografia: updatedBiografia,
    };

    try {
      await axios.put(`http://localhost:3001/api/biografia/${psicologo_id}`, psicologoData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      // Atualiza o estado local com a nova biografia
      setData(prevData => {
        return prevData.map(psicologo =>
          psicologo.psicologo_id === psicologo_id
            ? { ...psicologo, biografia: updatedBiografia }
            : psicologo
        );
      });

      // Limpa o campo de edição
      setEditedText(prev => ({
        ...prev,
        [psicologo_id]: ''
      }));

      // Desabilita o modo de edição
      setEditableInfo(prev => ({
        ...prev,
        [psicologo_id]: false
      }));
    } catch (error) {
      console.error('Erro ao salvar a biografia:', error);
      alert('Ocorreu um erro ao salvar a biografia. Tente novamente.');
    }
  };

  useEffect(() => {
    axios.get('http://localhost:3001/psicologos')
      .then(response => {
        const updatedData = response.data.map(psicologo => ({
          ...psicologo,
          especificidade: Array.isArray(psicologo.especificidade) ? psicologo.especificidade : psicologo.especificidade ? psicologo.especificidade.split(',') : [],
        }));

        console.log("Dados carregados:", updatedData);
        setData(updatedData);
      })
      .catch(error => {
        console.error("Erro ao buscar os dados:", error);
      });
  }, []);

  const handleSpecialtyTextChange = (psicologo_id, value) => {
    setEditedSpecialties(prev => ({
      ...prev,
      [psicologo_id]: value
    }));
  };

  const handleSpecialtyEditToggle = (psicologo_id) => {
    setEditableSpecialties(prev => ({
      ...prev,
      [psicologo_id]: !prev[psicologo_id]
    }));
  };


  const handleSaveSpecialtyEdit = async (psicologo_id) => {
    const updatedSpecialties = specialtiesList[psicologo_id] || [];

    if (updatedSpecialties.some(specialty => specialty.trim() === '')) {
      alert('Por favor, preencha todas as especialidades antes de salvar.');
      return;
    }

    const psicologoData = {
      especificidade: updatedSpecialties.map(s => s.trim()).join(', '),
    };

    try {
      await axios.put(`http://localhost:3001/api/especificidade/${psicologo_id}`, psicologoData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      setData(prevData =>
        prevData.map(psicologo =>
          psicologo.psicologo_id === psicologo_id
            ? { ...psicologo, especificidade: psicologoData.especificidade.split(', ').map(s => s.trim()) }
            : psicologo
        )
      );

      alert('Especialidades atualizadas com sucesso!');
      handleSpecialtyEditToggle(psicologo_id);
    } catch (error) {
      console.error("Erro ao salvar as edições:", error);
      alert('Erro ao salvar as informações. Tente novamente.');
    }
  };

  const addSpecialtyField = (psicologo_id) => {
    setSpecialtiesList(prevState => {
      const updatedSpecialties = prevState[psicologo_id] || [''];
      return {
        ...prevState,
        [psicologo_id]: [...updatedSpecialties, '']
      };
    });
  };

  const handleSpecialtyChange = (psicologo_id, index, value) => {
    setSpecialtiesList(prevState => {
      const updatedSpecialties = [...(prevState[psicologo_id] || [])];
      updatedSpecialties[index] = value; // Atualiza o valor do campo de especialidade correspondente
      return {
        ...prevState,
        [psicologo_id]: updatedSpecialties // Atualiza o estado do psicólogo com as novas especialidades
      };
    });
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

      {perfil.tipo_usuario === "funcionario" && (
        <a href="/quiz" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="bannerquiz">
            <h1 className="text-center textBannerQuiz">Muitas opções? Descubra qual o melhor profissional para você!</h1>
            <button className="botaoBannerQuiz">
              <span>Clique aqui e descubra</span>
              <svg width="15px" height="10px" viewBox="0 0 13 10">
                <path d="M1,5 L11,5"></path>
                <polyline points="8 1 12 5 8 9"></polyline>
              </svg>
            </button>
          </div>
        </a>
      )}
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
                      <img className='imgPerfil'
                        src={psicologo.foto_perfil ? `http://localhost:3001/uploads/${psicologo.foto_perfil}` : padraoPerfil}

                      />
                      <Col md={6} sm={12} className="colCardAgenda">

                        <div
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
                          onSelect={(k) => setActiveTabs(prev => ({ ...prev, [psicologo.psicologo_id]: k }))}>
                          {tabsData.map((tab, i) => (
                            <Tab key={i} className='tabText p-3' eventKey={tab.eventKey} title={tab.title}>
                              {tab.eventKey === 'sobre' ? (
                                // Lógica para "Sobre Mim"
                                psicologo.psicologo_id >= 8 ? (
                                  // Para IDs 8 ou superiores
                                  <>
                                    {editableInfo[psicologo.psicologo_id] ? (
                                      <>
                                        <textarea
                                          className='textareaSobreMim'
                                          value={editedText[psicologo.psicologo_id] || ''} // Usa o valor editado ou vazio
                                          onChange={(e) => handleTextChange(psicologo.psicologo_id, e.target.value)} // Atualiza o estado ao digitar
                                        ></textarea>
                                        <button className='salvarEdicoes' onClick={() => handleSaveEdit(psicologo.psicologo_id)}>Salvar</button>
                                      </>
                                    ) : (
                                      <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <p style={{ marginRight: '10px' }}>
                                          {psicologo.biografia && psicologo.biografia.trim() !== ''
                                            ? psicologo.biografia
                                            : 'Adicionar biografia'}
                                        </p>
                                        {perfil.tipo_usuario === "psicologo" && (
                                          <button className='editarTabs' onClick={() => handleEditToggle(psicologo.psicologo_id)}>
                                            <Pencil />
                                          </button>
                                        )}
                                      </div>
                                    )}
                                  </>
                                ) : (
                                  // para IDs de 1 a 7
                                  <div>
                                    <p>{tabs.find(tab => tab.id === psicologo.psicologo_id)?.tabs[0].content}</p>
                                    {editableInfo[psicologo.psicologo_id] && (
                                      <button onClick={() => handleEditToggle(psicologo.psicologo_id)}>Editar</button>
                                    )}
                                  </div>
                                )
                              ) : tab.eventKey === 'especialidades' ? (
                                psicologo.psicologo_id >= 8 ? (
                                  // para IDs 8 ou superiores
                                  <>
                                    {tab.eventKey === 'especialidades' ? (
                                      <div>
                                        {editableSpecialties[psicologo.psicologo_id] ? (
                                          <div>
                                            {(specialtiesList[psicologo.psicologo_id] || ['']).map((specialty, index) => (
                                              <div key={index} className="especialidade-field">
                                                <textarea
                                                  value={specialty}
                                                  onChange={(e) => handleSpecialtyChange(psicologo.psicologo_id, index, e.target.value)}
                                                  className="textareaEspecialidades"
                                                  placeholder="Digite sua especialidade aqui"
                                                />
                                              </div>
                                            ))}

                                            <div className="adicionarEspecialidade">
                                              <button onClick={() => addSpecialtyField(psicologo.psicologo_id)} className='botaoAdiconarEspecialidade'>
                                                <Plus /> Adicionar Especialidade
                                              </button>
                                              <button className="salvarEdicoes" onClick={() => handleSaveSpecialtyEdit(psicologo.psicologo_id)}>
                                                Salvar
                                              </button>
                                            </div>
                                          </div>
                                        ) : (
                                          <div className="especialidades">
                                            {(Array.isArray(psicologo.especificidade) && psicologo.especificidade.length > 0) ? (
                                              psicologo.especificidade.map((specialty, index) => (
                                                <div key={index} className="especialidadeNova">
                                                  {specialty.trim()}
                                                </div>
                                              ))
                                            ) : (
                                              <p className='especialidade'>Adicione aqui suas especialidades</p>
                                            )}
                                            {perfil.tipo_usuario === "psicologo" && (
                                              <button className="editarTabs" onClick={() => handleSpecialtyEditToggle(psicologo.psicologo_id)}>
                                                <Plus />
                                              </button>
                                            )}
                                          </div>
                                        )}
                                      </div>
                                    ) : (
                                      <p>{tab.content}</p>
                                    )}
                                  </>
                                ) : (
                                  <div className="especialidades">
                                    {tabs.find(tab => tab.id === psicologo.psicologo_id)?.tabs[1].content}
                                  </div>
                                )
                              ) : (
                                <p>{tab.content}</p>
                              )}

                              {tab.eventKey === 'sobre' && perfil.tipo_usuario === "funcionario" && (
                                <Link to={`/psicologo/${psicologo.psicologo_id}`} className="agendarBot mt-3">
                                  Saiba Mais
                                </Link>
                              )}

                              {tab.eventKey === 'agenda' && perfil.tipo_usuario === "funcionario" && (
                                <Link to={`/psicologo/${psicologo.psicologo_id}`} className="agendarBot mt-3">
                                  Agendar
                                </Link>
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