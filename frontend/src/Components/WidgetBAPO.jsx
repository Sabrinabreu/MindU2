// ChatWidget.js
import React, { useState } from 'react';
import "../css/WidgetBAPO.css";
import fotoBAPO from '../img/IABAPO.webp';

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
            <img className="fotoBAPO" src={fotoBAPO} alt="foto da atendente" />
            <div class="talk-bubble tri-right left-top"/>
            <p>Tem alguma pergunta? Ficarei feliz em ajudar.</p>
            <div className="chat-options">
              <button className="chat-option">Falar com time pessoal</button>
              <button className="chat-option">Sou cliente</button>
              <button className="chat-option">Sou paciente e preciso de ajuda</button>
              <button className="chat-option">Agendar demonstração</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;
