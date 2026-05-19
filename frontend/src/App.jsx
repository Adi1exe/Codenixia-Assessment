import { useState } from 'react';
import Chatbot from './components/Chatbot';
import LeadForm from './components/LeadForm';
import Dashboard from './components/Dashboard';
import { LayoutDashboard, Zap, Sparkles, ChevronRight } from 'lucide-react';

function App() {
  const [view, setView] = useState('client'); // 'client' | 'admin'

  return (
    <div className="min-h-screen bg-background text-gray-200 font-sans selection:bg-primary/30 selection:text-white relative overflow-hidden">
      {/* Ambient Background Effects */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/20 blur-[120px] mix-blend-screen pointer-events-none animate-pulse-slow"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-accent/20 blur-[120px] mix-blend-screen pointer-events-none animate-pulse-slow" style={{ animationDelay: '2s' }}></div>

      {/* Header */}
      <header className="glass sticky top-0 z-50 border-b-0 border-white/5 bg-background/50 backdrop-blur-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="bg-gradient-to-br from-primary to-accent p-2 rounded-xl shadow-lg shadow-primary/25 group-hover:shadow-primary/40 transition-all duration-300 group-hover:scale-105">
              <Zap size={22} className="text-white" fill="currentColor" />
            </div>
            <h1 className="text-2xl font-display font-bold tracking-tight text-white flex items-center gap-1">
              Codenixia <span className="text-gradient">Nexus</span>
            </h1>
          </div>
          
          <div className="flex bg-white/5 border border-white/10 rounded-xl p-1 backdrop-blur-md shadow-inner">
            <button 
              onClick={() => setView('client')}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
                view === 'client' 
                  ? 'bg-white/10 text-white shadow-lg border border-white/10 scale-100' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5 scale-95'
              }`}
            >
              <Sparkles size={16} className={view === 'client' ? 'text-accent-light' : 'opacity-0 w-0 h-0 transition-all'} />
              Workspace
            </button>
            <button 
              onClick={() => setView('admin')}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
                view === 'admin' 
                  ? 'bg-gradient-to-r from-primary/20 to-accent/20 text-white shadow-lg border border-primary/30 scale-100' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5 scale-95'
              }`}
            >
              <LayoutDashboard size={16} className={view === 'admin' ? 'text-primary-light' : ''} /> 
              Control Center
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10 animate-fade-in">
        {/* Hero Section (only in client view) */}
        {view === 'client' && (
          <div className="mb-12 text-center max-w-3xl mx-auto animate-slide-up">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4 leading-tight">
              Automate Your <br />
              <span className="text-gradient">Business Intelligence</span>
            </h2>
            <p className="text-lg text-gray-400">
              Deploy custom AI agents, optimize workflows, and capture high-quality leads on autopilot with Codenixia Nexus.
            </p>
          </div>
        )}

        {view === 'client' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 order-2 lg:order-1 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <LeadForm />
            </div>
            <div className="lg:col-span-7 order-1 lg:order-2 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <Chatbot />
            </div>
          </div>
        ) : (
          <div className="animate-slide-up">
            <Dashboard />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;