import { useState, useEffect } from 'react';
import Chatbot from './components/Chatbot';
import LeadForm from './components/LeadForm';
import Dashboard from './components/Dashboard';
import { LayoutDashboard, Zap, Sparkles, ChevronRight, Sun, Moon } from 'lucide-react';
import { Toaster } from 'react-hot-toast';

function App() {
  const [view, setView] = useState('client'); // 'client' | 'admin'
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'dark';
    }
    return 'dark';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <div className="min-h-screen bg-background text-slate-800 dark:text-gray-200 font-sans selection:bg-primary/30 selection:text-white relative overflow-hidden transition-colors duration-300">
      <Toaster 
        position="bottom-right"
        toastOptions={{
          style: {
            background: theme === 'dark' ? '#111827' : '#ffffff',
            color: theme === 'dark' ? '#fff' : '#1f2937',
            border: theme === 'dark' ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.08)',
            backdropFilter: 'blur(10px)',
          },
        }}
      />
      {/* Ambient Background Effects */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/20 blur-[120px] mix-blend-multiply dark:mix-blend-screen opacity-40 dark:opacity-100 pointer-events-none animate-pulse-slow"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-accent/20 blur-[120px] mix-blend-multiply dark:mix-blend-screen opacity-40 dark:opacity-100 pointer-events-none animate-pulse-slow" style={{ animationDelay: '2s' }}></div>

      {/* Header */}
      <header className="glass sticky top-0 z-50 border-b border-slate-900/5 dark:border-white/5 bg-background/50 backdrop-blur-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="bg-gradient-to-br from-primary to-accent p-2 rounded-xl shadow-lg shadow-primary/25 group-hover:shadow-primary/40 transition-all duration-300 group-hover:scale-105">
              <Zap size={22} className="text-white" fill="currentColor" />
            </div>
            <h1 className="text-2xl font-display font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-1">
              Codenixia <span className="text-gradient font-normal italic">Systems</span>
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex bg-slate-900/5 dark:bg-white/5 border border-slate-900/10 dark:border-white/10 rounded-xl p-1 backdrop-blur-md shadow-inner">
              <button 
                onClick={() => setView('client')}
                className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
                  view === 'client' 
                    ? 'bg-slate-900/10 dark:bg-white/10 text-slate-900 dark:text-white shadow-md dark:shadow-lg border border-slate-900/10 dark:border-white/10 scale-100' 
                    : 'text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-900/5 dark:hover:bg-white/5 scale-95'
                }`}
              >
                <Sparkles size={16} className={view === 'client' ? 'text-accent' : 'opacity-0 w-0 h-0 transition-all'} />
                Workflow Studio
              </button>
              <button 
                onClick={() => setView('admin')}
                className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
                  view === 'admin' 
                    ? 'bg-gradient-to-r from-primary/20 to-accent/20 text-slate-900 dark:text-white shadow-md dark:shadow-lg border border-primary/30 scale-100' 
                    : 'text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-900/5 dark:hover:bg-white/5 scale-95'
                }`}
              >
                <LayoutDashboard size={16} className={view === 'admin' ? 'text-primary' : ''} /> 
                Operations Ledger
              </button>
            </div>

            {/* Premium Theme Toggle Switch */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2.5 rounded-xl bg-slate-900/5 dark:bg-white/5 border border-slate-900/10 dark:border-white/10 text-slate-500 hover:text-slate-900 dark:text-gray-400 dark:hover:text-white transition-all duration-300 hover:scale-105 shadow-md flex items-center justify-center"
              aria-label="Toggle theme"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? (
                <Sun size={20} className="text-amber-500" />
              ) : (
                <Moon size={20} className="text-indigo-500" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10 animate-fade-in">
        {/* Hero Section (only in client view) */}
        {view === 'client' && (
          <div className="mb-12 text-center max-w-3xl mx-auto animate-slide-up">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900 dark:text-white mb-4 leading-tight">
              Crafted Business <br />
              <span className="text-gradient font-normal italic">Workflow & Automation</span>
            </h2>
            <p className="text-lg text-slate-600 dark:text-gray-400 font-sans">
              Design bespoke digital architectures, streamline processes, and monitor operational telemetry with Codenixia Systems.
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