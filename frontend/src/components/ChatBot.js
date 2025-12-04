import React, { useState, useRef, useEffect } from 'react';
import { chatBotAPI } from '../services/api';
import '../styles/chatbot.css';

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const initialMessage = {
    role: 'assistant',
    content: 'Merhaba! 👋 Ben kütüphane asistanıyım. Size kitap önerileri yapabilirim. Hangi tür kitaplar okumak istersiniz?'
  };
  
  const [messages, setMessages] = useState([initialMessage]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const handleNewChat = () => {
    setMessages([initialMessage]);
    setInputMessage('');
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = inputMessage.trim();
    setInputMessage('');

    // Kullanıcı mesajını ekle
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await chatBotAPI.getRecommendation(userMessage);
      
      // Bot yanıtını ekle
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: response.message || 'Üzgünüm, şu anda bir öneri yapamıyorum.' 
      }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Üzgünüm, bir hata oluştu. Lütfen tekrar deneyin.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickQuestions = [
    '📚 Klasik romanlar öner',
    '🔬 Bilim kurgu kitapları',
    '💭 Felsefe kitapları',
    '🎭 Türk edebiyatı'
  ];

  return (
    <div className={`chatbot-container ${isOpen ? 'open' : ''}`}>
      {/* Chat Button */}
      <button 
        className="chatbot-toggle"
        onClick={() => setIsOpen(!isOpen)}
        title="Kitap Önerisi Al"
      >
        {isOpen ? '✕' : '💬'}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="chatbot-window">
          {/* Header */}
          <div className="chatbot-header">
            <div className="chatbot-header-info">
              <div className="chatbot-avatar">🤖</div>
              <div>
                <h3>Kitap Asistanı</h3>
                <span className="chatbot-status">● Online</span>
              </div>
            </div>
            <button 
              className="chatbot-new-chat-btn"
              onClick={handleNewChat}
              title="Yeni Sohbet"
              disabled={isLoading || messages.length === 1}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 20h9"/>
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div 
                key={index} 
                className={`chatbot-message ${msg.role === 'user' ? 'user' : 'assistant'}`}
              >
                {msg.role === 'assistant' && <div className="message-avatar">🤖</div>}
                <div className="message-content">
                  {msg.content}
                </div>
                {msg.role === 'user' && <div className="message-avatar">👤</div>}
              </div>
            ))}
            
            {isLoading && (
              <div className="chatbot-message assistant">
                <div className="message-avatar">🤖</div>
                <div className="message-content typing">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions */}
          {messages.length === 1 && (
            <div className="chatbot-quick-questions">
              {quickQuestions.map((question, index) => (
                <button
                  key={index}
                  className="quick-question-btn"
                  onClick={() => {
                    setInputMessage(question.split(' ').slice(1).join(' '));
                  }}
                >
                  {question}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="chatbot-input-container">
            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Mesajınızı yazın..."
              disabled={isLoading}
              rows="1"
            />
            <button 
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isLoading}
              className="chatbot-send-btn"
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

