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

        <div className="mapa">



        <Card className="centralizar card-mapa my-2">


            <div className="cardMapa-container">
              <div className="cardMapa-esquerdo">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3654.8653098297377!2d-46.561209825840436!3d-23.644994164667832!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce4328c992748f%3A0xcea3c3e698444297!2sSENAI%20S%C3%A3o%20Caetano%20do%20Sul!5e0!3m2!1spt-BR!2sbr!4v1724354578179!5m2!1spt-BR!2sbr" width="100%" height="400px" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
              </div>
              <div className="cardMapa-direito">

                <Col sm={12} className="mb-4">
                <h4>Global Headquarters</h4>
                <p>2 Canal Park<br/>
                    Cambridge, MA 02141<br/>
                    United States</p>
                </Col>

                <Col sm={12} className="mt-4">
                <h4>Phone / Fax</h4>
                <p>+ 1 888 HUBSPOT<br/>
                  (+1 888 482 7768)<br/></p>

                  <p>Fax: +1 617 812 5820</p>
                </Col>
              </div>
            </div>

          
        </Card>

        </div>

        <div className="clinicas">
                {/* fazer um map pra isso */}
        </div>
        
      </div>
    </>
  );
};

export default Contato;
