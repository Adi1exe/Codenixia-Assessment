import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Send, Bot, User } from 'lucide-react';

const API_BASE = 'http://localhost:8000/api';

export default function Chatbot() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Initializing Nexus AI... Online. How can I optimize your workflows today?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { role: 'user', content: input };
    const chatHistory = [...messages, userMsg];
    setMessages(chatHistory);
    setInput('');
    setLoading(true);

    try {
      const response = await axios.post(`${API_BASE}/chat`, {
        history: messages.map(m => ({ role: m.role === 'assistant' ? 'model' : 'user', content: m.content })),
        message: userMsg.content
      });

      setMessages([...chatHistory, { role: 'assistant', content: response.data.reply }]);
    } catch (error) {
      setMessages([...chatHistory, { role: 'assistant', content: "Error connecting to AI kernel." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[600px] bg-app-card rounded-xl border border-app-border overflow-hidden shadow-2xl">
      <div className="p-4 bg-[#111] border-b border-app-border flex items-center gap-3">
        <Bot className="text-app-accent" size={24} />
        <div>
          <h3 className="font-bold text-white text-sm">Nexus AI</h3>
          <p className="text-xs text-app-accent">Online & Ready</p>
        </div>
      </div>
      
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-app-accent text-black' : 'bg-app-border text-white'}`}>
              {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
            </div>
            <div className={`p-3 rounded-lg max-w-[80%] text-sm ${msg.role === 'user' ? 'bg-app-accent text-black font-medium' : 'bg-[#1a1a1a] text-gray-300 border border-app-border'}`}>
              {msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex gap-3 flex-row">
             <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-app-border text-white">
              <Bot size={16} />
            </div>
            <div className="p-3 rounded-lg bg-[#1a1a1a] text-gray-400 border border-app-border text-sm flex gap-1 items-center">
              Processing <span className="animate-pulse">...</span>
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSend} className="p-3 border-t border-app-border bg-[#111] flex gap-2">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about automation..."
          className="flex-1 bg-black border border-app-border rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-app-accent transition-colors"
        />
        <button type="submit" disabled={loading} className="bg-app-accent text-black p-2 rounded-lg hover:bg-emerald-400 transition-colors disabled:opacity-50">
          <Send size={20} />
        </button>
      </form>
    </div>
  );
}