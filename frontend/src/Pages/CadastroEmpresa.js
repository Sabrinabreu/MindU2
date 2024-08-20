// CadastroEmpresa.js
import React, { useState } from "react";
import CadastroForm from "../Components/CadastroFormEmpresa";
import BAPO from "../Components/WidgetBAPO";
import "../css/CadastroEmpresa.css";
import "../css/WidgetBAPO.css";
import bannerEMP from '../img/BannerEMP.png';
import { Row, Col } from "react-bootstrap";

const Cadastro = () => {
  const [salario, setSalario] = useState('');
  const [numeroColaboradores, setNumeroColaboradores] = useState('');
  const [faixa, setFaixa] = useState('');
  const [result, setResult] = useState('');
  const [errors, setErrors] = useState({
    salario: '',
    numeroColaboradores: '',
    faixa: '',
  });
  const [showResult, setShowResult] = useState(false);

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

    const formatarMoeda = (valor) => {
      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(valor);
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
    setResult('');
    setShowResult(false); // Volta pro formulário
  };


    // Atualiza o resultado
    setResult(`
      <div class="resultado-container">
        <div class="resultado-esquerdo">
          <p>Resultado para</p>
          <p>${numColaboradores} colaboradores</p>
          <p>${formatarMoeda(custoColabAno)}</p>
          <p>${faixa}</p>
          <button type="button" class="botaoBanner botaoBranco" onClick={resetForm}>REFAZER Cálculo</button>
        </div>
        <div class="resultado-direito">
          <p>Problemas de saúde mental custam à sua empresa cerca de: <span>${formatarMoeda(custoTotalInicial)}</span></p>
          <p>Você pode diminuir esse custo em até: <span>${formatarMoeda(economiaPotencial)} (${percentualReducao}%)</span></p>
          <p>Custo reduzido após a MindU: <span>${formatarMoeda(custoReduzido)}</span></p>
        </div>
      </div>
    `);

    setShowResult(true);
  };



  return (
    <>
      <BAPO/>
      <div>
        <div className="fundoInfo">
          <Row className="justify-content-center g-4 p-3">
            <Col md={7} sm={12} className="textoInfo">
              <h1 className="mb-4">Cuidar da saúde da sua equipe te ajuda a economizar!</h1>
              <p>Investir na saúde mental dos seus colaboradores não é apenas uma ação de cuidado, mas uma estratégia inteligente para o sucesso da sua empresa. Com nosso plano de psicologia especializado, você proporciona um ambiente mais saudável e produtivo, <b>promovendo maior satisfação e engajamento no trabalho. </b>
                Nosso time de psicólogos é dedicado a entender as necessidades específicas da sua empresa, oferecendo suporte contínuo para promover o bem-estar emocional e mental dos seus colaboradores.
                <b> Invista no futuro da sua empresa com um ambiente mais saudável e eficiente.</b></p>

              <a href="#header"><button className="botaoBanner">INVESTIR NO BEM ESTAR</button></a>
            </Col>
            <Col className="centralizar" md={4} sm={12}>
              <img className="fotoInfo" src={bannerEMP} alt="Banner Emp" />
            </Col>
          </Row>
        </div>

        <div className="fundoColorido">
          <div className="fundoForms centralizar">
            <h2 className="my-4 textRoxo centralizar">Calcule os custos de saúde mental na sua empresa</h2>

            {showResult ? (
              <Col md={6} sm={12} className="centralizar">
                <div className="bloqueio-divisoria" id="result" dangerouslySetInnerHTML={{ __html: result }}></div>
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

                  <div>
                    <label className="radio-button">
                      <input type="radio" name="faixa" value="20-30" checked={faixa === '20-30'} onChange={(e) => setFaixa(e.target.value)} />
                      <div className="circulo-radio"></div>
                      <span className="radio-label">Entre 20 e 30 anos</span>
                    </label>
                    <label className="radio-button">
                      <input type="radio" name="faixa" value="30-40" checked={faixa === '30-40'} onChange={(e) => setFaixa(e.target.value)} />
                      <div className="circulo-radio"></div>
                      <span className="radio-label">Entre 30 e 40 anos</span>
                    </label>
                    <label className="radio-button">
                      <input type="radio" name="faixa" value="40-50" checked={faixa === '40-50'} onChange={(e) => setFaixa(e.target.value)} />
                      <div className="circulo-radio"></div>
                      <span className="radio-label">Entre 40 e 50 anos</span>
                    </label>
                  </div>
                  {errors.faixa && <div className="mensagem-erro">{errors.faixa}</div>}

                  <button type="button" className="botaoBanner botaoBranco" onClick={calcularCustos}>CALCULAR CUSTO</button>
                </Col>
              </form>
            )}
          </div>

          <div id="header" className="fundoForms centralizar">
            <Col md={9} sm={12} className="blocoForms">
              <h2 className="m-4 centralizar">Cadastrar sua empresa</h2>
              <CadastroForm />
            </Col>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cadastro;
