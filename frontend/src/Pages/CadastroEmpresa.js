// CadastroEmpresa.js
import React, { useState, useEffect } from "react";
import CadastroForm from "../Components/CadastroFormEmpresa";
import BAPO from "../Components/WidgetBAPO";
import "../css/CadastroEmpresa.css";
import "../css/WidgetBAPO.css";
import bannerSM from '../img/BannerSM.png';
import { Row, Col,Form } from "react-bootstrap";

const Cadastro = () => {
  const sectionsConfig = [
    { id: 'section1', delay: '0.2s' },
    { id: 'section2', delay: '0.2s' },
    { id: 'section3', delay: '0.2s' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      sectionsConfig.forEach(({ id, delay }) => {
        const section = document.getElementById(id);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top < window.innerHeight && rect.bottom > 0) {
            section.classList.add('visible');
            section.style.transitionDelay = delay;
          } else {
            section.classList.remove('visible');
            section.style.transitionDelay = '0s';
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []); 

  const [salario, setSalario] = useState('');
  const [numeroColaboradores, setNumeroColaboradores] = useState('');
  const [faixa, setFaixa] = useState('');
  const [result, setResult] = useState({});
  const [errors, setErrors] = useState({
    salario: '',
    numeroColaboradores: '',
    faixa: '',
  });
  const [showResult, setShowResult] = useState(false);

  const formatarMoeda = (valor) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  };

  const calcularCustos = () => {
    let isValid = true;
    const newErrors = {
      salario: '',
      numeroColaboradores: '',
      faixa: '',
    };

    if (!salario || parseFloat(salario) < 1) {
      newErrors.salario = 'O salário médio mensal deve ser maior ou igual a 1.';
      isValid = false;
    }
    if (!numeroColaboradores || parseInt(numeroColaboradores, 10) < 1) {
      newErrors.numeroColaboradores = 'A quantidade de colaboradores deve ser maior ou igual a 1.';
      isValid = false;
    }
    if (!faixa) {
      newErrors.faixa = 'A faixa etária é obrigatória.';
      isValid = false;
    }

    setErrors(newErrors);

    if (!isValid) return;

    let custoBasePorFuncionario;
    let percentualReducao;

    // valores base e porcentagem
    switch (faixa) {
      case '20-30':
        custoBasePorFuncionario = 1440.04;
        percentualReducao = 35.00;
        break;
      case '30-40':
        custoBasePorFuncionario = 1861.08;
        percentualReducao = 40.00;
        break;
      case '40-50':
        custoBasePorFuncionario = 2724.23;
        percentualReducao = 45.00;
        break;
      default:
        alert("Faixa etária inválida.");
        return;
    }

    const custoColabAno = custoBasePorFuncionario * (parseFloat(salario) / 1000);

    // cálculos de custo total, economia potencial e custo reduzido
    const numColaboradores = parseInt(numeroColaboradores, 10);
    const custoTotalInicial = custoColabAno * numColaboradores;
    const economiaPotencial = custoTotalInicial * (percentualReducao / 100);
    const custoReduzido = custoTotalInicial - economiaPotencial;

    // Atualiza o resultado
    setResult({
      salario,
      custoTotalInicial,
      economiaPotencial,
      percentualReducao,
      custoReduzido,
      numColaboradores,
    });

    setShowResult(true);
  };

  const resetForm = () => {
    setSalario('');
    setNumeroColaboradores('');
    setFaixa('');
    setErrors({
      salario: '',
      numeroColaboradores: '',
      faixa: '',
    });
    setResult({});
    setShowResult(false); // Volta pro formulário
  };

  return (
    <>
      <BAPO />
      <div  className="fundo-site">
        <div className="scroll-section" id="section1">
          <div className="fundoInfo">
            <Row className="justify-content-center g-4 p-3">
              <Col md={6} sm={12} className="textoInfo">
                <h1 className="mb-4">Cuidar da saúde da sua equipe te ajuda a economizar!</h1>
                <p>Investir na saúde mental dos seus colaboradores não é apenas uma ação de cuidado, mas uma estratégia inteligente para o sucesso da sua empresa. Com nosso plano de psicologia especializado, você proporciona um ambiente mais saudável e produtivo, <b>promovendo maior satisfação e engajamento no trabalho. </b>
                  Nosso time de psicólogos é dedicado a entender as necessidades específicas da sua empresa, oferecendo suporte contínuo para promover o bem-estar emocional e mental dos seus colaboradores.
                  <b> Invista no futuro da sua empresa com um ambiente mais saudável e eficiente.</b></p>

                <a href="#header"><button className="botaoBanner botaoBranco">INVESTIR NO BEM ESTAR</button></a>
              </Col>
              <Col className="centralizar" md={5} sm={12}>
                <img className="fotoInfo" src={bannerSM} alt="Desenho de 2 pessoas cuidando da saúde mental de uma terceira pessoa." />
              </Col>
            </Row>
          </div></div>

        <div className="scroll-section" id="section2">
          <div className="fundoColorido">
            <div className="fundoForms centralizar">
              <h2 className="my-4 textRoxo centralizar">Calcule os custos de saúde mental na sua empresa</h2>

              {showResult ? (
                <Col md={6} sm={12} className="centralizar">
                  <div className="bloqueio-divisoria" id="result">
                    <div className="resultado-container">
                      <div className="resultado-esquerdo">
                        <h4 className="mb-3">Resultado para</h4>
                        <p>{result.numColaboradores} colaboradores</p>
                        <p>Salário: {formatarMoeda(parseFloat(result.salario))}</p>
                        <p>{faixa} anos</p>
                        <button type="button" className="mt-3 botaoBanner roxo botaoBranco" onClick={resetForm}>REFAZER Cálculo</button>
                      </div>
                      <div className="resultado-direito">
                        <p>Atualmente, o custo estimado com saúde mental para sua equipe é de <span>{formatarMoeda(result.custoTotalInicial)}</span> por ano.</p>
                        <p>Com a MindU, você tem a oportunidade de diminuir esse custo em até <span>{result.percentualReducao}%</span> o que representa uma economia de <span>{formatarMoeda(result.economiaPotencial)}</span>.</p>
                      </div>
                    </div>
                  </div>
                </Col>
              ) : (


                <form id="calcForm">
                  <Col md={5} sm={12} className="textoCalc">
                    <h1 htmlFor="colaboradores" className="text-start titCalc">Quantos colaboradores você possui?</h1>
                    <input type="number" id="colaboradores" placeholder="Digite a quantidade de funcionários..." min={1} name="text" className={`inputgeral ${errors.numeroColaboradores ? 'input-erro' : ''}`} value={numeroColaboradores} onChange={(e) => setNumeroColaboradores(e.target.value)} />
                    {errors.numeroColaboradores && <div className="mensagem-erro">{errors.numeroColaboradores}</div>}

                    <h1 htmlFor="salario" className="mt-4 text-start titCalc">Qual o salário médio mensal?</h1>
                    <input type="number" id="salario" placeholder="Ex. 2500" name="text" min={1} className={`inputgeral ${errors.salario ? 'input-erro' : ''}`} value={salario} onChange={(e) => setSalario(e.target.value)} />
                    {errors.salario && <div className="mensagem-erro">{errors.salario}</div>}

                    <h1 htmlFor="faixa" className="my-4 text-start titCalc">Qual a idade média dos colaboradores?</h1>


                    <Form>
                        <Form.Check
                          type="radio" value="20-30" label="Entre 20 e 30 anos"
                          name="group1" id={`inline-radio-1`}
                          checked={faixa === '20-30'}
                          onChange={(e) => setFaixa(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              setFaixa(e.target.value);
                            }
                          }}
                        />
                        <Form.Check
                          type="radio" value="30-40" label="Entre 30 e 40 anos"
                          name="group2" id={`inline-radio-2`}
                          checked={faixa === '30-40'}
                          onChange={(e) => setFaixa(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              setFaixa(e.target.value);
                            }
                          }}
                        />
                        <Form.Check
                          type="radio" value="40-50" label="Entre 40 e 50 anos"
                          name="group3" id={`inline-radio-3`}
                          checked={faixa === '40-50'}
                          onChange={(e) => setFaixa(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              setFaixa(e.target.value);
                            }
                          }}
                        />
                      </Form>


                    {errors.faixa && <div className="mensagem-erro">{errors.faixa}</div>}

                    <button type="button" className="botaoBanner roxo botaoBranco" onClick={calcularCustos}>CALCULAR CUSTO</button>
                  </Col>
                </form>
              )}
            </div>

            <div className="scroll-section" id="section3"> <div id="header" className="fundoForms centralizar">
              <Col md={9} sm={12} className="blocoForms">
                <h2 className="m-4 centralizar">Cadastrar sua empresa</h2>
                <CadastroForm />
              </Col>
            </div></div>
          </div>

        </div>
      </div>
    </>
  );
};

export default Cadastro;
