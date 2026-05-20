import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Send, Bot, User, Sparkles, Loader2, Maximize2, MoreHorizontal } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const API_BASE = "https://codenixia-assessment.onrender.com/api";

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
      setMessages([...chatHistory, { role: 'assistant', content: "Error connecting to AI kernel. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[650px] glass rounded-2xl overflow-hidden shadow-2xl shadow-slate-900/10 dark:shadow-black/50 transition-all hover:shadow-primary/5">
      {/* Chat Header */}
      <div className="p-5 border-b border-slate-900/10 dark:border-white/10 bg-slate-900/5 dark:bg-white/5 flex items-center justify-between backdrop-blur-md">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent p-[2px]">
              <div className="w-full h-full bg-background rounded-full flex items-center justify-center">
                <Bot className="text-slate-900 dark:text-white w-5 h-5" />
              </div>
            </div>
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-background rounded-full animate-pulse"></span>
          </div>
          <div>
            <h3 className="font-display font-bold text-slate-900 dark:text-white text-lg flex items-center gap-2">
              Nexus AI <Sparkles size={14} className="text-accent-light" />
            </h3>
            <p className="text-xs text-slate-500 dark:text-gray-400 font-medium">Powered by Advanced LLM</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="p-2 text-slate-500 hover:text-slate-900 dark:text-gray-400 dark:hover:text-white hover:bg-slate-900/10 dark:hover:bg-white/10 rounded-lg transition-colors">
            <Maximize2 size={18} />
          </button>
          <button className="p-2 text-slate-500 hover:text-slate-900 dark:text-gray-400 dark:hover:text-white hover:bg-slate-900/10 dark:hover:bg-white/10 rounded-lg transition-colors">
            <MoreHorizontal size={18} />
          </button>
        </div>
      </div>
      
      {/* Chat Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth">
        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'} animate-slide-up group`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-lg ${
              msg.role === 'user' 
                ? 'bg-gradient-to-br from-accent to-primary text-white' 
                : 'bg-surface border border-slate-900/10 dark:border-white/10 text-primary dark:text-primary-light'
            }`}>
              {msg.role === 'user' ? <User size={20} /> : <Bot size={20} />}
            </div>
            <div className={`p-4 rounded-2xl max-w-[80%] text-[15px] leading-relaxed shadow-sm transition-all ${
              msg.role === 'user' 
                ? 'bg-primary/20 text-slate-900 dark:text-white border border-primary/30 rounded-tr-sm' 
                : 'bg-slate-900/5 dark:bg-white/5 text-slate-800 dark:text-gray-200 border border-slate-900/10 dark:border-white/10 rounded-tl-sm hover:border-slate-900/20 dark:hover:border-white/20'
            }`}>
              {msg.role === 'assistant' ? (
                <div className="prose prose-slate dark:prose-invert prose-sm max-w-none prose-p:leading-relaxed prose-pre:bg-slate-900/5 dark:prose-pre:bg-black/50 prose-pre:border prose-pre:border-slate-900/10 dark:prose-pre:border-white/10 prose-a:text-primary dark:prose-a:text-primary-light">
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
              ) : (
                msg.content
              )}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex gap-4 flex-row animate-fade-in">
             <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-surface border border-slate-900/10 dark:border-white/10 text-primary dark:text-primary-light shadow-lg">
              <Bot size={20} />
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/5 dark:bg-white/5 text-slate-500 dark:text-gray-400 border border-slate-900/10 dark:border-white/10 rounded-tl-sm flex gap-3 items-center">
              <Loader2 size={16} className="animate-spin text-primary-light" />
              <span className="font-medium text-sm">Synthesizing response...</span>
            </div>
          </div>
        )}
      </div>

      {/* Chat Input */}
      <div className="p-5 border-t border-slate-900/10 dark:border-white/10 bg-slate-900/5 dark:bg-black/20 backdrop-blur-md">
        <form onSubmit={handleSend} className="relative group">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask Nexus AI about your systems..."
            className="w-full bg-slate-900/5 dark:bg-white/5 border border-slate-900/10 dark:border-white/10 hover:border-slate-900/20 dark:hover:border-white/20 rounded-xl pl-5 pr-14 py-4 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-slate-400 dark:placeholder:text-gray-500 shadow-inner"
          />
          <button 
            type="submit" 
            disabled={loading || !input.trim()} 
            className="absolute right-2 top-2 bottom-2 bg-primary hover:bg-primary-light text-white p-2.5 rounded-lg transition-all disabled:opacity-50 disabled:hover:bg-primary flex items-center justify-center shadow-lg shadow-primary/20 disabled:shadow-none"
          >
            <Send size={18} className={input.trim() && !loading ? 'translate-x-0.5 -translate-y-0.5 transition-transform' : ''} />
          </button>
        </form>
        <p className="text-center text-[11px] text-slate-400 dark:text-gray-500 mt-3 font-medium">
          Nexus AI can make mistakes. Consider verifying critical information.
        </p>
      </div>
    </div>
  );
}