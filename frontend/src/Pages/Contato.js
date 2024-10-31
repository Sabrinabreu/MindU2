//Contato
import React, { useState, useEffect } from "react";
import BAPO from "../Components/WidgetBAPO";
import "../css/WidgetBAPO.css";
import "../css/Contato.css";
import telefoneIcon from "../img/telefoneAntigo.png";
import ajudaIcon from "../img/helpIcon.png";
import clinica1 from "../img/clinica1.jpg";
import clinica2 from "../img/clinica2.jpg";
import clinica3 from "../img/clinica3.jpg";
import clinica4 from "../img/clinica4.jpg";
import clinica5 from "../img/clinica5.jpg";
import bannerIMG from "../img/bannerContato2.jpg";
import { Row, Col, Card, CardGroup } from "react-bootstrap";

const Contato = () => {

  const [slides] = useState([
    {
      foto: clinica1,
      nome: "Manaus - AM",
      endereco: "Av. Santos Dumont, 1300 - Tarumã, Manaus - AM, 60001-000",
      telefone: "+55 (97) 1000-6000",
      legenda: "Foto da clinica de Manaus com decorações laranjas."
    }, {
      foto: clinica2,
      nome: "Belém - PA",
      endereco: "Av. Tavares Bastos, 987 - Marambaia, Belém - PA, 30011-000",
      telefone: "+55 (91) 2000-6000",
      legenda: "Foto da clinica de Belém com cores neutras e cinzas."
    }, {
      foto: clinica3,
      nome: "São Paulo - SP",
      endereco: "Av. Dr. Gastão Vidigal - Vila Leopoldina, São Paulo - SP, 00005-000",
      telefone: "+55 (11) 3000-6000",
      legenda: "Foto da clinica de São Paulo com decorações verde, plantas e quadros."
    }, {
      foto: clinica4,
      nome: "Recife - CE",
      endereco: "Av. Dois Rios, 1234 - Ibura, Recife - PE, 51000-000",
      telefone: "+55 (85) 4000-6000",
      legenda: "Foto da clinica de Recife, com decorações bem modernas e neutras."
    }, {
      foto: clinica5,
      nome: "Uberlândia - MG",
      endereco: "Av. João Naves de Ávila, 1333 - Tibery, Uberlândia - MG, 0008-000",
      telefone: "+55 (31) 5000-6000",
      legenda: "Foto da clinica de Uberlândia bem colorida e com uma grande decoração de árvore."
    }
  ]);

  const sectionsConfig = [
    { id: 'section1', delay: '0.3s' },
    { id: 'section2', delay: '0.2s' },
    { id: 'section3', delay: '0.4s' },
    { id: 'section4', delay: '0.4s' },
    { id: 'section5', delay: '0.2s' },
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

  return (
    <>
      <BAPO />
      <div>
        <div className="bannerContato">
          <Row>
            <Col md={6} sm={12}>
              <div className="textobanner">
                <div className="scroll-section" id="section1">
                  <p className="Contato-Tit mb-4">Quer falar conosco?</p>
                  <p className="Contato-Txt">Adoraríamos ouvir de você.</p>
                  <p className="Contato-Txt">Veja como entrar em contato.</p></div>
              </div>
            </Col>
            <Col md={6} sm={12}><div className="scroll-section" id="section2">
              <img className="mb-3 bannerCT-IMG" src={bannerIMG} alt="desenho de 4 pessoas dançando juntas." />
            </div></Col>
          </Row>
        </div>


        <CardGroup>
          <Col md={6} sm={12}>
            <div className="scroll-section" id="section3">
              <Card className="centralizar card-contato">
                <Card.Body>
                  <img className="Icon-card-contato mb-3" src={telefoneIcon} alt="icone de telefone amarelo." />
                  <h5 className="tit-Cont card-title h5">Contato Telefônico</h5>
                  <Card.Text>
                    Fale conosco por telefone! Estamos prontos para responder suas dúvidas e fornecer mais informações sobre nossos serviços.
                  </Card.Text>
                  <Card.Link href="#">+55 11 1000-0000</Card.Link>
                </Card.Body>
              </Card>
            </div>
          </Col>


          <Col md={6} sm={12}>
            <div className="scroll-section" id="section4">
              <Card className="centralizar card-contato">
                <Card.Body>
                  <img className="Icon-card-contato mb-3" src={ajudaIcon} alt="icone de mensagem amarelo." />
                  <h5 className="tit-Cont card-title h5">Suporte por mensagem</h5>
                  <Card.Text>
                    Envie uma mensagem! Nosso assistente virtual está disponível para responder suas dúvidas instantaneamente.
                  </Card.Text>
                  <Card.Text > É só clicar no icone de interrogação no canto da tela!</Card.Text>
                </Card.Body>
              </Card>
            </div>
          </Col>
        </CardGroup>

        <h1 className="centralizar textroxo textclaro my-5">Conecte-se com um de nossos escritórios globais</h1>
        <div className="scroll-section" id="section5">
          <Col className="mapa">
            <Card className="centralizar card-mapa my-2">

              <div className="cardMapa-container DK">

                <div className="cardMapa-esquerdo">
                  <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3654.8653098297377!2d-46.561209825840436!3d-23.644994164667832!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce4328c992748f%3A0xcea3c3e698444297!2sSENAI%20S%C3%A3o%20Caetano%20do%20Sul!5e0!3m2!1spt-BR!2sbr!4v1724354578179!5m2!1spt-BR!2sbr" width="100%" height="400px" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>
                <div className="cardMapa-direito">

                  <Col sm={12} className="mb-4 textroxo textclaro">
                    <h4>Clinica MindU</h4>
                    <p>Rua Santo André, 680<br />
                      Boa Vista<br />
                      São Caetano do Sul/SP</p>
                  </Col>

                  <Col sm={12} className="mt-4 textroxo textclaro">
                    <h4>Telefone / Fax</h4>
                    <p>+55 11 1000-0000<br />
                      +55 21 1100-0000<br /></p>

                    <p>Fax: +1 117 012 2220</p>
                  </Col>
                </div>
              </div>


            </Card>

          </Col>
        </div>

        <div className="clinicas centralizar">
          {slides.map((conteudo, index) => (
            <Col md={10} sm={12}>
              <div className="card-clinicas my-5">
                <Row className="justify-content-center g-4 p-3">
                  <Col md={5} sm={12} className="textoClinica text-start">
                    <h2 className="mb-4 tit-Cont">{conteudo.nome}</h2>
                    <h4>Endereço</h4>
                    <p>{conteudo.endereco}</p>
                    <h4>Telefone</h4>
                    <p>{conteudo.telefone}</p>
                  </Col>
                  <Col className="centralizar" md={5} sm={12}>
                    <img className="Img-clinica" src={conteudo.foto} alt={conteudo.legenda} />
                  </Col>
                </Row>
              </div>
            </Col>
          ))}
        </div>

      </div>
    </>
  );
};

export default Contato;
