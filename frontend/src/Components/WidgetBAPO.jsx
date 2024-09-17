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
         


            {/* Adiciona o iframe aqui */}
            <div className="chat-iframe">
              <iframe
                src="https://webchat.botframework.com/embed/MINDUCHATBOT123-bot?s=04cGCIU0y9Q.NAMR51EDE1AsEJ2yYQ_DnOa_Nm0ol6ydoZ8t0jQH1CE"
                title="Chatbot"
                width="100%"
                height="400px"
                style={{ border: 'none' }}
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;

