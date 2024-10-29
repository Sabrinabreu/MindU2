import React, { useState } from 'react';
import "../css/WidgetBAPO.css";

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);


  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setLoading(true);
    }
  };
  const handleIframeLoad = () => {
    setLoading(false);
  };

  const styles = {
    iframe: {
      borderRadius: '8px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
      display: loading ? 'none' : 'block', 
    },
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
            {loading && (
              <div className="loading-wave">
                <div className="loading-bar"></div>
                <div className="loading-bar"></div>
                <div className="loading-bar"></div>
                <div className="loading-bar"></div>
              </div>
            )}
            <div className="chat-iframe">
              <iframe
                src="https://webchat.botframework.com/embed/MINDUCHATBOT123-bot?s=04cGCIU0y9Q.NAMR51EDE1AsEJ2yYQ_DnOa_Nm0ol6ydoZ8t0jQH1CE"
                title="Chatbot"
                width="100%"
                height="400px"
                style={styles.iframe}
                onLoad={handleIframeLoad}
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;

