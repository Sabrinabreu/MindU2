//Contato
import React, { useState } from "react";
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
  const [slides, setslides] = useState([
      {
          foto: clinica1,
          nome: "Manaus - AM",
          endereco: "Av. Santos Dumont, 1300 - Tarumã, Manaus - AM, 60001-000",
          telefone: "+55 (97) 1000-6000"
      }, {
          foto: clinica2,
          nome: "Belém - PA",
          endereco: "Av. Tavares Bastos, 987 - Marambaia, Belém - PA, 30011-000",
          telefone: "+55 (91) 2000-6000"
      }, {
          foto: clinica3,
          nome: "São Paulo - SP",
          endereco: "Av. Dr. Gastão Vidigal - Vila Leopoldina, São Paulo - SP, 00005-000",
          telefone: "+55 (11) 3000-6000"
      }, {
          foto: clinica4,
          nome: "Recife - CE",
          endereco: "Av. Dois Rios, 1234 - Ibura, Recife - PE, 51000-000",
          telefone: "+55 (85) 4000-6000"
      }, {
          foto: clinica5,
          nome: "Uberlândia - MG",
          endereco: "Av. João Naves de Ávila, 1333 - Tibery, Uberlândia - MG, 0008-000",
          telefone: "+55 (31) 5000-6000"
      }
  ]);

  return (
    <>
    <BAPO/>
      <div>
        <div className="bannerContato">
          <Row>        
          <Col md={6} sm={12}>
          <div className="textobanner">
          <p className="Contato-Tit mb-4">Quer falar conosco?</p>
          <p className="Contato-Txt">Adoraríamos ouvir de você.</p>
          <p className="Contato-Txt">Veja como entrar em contato.</p></div>
          </Col>
          <Col md={6} sm={12}>
          <img className="mb-3 bannerCT-IMG" src={bannerIMG} alt="imagem de 4 pessoas dançando." />
          </Col>
            </Row>
        </div>


        <CardGroup>
        <Col md={6} sm={12}>
        <Card className="centralizar card-contato">
          <Card.Body>
            <img className="Icon-card-contato mb-3" src={telefoneIcon} alt="icone de telefone" />
          <Card.Title className="tit-Cont">Contato Telefônico</Card.Title>
          <Card.Text>
          Fale conosco por telefone! Estamos prontos para responder suas dúvidas e fornecer mais informações sobre nossos serviços.
          </Card.Text>
          <Card.Link href="#">+55 11 1000-0000</Card.Link>
        </Card.Body>
        </Card>
        </Col>

        <Col md={6} sm={12}>
        <Card className="centralizar card-contato">
          <Card.Body>
            <img className="Icon-card-contato mb-3" src={ajudaIcon} alt="icone de telefone" />
          <Card.Title className="tit-Cont">Suporte por mensagem</Card.Title>
          <Card.Text>
          Envie uma mensagem! Nosso assistente virtual no WhatsApp está disponível para responder suas dúvidas instantaneamente.
          </Card.Text>
          <Card.Link href="#">Link para Whatsapp</Card.Link>
        </Card.Body>
        </Card>
        </Col>
        </CardGroup>

        <h1 className="centralizar my-5">Conecte-se com um de nossos escritórios globais</h1>

        <Col className="mapa">
        <Card className="centralizar card-mapa my-2">

            <div className="cardMapa-container DK">

              <div className="cardMapa-esquerdo">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3654.8653098297377!2d-46.561209825840436!3d-23.644994164667832!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce4328c992748f%3A0xcea3c3e698444297!2sSENAI%20S%C3%A3o%20Caetano%20do%20Sul!5e0!3m2!1spt-BR!2sbr!4v1724354578179!5m2!1spt-BR!2sbr" width="100%" height="400px" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
              </div>
              <div className="cardMapa-direito">

                <Col sm={12} className="mb-4">
                <h4>Clinica MindU</h4>
                <p>Rua Santo André, 680<br/>
                Boa Vista<br/>
                São Caetano do Sul/SP</p>
                </Col>

                <Col sm={12} className="mt-4">
                <h4>Telefone / Fax</h4>
                <p>+55 11 1000-0000<br/>
                  +55 21 1100-0000<br/></p>

                  <p>Fax: +1 117 012 2220</p>
                </Col>
              </div>
            </div>

          
        </Card>

        </Col>

        <div className="clinicas centralizar">
        {slides.map((conteudo, index) => (
          <Col md={10} sm={12}>
          <div className="card-clinicas my-5">
          <Row className="justify-content-center g-4 p-3">
              <Col md={5} sm={12} className="textoInfo text-start">
                  <h2 className="mb-4 tit-Cont">{conteudo.nome}</h2>
                      <h4>Endereço</h4>
                      <p>{conteudo.endereco}</p>
                      <h4>Telefone</h4>
                      <p>{conteudo.telefone}</p>
              </Col>
              <Col className="centralizar" md={5} sm={12}>
                  <img className="Img-clinica" src={conteudo.foto}/> 
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
