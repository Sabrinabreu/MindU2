//Contato
import React, { useState } from "react";
import BAPO from "../Components/WidgetBAPO";
import "../css/WidgetBAPO.css";
import "../css/Contato.css";
import telefoneIcon from "../img/telefoneAntigo.png";
import ajudaIcon from "../img/helpIcon.png";
import bannerCONT from "../img/bannerCONT.jpg";
import { Row, Col, Card, CardGroup } from "react-bootstrap";

const Contato = () => {
  const [slides, setslides] = useState([
      {
          foto: ajudaIcon,
          nome: "Singapore (Asia-Pacific HQ)",
          endereco: "Address 60 Anson Road Mapletree Anson, #10-03 Singapore 079914"
          telefone: "Phone +65 6955 6000"
      }, {
          foto: ajudaIcon,
          nome: "Doppio",
          endereco: "Um espresso duplo, feito com água e café moido.",
          telefone: "A partir de R$15,00"
      }, {
          foto: ajudaIcon,
          nome: "Americano",
          endereco: "É um café pouco concentrado, café diluido em muita água.",
          telefone: "A partir de R$6,50"
      }, {
          foto: ajudaIcon,
          nome: "Naked",
          endereco: "Um espresso duplo espesso, feito com água e café moido fresco.",
          telefone: "A partir de R$12,90"
      }
  ]);

  return (
    <>
    <BAPO/>
      <div>
        <div className="fundoContact">
        
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

        <Col md={12} sm={12} className="mapa">
        <Card className="centralizar card-mapa my-2">


            <div className="cardMapa-container">
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

        <div className="clinicas">
        {slides.map((conteudo, index) => (

                  <Card className="centralizar card-contato">
                  <Card.Body>
                    <img className="mb-3" src={conteudo.foto}/>
                  <Card.Title className="tit-Cont">{conteudo.nome}</Card.Title>
                  <h4>Endereço</h4>
                  <Card.Text>{conteudo.endereco}</Card.Text>
                  <h4>Telefone</h4>
                  <Card.Text>{conteudo.telefone}</Card.Text>
                </Card.Body>
                </Card>
                 
            ))}
        </div>
        
      </div>
    </>
  );
};

export default Contato;
