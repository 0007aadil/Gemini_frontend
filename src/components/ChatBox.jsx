



import { useState, useEffect } from 'react';
import { sendChat, suggestInvestments } from '../api';
import ReactMarkdown from 'react-markdown';
import '../index.css';

const ChatBox = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState('chat');

  useEffect(() => {
    const light = document.querySelector('.cursor-light');

    const moveLight = (e) => {
      light.style.left = `${e.clientX}px`;
      light.style.top = `${e.clientY}px`;
    };

    window.addEventListener('mousemove', moveLight);
    return () => window.removeEventListener('mousemove', moveLight);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;

    setLoading(true);
    setAnswer('');
    const currentQuestion = question;
    setQuestion('');

    try {
      let response;
      if (mode === 'chat') {
        const { data } = await sendChat(currentQuestion);
        response = data.answer;
      } else {
        const { data } = await suggestInvestments(currentQuestion);
        response = data.suggestion;
      }
      setAnswer(response);
    } catch (err) {
      console.error(err);
      setAnswer('❌ Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-container">
      
      <div className="cursor-light"></div>

      
      <svg viewBox="0 0 500 100" className="svg-draw">
        <path
          d="M 10 80 C 100 10, 400 10, 490 80"
          stroke="#facc15"
          strokeWidth="4"
          fill="transparent"
          className="path"
        />
      </svg>

      <h2 className="chat-title">💬 Ask Gemini</h2>

      <div className="mode-switch">
        <button
          className={`mode-button ${mode === 'chat' ? 'active' : ''}`}
          onClick={() => setMode('chat')}
        >
          🤖 General Chat
        </button>
        <button
          className={`mode-button ${mode === 'invest' ? 'active' : ''}`}
          onClick={() => setMode('invest')}
        >
          📈 Investment Guide
        </button>
      </div>

      {answer && (
        <div className="chat-answer fade-in">
          <strong className="chat-label">
            {mode === 'chat' ? '🧠 Gemini says:' : '📊 Suggested Investments:'}
          </strong>
          <div className="chat-response markdown-body">
            <ReactMarkdown>{answer}</ReactMarkdown>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="chat-form">
        <textarea
          rows="4"
          placeholder={
            mode === 'chat'
              ? 'Type your question here...'
              : 'e.g. I’m 25, earn ₹60k/month, looking for long-term investments'
          }
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="chat-input"
        />
        <button type="submit" disabled={loading} className="chat-button">
          {loading ? <span className="loader"></span> : 'Ask Gemini'}
        </button>
      </form>
    </div>
  );
};

export default ChatBox;
