import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Chatbot.css';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{
    role: "assistant",
    content: "Γεια, chat bot εδώ",
  }]);
  const [input, setInput] = useState('');

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSend = async () => {
    if (input.trim() === '') return;

    const newMessage = { role: 'user', content: input };
    setMessages([...messages, newMessage]);

    const sendMessage = async (retryCount = 0) => {
      try {
        const response = await axios.post(
          'https://api.openai.com/v1/chat/completions',
          {
            model: 'gpt-4o-mini',
            messages: [
              { role: 'user', content: input },
            ],
            max_tokens: 150,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
            },
          }
        );

        const reply = { role: 'assistant', content: response.data.choices[0].message.content };
        setMessages((prevMessages) => [...prevMessages, newMessage, reply]);
      } catch (error) {
        if (error.response && error.response.status === 429 && retryCount < 5) {
          // Exponential backoff
          const waitTime = Math.pow(2, retryCount) * 1000;
          console.warn(`Retrying in ${waitTime / 1000} seconds... (Attempt ${retryCount + 1})`);
          setTimeout(() => sendMessage(retryCount + 1), waitTime);
        } else {
          console.error('Error sending message:', error);
        }
      }
    };

    await sendMessage();
    setInput('');
  };

  return (
    <div className="chatbot-container">
      <button className="chatbot-toggle" onClick={toggleChat}>
        Chat
      </button>
      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`chatbot-message ${msg.role}`}>
                {msg.content}
              </div>
            ))}
          </div>
          <div className="chatbot-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
            />
            <button onClick={handleSend}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;