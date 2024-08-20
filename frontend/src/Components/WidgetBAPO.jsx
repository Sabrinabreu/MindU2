// ChatWidget.js
import React, { useState } from 'react';
import "../css/WidgetBAPO.css";
import fotoBAPO from '../img/IABAPO.webp';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import { Row, Col } from "react-bootstrap";



const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="chat-widget">
      <button className="chat-button" onClick={toggleChat}>
        <span className="chat-icon">?</span>
      </button>
      {isOpen && (
        <div className="chat-box">
          <div className="chat-header"> 
            <span className="chat-title">Precisa de ajuda?</span>
          </div>
          <div className="chat-body">
            <Row>
              <Col md={3}><img className="fotoBAPO" src={fotoBAPO} alt="foto da atendente"/></Col>
              <Col> <p className='speech-bubble p-2'>Tem alguma pergunta? Ficarei feliz em ajudar.</p></Col>
            </Row>
            
           
            <div className="chat-options">
              <Nav.Link className="chat-option" as={Link} to="/contato">Falar com time pessoal</Nav.Link>
              <Nav.Link className="chat-option" as={Link} to="/cadastroempresa">Sou empresa</Nav.Link>
              <Nav.Link className="chat-option" as={Link} to="/contato">Sou paciente e preciso de ajuda</Nav.Link>
              <Nav.Link className="chat-option" as={Link} to="/agendarconsulta">Agendar demonstração</Nav.Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;
